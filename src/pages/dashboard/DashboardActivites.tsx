
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import ActivityForm from '@/components/activities/ActivityForm';
import ActivityCard from '@/components/activities/ActivityCard';
import { Activity } from '@/types/activity';

const DashboardActivites = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [showForm, setShowForm] = useState(false);

  const mockActivities: Activity[] = [
    {
      id: '1',
      title: 'Formation en Leadership Public',
      category: 'Autre activité',
      type: 'Formation',
      date: '2024-04-15',
      time: '09:00 - 17:00',
      location: 'ENA Abidjan',
      participants: '25 places disponibles',
      description: 'Formation intensive sur les techniques de leadership dans l\'administration publique moderne.',
      status: 'À venir',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop'
    },
    {
      id: '2',
      title: 'Conférence sur la Digitalisation',
      category: 'Autre activité',
      type: 'Conférence',
      date: '2024-04-25',
      time: '14:00 - 18:00',
      location: 'Hôtel Ivoire',
      participants: '100 participants',
      description: 'Conférence sur les enjeux de la transformation numérique dans les services publics.',
      status: 'À venir',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop'
    }
  ];

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  const handleFormSuccess = () => {
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const handleEditActivity = (activity: Activity) => {
    // TODO: Implement edit functionality
    console.log('Edit activity:', activity);
  };

  const handleDeleteActivity = (activity: Activity) => {
    // TODO: Implement delete functionality
    console.log('Delete activity:', activity);
  };

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Gestion des<br />Activités</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer les activités de formation</p>
          </div>

          <div className="mb-4">
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvelle activité
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Ajouter une activité</DialogTitle>
                </DialogHeader>
                <ActivityForm 
                  onSuccess={handleFormSuccess}
                  onCancel={handleFormCancel}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {mockActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onEdit={handleEditActivity}
                onDelete={handleDeleteActivity}
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
            <h1 className="text-3xl font-bold text-primary">Gestion des Activités</h1>
            <p className="text-gray-600 mt-2">Gérer les activités de formation et de développement</p>
          </div>

          <div className="mb-6">
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvelle activité
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Ajouter une activité</DialogTitle>
                </DialogHeader>
                <ActivityForm 
                  onSuccess={handleFormSuccess}
                  onCancel={handleFormCancel}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onEdit={handleEditActivity}
                onDelete={handleDeleteActivity}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardActivites;
