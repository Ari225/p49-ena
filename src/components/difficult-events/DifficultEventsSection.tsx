import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calendar, MapPin, Users, Heart, AlertCircle, Stethoscope, Car } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';

interface DifficultEvent {
  id: string;
  title: string;
  event_date: string;
  category: string;
  member_name: string;
  family_support_message: string | null;
  image_url: string | null;
  description: string | null;
}

const DifficultEventsSection = () => {
  const isMobile = useIsMobile();
  const [malheureuxEvents, setMalheureuxEvents] = useState<DifficultEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewEvent, setPreviewEvent] = useState<DifficultEvent | null>(null);

  useEffect(() => {
    // Fetch initial data directly from table
    const fetchDifficultEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('difficult_events')
          .select('*')
          .order('event_date', { ascending: false });

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
                <Card key={event.id} onClick={() => setPreviewEvent(event)} className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 border-l-4 ${getCategoryColor(event.category)} cursor-pointer`}>
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
                        {event.member_name}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
                        <strong>Catégorie:</strong> {event.category}
                      </p>
                    </div>
                    {event.family_support_message && (
                      <div className="bg-blue-50 p-3 rounded-lg border-l-2 border-blue-200">
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-700 italic`}>
                          <Heart className="h-3 w-3 inline mr-1" />
                          {event.family_support_message}
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

      {/* Preview Dialog */}
      <Dialog open={!!previewEvent} onOpenChange={open => {
        if (!open) setPreviewEvent(null);
      }}>
        <DialogContent
          className={`${isMobile ? 'mx-2 w-[calc(100vw-1rem)] max-w-[95vw]' : 'mx-4 sm:mx-6 md:mx-8 w-[calc(100vw-2rem)] sm:w-auto max-w-[95vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl'} p-4 sm:p-6 md:p-6 rounded-xl md:rounded-2xl max-h-[90vh] overflow-y-auto`}
        >
          {previewEvent && (
            <>
              <DialogHeader>
                <DialogTitle>{previewEvent.title}</DialogTitle>
                <DialogDescription>
                  {previewEvent.category} • {new Date(previewEvent.event_date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long', 
                    day: 'numeric'
                  })}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {previewEvent.image_url && (
                  <div className="overflow-hidden rounded-md">
                    <img 
                      src={previewEvent.image_url} 
                      alt={previewEvent.title} 
                      className="w-full h-auto max-h-[70vh] object-contain grayscale" 
                    />
                  </div>
                )}
                <div className="text-sm text-gray-700">
                  <div className="flex items-center mb-2">
                    <Users className="w-4 h-4 mr-2" /> 
                    {previewEvent.member_name}
                  </div>
                  {previewEvent.description && (
                    <div className="mb-3">
                      <p className="text-gray-700">{previewEvent.description}</p>
                    </div>
                  )}
                  {previewEvent.family_support_message && (
                    <div className="bg-blue-50 p-3 rounded-lg border-l-2 border-blue-200">
                      <p className="italic text-blue-800">
                        <Heart className="h-3 w-3 inline mr-1" /> 
                        {previewEvent.family_support_message}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default DifficultEventsSection;