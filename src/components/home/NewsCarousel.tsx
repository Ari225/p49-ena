
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  image_url: string;
  published_date: string;
}

const NewsCarousel = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();

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
    // Mock data instead of Supabase
    const mockNews: NewsItem[] = [{
      id: '1',
      title: 'Nouvelle formation en leadership',
      summary: 'Une formation spécialisée en leadership pour les membres de la P49.',
      category: 'Formation',
      image_url: '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg',
      published_date: '2024-01-15'
    }, {
      id: '2',
      title: 'Assemblée générale annuelle',
      summary: 'L\'assemblée générale de la P49 se tiendra le mois prochain.',
      category: 'Événement',
      image_url: '/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg',
      published_date: '2024-01-10'
    }, {
      id: '3',
      title: 'Nouveau partenariat stratégique',
      summary: 'La P49 annonce un nouveau partenariat avec une institution internationale.',
      category: 'Partenariat',
      image_url: '/lovable-uploads/8cbb0164-0529-47c1-9caa-8244c17623b3.jpg',
      published_date: '2024-01-05'
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
    <section className={`bg-white py-12 md:py-16 lg:py-[100px] ${isMobile ? 'px-[25px]' : 'px-4 md:px-8 lg:px-[100px]'}`}>
      <div className="container mx-auto px-0">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Actualités</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-4">
            Restez informés des dernières nouvelles et événements de notre réseau
          </p>
        </div>
        
        <div className="relative w-full">
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {news.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      {item.image_url && (
                        <div className="h-64 md:h-80 relative">
                          <img 
                            src={item.image_url} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                          />
                          {/* Navigation Arrows on image for mobile */}
                          {isMobile && (
                            <>
                              <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                              >
                                <ChevronLeft className="w-6 h-6" />
                              </button>
                              <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                              >
                                <ChevronRight className="w-6 h-6" />
                              </button>
                            </>
                          )}
                        </div>
                      )}
                      <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-4">
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                            {item.category}
                          </span>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(item.published_date).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        <h3 className="font-bold text-primary mb-4 text-xl md:text-2xl">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed">{item.summary}</p>
                        <Link to={`/actualites/${item.id}`} className="mt-4 text-primary hover:text-primary/80 font-medium flex items-center">
                          Lire la suite
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows for desktop */}
          {!isMobile && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-primary scale-110' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Voir toutes les actualités button */}
        <div className="text-center mt-8">
          <Link to="/actualites">
            <Button className="bg-primary text-white hover:bg-primary/90 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              Voir toutes les actualités
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsCarousel;
