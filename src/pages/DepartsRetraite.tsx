import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calendar, MapPin, Users, Heart, Clock, Trophy } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
interface RetirementEvent {
  id: string;
  member_name: string;
  retirement_date: string;
  years_of_service: number | null;
  department: string | null;
  position: string | null;
  tribute_message: string | null;
  image_url: string | null;
  category: string | null;
}
const DepartsRetraite = () => {
  const isMobile = useIsMobile();
  const [retraiteEvents, setRetraiteEvents] = useState<RetirementEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewEvent, setPreviewEvent] = useState<RetirementEvent | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    averageYears: 0,
    totalYears: 0
  });
  useEffect(() => {
    // Fetch initial data
    const fetchRetirementEvents = async () => {
      try {
        const {
          data,
          error
        } = await supabase.rpc('get_public_retirement_departures');
        if (error) {
          console.error('Error fetching retirement events:', error);
        } else {
          setRetraiteEvents(data || []);

          // Calculate stats
          if (data && data.length > 0) {
            const total = data.length;
            const totalYears = data.reduce((sum, event) => sum + (event.years_of_service || 0), 0);
            const averageYears = totalYears / total;
            setStats({
              total,
              averageYears: Math.round(averageYears),
              totalYears
            });
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRetirementEvents();

    // Subscribe to real-time updates
    const channel = supabase.channel('retirement_departures_changes').on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'retirement_departures'
    }, payload => {
      console.log('Retirement event change:', payload);
      fetchRetirementEvents(); // Refetch data on any change
    }).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  const formatYearsOfService = years => {
    return years ? `${years} ans de service` : 'Non spécifié';
  };
  if (loading) {
    return <Layout>
        <div className="bg-white min-h-screen flex items-center justify-center">
          <div className="text-lg">Chargement des événements de retraite...</div>
        </div>
      </Layout>;
  }
  return <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section with Background Image */}
        <section className={`relative ${isMobile ? 'h-[30vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
          <div className="absolute inset-0">
            <img src="/lovable-uploads/retraite_bg.webp" alt="Background départs retraite" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
            <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold mb-4 md:mb-6 animate-fade-in`}>Départs en retraite</h1>
            <p className={`${isMobile ? 'text-sm' : 'text-lg md:text-xl'} italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
              Honorons ceux qui ont consacré leur carrière au service de notre institution et célébrons leur nouvelle étape de vie
            </p>
          </div>
        </section>

        {/* Events Section */}
        <section className={`py-16 ${isMobile ? 'px-[15px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-0">
            <div className="text-center mb-12">
              <h2 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-primary mb-4`}>Nos retraités honorés</h2>
              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 max-w-2xl mx-auto`}>
                Rendons hommage à nos collègues qui prennent une retraite bien méritée après des années de service dévoué.
              </p>
            </div>

            {retraiteEvents.length === 0 ? <div className="text-center py-8">
                <p className="text-gray-500">Aucun événement de retraite enregistré pour le moment.</p>
              </div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {retraiteEvents.map(event => <Card key={event.id} onClick={() => setPreviewEvent(event)} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-blue-500 bg-blue-50 cursor-pointer">
                       {event.image_url && <div className="aspect-video overflow-hidden">
                           <img src={event.image_url} alt={`Départ en retraite de ${event.member_name}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                         </div>}
                     <CardHeader>
                       <CardTitle className={`text-blue-800 ${isMobile ? 'text-base' : 'text-xl'} flex items-center`}>
                         <Trophy className="w-5 h-5 mr-2" />
                         Départ en retraite de {event.member_name}
                       </CardTitle>
                       <div className="space-y-2 text-sm text-gray-600">
                         <div className="flex items-center">
                           <Calendar className="w-4 h-4 mr-2" />
                           {new Date(event.retirement_date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                         </div>
                         {event.department && <div className="flex items-center">
                             <MapPin className="w-4 h-4 mr-2" />
                             {event.department}
                           </div>}
                         <div className="flex items-center">
                           <Users className="w-4 h-4 mr-2" />
                           {event.member_name}
                         </div>
                         <div className="flex items-center">
                           <Clock className="w-4 h-4 mr-2" />
                           {formatYearsOfService(event.years_of_service)}
                         </div>
                       </div>
                     </CardHeader>
                     <CardContent>
                       {event.tribute_message && <div className="bg-blue-100 p-3 rounded-lg border-l-2 border-blue-300 mb-4">
                           <p className={`${isMobile ? 'text-sm' : 'text-base'} text-blue-800 italic`}>
                             <Heart className="h-3 w-3 inline mr-1" />
                             {event.tribute_message}
                           </p>
                         </div>}
                       <div className="space-y-2">
                         <p className="text-sm"><strong>Catégorie:</strong> {event.category || 'Retraite'}</p>
                         <p className="text-sm"><strong>Années de service:</strong> {formatYearsOfService(event.years_of_service)}</p>
                       </div>
                     </CardContent>
                   </Card>)}
              </div>}
          </div>
        </section>

        {/* Statistics Section */}
        <section className={`bg-white py-16 ${isMobile ? 'px-[15px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center text-primary mb-12`}>
              Statistiques des départs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-6 bg-white">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-blue-800 mb-2`}>{stats.total}</h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-blue-700`}>Départs enregistrés</p>
              </Card>
              <Card className="text-center p-6 bg-white">
                <Clock className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-blue-800 mb-2`}>{stats.averageYears} ans</h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-blue-700`}>Moyenne d'années de service</p>
              </Card>
              <Card className="text-center p-6 bg-white">
                <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-blue-800 mb-2`}>{stats.totalYears}</h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-blue-700`}>Années cumulées d'expérience</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Preview Dialog */}
        <Dialog open={!!previewEvent} onOpenChange={open => {
        if (!open) setPreviewEvent(null);
      }}>
          <DialogContent className="w-[95vw] max-w-md mx-auto p-6 rounded-lg max-h-[85vh] overflow-y-auto">
            {previewEvent && <>
                <DialogHeader className="text-center pb-4">
                  <DialogTitle className="text-lg font-semibold text-blue-900">
                    Départ en retraite de {previewEvent.member_name}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-blue-600 mt-2">
                    {previewEvent.category || 'Retraite'} • {new Date(previewEvent.retirement_date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  {previewEvent.image_url && <div className="w-full overflow-hidden rounded-lg">
                      <img src={previewEvent.image_url} alt={`Départ en retraite de ${previewEvent.member_name}`} className="w-full h-auto max-h-[50vh] object-cover" />
                    </div>}
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-700">
                      <Users className="w-4 h-4 mr-2 flex-shrink-0" /> 
                      <span>{previewEvent.member_name}</span>
                    </div>
                    
                    {previewEvent.department && <div className="flex items-center text-sm text-gray-700">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" /> 
                        <span>{previewEvent.department}</span>
                      </div>}
                    
                    {previewEvent.position && <div className="text-sm text-gray-700 leading-relaxed">
                        <p><strong>Poste:</strong> {previewEvent.position}</p>
                      </div>}
                    
                    <div className="flex items-center text-sm text-gray-700">
                      <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{formatYearsOfService(previewEvent.years_of_service)}</span>
                    </div>
                    
                    {previewEvent.tribute_message && <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-300">
                        <p className="text-sm italic text-blue-800 flex items-start">
                          <Heart className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" /> 
                          {previewEvent.tribute_message}
                        </p>
                      </div>}
                  </div>
                </div>
              </>}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>;
};
export default DepartsRetraite;