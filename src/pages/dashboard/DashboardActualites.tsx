import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import EditorSidebar from '@/components/EditorSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { isRedacteur } from '@/utils/roleUtils';
import NewsFormDialog from '@/components/news/NewsFormDialog';
import NewsCardDashboard from '@/components/news/NewsCardDashboard';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  published_date: string;
  image_url?: string;
  reading_time?: number;
  details?: string;
  is_visible?: boolean;
  created_by?: string;
}

const DashboardActualites = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);

  if (!user || !isRedacteur(user)) {
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
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching news:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les actualités",
          variant: "destructive"
        });
        return;
      }

      setNews(data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les actualités",
        variant: "destructive"
      });
    }
  };

  const handleAddNews = () => {
    setEditingNews(null);
    setIsFormOpen(true);
  };

  const handleEditNews = (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data: any) => {
    try {
      let imageUrl = data.image_url;
      
      // Upload image if a new file is selected
      if (data.image && data.image instanceof File) {
        const fileExt = data.image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `news/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('media-files')
          .upload(filePath, data.image);

        if (uploadError) {
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('media-files')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      // Ensure user is authenticated
      if (!user?.id) {
        throw new Error('Utilisateur non authentifié');
      }

      const newsData = {
        title: data.title,
        summary: data.summary,
        details: data.details,
        category: data.category,
        reading_time: data.reading_time,
        published_date: data.published_date,
        image_url: imageUrl,
        created_by: user.id
      };

      if (editingNews) {
        // Update existing news
        const { error } = await supabase
          .from('news')
          .update(newsData)
          .eq('id', editingNews.id);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Actualité modifiée avec succès"
        });
      } else {
        // Create new news
        const { error } = await supabase
          .from('news')
          .insert([newsData]);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Actualité créée avec succès"
        });
      }

      setIsFormOpen(false);
      setEditingNews(null);
      fetchNews();
    } catch (error) {
      console.error('Error saving news:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'actualité",
        variant: "destructive"
      });
    }
  };

  const handleDeleteNews = async (newsId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', newsId);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Actualité supprimée avec succès"
      });

      fetchNews();
    } catch (error) {
      console.error('Error deleting news:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'actualité",
        variant: "destructive"
      });
    }
  };

  const handleToggleVisibility = async (newsId: string, currentVisibility: boolean) => {
    try {
      const { error } = await supabase
        .from('news')
        .update({ is_visible: !currentVisibility })
        .eq('id', newsId);

      if (error) throw error;

      toast({
        title: "Succès",
        description: `Actualité ${!currentVisibility ? 'publiée' : 'masquée'} avec succès`
      });

      fetchNews();
    } catch (error) {
      console.error('Error toggling visibility:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier la visibilité",
        variant: "destructive"
      });
    }
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
                      onDelete={() => handleDeleteNews(item.id)}
                      onToggleVisibility={() => handleToggleVisibility(item.id, item.is_visible || false)}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <EditorSidebar />
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
                      onDelete={() => handleDeleteNews(item.id)}
                      onToggleVisibility={() => handleToggleVisibility(item.id, item.is_visible || false)}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <EditorSidebar />
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
        <EditorSidebar />
        
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
                      onDelete={() => handleDeleteNews(item.id)}
                      onToggleVisibility={() => handleToggleVisibility(item.id, item.is_visible || false)}
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

export default DashboardActualites;