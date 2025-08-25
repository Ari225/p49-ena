
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { useSwipe } from '@/hooks/useSwipe';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const EchoRegionsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Fetch regions from database
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const { data, error } = await supabase
          .from('echo_regions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

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

  // Auto-scroll for desktop only
  useEffect(() => {
    if (!isMobile && !isTablet && regions.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % regions.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isMobile, isTablet, regions.length]);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % regions.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => prevIndex === 0 ? regions.length - 1 : prevIndex - 1);
  };

  // ===== SWIPE HOOK =====
  const swipeHandlers = useSwipe({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide,
    threshold: 50
  });

  const RegionCard = ({ item, variant = 'mobile' }) => {
    // Ajouter cache busting pour les images avec timestamp
    const getImageWithCacheBusting = (imageUrl: string) => {
      if (!imageUrl) return '/lovable-uploads/Pers49.webp';
      
      // Si l'image contient déjà un paramètre de cache busting, l'utiliser
      if (imageUrl.includes('?t=')) return imageUrl;
      
      // Sinon ajouter un timestamp pour forcer le refresh
      const timestamp = Date.now();
      return imageUrl.includes('?') 
        ? `${imageUrl}&t=${timestamp}` 
        : `${imageUrl}?t=${timestamp}`;
    };

    return (
      <Card className="hover:shadow-xl transition-shadow duration-300 relative">
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img 
            src={getImageWithCacheBusting(item.image_url || '/lovable-uploads/Pers49.webp')} 
            alt={item.region} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Fallback en cas d'erreur de chargement
              (e.target as HTMLImageElement).src = '/lovable-uploads/Pers49.webp';
            }}
          />
        </div>
        <CardHeader>
          <CardTitle className="text-primary text-xl">{item.region}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Délégué:</span>
              <span className="font-medium text-primary">{item.delegue}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 flex items-center">
                <Users className="w-4 h-4 mr-1" />
                Membres:
              </span>
              <span className="font-bold text-secondary">{item.membres}</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Calendar className="w-4 h-4 mr-1" />
                Dernière activité:
              </div>
              <p className="text-sm">{item.derniere_activite}</p>
            </div>
            <div className="pt-2 border-t">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Actualités récentes:</h4>
              {item.actualites_recentes && item.actualites_recentes.length > 0 ? (
                <div className="space-y-1">
                  {item.actualites_recentes.slice(0, 3).map((actualite: any, index: number) => (
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
      </Card>
    );
  };

  return (
    <section className={`bg-white py-12 md:py-16 lg:py-[100px] ${isMobile ? 'px-[25px]' : isTablet ? 'px-[50px]' : 'px-4 md:px-8 lg:px-[100px]'}`}>
      <div className="container mx-auto px-0">
        <div className={`flex ${isMobile ? 'flex-row' : 'flex-col sm:flex-row'} items-center justify-between mb-[50px] md:mb-[50px]`}>
          <h2 className={`${isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl md:text-3xl'} font-bold text-primary`}>
            Écho des régions
          </h2>
          <Link to="/echo-regions" className={`${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm md:text-sm'} bg-primary text-white hover:bg-primary/90 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg py-[5px] px-[15px] font-semibold`}>
            <span className="hidden sm:inline">Actualités régionales</span>
            <span className="sm:hidden">Voir tout</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {/* MOBILE VERSION */}
        {isMobile && (
          <div className="relative">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Chargement des régions...</p>
              </div>
            ) : regions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucune région disponible pour le moment.</p>
              </div>
            ) : (
              <>
                <div 
                  className="overflow-hidden"
                  {...swipeHandlers}
                >
                  <div className="flex transition-transform duration-300 ease-in-out" style={{
                    transform: `translateX(-${currentIndex * 100}%)`
                  }}>
                    {regions.map((region, index) => (
                      <div key={index} className="w-full flex-shrink-0 px-0">
                        <RegionCard item={region} variant="mobile" />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Navigation arrows */}
                <div className="flex justify-center gap-4 mt-4">
                  <Button onClick={prevSlide} variant="outline" size="icon" className="rounded-full">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button onClick={nextSlide} variant="outline" size="icon" className="rounded-full">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* TABLET VERSION */}
        {isTablet && !isMobile && (
          <div className="relative">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Chargement des régions...</p>
              </div>
            ) : regions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucune région disponible pour le moment.</p>
              </div>
            ) : (
              <>
                <div className="overflow-hidden">
                  <div className="flex transition-transform duration-300 ease-in-out" style={{
                    transform: `translateX(-${currentIndex * 50}%)`
                  }}>
                    {regions.map((region, index) => (
                      <div key={index} className="w-1/2 flex-shrink-0 px-2">
                        <RegionCard item={region} variant="tablet" />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Navigation arrows */}
                <div className="flex justify-center gap-4 mt-6">
                  <Button onClick={prevSlide} variant="outline" size="icon" className="rounded-full">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button onClick={nextSlide} variant="outline" size="icon" className="rounded-full">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* DESKTOP VERSION */}
        {!isMobile && !isTablet && (
          <div>
            {loading ? (
              <div className="text-center py-16">
                <p className="text-gray-500">Chargement des régions...</p>
              </div>
            ) : regions.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500">Aucune région disponible pour le moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {regions.map((region, index) => (
                  <RegionCard key={index} item={region} variant="desktop" />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default EchoRegionsSection;
