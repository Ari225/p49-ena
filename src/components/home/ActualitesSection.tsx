
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
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-none px-0">
          {/* Header section */}
          <div className={`${isMobile ? 'text-center mb-8' : 'flex flex-col sm:flex-row items-center justify-between mb-12'} gap-6`}>
            <div className={`${isMobile ? 'text-center' : 'text-left'}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Actualités Récentes
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl">
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
                        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer bg-white border border-gray-200">
                          <div className="aspect-[16/10] overflow-hidden relative">
                            <img 
                              src={item.image_url} 
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="bg-white/90 backdrop-blur-sm text-primary px-3 py-1.5 rounded-full font-medium text-sm border shadow-sm">
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
            // Desktop: nouvelle approche avec grille responsive
            <div className="relative">
              {/* Navigation buttons - positionnés en overlay */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
              >
                <ChevronLeft className="h-5 w-5 text-primary" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
              >
                <ChevronRight className="h-5 w-5 text-primary" />
              </button>

              {/* Conteneur des cartes avec overflow visible */}
              <div className="mx-12 overflow-visible">
                <div className="grid grid-cols-3 gap-6 transition-all duration-700 ease-out">
                  {news.map((item, index) => {
                    const isCenter = index === currentIndex;
                    const isPrev = index === (currentIndex - 1 + news.length) % news.length;
                    const isNext = index === (currentIndex + 1) % news.length;
                    
                    if (!isCenter && !isPrev && !isNext) return null;

                    return (
                      <div key={item.id} className={`transition-all duration-700 ease-out ${
                        isCenter ? 'scale-105 z-20' : 'scale-95 opacity-75 z-10'
                      }`}>
                        <Link to={`/actualite/${item.id}`}>
                          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white border border-gray-200 h-full">
                            <div className="aspect-[16/10] overflow-hidden relative">
                              <img 
                                src={item.image_url} 
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute top-4 left-4">
                                <span className="bg-white/90 backdrop-blur-sm text-primary px-3 py-1.5 rounded-full font-medium text-sm border shadow-sm">
                                  {item.category}
                                </span>
                              </div>
                              {isCenter && (
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
                              )}
                            </div>
                            <CardContent className="p-6">
                              <div className="flex items-center text-sm text-gray-500 gap-4 mb-3">
                                <div className="flex items-center bg-gray-50 px-2 py-1 rounded-md">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {new Date(item.published_date).toLocaleDateString('fr-FR')}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>3 min</span>
                                </div>
                              </div>
                              <h3 className={`font-bold text-primary leading-tight line-clamp-2 mb-3 ${
                                isCenter ? 'text-xl' : 'text-lg'
                              }`}>
                                {item.title}
                              </h3>
                              <p className="text-gray-600 line-clamp-3 leading-relaxed mb-4 text-sm">
                                {item.summary}
                              </p>
                              {isCenter && (
                                <div className="flex items-center justify-between">
                                  <Button variant="ghost" size="sm" className="text-primary hover:text-white hover:bg-primary transition-all duration-300">
                                    <Eye className="h-4 w-4 mr-2" />
                                    Lire l'article
                                  </Button>
                                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors duration-300" />
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Desktop dots indicator */}
              <div className="flex justify-center mt-8 space-x-3">
                {news.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
                      index === currentIndex 
                        ? 'bg-primary border-primary scale-110' 
                        : 'bg-transparent border-gray-300 hover:border-primary'
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
