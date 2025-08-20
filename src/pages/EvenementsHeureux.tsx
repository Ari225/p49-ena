import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
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
  masked_member_name: string;
  general_message: string | null;
  image_url: string | null;
}

const EvenementsHeureux = () => {
  const isMobile = useIsMobile();
  const [previewEvent, setPreviewEvent] = useState<HappyEvent | null>(null);
  const [heureuxEvents, setHeureuxEvents] = useState<HappyEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHappyEvents = async () => {
      try {
        const { data, error } = await supabase.rpc('get_public_happy_events');

        if (error) {
          console.error('Error fetching happy events:', error);
        } else {
          setHeureuxEvents(data || []);
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
        return 'border-l-pink-500 bg-pink-50';
      case 'Promotion':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'Distinction':
        return 'border-l-purple-500 bg-purple-50';
      default:
        return 'border-l-green-500 bg-green-50';
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
  return <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section with Background Image */}
        <section className={`relative ${isMobile ? 'h-[30vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
          <div className="absolute inset-0">
            <img src="/lovable-uploads/bc525a09-b8a2-469f-b451-2f78bc437b6e.png" alt="Background événements heureux" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
            
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold mb-4 md:mb-6 animate-fade-in`}>
              Événements Heureux
            </h1>
            <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
              Célébrons ensemble les moments de joie, les réussites et les bonheurs qui illuminent notre communauté
            </p>
          </div>
        </section>

        {/* Events Section */}
        <section className={`py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-0">
            <div className="text-center mb-12">
              <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-primary mb-4`}>Nos moments de bonheur</h2>
              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 max-w-2xl mx-auto`}>
                Partageons la joie des naissances, célébrons les promotions et honorons les distinctions de nos membres.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Chargement des événements...</p>
              </div>
            ) : heureuxEvents.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Aucun événement heureux disponible pour le moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {heureuxEvents.map(event => {
                const IconComponent = getCategoryIcon(event.category);
                return <Card key={event.id} onClick={() => setPreviewEvent(event)} className={`overflow-hidden hover:shadow-xl transition-shadow duration-300 border-l-4 ${getCategoryColor(event.category)} cursor-pointer`}>
                      <div className="aspect-video overflow-hidden">
                        <img src={event.image_url || '/placeholder-image.jpg'} alt={event.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                      <CardHeader>
                        <CardTitle className={`text-green-800 ${isMobile ? 'text-lg' : 'text-xl'} flex items-center`}>
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
                            {event.masked_member_name}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          <p className="text-sm"><strong>Catégorie:</strong> {event.category}</p>
                        </div>
                        {event.general_message && (
                          <div className="bg-green-50 p-3 rounded-lg border-l-2 border-green-200">
                            <p className={`${isMobile ? 'text-sm' : 'text-base'} text-green-800 italic`}>
                              <Heart className="h-3 w-3 inline mr-1" />
                              {event.general_message}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>;
              })}
              </div>
            )}
          </div>
        </section>

        {/* Statistics Section */}
        <section className={`bg-green-50 py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center text-primary mb-12`}>
              Nos bonheurs en chiffres
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-6 bg-white">
                <Heart className="w-12 h-12 mx-auto mb-4 text-pink-600" />
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-pink-800 mb-2`}>
                  {heureuxEvents.filter(event => event.category === 'Mariage').length}
                </h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-pink-700`}>Mariages célébrés</p>
              </Card>
              <Card className="text-center p-6 bg-white">
                <Star className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-yellow-800 mb-2`}>
                  {heureuxEvents.filter(event => event.category === 'Promotion').length}
                </h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-yellow-700`}>Promotions célébrées</p>
              </Card>
              <Card className="text-center p-6 bg-white">
                <Award className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-purple-800 mb-2`}>
                  {heureuxEvents.filter(event => event.category === 'Distinction').length}
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
        <DialogContent
          className="mx-4 sm:mx-6 md:mx-8 w-[calc(100vw-2rem)] sm:w-auto max-w-[95vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl p-4 sm:p-6 md:p-6 rounded-xl md:rounded-2xl max-h-[90vh] overflow-y-auto"
        >
              {previewEvent && <>
                <DialogHeader>
                  <DialogTitle>{previewEvent.title}</DialogTitle>
                  <DialogDescription>
                    {previewEvent.category} • {formatEventDate(previewEvent.event_date)}{previewEvent.location ? ` • ${previewEvent.location}` : ''}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-md">
                    <img src={previewEvent.image_url || '/placeholder-image.jpg'} alt={previewEvent.title} className="w-full h-auto max-h-[70vh] object-contain" />
                  </div>
                  <div className="text-sm text-gray-700">
                    <div className="flex items-center mb-2">
                      <Users className="w-4 h-4 mr-2" /> {previewEvent.masked_member_name}
                    </div>
                    {previewEvent.general_message && (
                      <div className="bg-green-50 p-3 rounded-lg border-l-2 border-green-200">
                        <p className="italic text-green-800">
                          <Heart className="h-3 w-3 inline mr-1" /> {previewEvent.general_message}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>}
        </DialogContent>
      </Dialog>
    </Layout>;
};
export default EvenementsHeureux;