import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import EvenementsHeureuxHero from '@/components/evenements-heureux/EvenementsHeureuxHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calendar, MapPin, Users, PartyPopper, Heart, Star, Award } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
interface HappyEvent {
  id: string;
  title: string;
  event_date: string;
  location: string | null;
  category: string;
  member_name: string;
  message: string | null;
  image_url: string | null;
  description: string | null;
}
const EvenementsHeureux = () => {
  const isMobile = useIsMobile();
  const [previewEvent, setPreviewEvent] = useState<HappyEvent | null>(null);
  const [heureuxEvents, setHeureuxEvents] = useState<HappyEvent[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchHappyEvents = async () => {
      try {
        const {
          data,
          error
        } = await supabase.rpc('get_public_happy_events');
        if (error) {
          console.error('Error fetching happy events:', error);
        } else {
          // Trier par ordre chronologique (le plus récent en premier)
          const sortedData = (data || []).sort((a, b) => {
            const dateA = new Date(a.event_date);
            const dateB = new Date(b.event_date);
            return dateB.getTime() - dateA.getTime();
          });
          setHeureuxEvents(sortedData);
        }
      } catch (error) {
        console.error('Error fetching happy events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHappyEvents();
  }, []);
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mariage':
        return Heart;
      case 'Promotion':
        return Star;
      case 'Distinction':
        return Award;
      default:
        return PartyPopper;
    }
  };
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Mariage':
        return 'border-l-pink-500 bg-white';
      case 'Promotion':
        return 'border-l-yellow-500 bg-white';
      case 'Distinction':
        return 'border-l-purple-500 bg-white';
      default:
        return 'border-l-green-500 bg-white';
    }
  };
  const getCategoryTextColor = (category: string) => {
    switch (category) {
      case 'Mariage':
        return 'text-pink-600';
      case 'Promotion':
        return 'text-yellow-600';
      case 'Distinction':
        return 'text-purple-600';
      default:
        return 'text-green-600';
    }
  };
  const formatEventDate = (dateStr: string) => {
    if (/^\d{4}$/.test(dateStr)) return dateStr;
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? dateStr : parsed.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const capitalizeCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };
  return <Layout>
      <div className="bg-white min-h-screen">
        <EvenementsHeureuxHero />

        {/* Events Section */}
        <section className={`py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-0">
            <div className="text-center mb-12">
              <h2 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-primary mb-4`}>Nos moments de bonheur</h2>
              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 max-w-2xl mx-auto`}>
                Partageons la joie des naissances, célébrons les promotions et honorons les distinctions de nos membres.
              </p>
            </div>

            {loading ? <div className="text-center py-8">
                <p className="text-gray-600">Chargement des événements...</p>
              </div> : heureuxEvents.length === 0 ? <div className="text-center py-8">
                <p className="text-gray-600">Aucun événement heureux disponible pour le moment.</p>
              </div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {heureuxEvents.map(event => {
              const IconComponent = getCategoryIcon(event.category);
              return <Card key={event.id} onClick={() => setPreviewEvent(event)} className={`overflow-hidden hover:shadow-xl transition-shadow duration-300 border-l-4 ${getCategoryColor(event.category)} cursor-pointer`}>
                      <div className="aspect-video overflow-hidden">
                        <img src={event.image_url || '/placeholder-image.jpg'} alt={event.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                      <CardHeader>
                        <CardTitle className={`${getCategoryTextColor(event.category)} ${isMobile ? 'text-lg' : 'text-xl'} flex items-center`}>
                          <IconComponent className="w-5 h-5 mr-2" />
                          {event.title}
                        </CardTitle>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatEventDate(event.event_date)}
                          </div>
                          {event.location && <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              {event.location}
                            </div>}
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            {event.member_name}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          <p className="text-sm"><strong>Catégorie:</strong> {capitalizeCategory(event.category)}</p>
                           {event.description && <p className="text-sm text-gray-700">{event.description}</p>}
                        </div>
                        {event.message && <div className="bg-green-50 p-3 rounded-lg border-l-2 border-green-200">
                            <p className={`${isMobile ? 'text-sm' : 'text-base'} ${getCategoryTextColor(event.category)} italic`}>
                              <Heart className="h-3 w-3 inline mr-1" />
                              {event.message}
                            </p>
                          </div>}
                      </CardContent>
                    </Card>;
            })}
              </div>}
          </div>
        </section>

        {/* Statistics Section */}
        <section className={`bg-white py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-0">
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center text-primary mb-12`}>
              Nos bonheurs en chiffres
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-6 bg-white">
                <Heart className="w-12 h-12 mx-auto mb-4 text-pink-600" />
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-pink-800 mb-2`}>
                  {heureuxEvents.filter(event => event.category.toLowerCase() === 'mariage').length}
                </h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-pink-700`}>Mariages célébrés</p>
              </Card>
              <Card className="text-center p-6 bg-white">
                <Star className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-yellow-800 mb-2`}>
                  {heureuxEvents.filter(event => event.category.toLowerCase() === 'promotion').length}
                </h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-yellow-700`}>Promotions célébrées</p>
              </Card>
              <Card className="text-center p-6 bg-white">
                <Award className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-purple-800 mb-2`}>
                  {heureuxEvents.filter(event => event.category.toLowerCase() === 'distinction').length}
                </h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-purple-700`}>Distinctions honorées</p>
              </Card>
            </div>
          </div>
        </section>
      </div>
      <Dialog open={!!previewEvent} onOpenChange={open => {
      if (!open) setPreviewEvent(null);
    }}>
        <DialogContent className="mx-auto w-[90vw] sm:mx-6 sm:w-auto max-w-[90vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl p-4 sm:p-6 md:p-6 rounded-xl md:rounded-2xl max-h-[90vh] overflow-y-auto">
              {previewEvent && <>
                <DialogHeader>
                  <DialogTitle>{previewEvent.title}</DialogTitle>
                  <DialogDescription>
                    {capitalizeCategory(previewEvent.category)} • {formatEventDate(previewEvent.event_date)}{previewEvent.location ? ` • ${previewEvent.location}` : ''}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-md">
                    <img src={previewEvent.image_url || '/placeholder-image.jpg'} alt={previewEvent.title} className="w-full h-auto max-h-[70vh] object-contain" />
                  </div>
                  <div className="text-sm text-gray-700">
                    <div className="flex items-center mb-2">
                      <Users className="w-4 h-4 mr-2" /> {previewEvent.member_name}
                    </div>
                     {previewEvent.description && <div className="mb-3">
                         <p className="text-gray-700">{previewEvent.description}</p>
                       </div>}
                    {previewEvent.message && <div className="bg-green-50 p-3 rounded-lg border-l-2 border-green-200">
                        <p className={`italic ${getCategoryTextColor(previewEvent.category)}`}>
                          <Heart className="h-3 w-3 inline mr-1" /> {previewEvent.message}
                        </p>
                      </div>}
                  </div>
                </div>
              </>}
        </DialogContent>
      </Dialog>
    </Layout>;
};
export default EvenementsHeureux;