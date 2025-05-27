
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_date', { ascending: false })
        .limit(6);

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, news.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, news.length - 2)) % Math.max(1, news.length - 2));
  };

  if (news.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-[100px] px-[100px]">
      <div className="container mx-auto px-0">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Actualités</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Restez informés des dernières nouvelles et événements de notre réseau
          </p>
        </div>
        
        <div className="relative">
          <div className="flex space-x-6 overflow-hidden">
            {news.slice(currentIndex, currentIndex + 3).map((item) => (
              <Card key={item.id} className="flex-1 min-w-0 overflow-hidden hover:shadow-lg transition-shadow">
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
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                      {item.category}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(item.published_date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <h3 className="font-semibold text-primary mb-3 line-clamp-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{item.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {news.length > 3 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <ChevronLeft className="h-6 w-6 text-primary" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <ChevronRight className="h-6 w-6 text-primary" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsCarousel;
