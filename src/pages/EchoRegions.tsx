import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Users, Calendar, Award } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
const EchoRegions = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch regions from database
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const { data, error } = await supabase
          .from('echo_regions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching regions:', error);
          return;
        }

        setRegions(data || []);
      } catch (error) {
        console.error('Error fetching regions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  // Cache busting pour les images
  const getImageWithCacheBusting = (imageUrl: string) => {
    if (!imageUrl) return '/lovable-uploads/Pers49.webp';
    
    if (imageUrl.includes('?t=')) return imageUrl;
    
    const timestamp = Date.now();
    return imageUrl.includes('?') 
      ? `${imageUrl}&t=${timestamp}` 
      : `${imageUrl}?t=${timestamp}`;
  };
  return <Layout>
      {/* Header Section with Background Image */}
      <section className={`relative ${isMobile ? 'h-[30vh]' : isTablet ? 'h-[45vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
        <div className="absolute inset-0">
          <img src="/lovable-uploads/archives.webp" alt="Background écho régions" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>
        
        <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : isTablet ? 'px-[50px]' : 'px-8 lg:px-[100px]'}`}>
          <h1 className={`font-bold mb-[10px] md:mb-[10px] animate-fade-in ${isMobile ? 'text-2xl' : isTablet ? 'text-4xl' : 'text-6xl md:text-6xl lg:text-6xl'}`}>
            Écho des régions
          </h1>
          <p className={`italic mb-6 md:mb-8 animate-fade-in text-white font-normal ${isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-lg md:text-lg'}`}>
            Plongez dans le train des délégations régionales de la P49
          </p>
        </div>
      </section>


      {/* Régions Section */}
      <section className={`bg-accent/30 py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
        <div className="container mx-auto px-0">
          <h2 className={`font-bold text-center text-primary mb-12 ${isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl'}`}>Délégations régionales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="text-center py-8 col-span-full">
              <p className="text-gray-500">Chargement des régions...</p>
            </div>
          ) : regions.length === 0 ? (
            <div className="text-center py-8 col-span-full">
              <p className="text-gray-500">Aucune région disponible pour le moment.</p>
            </div>
          ) : (
            regions.map((region, index) => <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={getImageWithCacheBusting(region.image_url || '/lovable-uploads/Pers49.webp')} 
                    alt={region.region} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/lovable-uploads/Pers49.webp';
                    }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-primary text-xl">{region.region}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Délégué:</span>
                      <span className="font-medium text-primary">{region.delegue}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        Membres:
                      </span>
                      <span className="font-bold text-secondary">{region.membres}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Calendar className="w-4 h-4 mr-1" />
                        Dernière activité:
                      </div>
                      <p className="text-sm">{region.derniere_activite}</p>
                    </div>
                    <div className="pt-2 border-t">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Actualités récentes:</h4>
                      {region.actualites_recentes && region.actualites_recentes.length > 0 ? (
                        <div className="space-y-1">
                          {region.actualites_recentes.map((actualite: any, index: number) => (
                            <div key={index} className="text-sm text-gray-600 border-l-2 border-blue-200 pl-2">
                              <p>{actualite.contenu}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">Aucune actualité récente</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>)
          )}
          </div>
        </div>
      </section>

      {/* Coordination Section */}
      
    </Layout>;
};
export default EchoRegions;