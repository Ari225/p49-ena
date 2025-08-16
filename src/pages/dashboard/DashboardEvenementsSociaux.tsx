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
import { Calendar, MapPin, Users, Plus, Edit, Trash2, Heart, PartyPopper, Frown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { isAdmin } from '@/utils/roleUtils';
import { supabase } from '@/integrations/supabase/client';

interface SocialEvent {
  id: string;
  eventType: string;
  category: string;
  title: string;
  memberName: string;
  date: string;
  location: string;
  description: string;
  thought: string;
  image: string;
  yearsOfService?: string;
}

const mockEvents: SocialEvent[] = [
  {
    id: '1',
    eventType: 'Heureux',
    category: 'Naissances',
    title: 'Naissance de bébé Marie',
    memberName: 'Famille Kouassi',
    date: '2024-01-15',
    location: 'Abidjan',
    description: 'Nous avons la joie d\'annoncer la naissance de Marie.',
    thought: 'Félicitations aux heureux parents !',
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=250&fit=crop"
  },
  {
    id: '2',
    eventType: 'Heureux',
    category: 'Promotions',
    title: 'Promotion au grade de Directeur',
    memberName: 'M. Yao Kouadio',
    date: '2024-02-10',
    location: 'Yamoussoukro',
    description: 'M. Yao Kouadio a été promu au grade de Directeur.',
    thought: 'Félicitations pour cette promotion bien méritée !',
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
  },
  {
    id: '3',
    eventType: 'Retraite',
    category: 'Retraite',
    title: 'Départ en retraite de M. Koffi',
    memberName: 'M. Jean Koffi',
    date: '2024-02-01',
    location: 'Bouaké',
    description: 'Après 35 années de service dévoué, M. Koffi prend sa retraite.',
    thought: 'Nous lui souhaitons une retraite heureuse et épanouie !',
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=250&fit=crop"
  },
  {
    id: '4',
    eventType: 'Malheureux',
    category: 'Décès',
    title: 'Décès de Mme Adjoua',
    memberName: 'Famille Adjoua',
    date: '2024-01-20',
    location: 'Daloa',
    description: 'C\'est avec tristesse que nous annonçons le décès de Mme Adjoua.',
    thought: 'Nos pensées accompagnent la famille en ces moments difficiles.',
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop"
  }
];

const DashboardEvenementsSociaux = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [events, setEvents] = useState<SocialEvent[]>(mockEvents);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<SocialEvent | null>(null);
  const [formData, setFormData] = useState({
    eventType: '',
    category: '',
    customCategory: '',
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
      { value: 'autre', label: 'Autre' }
    ],
    Retraite: [{ value: 'retraite', label: 'Retraite' }],
    Malheureux: [
      { value: 'deces', label: 'Décès' },
      { value: 'maladie', label: 'Maladie' },
      { value: 'accident', label: 'Accidents' },
      { value: 'autre', label: 'Autre' }
    ]
  };

  const handleFormSuccess = () => {
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const handleEditEvent = (event: SocialEvent) => {
    // TODO: Implement edit functionality
    console.log('Edit event:', event);
  };

  const handleDeleteEvent = (event: SocialEvent) => {
    // TODO: Implement delete functionality
    console.log('Delete event:', event);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation - all fields required except location
    if (!formData.eventType || !formData.category || !formData.title || 
        !formData.memberName || !formData.date || !formData.description || !formData.thought) {
      toast.error('Tous les champs sont obligatoires sauf le lieu');
      return;
    }

    // Validate custom category if "autre" is selected
    if (formData.category === 'autre' && !formData.customCategory) {
      toast.error('Veuillez préciser la catégorie personnalisée');
      return;
    }

    try {
      // Parse date to ensure valid format
      const eventDate = new Date(formData.date.includes('/') ? 
        formData.date.split('/').reverse().join('-') : 
        formData.date);

      let tableName = '';
      let insertData: any = {
        title: formData.title,
        member_name: formData.memberName,
        event_date: eventDate.toISOString().split('T')[0],
        description: formData.description,
        created_by: user?.id,
        category: formData.category === 'autre' ? formData.customCategory : formData.category,
        custom_category: formData.category === 'autre' ? formData.customCategory : null
      };

      // Determine table and additional fields based on event type
      if (formData.eventType === 'Heureux') {
        tableName = 'happy_events';
        insertData.message = formData.thought;
        insertData.location = formData.location;
      } else if (formData.eventType === 'Retraite') {
        tableName = 'retirement_departures';
        insertData.tribute_message = formData.thought;
        insertData.department = formData.location;
        if (formData.yearsOfService) {
          insertData.years_of_service = parseInt(formData.yearsOfService);
        }
        insertData.retirement_date = eventDate.toISOString().split('T')[0];
        insertData.position = 'Non spécifié';
      } else if (formData.eventType === 'Malheureux') {
        tableName = 'difficult_events';
        insertData.family_support_message = formData.thought;
      }

      let result;
      if (formData.eventType === 'Heureux') {
        result = await supabase
          .from('happy_events')
          .insert(insertData);
      } else if (formData.eventType === 'Retraite') {
        result = await supabase
          .from('retirement_departures')
          .insert(insertData);
      } else if (formData.eventType === 'Malheureux') {
        result = await supabase
          .from('difficult_events')
          .insert(insertData);
      }

      const { data, error } = result || { data: null, error: new Error('Type d\'événement non reconnu') };

      if (error) throw error;

      toast.success('Événement ajouté avec succès');
      setShowForm(false);
      
      // Reset form
      setFormData({
        eventType: '',
        category: '',
        customCategory: '',
        title: '',
        memberName: '',
        date: '',
        location: '',
        description: '',
        thought: '',
        image: null,
        yearsOfService: ''
      });

      // Refresh the events list
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erreur lors de l\'ajout de l\'événement');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
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
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvel événement
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95%] max-w-md max-h-[90vh] overflow-y-auto rounded-lg mx-auto">
                <DialogHeader>
                  <DialogTitle className="text-primary">Ajouter un événement</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Type d'événement *</label>
                    <Select onValueChange={(value) => handleSelectChange('eventType', value)} required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Catégorie *</label>
                    <Select onValueChange={(value) => handleSelectChange('category', value)} required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                         {formData.eventType && eventCategories[formData.eventType].map((category) => (
                           <SelectItem key={category.value} value={category.value}>
                             {category.label}
                           </SelectItem>
                         ))}
                      </SelectContent>
                     </Select>
                   </div>

                   {formData.category === 'autre' && (
                     <div>
                       <label className="block text-sm font-medium mb-2">Préciser la catégorie *</label>
                       <Input
                         name="customCategory"
                         value={formData.customCategory}
                         onChange={handleInputChange}
                         placeholder="Préciser la catégorie"
                         required
                       />
                     </div>
                   )}

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
                      value={formData.date}
                      onChange={handleInputChange}
                      placeholder="jj/mm/aaaa ou mm/aaaa ou aaaa"
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

                  <div>
                    <label className="block text-sm font-medium mb-2">Pensée *</label>
                    <Input
                      name="thought"
                      value={formData.thought}
                      onChange={handleInputChange}
                      placeholder="Pensée pour l'événement"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Image</label>
                    <Input
                      name="image"
                      type="file"
                      onChange={handleInputChange}
                    />
                  </div>

                  {formData.eventType === 'Retraite' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Années de service</label>
                      <Input
                        name="yearsOfService"
                        value={formData.yearsOfService}
                        onChange={handleInputChange}
                        placeholder="Nombre d'années de service"
                      />
                    </div>
                  )}

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" className="text-gray-600 hover:text-gray-700 border-gray-300 hover:border-gray-400" onClick={() => setShowForm(false)}>
                      Annuler
                    </Button>
                    <Button type="submit">
                      Ajouter
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {events.map((event) => (
              <Card key={event.id} className="border-l-4 border-blue-500 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{event.description}</p>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteEvent(event)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
            <h1 className="text-3xl font-bold text-primary">Gestion des Événements Sociaux</h1>
            <p className="text-gray-600 mt-2">Gérer les événements sociaux des membres</p>
          </div>

          <div className="mb-6">
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvel événement
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg mx-auto">
                <DialogHeader>
                  <DialogTitle className="text-primary text-xl">Ajouter un événement</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Type d'événement *</label>
                      <Select onValueChange={(value) => handleSelectChange('eventType', value)} required>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                        <SelectContent>
                          {eventTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Catégorie *</label>
                      <Select onValueChange={(value) => handleSelectChange('category', value)} required>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                           {formData.eventType && eventCategories[formData.eventType].map((category) => (
                             <SelectItem key={category.value} value={category.value}>
                               {category.label}
                             </SelectItem>
                           ))}
                        </SelectContent>
                      </Select>
                    </div>
                   </div>

                   {formData.category === 'autre' && (
                     <div>
                       <label className="block text-sm font-medium mb-2">Préciser la catégorie *</label>
                       <Input
                         name="customCategory"
                         value={formData.customCategory}
                         onChange={handleInputChange}
                         placeholder="Préciser la catégorie"
                         required
                       />
                     </div>
                   )}

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
                        value={formData.date}
                        onChange={handleInputChange}
                        placeholder="jj/mm/aaaa ou mm/aaaa ou aaaa"
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

                  <div>
                    <label className="block text-sm font-medium mb-2">Pensée *</label>
                    <Input
                      name="thought"
                      value={formData.thought}
                      onChange={handleInputChange}
                      placeholder="Pensée pour l'événement"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Image</label>
                    <Input
                      name="image"
                      type="file"
                      onChange={handleInputChange}
                    />
                  </div>

                  {formData.eventType === 'Retraite' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Années de service</label>
                      <Input
                        name="yearsOfService"
                        value={formData.yearsOfService}
                        onChange={handleInputChange}
                        placeholder="Nombre d'années de service"
                      />
                    </div>
                  )}

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" className="text-gray-600 hover:text-gray-700 border-gray-300 hover:border-gray-400" onClick={() => setShowForm(false)}>
                      Annuler
                    </Button>
                    <Button type="submit">
                      Ajouter
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="border-l-4 border-blue-500 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{event.description}</p>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteEvent(event)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardEvenementsSociaux;
