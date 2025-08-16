
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import NewsCarousel from './news/NewsCarousel';
import NewsGrid from './news/NewsGrid';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  image_url: string;
  published_date: string;
}

const ActualitesSection = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchNews();
  }, []);

  // Auto-rotate slides every 6 seconds
  useEffect(() => {
    if (news.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % news.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [news.length]);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_visible', true)
        .order('published_date', { ascending: false })
        .limit(5);

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des actualités:', error);
      // Fallback to empty array if error
      setNews([]);
    }
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % news.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + news.length) % news.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  if (news.length === 0) {
    return null;
  }

  return (
    <section className={`bg-accent/30 py-16 md:py-20 ${
      isMobile ? 'px-[25px]' : isTablet ? 'px-[50px]' : 'px-0 mx-auto md:px-8 lg:px-[100px]'
    }`}>
      <div className={`${
        isMobile ? 'w-full' : isTablet ? 'w-full' : 'w-full max-w-7xl mx-auto'
      }`}>
        {/* Header section */}
        <div className={`${isMobile ? 'text-center mb-8 w-full' : isTablet ? 'text-center mb-10' : 'text-center mb-12'} gap-6`}>
          <div className="text-center">
            <h2 className={`${isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl'} text-primary mb-[10px] md:mb-[10px] font-bold`}>
              Actualités récentes
            </h2>
            <p className={`${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-base'} text-gray-700 mb-[50px] md:mb-[50px]`}>
              Découvrez les dernières nouvelles de la P49
            </p>
          </div>
        </div>
        
        {isMobile ? (
          <>
            <NewsCarousel news={news} currentIndex={currentIndex} onPrevious={prevSlide} onNext={nextSlide} onDotClick={handleDotClick} />
            
            {/* Mobile button */}
            <div className="text-center mt-[50px] md:mt-[50px]">
              <Button asChild className="bg-primary hover:bg-primary/90 text-white w-full">
                <Link to="/actualites" className="flex items-center gap-2 text-xs">
                  Voir toutes les actualités
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <>
            <NewsGrid 
              news={news} 
              currentIndex={currentIndex} 
              onPrevious={prevSlide} 
              onNext={nextSlide} 
              onDotClick={handleDotClick} 
              variant={isTablet ? 'tablet' : 'desktop'} 
            />
            
            {/* Desktop and Tablet button below the cards and dots */}
            <div className="text-center mt-[50px] md:mt-[50px]">
              <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                <Link to="/actualites" className="flex items-center gap-2 text-sm">
                  Voir toutes les actualités
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ActualitesSection;
