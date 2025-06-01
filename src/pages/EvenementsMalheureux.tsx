import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Heart, AlertCircle, Stethoscope, Car } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface DifficultEvent {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  category: string;
  member_name: string;
  family_support_message: string | null;
  image_url: string | null;
}

const EvenementsMalheureux = () => {
  const isMobile = useIsMobile();
  const [events, setEvents] = useState<DifficultEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'tous', label: 'Tous', icon: Heart },
    { id: 'deces', label: 'Décès', icon: Heart },
    { id: 'maladie', label: 'Maladies', icon: Stethoscope },
    { id: 'accident', label: 'Accidents', icon: Car },
    { id: 'autre_difficile', label: 'Autres', icon: AlertCircle }
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // Mock data instead of Supabase
      const mockEvents: DifficultEvent[] = [
        {
          id: '1',
          title: 'Décès de M. Jean Kouassi',
          description: 'Nous avons la tristesse de vous annoncer le décès de notre collègue Jean Kouassi.',
          event_date: '2024-01-15',
          category: 'deces',
          member_name: 'Jean Kouassi',
          family_support_message: 'Nos pensées accompagnent sa famille en ces moments difficiles.',
          image_url: null
        },
        {
          id: '2',
          title: 'Hospitalisation de Mme Marie Diabaté',
          description: 'Notre collègue Marie Diabaté est actuellement hospitalisée.',
          event_date: '2024-01-10',
          category: 'maladie',
          member_name: 'Marie Diabaté',
          family_support_message: 'Nous lui souhaitons un prompt rétablissement.',
          image_url: null
        }
      ];
      setEvents(mockEvents);
    } catch (error) {
      console.error('Error fetching difficult events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredEvents = (category: string) => {
    if (category === 'tous') return events;
    return events.filter(event => event.category === category);
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData?.icon || AlertCircle;
  };

  const getCategoryLabel = (category: string) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData?.label || category;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'deces': return 'bg-gray-100 text-gray-700';
      case 'maladie': return 'bg-red-100 text-red-700';
      case 'accident': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
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
        <section className={`bg-gray-800 text-white py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">
              Évènements Malheureux
            </h1>
            <p className="text-xl opacity-90">
              Soutenons-nous mutuellement dans les moments difficiles
            </p>
          </div>
        </section>

        {/* Events Section */}
        <section className={`py-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <Tabs defaultValue="tous" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="flex items-center gap-1 text-xs lg:text-sm"
                    >
                      <IconComponent className="h-3 w-3 lg:h-4 lg:w-4" />
                      <span className="hidden sm:inline">{category.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="space-y-6">
                  {getFilteredEvents(category.id).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getFilteredEvents(category.id).map((event) => {
                        const IconComponent = getCategoryIcon(event.category);
                        return (
                          <Card key={event.id} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-gray-400">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <CardTitle className="text-lg text-gray-800 mb-2">{event.title}</CardTitle>
                                  <p className="text-gray-600 font-medium">{event.member_name}</p>
                                </div>
                                <div className="bg-gray-100 text-gray-600 p-2 rounded-full">
                                  <IconComponent className="h-4 w-4" />
                                </div>
                              </div>
                              <div className="flex items-center text-sm text-gray-500 mt-2">
                                <Calendar className="h-4 w-4 mr-2" />
                                {new Date(event.event_date).toLocaleDateString('fr-FR', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </div>
                            </CardHeader>
                            
                            <CardContent className="pt-0">
                              {event.image_url && (
                                <img 
                                  src={event.image_url} 
                                  alt={event.title}
                                  className="w-full h-32 object-cover rounded mb-3 grayscale"
                                />
                              )}
                              
                              {event.description && (
                                <p className="text-gray-700 text-sm mb-3">{event.description}</p>
                              )}
                              
                              {event.family_support_message && (
                                <div className="bg-blue-50 p-3 rounded-lg border-l-2 border-blue-200 mb-3">
                                  <p className="text-sm text-gray-700 italic">
                                    <Heart className="h-3 w-3 inline mr-1" />
                                    {event.family_support_message}
                                  </p>
                                </div>
                              )}
                              
                              <Badge className={getCategoryColor(event.category)}>
                                {getCategoryLabel(event.category)}
                              </Badge>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Aucun événement dans cette catégorie pour le moment.
                      </p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default EvenementsMalheureux;
