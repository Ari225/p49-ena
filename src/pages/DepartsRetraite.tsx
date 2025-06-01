
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Gift } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface RetirementEvent {
  id: string;
  title: string;
  description: string;
  event_date: string;
  member_name: string;
  position: string;
  years_of_service: number;
  image_url?: string;
  location?: string;
}

const DepartsRetraite = () => {
  const isMobile = useIsMobile();
  const [events, setEvents] = useState<RetirementEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRetirementEvents();
  }, []);

  const fetchRetirementEvents = async () => {
    try {
      setLoading(true);
      // Mock data instead of Supabase
      const mockEvents: RetirementEvent[] = [
        {
          id: '1',
          title: 'Départ à la retraite de M. Kouassi Jean',
          description: 'Après 35 années de service dévoué à l\'administration publique.',
          event_date: '2024-01-15',
          member_name: 'Kouassi Jean',
          position: 'Directeur Général',
          years_of_service: 35,
          location: 'Abidjan'
        }
      ];
      setEvents(mockEvents);
    } catch (error) {
      console.error('Error fetching retirement events:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Chargement...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <section className={`bg-blue-800 text-white py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Départs à la Retraite</h1>
            <p className="text-xl opacity-90">
              Honorer nos membres pour leurs années de service dévoué
            </p>
          </div>
        </section>

        {/* Events Section */}
        <section className={`py-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            {events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg text-blue-800">{event.title}</CardTitle>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(event.event_date).toLocaleDateString('fr-FR')}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      {event.image_url && (
                        <img 
                          src={event.image_url} 
                          alt={event.member_name}
                          className="w-full h-32 object-cover rounded mb-3"
                        />
                      )}
                      
                      <div className="space-y-2 mb-4">
                        <p className="font-semibold text-gray-800">{event.member_name}</p>
                        <p className="text-sm text-gray-600">{event.position}</p>
                        {event.location && (
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {event.location}
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-700 text-sm mb-3">{event.description}</p>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-100 text-blue-800">
                          <Gift className="h-3 w-3 mr-1" />
                          {event.years_of_service} ans de service
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucun départ à la retraite prévu pour le moment.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default DepartsRetraite;
