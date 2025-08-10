import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Users, PartyPopper, Heart, Gift, Star, Award } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import HappyEventDetailPopup from '@/components/happy-events/HappyEventDetailPopup';
interface HappyEvent {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  location?: string;
  category: string;
  member_name: string;
  message?: string;
  image_url?: string;
}

const EvenementsHeureux = () => {
  const isMobile = useIsMobile();
  const [happyEvents, setHappyEvents] = useState<HappyEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<HappyEvent | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch happy events from Supabase
  const fetchHappyEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('happy_events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching happy events:', error);
        return;
      }

      setHappyEvents(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Insert initial data if table is empty
  const insertInitialData = async () => {
    const initialEvents = [
      {
        title: 'Mariage coutumier du condisciple TAKOUO',
        description: 'Monsieur TAKOUO Nohon Arsène, Délégué Régional Ouest de la P49 invite l\'ensemble de la communauté à son mariage coutumier.',
        event_date: '2025-08-15',
        location: 'N\'Zéré (Yamoussoukro)',
        category: 'Mariage',
        member_name: 'TAKOUO Nohon Arsène',
        message: 'Félicitations pour ce pas ! Qu\'il inaugure un chapitre de bonheur.',
        image_url: '/lovable-uploads/568e67d2-0613-4aa6-8f40-05f6bb749cf3.png'
      },
      {
        title: 'Prix d\'Excellence 2025 - BAGNON GNAGBO CESAR ZOUHO',
        description: 'Prix d\'Excellence du meilleur Agent de la Direction Générale du Trésor et de la Comptabilité Publique.',
        event_date: '2025-08-04',
        category: 'Distinction',
        member_name: 'BAGNON GNAGBO CESAR ZOUHO',
        message: 'Félicitations pour cette distinction ! Votre dévouement est récompensée.',
        image_url: '/lovable-uploads/10872f0f-53e5-404c-b915-d3aa753e07d6.png'
      },
      {
        title: 'Promotion - ZAGOU SERGES RODRIGUE',
        description: 'Promu Secrétaire Général de la Préfecture de San-Pédro.',
        event_date: '2025',
        category: 'Promotion',
        member_name: 'ZAGOU SERGES RODRIGUE',
        message: 'Le Bureau Exécutif adresse ses félicitations au SG ZAGOU pour cette promotion bien méritée !',
        image_url: '/lovable-uploads/1338f820-5562-4cf8-88ce-6cfc94e75bf9.png'
      },
      {
        title: 'Promotion - OUATTARA MORY',
        description: 'Promu Secrétaire Général de la Préfecture de Zuénoula.',
        event_date: '2025',
        category: 'Promotion',
        member_name: 'OUATTARA MORY',
        message: 'Le Bureau Exécutif adresse ses félicitations au Doyen OUATTARA Mory pour cette promotion bien méritée !',
        image_url: '/lovable-uploads/bec5d4d9-ad0d-43b2-aefc-6922b0d1485f.png'
      },
      {
        title: 'Prix d\'Excellence 2023 - KOFFI RICHARD N\'GORAN',
        description: 'Prix d\'Excellence du meilleur Diplomate.',
        event_date: '2023',
        category: 'Distinction',
        member_name: 'KOFFI RICHARD N\'GORAN',
        message: 'Félicitations pour cette distinction ! Vous faites la fierté de votre pays.',
        image_url: '/lovable-uploads/2d820a63-2de3-4a9a-960e-3287aee8041a.png'
      },
      {
        title: 'Prix d\'Excellence 2016 - SEKONGO KITCHAFOLWORI',
        description: 'Prix d\'Excellence des Armées.',
        event_date: '2016',
        category: 'Distinction',
        member_name: 'SEKONGO KITCHAFOLWORI',
        message: 'Félicitations pour cette distinction ! Votre dévouement est récompensée.',
        image_url: '/lovable-uploads/2c2781f0-9336-4c70-bb02-190bf681d909.png'
      }
    ];

    try {
      const { error } = await supabase
        .from('happy_events')
        .insert(initialEvents);

      if (error) {
        console.error('Error inserting initial data:', error);
      } else {
        fetchHappyEvents();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchHappyEvents();
  }, []);

  useEffect(() => {
    // Check if we need to insert initial data
    if (!loading && happyEvents.length === 0) {
      insertInitialData();
    }
  }, [loading, happyEvents.length]);

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('happy-events-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'happy_events'
        },
        () => {
          fetchHappyEvents();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleEventClick = (event: HappyEvent) => {
    setSelectedEvent(event);
    setIsPopupOpen(true);
  };

  const formatEventDate = (dateStr: string) => {
    // If it's just a year (4 digits), return as is
    if (/^\d{4}$/.test(dateStr)) {
      return dateStr;
    }
    
    // If it's a full date, format it
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const getCategoryStats = () => {
    const marriageCount = happyEvents.filter(e => e.category === 'Mariage').length;
    const promotionCount = happyEvents.filter(e => e.category === 'Promotion').length;
    const distinctionCount = happyEvents.filter(e => e.category === 'Distinction').length;
    
    return { marriageCount, promotionCount, distinctionCount };
  };

  const { marriageCount, promotionCount, distinctionCount } = getCategoryStats();
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
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-primary mb-4`}>Nos moments de bonheur</h2>
              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 max-w-2xl mx-auto`}>
                Partageons la joie des naissances, célébrons les promotions et honorons les distinctions de nos membres.
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="overflow-hidden animate-pulse">
                    <div className="aspect-video bg-gray-200"></div>
                    <CardHeader>
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-16 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {happyEvents.map(event => {
                  const IconComponent = getCategoryIcon(event.category);
                  return (
                    <Card 
                      key={event.id} 
                      className={`overflow-hidden hover:shadow-xl transition-shadow duration-300 border-l-4 cursor-pointer ${getCategoryColor(event.category)}`}
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={event.image_url || ''} 
                          alt={event.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                        />
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
                          {event.location && (
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              {event.location}
                            </div>
                          )}
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            {event.member_name}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className={`text-gray-700 ${isMobile ? 'text-sm' : 'text-base'} mb-3 line-clamp-3`}>
                          {event.description}
                        </p>
                        <div className="space-y-2 mb-4">
                          <p className="text-sm"><strong>Catégorie:</strong> {event.category}</p>
                        </div>
                        {event.message && (
                          <div className="bg-green-50 p-3 rounded-lg border-l-2 border-green-200">
                            <p className={`${isMobile ? 'text-sm' : 'text-base'} text-green-800 italic line-clamp-2`}>
                              <Heart className="h-3 w-3 inline mr-1" />
                              {event.message}
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

        {/* Statistics Section */}
        <section className={`bg-green-50 py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center text-primary mb-12`}>
              Nos bonheurs en chiffres
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-6 bg-white">
                <Heart className="w-12 h-12 mx-auto mb-4 text-pink-600" />
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-pink-800 mb-2`}>{marriageCount}</h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-pink-700`}>Mariages célébrés</p>
              </Card>
              <Card className="text-center p-6 bg-white">
                <Star className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-yellow-800 mb-2`}>{promotionCount}</h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-yellow-700`}>Promotions célébrées</p>
              </Card>
              <Card className="text-center p-6 bg-white">
                <Award className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-purple-800 mb-2`}>{distinctionCount}</h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-purple-700`}>Distinctions honorées</p>
              </Card>
            </div>
          </div>
        </section>
      </div>

      {/* Event Detail Popup */}
      <HappyEventDetailPopup 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        event={selectedEvent}
      />
    </Layout>
};
export default EvenementsHeureux;