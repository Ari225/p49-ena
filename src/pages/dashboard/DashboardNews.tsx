
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Edit, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  published_date: string;
}

const DashboardNews = () => {
  const { user } = useAuth();
  const [news, setNews] = useState<NewsItem[]>([]);

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

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
    }
  };

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Gestion des Actualités</h1>
            <p className="text-gray-600 mt-2">Créer et gérer les actualités du site</p>
          </div>

          <div className="mb-6">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/dashboard/add-news">
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle actualité
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Liste des Actualités
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {news.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Aucune actualité créée
                  </p>
                ) : (
                  news.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-600">
                          {item.category} - Publié le {new Date(item.published_date).toLocaleDateString('fr-FR')}
                        </p>
                        {item.summary && (
                          <p className="text-sm text-gray-700 mt-1">{item.summary}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Publié</span>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardNews;
