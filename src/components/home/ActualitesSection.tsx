
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  image_url: string;
  published_date: string;
}

const ActualitesSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    // Mock data - additional news items for the grid
    const mockNews: NewsItem[] = [
      {
        id: '4',
        title: 'Séminaire de développement professionnel',
        summary: 'Un séminaire intensif pour le renforcement des capacités professionnelles.',
        category: 'Formation',
        image_url: '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg',
        published_date: '2024-01-20'
      },
      {
        id: '5',
        title: 'Nouveau programme de mentorat',
        summary: 'Lancement du programme de mentorat pour les jeunes diplômés.',
        category: 'Programme',
        image_url: '/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg',
        published_date: '2024-01-18'
      },
      {
        id: '6',
        title: 'Conférence internationale sur la gouvernance',
        summary: 'Participation à la conférence internationale sur les bonnes pratiques.',
        category: 'Conférence',
        image_url: '/lovable-uploads/8cbb0164-0529-47c1-9caa-8244c17623b3.jpg',
        published_date: '2024-01-16'
      }
    ];
    setNews(mockNews);
  };

  if (news.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-[100px] px-4 md:px-8 lg:px-[100px]">
      <div className="container mx-auto px-0">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Plus d'Actualités</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-4">
            Découvrez toutes nos dernières nouvelles et événements
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {news.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {item.image_url && (
                <div className="h-32 md:h-48">
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                    {item.category}
                  </span>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(item.published_date).toLocaleDateString('fr-FR')}
                  </div>
                </div>
                <h3 className="font-semibold text-primary mb-2 md:mb-3 line-clamp-2 text-sm md:text-base">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm line-clamp-3">{item.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild className="bg-primary hover:bg-primary/90 text-white font-medium px-6 md:px-8 py-2 md:py-3 text-sm md:text-base transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
            <Link to="/actualites" className="flex items-center">
              Voir toutes les actualités
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ActualitesSection;
