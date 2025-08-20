import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Users, Heart, AlertCircle, Stethoscope, Car } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';

const DifficultEventsSection = () => {
  const isMobile = useIsMobile();
  const [malheureuxEvents, setMalheureuxEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data using secure function
    const fetchDifficultEvents = async () => {
      try {
        const { data, error } = await supabase.rpc('get_public_difficult_events');

        if (error) {
          console.error('Error fetching difficult events:', error);
        } else {
          setMalheureuxEvents(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDifficultEvents();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('difficult_events_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'difficult_events'
        },
        (payload) => {
          console.log('Difficult event change:', payload);
          fetchDifficultEvents(); // Refetch data on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Décès':
        return Heart;
      case 'Maladies':
        return Stethoscope;
      case 'Accidents':
        return Car;
      default:
        return AlertCircle;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Décès':
        return 'border-l-gray-500 bg-gray-50';
      case 'Maladies':
        return 'border-l-red-500 bg-red-50';
      case 'Accidents':
        return 'border-l-orange-500 bg-orange-50';
      default:
        return 'border-l-gray-400 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <section className={`py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-lg">Chargement des événements...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 my-[100px]">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-primary mb-4`}>
            Partager la peine, apporter le réconfort
          </h2>
          <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 max-w-2xl mx-auto`}>
            Dans les moments d'épreuve, notre communauté se mobilise pour exprimer sa solidarité et son soutien inconditionnel.
          </p>
        </div>

        {malheureuxEvents.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucun événement difficile enregistré pour le moment.</p>
          </div>
        ) : (
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-2 gap-8'}`}>
            {malheureuxEvents.map(event => {
              const IconComponent = getCategoryIcon(event.category);
              return (
                <Card key={event.id} className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 border-l-4 ${getCategoryColor(event.category)}`}>
                  {event.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={event.image_url} 
                        alt={event.title} 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" 
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className={`text-gray-800 ${isMobile ? 'text-base' : 'text-lg'} flex items-center`}>
                      <IconComponent className="w-5 h-5 mr-2" />
                      {event.title}
                    </CardTitle>
                    <div className={`space-y-2 ${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(event.event_date).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {event.masked_member_name}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
                        <strong>Catégorie:</strong> {event.category}
                      </p>
                    </div>
                    {event.general_message && (
                      <div className="bg-blue-50 p-3 rounded-lg border-l-2 border-blue-200">
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-700 italic`}>
                          <Heart className="h-3 w-3 inline mr-1" />
                          {event.general_message}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default DifficultEventsSection;