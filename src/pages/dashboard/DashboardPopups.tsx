
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';
import PopupForm from '@/components/popups/PopupForm';
import PopupCard from '@/components/popups/PopupCard';
import { getTypeBadge, getPriorityBadge, getAudienceBadge } from '@/utils/popupUtils';
import { PopupItem, PopupFormData } from '@/types/popup';

const DashboardPopups = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [showForm, setShowForm] = useState(false);
  const [popups, setPopups] = useState<PopupItem[]>([
    {
      id: '1',
      title: 'Message de bienvenue de la Présidente',
      message: 'Bienvenue sur le site du Réseau P49 ENA. Nous sommes ravis de vous accueillir...',
      type: 'welcome',
      isActive: true,
      created_date: '2024-03-20',
      display_duration: 10,
      priority: 'high',
      target_audience: 'all',
      auto_close: false
    }
  ]);

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  const handleFormSubmit = (formData: PopupFormData, imagePreview: string | null) => {
    const newPopup: PopupItem = {
      id: Date.now().toString(),
      title: formData.title,
      message: formData.message,
      type: formData.type,
      isActive: false,
      created_date: new Date().toISOString().split('T')[0],
      image_url: imagePreview || undefined,
      display_duration: formData.display_duration,
      priority: formData.priority,
      target_audience: formData.target_audience,
      auto_close: formData.auto_close
    };

    setPopups([...popups, newPopup]);
    setShowForm(false);
    
    toast({
      title: "Pop-up créé",
      description: "Le pop-up a été ajouté avec succès"
    });
  };

  const togglePopupStatus = (id: string) => {
    setPopups(popups.map(popup => 
      popup.id === id ? { ...popup, isActive: !popup.isActive } : popup
    ));
  };

  const deletePopup = (id: string) => {
    setPopups(popups.filter(popup => popup.id !== id));
    toast({
      title: "Pop-up supprimé",
      description: "Le pop-up a été supprimé avec succès"
    });
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
                <Button className="bg-primary hover:bg-primary/90 w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau pop-up
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95%] max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Ajouter un pop-up</DialogTitle>
                </DialogHeader>
                <PopupForm onSubmit={handleFormSubmit} isMobile={true} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {popups.map((popup) => (
              <PopupCard
                key={popup.id}
                popup={popup}
                onToggleStatus={togglePopupStatus}
                onDelete={deletePopup}
                isMobile={true}
                getTypeBadge={getTypeBadge}
                getPriorityBadge={getPriorityBadge}
                getAudienceBadge={getAudienceBadge}
              />
            ))}
          </div>
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
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau pop-up
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Ajouter un pop-up</DialogTitle>
                </DialogHeader>
                <PopupForm onSubmit={handleFormSubmit} isMobile={false} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popups.map((popup) => (
              <PopupCard
                key={popup.id}
                popup={popup}
                onToggleStatus={togglePopupStatus}
                onDelete={deletePopup}
                isMobile={false}
                getTypeBadge={getTypeBadge}
                getPriorityBadge={getPriorityBadge}
                getAudienceBadge={getAudienceBadge}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPopups;
