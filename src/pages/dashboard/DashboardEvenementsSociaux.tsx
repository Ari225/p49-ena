import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Plus, Loader } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { isAdmin } from '@/utils/roleUtils';
import { supabase } from '@/integrations/supabase/client';
import { SocialEventCard } from '@/components/social-events/SocialEventCard';

interface SocialEvent {
  id: string;
  title: string;
  member_name: string;
  event_date: string;
  category: string;
  description?: string;
  image_url?: string;
}

const DashboardEvenementsSociaux = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [events, setEvents] = useState<SocialEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<SocialEvent | null>(null);
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    eventType: '',
    category: '',
    title: '',
    memberName: '',
    date: '',
    location: '',
    description: '',
    thought: '',
    image: null as File | null,
    yearsOfService: ''
  });

  if (!user || !isAdmin(user)) {
    return <div>Non autorisé</div>;
  }

  const eventTypes = [
    { value: 'Heureux', label: 'Heureux' },
    { value: 'Retraite', label: 'Retraite' },
    { value: 'Malheureux', label: 'Malheureux' }
  ];

  const eventCategories = {
    Heureux: [
      { value: 'naissance', label: 'Naissances' },
      { value: 'mariage', label: 'Mariages' },
      { value: 'promotion', label: 'Promotions' },
      { value: 'bapteme', label: 'Baptêmes' },
      { value: 'anniversaire', label: 'Anniversaires' },
      { value: 'autre_heureux', label: 'Autre événement heureux' }
    ],
    Retraite: [{ value: 'retraite', label: 'Retraite' }],
    Malheureux: [
      { value: 'deces', label: 'Décès' },
      { value: 'maladie', label: 'Maladie' },
      { value: 'accident', label: 'Accidents' }
    ]
  };

  // Charger les événements depuis la base de données
  const loadEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('social_events')
        .select('*')
        .order('event_date', { ascending: false });

      if (error) throw error;
      
      setEvents(data || []);
    } catch (error) {
      console.error('Error loading events:', error);
      toast.error('Erreur lors du chargement des événements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleEditEvent = (event: SocialEvent) => {
    setEditingEvent(event);
    setFormData({
      eventType: '', // Nous ne stockons pas le type dans la DB
      category: event.category,
      title: event.title,
      memberName: event.member_name,
      date: event.event_date,
      location: '',
      description: event.description || '',
      thought: '',
      image: null,
      yearsOfService: ''
    });
    setShowForm(true);
  };

  const handleDeleteEvent = (id: string) => {
    setDeleteEventId(id);
  };

  const confirmDeleteEvent = async () => {
    if (!deleteEventId) return;

    try {
      const { error } = await supabase
        .from('social_events')
        .delete()
        .eq('id', deleteEventId);

      if (error) throw error;

      toast.success('Événement supprimé avec succès');
      setDeleteEventId(null);
      loadEvents(); // Recharger la liste
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation - all fields required except location
    if (!formData.category || !formData.title || 
        !formData.memberName || !formData.date || !formData.description) {
      toast.error('Tous les champs sont obligatoires sauf le lieu');
      return;
    }

    try {
      // Parse date to ensure valid format
      const eventDate = new Date(formData.date.includes('/') ? 
        formData.date.split('/').reverse().join('-') : 
        formData.date);

      if (editingEvent) {
        // Mode édition
        const { error } = await supabase
          .from('social_events')
          .update({
            category: formData.category,
            title: formData.title,
            member_name: formData.memberName,
            event_date: eventDate.toISOString().split('T')[0],
            description: formData.description,
          })
          .eq('id', editingEvent.id);

        if (error) throw error;
        toast.success('Événement modifié avec succès');
      } else {
        // Mode création
        const { error } = await supabase
          .from('social_events')
          .insert({
            category: formData.category,
            title: formData.title,
            member_name: formData.memberName,
            event_date: eventDate.toISOString().split('T')[0],
            description: formData.description,
            created_by: user?.id
          });

        if (error) throw error;
        toast.success('Événement ajouté avec succès');
      }

      setShowForm(false);
      setEditingEvent(null);
      
      // Reset form
      setFormData({
        eventType: '',
        category: '',
        title: '',
        memberName: '',
        date: '',
        location: '',
        description: '',
        thought: '',
        image: null,
        yearsOfService: ''
      });

      // Recharger la liste
      loadEvents();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erreur lors de l\'opération');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setEditingEvent(null);
    setFormData({
      eventType: '',
      category: '',
      title: '',
      memberName: '',
      date: '',
      location: '',
      description: '',
      thought: '',
      image: null,
      yearsOfService: ''
    });
  };

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Gestion des Événements Sociaux</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer les événements sociaux des membres</p>
          </div>

          <div className="mb-4">
            <Dialog open={showForm} onOpenChange={(open) => {
              setShowForm(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvel événement
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95%] max-w-md max-h-[90vh] overflow-y-auto rounded-lg mx-auto">
                <DialogHeader>
                  <DialogTitle className="text-primary">
                    {editingEvent ? 'Modifier l\'événement' : 'Ajouter un événement'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Catégorie *</label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleSelectChange('category', value)} 
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="naissance">Naissances</SelectItem>
                        <SelectItem value="mariage">Mariages</SelectItem>
                        <SelectItem value="promotion">Promotions</SelectItem>
                        <SelectItem value="bapteme">Baptêmes</SelectItem>
                        <SelectItem value="anniversaire">Anniversaires</SelectItem>
                        <SelectItem value="autre_heureux">Autre événement heureux</SelectItem>
                        <SelectItem value="retraite">Retraite</SelectItem>
                        <SelectItem value="deces">Décès</SelectItem>
                        <SelectItem value="maladie">Maladie</SelectItem>
                        <SelectItem value="accident">Accidents</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Titre *</label>
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Titre de l'événement"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Concerné *</label>
                    <Input
                      name="memberName"
                      value={formData.memberName}
                      onChange={handleInputChange}
                      placeholder="Nom du membre"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Date *</label>
                    <Input
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description *</label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Description de l'événement"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Annuler
                    </Button>
                    <Button type="submit">
                      {editingEvent ? 'Modifier' : 'Ajouter'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <SocialEventCard
                  key={event.id}
                  event={event}
                  onEdit={handleEditEvent}
                  onDelete={handleDeleteEvent}
                />
              ))}
              {events.length === 0 && (
                <Card className="p-8 text-center">
                  <p className="text-gray-500">Aucun événement trouvé</p>
                </Card>
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
      <div className="flex">
        <AdminSidebar />

        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Gestion des Événements Sociaux</h1>
            <p className="text-gray-600 mt-2">Gérer les événements sociaux des membres</p>
          </div>

          <div className="mb-6">
            <Dialog open={showForm} onOpenChange={(open) => {
              setShowForm(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvel événement
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg mx-auto">
                <DialogHeader>
                  <DialogTitle className="text-primary text-xl">
                    {editingEvent ? 'Modifier l\'événement' : 'Ajouter un événement'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Catégorie *</label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleSelectChange('category', value)} 
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="naissance">Naissances</SelectItem>
                        <SelectItem value="mariage">Mariages</SelectItem>
                        <SelectItem value="promotion">Promotions</SelectItem>
                        <SelectItem value="bapteme">Baptêmes</SelectItem>
                        <SelectItem value="anniversaire">Anniversaires</SelectItem>
                        <SelectItem value="autre_heureux">Autre événement heureux</SelectItem>
                        <SelectItem value="retraite">Retraite</SelectItem>
                        <SelectItem value="deces">Décès</SelectItem>
                        <SelectItem value="maladie">Maladie</SelectItem>
                        <SelectItem value="accident">Accidents</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Titre *</label>
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Titre de l'événement"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Concerné *</label>
                    <Input
                      name="memberName"
                      value={formData.memberName}
                      onChange={handleInputChange}
                      placeholder="Nom du membre"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Date *</label>
                      <Input
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Lieu</label>
                      <Input
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Lieu de l'événement"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description *</label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Description de l'événement"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Annuler
                    </Button>
                    <Button type="submit">
                      {editingEvent ? 'Modifier' : 'Ajouter'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <SocialEventCard
                  key={event.id}
                  event={event}
                  onEdit={handleEditEvent}
                  onDelete={handleDeleteEvent}
                />
              ))}
              {events.length === 0 && (
                <Card className="p-8 text-center col-span-full">
                  <p className="text-gray-500">Aucun événement trouvé</p>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={!!deleteEventId} onOpenChange={() => setDeleteEventId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cet événement ? Cette action ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteEvent} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default DashboardEvenementsSociaux;