
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronRight, Clock, Eye } from 'lucide-react';
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

  useEffect(() => {
    fetchNews();
  }, []);

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

  if (news.length === 0) {
    return null;
  }

  return (
    <section className={`bg-gray-50 py-12 md:py-16 lg:py-[100px] ${isMobile ? 'px-[25px]' : 'px-4 md:px-8 lg:px-[100px]'}`}>
      <div className="container mx-auto px-0">
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-col sm:flex-row'} items-center justify-between mb-8 md:mb-12 gap-4`}>
          <div>
            <h2 className={`${isMobile ? 'text-2xl' : 'text-2xl md:text-3xl'} font-bold text-primary mb-2`}>
              Actualités récentes
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Restez informé des dernières nouvelles de la P49
            </p>
          </div>
          <Button asChild className="bg-primary text-white font-semibold hover:bg-primary/90 rounded flex items-center text-sm md:text-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg py-[5px] px-[15px] h-10">
            <Link to="/actualites" className="flex items-center">
              <span className="hidden sm:inline">Voir toutes les actualités</span>
              <span className="sm:hidden">Voir plus</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {news.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActualitesSection;
