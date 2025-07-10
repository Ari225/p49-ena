
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronRight, Clock, Eye, ChevronLeft, ArrowRight } from 'lucide-react';
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

  if (news.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20">
      <div className={`${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
        <div className="w-full max-w-none px-0">
          {/* Header section */}
          <div className={`${isMobile ? 'text-center mb-8' : 'flex flex-col sm:flex-row items-center justify-between mb-12'} gap-6`}>
            <div className={`${isMobile ? 'text-center' : 'text-left'}`}>
              <h2 className={`${isMobile ? 'text-3xl' : 'text-3xl md:text-4xl lg:text-5xl'} font-bold text-primary mb-3`}>
                Actualités Récentes
              </h2>
              <p className="text-gray-600 text-base md:text-lg max-w-2xl">
                Découvrez les dernières nouvelles et événements marquants de la P49
              </p>
            </div>
            {!isMobile && (
              <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                <Link to="/actualites" className="flex items-center gap-2">
                  <span>Voir toutes les actualités</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
          
          {isMobile ? (
            // Mobile: carousel
            <div className="relative">
              <div className="overflow-hidden rounded-xl">
                <div 
                  className="flex transition-transform duration-1000 ease-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {news.map((item) => (
                    <div key={item.id} className="w-full flex-shrink-0">
                      <Link to={`/actualite/${item.id}`}>
                        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer bg-white border border-gray-100">
                          <div className="aspect-[16/10] overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>
                            <img 
                              src={item.image_url} 
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4 z-20">
                              <span className="bg-secondary text-primary px-3 py-1.5 rounded-full font-medium text-sm shadow-sm">
                                {item.category}
                              </span>
                            </div>
                          </div>
                          <CardContent className="p-6">
                            <div className="flex items-center text-sm text-gray-500 gap-4 mb-3">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                {new Date(item.published_date).toLocaleDateString('fr-FR')}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>3 min</span>
                              </div>
                            </div>
                            <h3 className="font-bold text-primary text-xl leading-tight mb-3 line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed mb-4">
                              {item.summary}
                            </p>
                            <Button variant="ghost" size="sm" className="text-primary hover:text-white hover:bg-primary p-0 h-auto font-normal">
                              <Eye className="h-4 w-4 mr-2" />
                              Lire l'article
                            </Button>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation for mobile */}
              <div className="flex justify-center items-center mt-6 space-x-4">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <ChevronLeft className="h-5 w-5 text-primary" />
                </button>
                
                {/* Dots indicator */}
                <div className="flex space-x-2">
                  {news.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex ? 'bg-primary w-6' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <ChevronRight className="h-5 w-5 text-primary" />
                </button>
              </div>

              {/* Mobile button */}
              <div className="text-center mt-8">
                <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                  <Link to="/actualites" className="flex items-center gap-2">
                    Voir toutes les actualités
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            // Desktop: carousel with enhanced cards
            <div className="relative">
              <div className="flex items-center justify-center gap-6">
                {/* Navigation buttons */}
                <button
                  onClick={prevSlide}
                  className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
                >
                  <ChevronLeft className="h-5 w-5 text-primary" />
                </button>

                {/* Cards container */}
                <div className="flex items-center justify-center space-x-6 overflow-hidden flex-1 max-w-6xl">
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
                          className={`overflow-hidden transition-all duration-700 ease-out cursor-pointer bg-white border border-gray-100 hover:shadow-xl ${
                            isCenter 
                              ? 'w-[480px] h-[580px] opacity-100 scale-105 z-20 shadow-lg' 
                              : 'w-[400px] h-[520px] opacity-75 scale-95 z-10'
                          }`}
                        >
                          <div className="aspect-[16/10] overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                            <img 
                              src={item.image_url} 
                              alt={item.title}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4 z-20">
                              <span className="bg-secondary text-primary px-3 py-1.5 rounded-full font-medium text-sm shadow-lg backdrop-blur-sm">
                                {item.category}
                              </span>
                            </div>
                            {isCenter && (
                              <div className="absolute bottom-4 right-4 z-20">
                                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                                  <Eye className="h-4 w-4 text-primary" />
                                </div>
                              </div>
                            )}
                          </div>
                          <CardContent className="p-6">
                            <div className="flex items-center text-sm text-gray-500 gap-4 mb-3">
                              <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                                <Calendar className="h-4 w-4 mr-2" />
                                {new Date(item.published_date).toLocaleDateString('fr-FR')}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>3 min de lecture</span>
                              </div>
                            </div>
                            <h3 className={`font-bold text-primary leading-tight line-clamp-2 mb-3 ${
                              isCenter ? 'text-xl' : 'text-lg'
                            }`}>
                              {item.title}
                            </h3>
                            <p className="text-gray-600 line-clamp-3 leading-relaxed mb-4">
                              {item.summary}
                            </p>
                            {isCenter && (
                              <Button variant="ghost" className="text-primary hover:text-white hover:bg-primary transition-all duration-300 w-full">
                                <span>Lire l'article complet</span>
                                <ArrowRight className="h-4 w-4 ml-2" />
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>

                <button
                  onClick={nextSlide}
                  className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
                >
                  <ChevronRight className="h-5 w-5 text-primary" />
                </button>
              </div>

              {/* Desktop dots indicator */}
              <div className="flex justify-center mt-8 space-x-2">
                {news.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-primary w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ActualitesSection;
