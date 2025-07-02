
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronRight, Clock, Eye, ChevronLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchNews();
  }, []);

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    if (news.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % news.length);
    }, 5000);
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

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (news.length === 0) {
    return null;
  }

  return (
    <section className={`bg-gray-50 py-12 md:py-16 lg:py-[100px] ${isMobile ? 'px-[25px]' : 'px-4 md:px-8 lg:px-[100px]'}`}>
      <div className="container mx-auto px-0">
        <div className={`${isMobile ? 'text-center' : 'flex flex-col sm:flex-row items-center justify-between'} mb-8 md:mb-12 gap-4`}>
          <div className={isMobile ? 'text-center' : 'text-left'}>
            <h2 className={`${isMobile ? 'text-2xl' : 'text-2xl md:text-3xl'} font-bold text-primary mb-2`}>
              Actualités récentes
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Restez informé des dernières nouvelles de la P49
            </p>
          </div>
          {!isMobile && (
            <Button asChild className="bg-primary text-white font-semibold hover:bg-primary/90 rounded flex items-center text-sm md:text-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg py-[5px] px-[15px] h-10">
              <Link to="/actualites" className="flex items-center">
                <span className="hidden sm:inline">Voir toutes les actualités</span>
                <span className="sm:hidden">Voir plus</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          )}
        </div>
        
        {isMobile ? (
          // Mobile: Slide carousel
          <div className="relative">
            <div className="overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {news.map((item) => (
                  <div key={item.id} className="w-full flex-shrink-0">
                    <Link to={`/actualite/${item.id}`}>
                      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white mx-2">
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={item.image_url} 
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <div className="flex items-center bg-primary/10 px-2 py-1 rounded-full">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(item.published_date).toLocaleDateString('fr-FR')}
                            </div>
                            <span className="bg-secondary/20 text-secondary px-2 py-1 rounded-full font-medium">
                              {item.category}
                            </span>
                          </div>
                          <h3 className="font-bold text-primary hover:text-primary/80 transition-colors mb-3 text-lg leading-tight line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                            {item.summary}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>3 min de lecture</span>
                            </div>
                            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/5 transition-colors">
                              <Eye className="h-4 w-4 mr-1" />
                              Lire
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {news.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Mobile button */}
            <div className="text-center mt-6">
              <Button asChild className="bg-primary text-white font-semibold hover:bg-primary/90 rounded flex items-center text-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg py-[5px] px-[15px] h-10 mx-auto">
                <Link to="/actualites" className="flex items-center">
                  Voir toutes les actualités
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          // Desktop: Center-focused carousel with scaling
          <div className="relative">
            <div className="flex items-center justify-center space-x-6">
              {/* Navigation buttons */}
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow z-10"
              >
                <ChevronLeft className="h-6 w-6 text-primary" />
              </button>

              {/* Cards container */}
              <div className="flex items-center space-x-4 overflow-hidden">
                {news.map((item, index) => {
                  const isCenter = index === currentIndex;
                  const isVisible = 
                    index === currentIndex ||
                    index === (currentIndex - 1 + news.length) % news.length ||
                    index === (currentIndex + 1) % news.length;

                  if (!isVisible) return null;

                  return (
                    <Link key={item.id} to={`/actualite/${item.id}`}>
                      <Card 
                        className={`overflow-hidden transition-all duration-500 cursor-pointer bg-white ${
                          isCenter 
                            ? 'w-96 opacity-100 scale-100 hover:shadow-2xl' 
                            : 'w-80 opacity-60 scale-90 hover:opacity-80'
                        }`}
                      >
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={item.image_url} 
                            alt={item.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <div className="flex items-center bg-primary/10 px-2 py-1 rounded-full">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(item.published_date).toLocaleDateString('fr-FR')}
                            </div>
                            <span className="bg-secondary/20 text-secondary px-2 py-1 rounded-full font-medium">
                              {item.category}
                            </span>
                          </div>
                          <h3 className="font-bold text-primary hover:text-primary/80 transition-colors mb-3 text-lg leading-tight line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                            {item.summary}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>3 min de lecture</span>
                            </div>
                            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/5 transition-colors">
                              <Eye className="h-4 w-4 mr-1" />
                              Lire
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>

              {/* Navigation buttons */}
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow z-10"
              >
                <ChevronRight className="h-6 w-6 text-primary" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ActualitesSection;
