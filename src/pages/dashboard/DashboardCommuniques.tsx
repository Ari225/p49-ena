
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import CommuniqueFormDialog from '@/components/communiques/CommuniqueFormDialog';
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
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
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
    console.log('Nouveau communiqué:', formData);
    
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

  const getCardStyles = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          textTitle: 'text-red-800',
          textDesc: 'text-red-600'
        };
      case 'important':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          textTitle: 'text-orange-800',
          textDesc: 'text-orange-600'
        };
      default:
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          textTitle: 'text-green-800',
          textDesc: 'text-green-600'
        };
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

          <div className="space-y-4">
            {communiques.map((communique) => {
              const styles = getCardStyles(communique.urgency);
              
              return (
                <Card key={communique.id} className={`overflow-hidden ${styles.bg} ${styles.border}`}>
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
                    <CardTitle className={`text-base font-semibold mb-2 ${styles.textTitle}`}>
                      {communique.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-xs mb-4 ${styles.textDesc}`}>
                      {communique.description}
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        <AdminSidebar />
        <CommuniqueFormDialog
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communiques.map((communique) => {
              const styles = getCardStyles(communique.urgency);
              
              return (
                <Card key={communique.id} className={`overflow-hidden h-full flex flex-col ${styles.bg} ${styles.border}`}>
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
                    <CardTitle className={`text-xl font-semibold mb-2 ${styles.textTitle}`}>
                      {communique.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <p className={`text-base mb-4 ${styles.textDesc}`}>
                      {communique.description}
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <CommuniqueFormDialog
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
        />
      </div>
    </Layout>
  );
};

export default DashboardCommuniques;
