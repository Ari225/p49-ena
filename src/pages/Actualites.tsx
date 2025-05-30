
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  image_url: string;
  published_date: string;
}

const Actualites = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_date', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Chargement...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Actualités</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm lg:text-base">
            Découvrez les dernières nouvelles et événements de notre réseau
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {news.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {item.image_url && (
                <div className="h-36 lg:h-48">
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs lg:text-sm">
                    {item.category}
                  </span>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(item.published_date).toLocaleDateString('fr-FR')}
                  </div>
                </div>
                <h3 className="font-semibold text-primary mb-3 line-clamp-2 text-sm lg:text-base">{item.title}</h3>
                <p className="text-gray-600 text-xs lg:text-sm line-clamp-3">{item.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {news.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune actualité disponible pour le moment.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Actualites;
