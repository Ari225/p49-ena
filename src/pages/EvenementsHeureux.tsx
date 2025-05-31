
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Heart, PartyPopper, GraduationCap, Baby, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useIsMobile } from '@/hooks/use-mobile';

interface SocialEvent {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  category: string;
  member_name: string;
  image_url: string | null;
}

const EvenementsHeureux = () => {
  const isMobile = useIsMobile();
  const [events, setEvents] = useState<SocialEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'tous', label: 'Tous', icon: Heart },
    { id: 'mariage', label: 'Mariages', icon: Heart },
    { id: 'anniversaire', label: 'Anniversaires', icon: PartyPopper },
    { id: 'promotion', label: 'Promotions', icon: Award },
    { id: 'bapteme', label: 'Baptêmes', icon: Baby },
    { id: 'naissance', label: 'Naissances', icon: Baby },
    { id: 'autre_heureux', label: 'Autres', icon: PartyPopper }
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('social_events')
        .select('*')
        .order('event_date', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching social events:', error);
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
    return categoryData?.icon || Heart;
  };

  const getCategoryLabel = (category: string) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData?.label || category;
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
        <section className={`bg-primary text-white py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Événements Heureux</h1>
            <p className="text-xl opacity-90">
              Célébrons ensemble les moments de joie de nos membres
            </p>
          </div>
        </section>

        {/* Events Section */}
        <section className={`py-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <Tabs defaultValue="tous" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 mb-8">
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
                          <Card key={event.id} className="hover:shadow-lg transition-shadow duration-300">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <CardTitle className="text-lg text-primary mb-2">{event.title}</CardTitle>
                                  <p className="text-gray-600 font-medium">{event.member_name}</p>
                                </div>
                                <div className="bg-green-100 text-green-600 p-2 rounded-full">
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
                                  className="w-full h-32 object-cover rounded mb-3"
                                />
                              )}
                              
                              {event.description && (
                                <p className="text-gray-700 text-sm mb-3">{event.description}</p>
                              )}
                              
                              <Badge variant="secondary" className="bg-green-100 text-green-700">
                                {getCategoryLabel(event.category)}
                              </Badge>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <PartyPopper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
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

export default EvenementsHeureux;
