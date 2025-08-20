
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Loader2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import PopupForm from '@/components/popups/PopupForm';
import PopupCard from '@/components/popups/PopupCard';
import PopupEditDialog from '@/components/popups/PopupEditDialog';
import { getTypeBadge, getAudienceBadge } from '@/utils/popupUtils';
import { PopupFormData, PopupItem } from '@/types/popup';
import { isAdmin } from '@/utils/roleUtils';
import { usePopups } from '@/hooks/usePopups';
import { useImageUpload } from '@/hooks/useImageUpload';

const DashboardPopups = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [showForm, setShowForm] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingPopup, setEditingPopup] = useState<PopupItem | null>(null);
  const { popups, loading, createPopup, updatePopup, togglePopupStatus, deletePopup } = usePopups();
  const { uploadImage, uploading } = useImageUpload();

  if (!user || !isAdmin(user)) {
    return <div>Non autorisé</div>;
  }

  const handleFormSubmit = async (formData: PopupFormData, imagePreview: string | null) => {
    let imageUrl = null;
    
    if (imagePreview && imagePreview.startsWith('data:')) {
      // Convert base64 to file and upload
      try {
        const response = await fetch(imagePreview);
        const blob = await response.blob();
        const file = new File([blob], 'popup-image.jpg', { type: 'image/jpeg' });
        imageUrl = await uploadImage(file);
      } catch (error) {
        console.error('Error processing image:', error);
      }
    }

    const newPopup = await createPopup(formData, imageUrl || undefined);
    if (newPopup) {
      setShowForm(false);
    }
  };

  const togglePopupStatusHandler = (id: string) => {
    togglePopupStatus(id);
  };

  const editPopupHandler = (popup: PopupItem) => {
    setEditingPopup(popup);
    setShowEditDialog(true);
  };

  const handleEditSubmit = async (id: string, formData: PopupFormData, imageUrl?: string) => {
    await updatePopup(id, formData, imageUrl);
    setShowEditDialog(false);
    setEditingPopup(null);
  };

  const deletePopupHandler = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce pop-up ?')) {
      deletePopup(id);
    }
  };

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Gestion des<br />Pop-ups</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer les pop-ups du site</p>
          </div>

          <div className="mb-4">
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 w-full" disabled={uploading || loading}>
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Upload en cours...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Nouveau pop-up
                    </>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95%] max-w-md max-h-[90vh] overflow-y-auto rounded-lg mx-auto">
                <DialogHeader>
                  <DialogTitle>Ajouter un pop-up</DialogTitle>
                </DialogHeader>
                <PopupForm onSubmit={handleFormSubmit} isMobile={true} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Chargement des pop-ups...</span>
              </div>
            ) : popups.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Aucun pop-up créé pour le moment
              </div>
            ) : (
              popups.map((popup) => (
                <PopupCard
                  key={popup.id}
                  popup={popup}
                  onToggleStatus={togglePopupStatusHandler}
                  onEdit={editPopupHandler}
                  onDelete={deletePopupHandler}
                  isMobile={true}
                  getTypeBadge={getTypeBadge}
                  getAudienceBadge={getAudienceBadge}
                />
              ))
            )}
          </div>

          <PopupEditDialog
            isOpen={showEditDialog}
            onClose={() => {
              setShowEditDialog(false);
              setEditingPopup(null);
            }}
            popup={editingPopup}
            onUpdate={handleEditSubmit}
          />
        </div>
        <AdminSidebar />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Gestion des Pop-ups</h1>
            <p className="text-gray-600 mt-2">Gérer les pop-ups du site</p>
          </div>

          <div className="mb-6">
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90" disabled={uploading || loading}>
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Upload en cours...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Nouveau pop-up
                    </>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg mx-auto">
                <DialogHeader>
                  <DialogTitle>Ajouter un pop-up</DialogTitle>
                </DialogHeader>
                <PopupForm onSubmit={handleFormSubmit} isMobile={false} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Chargement des pop-ups...</span>
              </div>
            ) : popups.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-500">
                Aucun pop-up créé pour le moment
              </div>
            ) : (
              popups.map((popup) => (
                <PopupCard
                  key={popup.id}
                  popup={popup}
                  onToggleStatus={togglePopupStatusHandler}
                  onEdit={editPopupHandler}
                  onDelete={deletePopupHandler}
                  isMobile={false}
                  getTypeBadge={getTypeBadge}
                  getAudienceBadge={getAudienceBadge}
                />
              ))
            )}
          </div>

          <PopupEditDialog
            isOpen={showEditDialog}
            onClose={() => {
              setShowEditDialog(false);
              setEditingPopup(null);
            }}
            popup={editingPopup}
            onUpdate={handleEditSubmit}
          />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPopups;
