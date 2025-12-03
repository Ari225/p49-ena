import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Loader2, Activity } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import ActivityForm from '@/components/activities/ActivityForm';
import ActivityEditForm from '@/components/activities/ActivityEditForm';
import ActivityCard from '@/components/activities/ActivityCard';
import { Activity as ActivityType } from '@/types/activity';
import { isAdmin } from '@/utils/roleUtils';
import { useActivities } from '@/hooks/useActivities';

const DashboardActivites = () => {
  const { user, session } = useAuth();
  const isMobile = useIsMobile();
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null);
  const { activities, loading, error, refetch, deleteActivity } = useActivities();

  if (!user || !isAdmin(user)) {
    return <div>Non autorisé</div>;
  }

  const handleFormSuccess = () => {
    setShowForm(false);
    refetch(); // Refresh activities after successful creation
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const handleEditFormSuccess = () => {
    setShowEditForm(false);
    setSelectedActivity(null);
    refetch(); // Refresh activities after successful edit
  };

  const handleEditFormCancel = () => {
    setShowEditForm(false);
    setSelectedActivity(null);
  };

  const handleEditActivity = (activity: ActivityType) => {
    console.log('Edit function called');
    console.log('Current user:', user);
    console.log('Current session:', session);
    console.log('Setting selected activity:', activity.id);
    setSelectedActivity(activity);
    setShowEditForm(true);
    console.log('Edit form should open now');
  };

  const handleDeleteActivity = async (activity: ActivityType) => {
    console.log('Delete function called');
    console.log('Current user:', user);
    console.log('Current session:', session);
    
    if (confirm('Êtes-vous sûr de vouloir supprimer cette activité ?')) {
      try {
        console.log('Attempting to delete activity:', activity.id);
        await deleteActivity(activity.id);
        console.log('Delete successful');
      } catch (error) {
        console.error('Error deleting activity:', error);
      }
    }
  };

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Gestion des activités</h1>
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
              <DialogContent className="w-[95%] max-w-md max-h-[90vh] overflow-y-auto rounded-lg mx-auto p-4">
                <DialogHeader>
                  <DialogTitle className="text-primary">Ajouter une activité</DialogTitle>
                </DialogHeader>
                <ActivityForm 
                  onSuccess={handleFormSuccess}
                  onCancel={handleFormCancel}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Dialog pour modification */}
          <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
            <DialogContent className="w-[95%] max-w-md max-h-[90vh] overflow-y-auto rounded-lg mx-auto p-4">
              <DialogHeader>
                <DialogTitle className="text-primary">Modifier l'activité</DialogTitle>
              </DialogHeader>
              {selectedActivity && (
                <ActivityEditForm
                  activity={selectedActivity}
                  onSuccess={handleEditFormSuccess}
                  onCancel={handleEditFormCancel}
                />
              )}
            </DialogContent>
          </Dialog>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Liste des activités ({activities.length})
            </h2>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Chargement des activités...</span>
              </div>
            ) : activities.length > 0 ? (
              activities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onEdit={handleEditActivity}
                  onDelete={handleDeleteActivity}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Aucune activité enregistrée
              </div>
            )}
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
            <h1 className="text-3xl font-bold text-primary">Gestion des activités</h1>
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
              <DialogContent className="w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg mx-auto p-6">
                <DialogHeader>
                  <DialogTitle className="text-primary text-xl">Ajouter une activité</DialogTitle>
                </DialogHeader>
                <ActivityForm 
                  onSuccess={handleFormSuccess}
                  onCancel={handleFormCancel}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Dialog pour modification */}
          <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
            <DialogContent className="w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg mx-auto p-6">
              <DialogHeader>
                <DialogTitle className="text-primary text-xl">Modifier l'activité</DialogTitle>
              </DialogHeader>
              {selectedActivity && (
                <ActivityEditForm
                  activity={selectedActivity}
                  onSuccess={handleEditFormSuccess}
                  onCancel={handleEditFormCancel}
                />
              )}
            </DialogContent>
          </Dialog>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Liste des activités ({activities.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Chargement des activités...</span>
              </div>
            ) : activities.length > 0 ? (
              activities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onEdit={handleEditActivity}
                  onDelete={handleDeleteActivity}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                Aucune activité enregistrée
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardActivites;
