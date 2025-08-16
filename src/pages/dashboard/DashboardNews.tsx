import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import AdminSidebar from '@/components/AdminSidebar';
import EditorSidebar from '@/components/EditorSidebar';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import NewsFormDialog from '@/components/news/NewsFormDialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  created_at: string;
  updated_at: string;
}

const DashboardNews = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);

  // Vérifier les permissions
  const canManageNews = user?.role === 'admin_principal' || user?.role === 'admin_secondaire' || user?.role === 'redacteur';

  useEffect(() => {
    if (canManageNews) {
      fetchNews();
    }
  }, [canManageNews]);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_date', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des actualités:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les actualités",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
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

  const handleFormSubmit = async (formData: any) => {
    try {
      let imageUrl = formData.image ? null : editingNews?.image_url;

      // Upload image if provided
      if (formData.image) {
        const fileExt = formData.image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('media-files')
          .upload(fileName, formData.image);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from('media-files')
          .getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }

      const newsData = {
        title: formData.title,
        summary: formData.summary,
        details: formData.details,
        category: formData.category,
        reading_time: formData.reading_time,
        published_date: formData.published_date,
        image_url: imageUrl,
        created_by: user?.id,
        is_visible: editingNews?.is_visible ?? true
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
          description: "Actualité ajoutée avec succès"
        });
      }

      setIsFormOpen(false);
      fetchNews();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'actualité",
        variant: "destructive"
      });
    }
  };

  const handleDeleteNews = async (newsId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) return;

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
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'actualité",
        variant: "destructive"
      });
    }
  };

  const handleToggleVisibility = async (newsItem: NewsItem) => {
    try {
      const { error } = await supabase
        .from('news')
        .update({ is_visible: !newsItem.is_visible })
        .eq('id', newsItem.id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: `Actualité ${newsItem.is_visible ? 'masquée' : 'affichée'} avec succès`
      });
      fetchNews();
    } catch (error) {
      console.error('Erreur lors de la modification de la visibilité:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier la visibilité",
        variant: "destructive"
      });
    }
  };

  if (!canManageNews) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Accès refusé</h1>
          <p className="text-gray-600 mt-2">Vous n'avez pas les permissions pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="text-gray-600 mt-4">Chargement des actualités...</p>
        </div>
      </div>
    );
  }

  const NewsCard = ({ item }: { item: NewsItem }) => (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {new Date(item.published_date).toLocaleDateString('fr-FR')}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Badge variant={item.is_visible ? "default" : "secondary"}>
              {item.is_visible ? "Visible" : "Masqué"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {item.image_url && (
          <img 
            src={item.image_url} 
            alt={item.title}
            className="w-full h-32 object-cover rounded-md mb-3"
          />
        )}
        <Badge variant="outline" className="mb-2">
          {item.category}
        </Badge>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {item.summary}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span>{item.reading_time} min de lecture</span>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => handleToggleVisibility(item)}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            {item.is_visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {item.is_visible ? 'Masquer' : 'Afficher'}
          </Button>
          <Button
            onClick={() => handleEditNews(item)}
            variant="outline"
            size="sm"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => handleDeleteNews(item.id)}
            variant="destructive"
            size="sm"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Actualités</h1>
            <Button onClick={handleAddNews} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </div>
          <div className="space-y-4">
            {news.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
        <NewsFormDialog
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          editingNews={editingNews}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {user?.role === 'admin_principal' || user?.role === 'admin_secondaire' ? (
          <AdminSidebar />
        ) : (
          <EditorSidebar />
        )}
        <div className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Gestion des Actualités</h1>
            <Button onClick={handleAddNews}>
              <Plus className="h-5 w-5 mr-2" />
              Nouvelle Actualité
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>

          {news.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune actualité
              </h3>
              <p className="text-gray-600 mb-4">
                Commencez par ajouter votre première actualité.
              </p>
              <Button onClick={handleAddNews}>
                <Plus className="h-5 w-5 mr-2" />
                Ajouter une actualité
              </Button>
            </div>
          )}
        </div>
      </div>

      <NewsFormDialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        editingNews={editingNews}
      />
    </div>
  );
};

export default DashboardNews;