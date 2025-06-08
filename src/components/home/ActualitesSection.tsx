
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const fetchNews = async () => {
    // Mock data - additional news items for the grid
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
    setCurrentIndex(prevIndex => (prevIndex + 1) % news.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => prevIndex === 0 ? news.length - 1 : prevIndex - 1);
  };

  if (news.length === 0) {
    return null;
  }

  return (
    <section className={`py-16 bg-accent/10 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
      <div className="container mx-auto px-0">
        <div className={`text-center mb-${isMobile ? '8' : '12'}`}>
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-primary mb-${isMobile ? '3' : '4'}`}>
            Actualités
          </h2>
          <p className={`text-gray-700 max-w-3xl mx-auto ${isMobile ? 'text-sm' : ''}`}>
            Restez informés des dernières nouvelles et événements de notre réseau
          </p>
        </div>

        {/* News Carousel */}
        <div className="relative overflow-hidden mb-8">
          <div className="flex transition-transform duration-500 ease-in-out" style={{
            transform: `translateX(-${currentIndex * (isMobile ? 100 : 100/3)}%)`
          }}>
            {news.map((item) => (
              <div key={item.id} className={`${isMobile ? 'w-full' : 'w-1/3'} flex-shrink-0 px-${isMobile ? '0' : '4'}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {item.image_url && (
                    <div className="h-48">
                      <img 
                        src={item.image_url} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                        {item.category}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(item.published_date).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                    <h3 className="font-semibold text-primary mb-2 text-lg">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{item.summary}</p>
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/actualites/${item.id}`} className="flex items-center">
                        Lire la suite
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <Button 
              onClick={prevSlide}
              variant="outline" 
              size="icon" 
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              onClick={nextSlide}
              variant="outline" 
              size="icon" 
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-center">
          <Button asChild className="bg-primary hover:bg-primary text-base md:text-base text-white py-[5px] px-[15px] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold">
            <Link to="/actualites" className="flex items-center">
              Voir toutes les actualités
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ActualitesSection;
