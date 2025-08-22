import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import MediaFormDialog from '@/components/media/MediaFormDialog';
import MediaCard from '@/components/media/MediaCard';
import MediaEditDialog from '@/components/media/MediaEditDialog';
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
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Fetch media items from Supabase
  const fetchMediaItems = async () => {
    try {
      console.log('Fetching media items...');
      
      // Vérifier la session avant de faire la requête
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Session status:', !!session);
      
      const { data, error } = await supabase
        .from('media_items')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        // Si c'est une erreur de réseau ou de connectivité
        if (error.message === 'Load failed' || error.message.includes('network')) {
          toast({
            title: "Problème de connexion",
            description: "Vérifiez votre connexion internet et réessayez.",
            variant: "destructive"
          });
        } else {
          throw error;
        }
        setMediaItems([]);
        return;
      }

      console.log('Media items fetched successfully:', data);
      setMediaItems(data || []);
    } catch (error) {
      console.error('Error fetching media items:', error);
      toast({
        title: "Erreur de chargement",
        description: "Impossible de charger les médias. Réessayez plus tard.",
        variant: "destructive"
      });
      setMediaItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && isAdmin(user)) {
      fetchMediaItems();
    }
  }, [user]);

  if (!user || !isAdmin(user)) {
    return <div>Non autorisé</div>;
  }

  const handleSubmit = async (formData: any) => {
    console.log('Nouveau média:', formData);
    // Refresh the media list after successful submission
    await fetchMediaItems();
  };

  const handleEdit = (media: MediaItem) => {
    setEditingMedia(media);
    setIsEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditingMedia(null);
    setIsEditDialogOpen(false);
  };

  const handleEditUpdate = async () => {
    await fetchMediaItems();
    handleEditClose();
  };

  const handleDelete = async (id: string) => {
    // Confirmation avant suppression
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce média ? Cette action est irréversible.')) {
      return;
    }

    try {
      console.log('Attempting to delete media with id:', id);
      
      const { error } = await supabase
        .from('media_items')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase delete error:', error);
        throw error;
      }

      console.log('Media deleted successfully');
      
      toast({
        title: "Média supprimé",
        description: "Le média a été supprimé avec succès.",
      });

      await fetchMediaItems();
    } catch (error) {
      console.error('Error deleting media:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le média. Vérifiez vos permissions.",
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
              Gestion médiathèque
            </h1>
            <p className="text-gray-600 mt-2 text-sm">Gérer les photos et vidéos</p>
          </div>

          <div className="mb-6">
            <MediaFormDialog onSubmit={handleSubmit} />
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">Chargement des médias...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mediaItems.map((media) => (
                <MediaCard
                  key={media.id}
                  media={media}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
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
        
        <MediaEditDialog
          media={editingMedia}
          isOpen={isEditDialogOpen}
          onClose={handleEditClose}
          onUpdate={handleEditUpdate}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex min-h-screen">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Gestion médiathèque</h1>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaItems.map((media) => (
                <MediaCard
                  key={media.id}
                  media={media}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
              {mediaItems.length === 0 && (
                <div className="col-span-2 text-center py-8 text-gray-500">
                  Aucun média trouvé. Ajoutez votre premier média !
                </div>
              )}
            </div>
          )}
        </div>

        <MediaEditDialog
          media={editingMedia}
          isOpen={isEditDialogOpen}
          onClose={handleEditClose}
          onUpdate={handleEditUpdate}
        />
      </div>
    </Layout>
  );
};

export default DashboardMediatheque;
