
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { useSwipe } from '@/hooks/useSwipe';
import { Card, CardContent } from '@/components/ui/card';
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
    return (
      <Link to={`/echo-region/${item.id}`}>
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white border border-gray-200 h-full">
          <div className="aspect-[16/10] overflow-hidden relative">
            <img 
              src={item.image_url || '/lovable-uploads/narcissek.jpeg'} 
              alt={`Région ${item.region}`} 
              className={`w-full h-full object-cover transition-transform duration-500 ${
                variant === 'desktop' ? 'group-hover:scale-110' : 'group-hover:scale-105'
              }`} 
            />
            <div className="absolute top-4 left-4">
              <span className="bg-primary text-white px-2 py-1 rounded text-xs font-medium">
                {item.region}
              </span>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex items-center text-sm text-gray-500 gap-4 mb-3">
              <div className={`flex items-center ${variant !== 'mobile' ? 'bg-gray-50 px-2 py-1 rounded-md' : ''}`}>
                <MapPin className={`${variant === 'mobile' ? 'h-4 w-4 mr-2' : 'h-3 w-3 mr-1'}`} />
                {item.region}
              </div>
              <div className="flex items-center">
                <Users className={`${variant === 'mobile' ? 'h-4 w-4 mr-1' : 'h-3 w-3 mr-1'}`} />
                <span>{item.membres} membres</span>
              </div>
            </div>
            <h3 className={`font-semibold text-primary leading-tight line-clamp-2 mb-3 ${
              variant === 'mobile' ? 'text-base' : 
              variant === 'tablet' ? 'text-lg' : 'text-lg'
            }`}>
              Délégué: {item.delegue}
            </h3>
            <p className={`text-gray-700 line-clamp-3 leading-relaxed mb-4 ${
              variant === 'mobile' ? 'text-xs' : 
              variant === 'tablet' ? 'text-sm' : 'text-sm'
            }`}>
              {item.derniere_activite || 'Aucune activité récente signalée.'}
            </p>
          </CardContent>
        </Card>
      </Link>
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
