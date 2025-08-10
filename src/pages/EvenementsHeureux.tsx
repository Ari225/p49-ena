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
    console.log('Fetching happy events from Supabase...');
    setLoading(true);
    
    try {
      // Simple query without auth requirements
      const { data, error } = await supabase
        .from('happy_events')
        .select(`
          id,
          title,
          description,
          event_date,
          location,
          category,
          member_name,
          message,
          image_url,
          created_at
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        // Fallback data in case of error
        setHappyEvents([]);
        return;
      }

      console.log('Happy events fetched successfully:', data);
      setHappyEvents(data || []);
    } catch (error) {
      console.error('Network error:', error);
      setHappyEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHappyEvents();
  }, []);

  // Set up real-time subscription - disabled for now to avoid auth issues
  useEffect(() => {
    // Real-time disabled temporarily
    // const channel = supabase
    //   .channel('happy-events-changes')
    //   .on('postgres_changes', { event: '*', schema: 'public', table: 'happy_events' }, fetchHappyEvents)
    //   .subscribe();
    // return () => supabase.removeChannel(channel);
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