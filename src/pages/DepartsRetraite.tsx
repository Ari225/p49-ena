
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Briefcase, MapPin, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useIsMobile } from '@/hooks/use-mobile';

interface RetirementDeparture {
  id: string;
  member_name: string;
  position: string | null;
  department: string | null;
  years_of_service: number | null;
  retirement_date: string;
  tribute_message: string | null;
  image_url: string | null;
}

const DepartsRetraite = () => {
  const isMobile = useIsMobile();
  const [departures, setDepartures] = useState<RetirementDeparture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartures();
  }, []);

  const fetchDepartures = async () => {
    try {
      const { data, error } = await supabase
        .from('retirement_departures')
        .select('*')
        .order('retirement_date', { ascending: false });

      if (error) throw error;
      setDepartures(data || []);
    } catch (error) {
      console.error('Error fetching retirement departures:', error);
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
        <section className={`bg-primary text-white py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Départs à la Retraite</h1>
            <p className="text-xl opacity-90">
              Honorer ceux qui ont servi avec dévouement
            </p>
          </div>
        </section>

        {/* Statistics Section */}
        {departures.length > 0 && (
          <section className={`py-8 ${isMobile ? 'px-[25px]' : 'px-[100px]'} bg-accent/10`}>
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{departures.length}</div>
                  <div className="text-gray-600">Départs enregistrés</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {Math.round(departures.reduce((acc, d) => acc + (d.years_of_service || 0), 0) / departures.length)}
                  </div>
                  <div className="text-gray-600">Années de service moyen</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {new Date().getFullYear()}
                  </div>
                  <div className="text-gray-600">Année en cours</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Departures Section */}
        <section className={`py-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            {departures.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {departures.map((departure) => (
                  <Card key={departure.id} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl text-primary mb-2">{departure.member_name}</CardTitle>
                          {departure.position && (
                            <div className="flex items-center text-gray-600 mb-1">
                              <Briefcase className="h-4 w-4 mr-2" />
                              <span className="text-sm">{departure.position}</span>
                            </div>
                          )}
                          {departure.department && (
                            <div className="flex items-center text-gray-600 mb-1">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span className="text-sm">{departure.department}</span>
                            </div>
                          )}
                        </div>
                        {departure.image_url && (
                          <img 
                            src={departure.image_url} 
                            alt={departure.member_name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                          />
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          Retraite le {new Date(departure.retirement_date).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        
                        {departure.years_of_service && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            {departure.years_of_service} années de service
                          </div>
                        )}
                        
                        {departure.tribute_message && (
                          <div className="bg-blue-50 p-3 rounded-lg border-l-2 border-blue-200">
                            <p className="text-sm text-gray-700 italic">"{departure.tribute_message}"</p>
                          </div>
                        )}
                        
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                          Retraité(e)
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucun départ à la retraite enregistré pour le moment.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default DepartsRetraite;
