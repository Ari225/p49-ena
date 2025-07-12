
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Calendar, Eye } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import CommuniqueFormDialog from '@/components/communiques/CommuniqueFormDialog';
import CommuniqueDetailPopup from '@/components/communiques/CommuniqueDetailPopup';
import CommuniqueDeleteConfirm from '@/components/communiques/CommuniqueDeleteConfirm';
import { useToast } from '@/hooks/use-toast';

interface CommuniqueItem {
  id: string;
  title: string;
  description: string;
  type: string;
  urgency: 'normal' | 'urgent' | 'important';
  published_date: string;
  image_url?: string;
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
  const [communiques, setCommuniques] = useState<CommuniqueItem[]>([
    {
      id: '1',
      title: 'Communiqué urgent',
      description: 'Report de l\'événement prévu le 25 mars 2024.',
      type: 'Communiqué urgent',
      urgency: 'urgent',
      published_date: '2024-03-20',
      image_url: '/lovable-uploads/cdf92e8b-3396-4192-b8a1-f94647a7b289.jpg'
    },
    {
      id: '2',
      title: 'Nouvelle inscription',
      description: 'Ouverture des inscriptions pour la formation de mars.',
      type: 'Information',
      urgency: 'normal',
      published_date: '2024-03-15',
      image_url: '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg'
    }
  ]);

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  const handleSubmit = (formData: any) => {
    console.log('Données du communiqué:', formData);
    
    if (formData.id) {
      // Modification
      setCommuniques(prev => prev.map(c => 
        c.id === formData.id 
          ? {
              ...c,
              title: formData.title,
              description: formData.description,
              urgency: formData.urgency,
              type: formData.urgency === 'urgent' ? 'Communiqué urgent' : 
                    formData.urgency === 'important' ? 'Information importante' : 'Information',
              image_url: formData.image ? URL.createObjectURL(formData.image) : c.image_url
            }
          : c
      ));
      
      toast({
        title: "Communiqué modifié",
        description: "Le communiqué a été modifié avec succès.",
      });
    } else {
      // Ajout
      const newCommunique: CommuniqueItem = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        type: formData.urgency === 'urgent' ? 'Communiqué urgent' : 
              formData.urgency === 'important' ? 'Information importante' : 'Information',
        urgency: formData.urgency,
        published_date: formData.published_date,
        image_url: formData.image ? URL.createObjectURL(formData.image) : undefined
      };

      setCommuniques(prev => [newCommunique, ...prev]);
      
      toast({
        title: "Communiqué publié",
        description: "Le communiqué a été publié avec succès.",
      });
    }
    
    setEditingCommunique(null);
  };

  const handleEdit = (communique: CommuniqueItem) => {
    setEditingCommunique(communique);
    setShowForm(true);
  };

  const handleDelete = (communique: CommuniqueItem) => {
    setSelectedCommunique(communique);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedCommunique) {
      setCommuniques(prev => prev.filter(c => c.id !== selectedCommunique.id));
      toast({
        title: "Communiqué supprimé",
        description: "Le communiqué a été supprimé avec succès.",
      });
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
            <h1 className="text-2xl font-bold text-primary">Gestion des<br />Communiqués</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer les communiqués du site</p>
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
            <h1 className="text-3xl font-bold text-primary">Gestion des Communiqués</h1>
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

          {/* Version Desktop : Grille 2 colonnes, Version Tablet : 1 communiqué par ligne */}
          <div className={isTablet ? "space-y-4" : "grid grid-cols-1 lg:grid-cols-2 gap-6"}>
            {communiques.map((communique) => (
              <Card key={communique.id} className="overflow-hidden">
                <div className={isTablet ? "flex" : ""}>
                  {communique.image_url && (
                    <div className={isTablet ? "w-32 h-24 flex-shrink-0" : "h-48"}>
                      <img 
                        src={communique.image_url} 
                        alt={communique.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className={isTablet ? "flex-1 flex flex-col min-w-0" : ""}>
                    <CardHeader className={isTablet ? "flex-shrink-0 pb-2" : ""}>
                      <div className="flex items-center justify-between mb-2">
                        {getUrgencyBadge(communique.urgency)}
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(communique.published_date).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                      <CardTitle className={isTablet ? "text-lg font-semibold mb-1 truncate" : "text-xl font-semibold mb-2"}>
                        {communique.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className={isTablet ? "flex-grow flex flex-col justify-between pt-0" : ""}>
                      <p className={isTablet ? "text-sm text-gray-600 mb-3 line-clamp-2" : "text-base text-gray-600 mb-4"}>
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
                  </div>
                </div>
              </Card>
            ))}
          </div>
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
