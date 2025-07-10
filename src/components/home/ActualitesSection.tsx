
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronRight, Clock, Eye, ChevronLeft, ArrowRight, Sparkles } from 'lucide-react';
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
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 py-16 md:py-20 lg:py-24">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/5 to-secondary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary/5 to-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className={`relative z-10 ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
        <div className="w-full max-w-none px-0">
          {/* Enhanced header section */}
          <div className={`${isMobile ? 'text-center mb-8' : 'flex flex-col sm:flex-row items-center justify-between mb-12'} gap-6`}>
            <div className={`${isMobile ? 'text-center' : 'text-left'} space-y-3`}>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="relative">
                  <Sparkles className="w-8 h-8 text-secondary animate-pulse" />
                  <div className="absolute inset-0 w-8 h-8 text-secondary/30 animate-ping"></div>
                </div>
                <h2 className={`${isMobile ? 'text-3xl' : 'text-3xl md:text-4xl lg:text-5xl'} font-bold bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent`}>
                  Actualités Récentes
                </h2>
              </div>
              <p className="text-gray-600/80 text-base md:text-lg max-w-2xl leading-relaxed">
                Découvrez les dernières nouvelles et événements marquants de la P49
              </p>
            </div>
            {!isMobile && (
              <Button asChild className="group bg-gradient-to-r from-primary to-primary/90 text-white font-semibold hover:from-primary/90 hover:to-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 px-6 py-3 h-auto">
                <Link to="/actualites" className="flex items-center gap-2">
                  <span>Voir toutes les actualités</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            )}
          </div>
          
          {isMobile ? (
            // Mobile: Enhanced carousel
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <div 
                  className="flex transition-transform duration-1000 ease-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {news.map((item) => (
                    <div key={item.id} className="w-full flex-shrink-0">
                      <Link to={`/actualite/${item.id}`}>
                        <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer bg-white/95 backdrop-blur-sm border-0 rounded-2xl">
                          <div className="aspect-[16/10] overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                            <img 
                              src={item.image_url} 
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4 z-20">
                              <span className="bg-secondary/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full font-semibold text-sm shadow-lg">
                                {item.category}
                              </span>
                            </div>
                          </div>
                          <CardContent className="p-6 space-y-4">
                            <div className="flex items-center text-xs text-gray-500 gap-4">
                              <div className="flex items-center bg-primary/5 px-3 py-1.5 rounded-full">
                                <Calendar className="h-3 w-3 mr-2" />
                                {new Date(item.published_date).toLocaleDateString('fr-FR')}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>3 min</span>
                              </div>
                            </div>
                            <h3 className="font-bold text-primary hover:text-primary/80 transition-colors text-xl leading-tight line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-gray-600/80 line-clamp-3 text-sm leading-relaxed">
                              {item.summary}
                            </p>
                            <div className="pt-2">
                              <Button variant="ghost" size="sm" className="text-primary hover:text-white hover:bg-primary transition-all duration-300 rounded-full group">
                                <Eye className="h-4 w-4 mr-2" />
                                Lire l'article
                                <ArrowRight className="h-3 w-3 ml-2 transition-transform group-hover:translate-x-1" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Enhanced navigation for mobile */}
              <div className="flex justify-center items-center mt-8 space-x-6">
                <button
                  onClick={prevSlide}
                  className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-100"
                >
                  <ChevronLeft className="h-5 w-5 text-primary" />
                </button>
                
                {/* Dots indicator */}
                <div className="flex space-x-2">
                  {news.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-primary w-8' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextSlide}
                  className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-100"
                >
                  <ChevronRight className="h-5 w-5 text-primary" />
                </button>
              </div>

              {/* Mobile button */}
              <div className="text-center mt-8">
                <Button asChild className="group bg-gradient-to-r from-primary to-primary/90 text-white font-semibold hover:from-primary/90 hover:to-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 px-6 py-3 h-auto">
                  <Link to="/actualites" className="flex items-center gap-2">
                    Voir toutes les actualités
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            // Desktop: Premium carousel with enhanced design
            <div className="relative">
              <div className="flex items-center justify-center gap-8">
                {/* Enhanced navigation buttons */}
                <button
                  onClick={prevSlide}
                  className="p-4 rounded-full bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-100 group z-20"
                >
                  <ChevronLeft className="h-6 w-6 text-primary group-hover:text-primary/80 transition-colors" />
                </button>

                {/* Enhanced cards container */}
                <div className="flex items-center justify-center space-x-8 overflow-hidden flex-1 max-w-6xl">
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
                          className={`overflow-hidden transition-all duration-1000 ease-out cursor-pointer bg-white/95 backdrop-blur-sm border-0 shadow-xl ${
                            isCenter 
                              ? 'w-[500px] h-[600px] opacity-100 scale-110 hover:shadow-2xl z-20 rounded-2xl' 
                              : 'w-[400px] h-[550px] opacity-70 scale-95 hover:opacity-90 z-10 rounded-xl'
                          }`}
                        >
                          <div className="aspect-[16/10] overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                            <img 
                              src={item.image_url} 
                              alt={item.title}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-6 left-6 z-20">
                              <span className="bg-secondary/90 backdrop-blur-sm text-primary px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                                {item.category}
                              </span>
                            </div>
                            {isCenter && (
                              <div className="absolute bottom-6 right-6 z-20">
                                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                                  <Eye className="h-5 w-5 text-primary" />
                                </div>
                              </div>
                            )}
                          </div>
                          <CardContent className="p-8 space-y-4">
                            <div className="flex items-center text-sm text-gray-500 gap-4">
                              <div className="flex items-center bg-primary/5 px-3 py-2 rounded-full">
                                <Calendar className="h-4 w-4 mr-2" />
                                {new Date(item.published_date).toLocaleDateString('fr-FR')}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>3 min de lecture</span>
                              </div>
                            </div>
                            <h3 className={`font-bold text-primary hover:text-primary/80 transition-colors leading-tight line-clamp-2 ${
                              isCenter ? 'text-2xl' : 'text-xl'
                            }`}>
                              {item.title}
                            </h3>
                            <p className="text-gray-600/80 line-clamp-3 leading-relaxed">
                              {item.summary}
                            </p>
                            {isCenter && (
                              <div className="pt-4">
                                <Button variant="ghost" className="text-primary hover:text-white hover:bg-primary transition-all duration-300 rounded-full group w-full">
                                  <span>Lire l'article complet</span>
                                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                                </Button>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>

                <button
                  onClick={nextSlide}
                  className="p-4 rounded-full bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-100 group z-20"
                >
                  <ChevronRight className="h-6 w-6 text-primary group-hover:text-primary/80 transition-colors" />
                </button>
              </div>

              {/* Desktop dots indicator */}
              <div className="flex justify-center mt-12 space-x-3">
                {news.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-primary w-10 shadow-lg' 
                        : 'bg-gray-300 hover:bg-gray-400'
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
