
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
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
    const mockNews: NewsItem[] = [{
      id: '4',
      title: 'Séminaire de développement professionnel',
      summary: 'Un séminaire intensif pour le renforcement des capacités professionnelles.',
      category: 'Formation',
      image_url: '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg',
      published_date: '2024-01-20'
    }, {
      id: '5',
      title: 'Nouveau programme de mentorat',
      summary: 'Lancement du programme de mentorat pour les jeunes diplômés.',
      category: 'Programme',
      image_url: '/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg',
      published_date: '2024-01-18'
    }, {
      id: '6',
      title: 'Conférence internationale sur la gouvernance',
      summary: 'Participation à la conférence internationale sur les bonnes pratiques.',
      category: 'Conférence',
      image_url: '/lovable-uploads/8cbb0164-0529-47c1-9caa-8244c17623b3.jpg',
      published_date: '2024-01-16'
    }];
    setNews(mockNews);
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
    <section className="bg-accent/30 py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-none px-0">
          {/* Header section */}
          <div className={`${isMobile ? 'text-center mb-8' : isTablet ? 'text-center mb-10' : 'flex flex-col sm:flex-row items-center justify-between mb-12'} gap-6`}>
            <div className={`${isMobile || isTablet ? 'text-center' : 'text-left'}`}>
              <h2 className={`${isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl'} text-primary mb-[10px] md:mb-[10px] font-bold`}>
                Actualités récentes
              </h2>
              <p className={`${isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-lg'} italic text-gray-700`}>
                Découvrez les dernières nouvelles de la P49
              </p>
            </div>
            {!isMobile && !isTablet && (
              <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                <Link to="/actualites" className="flex items-center gap-2">
                  <span>Voir toutes les actualités</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
          
          {isMobile ? (
            <>
              <NewsCarousel
                news={news}
                currentIndex={currentIndex}
                onPrevious={prevSlide}
                onNext={nextSlide}
                onDotClick={handleDotClick}
              />
              
              {/* Mobile button */}
              <div className="text-center mt-8">
                <Button asChild className="bg-primary hover:bg-primary/90 text-white w-full">
                  <Link to="/actualites" className="flex items-center gap-2 text-sm italic">
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
              
              {/* Tablet/Desktop button */}
              <div className="text-center mt-8">
                <Button asChild className="bg-primary hover:bg-primary/90 text-white text-base">
                  <Link to="/actualites" className="flex items-center gap-2">
                    Voir toutes les actualités
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ActualitesSection;
