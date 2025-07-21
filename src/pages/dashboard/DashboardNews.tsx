
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Edit, Eye, Calendar, Clock, User } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { isAdmin } from '@/utils/roleUtils';
import NewsFormDialog from '@/components/news/NewsFormDialog';
import NewsCardDashboard from '@/components/news/NewsCardDashboard';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  published_date: string;
  image_url?: string;
  reading_time?: number;
  published_by?: string;
  details?: string;
}

const DashboardNews = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);

  if (!user || !isAdmin(user)) {
    return <div>Non autorisé</div>;
  }

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    // Mock data instead of Supabase
    const mockNews: NewsItem[] = [
      {
        id: '1',
        title: 'Nouvelle formation en leadership',
        summary: 'Une formation spécialisée en leadership pour les membres de la P49.',
        category: 'Formation',
        published_date: '2024-01-15',
        image_url: '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg',
        reading_time: 3,
        published_by: 'Admin P49',
        details: 'Détails complets de la formation en leadership...'
      },
      {
        id: '2',
        title: 'Assemblée générale annuelle',
        summary: 'L\'assemblée générale de la P49 se tiendra le mois prochain.',
        category: 'Événement',
        published_date: '2024-01-10',
        image_url: '/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg',
        reading_time: 5,
        published_by: 'Secrétaire Général',
        details: 'Détails complets de l\'assemblée générale...'
      }
    ];
    setNews(mockNews);
  };

  const handleAddNews = () => {
    setEditingNews(null);
    setIsFormOpen(true);
  };

  const handleEditNews = (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: any) => {
    console.log('News data submitted:', data);
    setIsFormOpen(false);
    setEditingNews(null);
    // Refresh news list here
    fetchNews();
  };

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">
              Gestion des Actualités
            </h1>
            <p className="text-gray-600 mt-2 text-sm">Créer et gérer les actualités du site</p>
          </div>

          <div className="mb-6">
            <Button onClick={handleAddNews} className="bg-primary hover:bg-primary/90 w-full">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle actualité
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <FileText className="mr-2 h-5 w-5" />
                Liste des Actualités ({news.length})
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
                    <NewsCardDashboard 
                      key={item.id} 
                      item={item} 
                      variant="mobile"
                      onEdit={() => handleEditNews(item)}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <AdminSidebar />
        <NewsFormDialog
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          editingNews={editingNews}
        />
      </Layout>
    );
  }

  if (isTablet) {
    return (
      <Layout>
        <div className="px-[30px] py-[40px] pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Gestion des Actualités</h1>
            <p className="text-gray-600 mt-2">Créer et gérer les actualités du site</p>
          </div>

          <div className="mb-6">
            <Button onClick={handleAddNews} className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle actualité
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.length === 0 ? (
                  <p className="text-center text-gray-500 py-8 col-span-full">
                    Aucune actualité créée
                  </p>
                ) : (
                  news.map((item) => (
                    <NewsCardDashboard 
                      key={item.id} 
                      item={item} 
                      variant="tablet"
                      onEdit={() => handleEditNews(item)}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <AdminSidebar />
        <NewsFormDialog
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          editingNews={editingNews}
        />
      </Layout>
    );
  }

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
            <Button onClick={handleAddNews} className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle actualité
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.length === 0 ? (
                  <p className="text-center text-gray-500 py-8 col-span-full">
                    Aucune actualité créée
                  </p>
                ) : (
                  news.map((item) => (
                    <NewsCardDashboard 
                      key={item.id} 
                      item={item} 
                      variant="desktop"
                      onEdit={() => handleEditNews(item)}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <NewsFormDialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        editingNews={editingNews}
      />
    </Layout>
  );
};

export default DashboardNews;
