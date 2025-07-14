import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import MediaFormDialog from '@/components/media/MediaFormDialog';
import MediaCard from '@/components/media/MediaCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { isAdmin } from '@/utils/roleUtils';

interface MediaItem {
  id: string;
  title: string;
  category: string;
  description: string;
  media_urls: string[];
  date: string;
  created_at: string;
}

const DashboardMediatheque = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch media items from Supabase
  const fetchMediaItems = async () => {
    try {
      const { data, error } = await supabase
        .from('media_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMediaItems(data || []);
    } catch (error) {
      console.error('Error fetching media items:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les médias.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMediaItems();
  }, []);

  if (!user || !isAdmin(user)) {
    return <div>Non autorisé</div>;
  }

  const handleSubmit = async (formData: any) => {
    console.log('Nouveau média:', formData);
    // Refresh the media list after successful submission
    await fetchMediaItems();
  };

  const handleEdit = (media: MediaItem) => {
    console.log('Modifier média:', media);
    // TODO: Implement edit logic
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('media_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Média supprimé",
        description: "Le média a été supprimé avec succès.",
      });

      await fetchMediaItems();
    } catch (error) {
      console.error('Error deleting media:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le média.",
        variant: "destructive"
      });
    }
  };

  if (isMobile) {
    return (
      <Layout>
        <div className="px-4 py-6 pb-20 min-h-screen">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary leading-tight">
              Gestion de la<br />Médiathèque
            </h1>
            <p className="text-gray-600 mt-2 text-sm">Gérer les contenus multimédias</p>
          </div>

          <div className="mb-6">
            <MediaFormDialog onSubmit={handleSubmit} />
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">Chargement des médias...</div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {mediaItems.map((media) => (
                <div key={media.id} className="min-w-0">
                  <MediaCard
                    media={media}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
              {mediaItems.length === 0 && (
                <div className="col-span-2 text-center py-8 text-gray-500">
                  Aucun média trouvé. Ajoutez votre premier média !
                </div>
              )}
            </div>
          )}
        </div>
        <AdminSidebar />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex min-h-screen">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Gestion de la Médiathèque</h1>
            <p className="text-gray-600 mt-2">Gérer les contenus multimédias (images et vidéos)</p>
          </div>

          <div className="mb-6">
            <MediaFormDialog onSubmit={handleSubmit} />
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">Chargement des médias...</div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              {mediaItems.map((media) => (
                <div key={media.id} className="min-w-0">
                  <MediaCard
                    media={media}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
              {mediaItems.length === 0 && (
                <div className="col-span-2 text-center py-8 text-gray-500">
                  Aucun média trouvé. Ajoutez votre premier média !
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardMediatheque;
