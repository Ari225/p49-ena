import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Calendar, Eye, MessageSquare } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import CommuniqueFormDialog from '@/components/communiques/CommuniqueFormDialog';
import CommuniqueDetailPopup from '@/components/communiques/CommuniqueDetailPopup';
import CommuniqueDeleteConfirm from '@/components/communiques/CommuniqueDeleteConfirm';
import { useToast } from '@/hooks/use-toast';
import { isAdmin } from '@/utils/roleUtils';
import { supabase } from '@/integrations/supabase/client';

interface CommuniqueItem {
  id: string;
  title: string;
  description: string;
  urgency: 'normal' | 'urgent' | 'important';
  published_date: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

const DashboardCommuniques = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedCommunique, setSelectedCommunique] = useState<CommuniqueItem | null>(null);
  const [editingCommunique, setEditingCommunique] = useState<CommuniqueItem | null>(null);
  const [communiques, setCommuniques] = useState<CommuniqueItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les communiqués depuis la base de données
  const loadCommuniques = async () => {
    try {
      const { data, error } = await supabase
        .from('communiques')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCommuniques((data || []) as CommuniqueItem[]);
    } catch (error) {
      console.error('Erreur lors du chargement des communiqués:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les communiqués.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && isAdmin(user)) {
      loadCommuniques();
    }
  }, [user]);

  if (!user || !isAdmin(user)) {
    return <div>Non autorisé</div>;
  }

  const handleSubmit = async (formData: any) => {
    try {
      if (formData.id) {
        // Modification
        const updateData: any = {
          title: formData.title,
          description: formData.description,
          urgency: formData.urgency,
          published_date: formData.published_date
        };

        if (formData.image) {
          // Upload de la nouvelle image
          const fileExt = formData.image.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `communiques/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('media-files')
            .upload(filePath, formData.image);

          if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage
              .from('media-files')
              .getPublicUrl(filePath);
            updateData.image_url = publicUrl;
          }
        }

        const { error } = await supabase
          .from('communiques')
          .update(updateData)
          .eq('id', formData.id);

        if (error) throw error;

        toast({
          title: "Communiqué modifié",
          description: "Le communiqué a été modifié avec succès.",
        });
      } else {
        // Ajout
        const insertData: any = {
          title: formData.title,
          description: formData.description,
          urgency: formData.urgency,
          published_date: formData.published_date,
          created_by: user?.id
        };

        if (formData.image) {
          // Upload de l'image
          const fileExt = formData.image.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `communiques/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('media-files')
            .upload(filePath, formData.image);

          if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage
              .from('media-files')
              .getPublicUrl(filePath);
            insertData.image_url = publicUrl;
          }
        }

        const { error } = await supabase
          .from('communiques')
          .insert([insertData]);

        if (error) throw error;

        toast({
          title: "Communiqué publié",
          description: "Le communiqué a été publié avec succès.",
        });
      }
      
      // Recharger les données
      await loadCommuniques();
      setShowForm(false);
      setEditingCommunique(null);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (communique: CommuniqueItem) => {
    setEditingCommunique(communique);
    setShowForm(true);
  };

  const handleDelete = (communique: CommuniqueItem) => {
    setSelectedCommunique(communique);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (selectedCommunique) {
      try {
        const { error } = await supabase
          .from('communiques')
          .delete()
          .eq('id', selectedCommunique.id);

        if (error) throw error;

        toast({
          title: "Communiqué supprimé",
          description: "Le communiqué a été supprimé avec succès.",
        });

        // Recharger les données
        await loadCommuniques();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la suppression.",
          variant: "destructive"
        });
      }
    }
    setShowDeleteConfirm(false);
    setSelectedCommunique(null);
  };

  const handleViewDetail = (communique: CommuniqueItem) => {
    setSelectedCommunique(communique);
    setShowDetail(true);
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
      case 'important':
        return <Badge className="bg-orange-100 text-orange-800">Important</Badge>;
      default:
        return <Badge className="bg-green-100 text-green-800">Non urgent</Badge>;
    }
  };

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">
              Gestion des communiqués
            </h1>
            <p className="text-gray-600 mt-2 text-sm">Créer et gérer les communiqués</p>
          </div>

          <div className="mb-4">
            <Button 
              onClick={() => setShowForm(true)} 
              className="bg-primary hover:bg-primary/90 w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouveau communiqué
            </Button>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-primary flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Liste des communiqués ({communiques.length})
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-8">Chargement...</div>
          ) : (
            <div className="grid gap-6">
              {communiques.map((communique) => (
              <Card key={communique.id} className="overflow-hidden">
                {communique.image_url && (
                  <div className="h-48">
                    <img 
                      src={communique.image_url} 
                      alt={communique.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    {getUrgencyBadge(communique.urgency)}
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(communique.published_date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <CardTitle className="text-base font-semibold mb-2">
                    {communique.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-600 mb-4">
                    {communique.description}
                  </p>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewDetail(communique)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEdit(communique)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600"
                      onClick={() => handleDelete(communique)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              ))}
            </div>
          )}
        </div>
        <AdminSidebar />
        
        <CommuniqueFormDialog
          isOpen={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingCommunique(null);
          }}
          onSubmit={handleSubmit}
          editingCommunique={editingCommunique}
        />

        <CommuniqueDetailPopup
          communique={selectedCommunique}
          isOpen={showDetail}
          onClose={() => {
            setShowDetail(false);
            setSelectedCommunique(null);
          }}
        />

        <CommuniqueDeleteConfirm
          isOpen={showDeleteConfirm}
          onClose={() => {
            setShowDeleteConfirm(false);
            setSelectedCommunique(null);
          }}
          onConfirm={confirmDelete}
          communiqueTitle={selectedCommunique?.title || ''}
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
            <h1 className="text-3xl font-bold text-primary">Gestion des communiqués</h1>
            <p className="text-gray-600 mt-2">Gérer les communiqués du site</p>
          </div>

          <div className="mb-6">
            <Button 
              onClick={() => setShowForm(true)} 
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouveau communiqué
            </Button>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-primary flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Liste des communiqués ({communiques.length})
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-8">Chargement...</div>
          ) : (
            <div className={isTablet ? "space-y-4" : "grid grid-cols-1 lg:grid-cols-2 gap-6"}>
              {communiques.map((communique) => (
              <Card key={communique.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                {communique.image_url && (
                  <div className="h-48 flex-shrink-0">
                    <img 
                      src={communique.image_url} 
                      alt={communique.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center justify-between mb-2">
                    {getUrgencyBadge(communique.urgency)}
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(communique.published_date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <CardTitle className={isTablet ? "text-lg font-semibold mb-2" : "text-xl font-semibold mb-2"}>
                    {communique.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className={isTablet ? "text-sm text-gray-600 mb-4" : "text-base text-gray-600 mb-4"}>
                    {communique.description}
                  </p>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewDetail(communique)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Voir
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEdit(communique)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Modifier
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600"
                      onClick={() => handleDelete(communique)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Supprimer
                    </Button>
                  </div>
                </CardContent>
              </Card>
              ))}
            </div>
          )}
        </div>

        <CommuniqueFormDialog
          isOpen={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingCommunique(null);
          }}
          onSubmit={handleSubmit}
          editingCommunique={editingCommunique}
        />

        <CommuniqueDetailPopup
          communique={selectedCommunique}
          isOpen={showDetail}
          onClose={() => {
            setShowDetail(false);
            setSelectedCommunique(null);
          }}
        />

        <CommuniqueDeleteConfirm
          isOpen={showDeleteConfirm}
          onClose={() => {
            setShowDeleteConfirm(false);
            setSelectedCommunique(null);
          }}
          onConfirm={confirmDelete}
          communiqueTitle={selectedCommunique?.title || ''}
        />
      </div>
    </Layout>
  );
};

export default DashboardCommuniques;
