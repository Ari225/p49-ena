
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
    <section className={`bg-primary/5 py-12 md:py-16 lg:py-[100px] ${isMobile ? 'px-[25px]' : 'px-4 md:px-8 lg:px-[100px]'}`}>
      <div className="container mx-auto px-0">
        <div className="text-center mb-8 md:mb-12">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-2xl md:text-3xl'} font-bold text-primary mb-4`}>
            Dernières Nouvelles
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Découvrez les actualités les plus récentes de la P49
          </p>
        </div>

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
                        <h3 className="font-bold text-primary hover:text-primary/80 transition-colors mb-3 text-lg leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                          {item.summary}
                        </p>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/5 transition-colors">
                          Lire la suite
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow z-10"
          >
            <ChevronLeft className="h-5 w-5 text-primary" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow z-10"
          >
            <ChevronRight className="h-5 w-5 text-primary" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsCarousel;
