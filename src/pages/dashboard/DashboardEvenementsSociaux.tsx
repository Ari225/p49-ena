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
  const [events, setEvents] = useState<SocialEvent[]>([]);
  const [loading, setLoading] = useState(true);
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
    yearsOfService: '',
    position: ''
  });

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      setLoading(true);
      
      // Récupérer les événements heureux
      const { data: happyEvents, error: happyError } = await supabase
        .from('happy_events')
        .select('*')
        .order('created_at', { ascending: false });

      if (happyError) throw happyError;

      // Récupérer les événements de retraite
      const { data: retirementEvents, error: retirementError } = await supabase
        .from('retirement_departures')
        .select('*')
        .order('created_at', { ascending: false });

      if (retirementError) throw retirementError;

      // Récupérer les événements difficiles
      const { data: difficultEvents, error: difficultError } = await supabase
        .from('difficult_events')
        .select('*')
        .order('created_at', { ascending: false });

      if (difficultError) throw difficultError;

      // Transformer et combiner tous les événements
      const allEvents: SocialEvent[] = [
        ...(happyEvents || []).map(event => ({
          id: event.id,
          eventType: 'Heureux',
          category: event.category,
          title: event.title,
          memberName: event.member_name,
          date: event.event_date,
          location: event.location || '',
          description: event.description || '',
          thought: event.message || '',
          image: event.image_url || ''
        })),
        ...(retirementEvents || []).map(event => ({
          id: event.id,
          eventType: 'Retraite',
          category: event.category || 'retraite',
          title: `Départ en retraite de ${event.member_name}`,
          memberName: event.member_name,
          date: event.retirement_date,
          location: event.department || '',
          description: `Après ${event.years_of_service || 'plusieurs'} années de service${event.position ? ` en tant que ${event.position}` : ''}.`,
          thought: event.tribute_message || '',
          image: event.image_url || '',
          yearsOfService: event.years_of_service?.toString()
        })),
        ...(difficultEvents || []).map(event => ({
          id: event.id,
          eventType: 'Malheureux',
          category: event.category,
          title: event.title,
          memberName: event.member_name,
          date: event.event_date,
          location: '',
          description: event.description || '',
          thought: event.family_support_message || '',
          image: event.image_url || ''
        }))
      ];

      // Trier par date de création (plus récent en premier)
      allEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setEvents(allEvents);
    } catch (error) {
      console.error('Erreur lors de la récupération des événements:', error);
      toast.error('Erreur lors du chargement des événements');
    } finally {
      setLoading(false);
    }
  };

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
    setEditingEvent(event);
    
    // Extract position from description for retirement events
    let position = '';
    if (event.eventType === 'Retraite' && event.description.includes('en tant que ')) {
      const match = event.description.match(/en tant que (.+)\./);
      if (match) {
        position = match[1];
      }
    }
    
    setFormData({
      eventType: event.eventType,
      category: event.category,
      customCategory: event.category,
      title: event.title,
      memberName: event.memberName,
      date: event.date,
      location: event.location || '',
      description: event.description,
      thought: event.thought,
      image: null,
      yearsOfService: event.yearsOfService || '',
      position: position
    });
    setShowForm(true);
  };

  const handleDeleteEvent = async (event: SocialEvent) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      return;
    }

    try {
      let result;

      if (event.eventType === 'Heureux') {
        result = await supabase
          .from('happy_events')
          .delete()
          .eq('id', event.id);
      } else if (event.eventType === 'Retraite') {
        result = await supabase
          .from('retirement_departures')
          .delete()
          .eq('id', event.id);
      } else if (event.eventType === 'Malheureux') {
        result = await supabase
          .from('difficult_events')
          .delete()
          .eq('id', event.id);
      }

      const { error } = result || { error: new Error('Type d\'événement non reconnu') };

      if (error) throw error;

      toast.success('Événement supprimé avec succès');
      fetchAllEvents(); // Refresh the events list
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Erreur lors de la suppression de l\'événement');
    }
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

      let imageUrl = editingEvent?.image || null;

      // Upload image if provided
      if (formData.image) {
        const fileExt = formData.image.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('media-files')
          .upload(`events/${fileName}`, formData.image);

        if (uploadError) {
          throw new Error(`Erreur lors du téléchargement de l'image: ${uploadError.message}`);
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('media-files')
          .getPublicUrl(uploadData.path);
        
        imageUrl = urlData.publicUrl;
      }

      let result;
      const isEditing = editingEvent !== null;
      
      // Determine table and additional fields based on event type
      if (formData.eventType === 'Heureux') {
        const eventData = {
          title: formData.title,
          member_name: formData.memberName,
          event_date: eventDate.toISOString().split('T')[0],
          description: formData.description,
          message: formData.thought,
          location: formData.location,
          category: formData.category === 'autre' ? formData.customCategory : formData.category,
          custom_category: formData.category === 'autre' ? formData.customCategory : null,
          image_url: imageUrl,
          ...(isEditing ? {} : { created_by: user?.id })
        };
        
        if (isEditing) {
          result = await supabase
            .from('happy_events')
            .update(eventData)
            .eq('id', editingEvent.id);
        } else {
          result = await supabase
            .from('happy_events')
            .insert(eventData);
        }
          
      } else if (formData.eventType === 'Retraite') {
        const eventData: any = {
          member_name: formData.memberName,
          retirement_date: eventDate.toISOString().split('T')[0],
          tribute_message: formData.thought,
          department: formData.location,
          position: formData.position || 'Non spécifié',
          category: 'retraite',
          custom_category: null,
          image_url: imageUrl,
          ...(isEditing ? {} : { created_by: user?.id })
        };
        
        if (formData.yearsOfService) {
          eventData.years_of_service = parseInt(formData.yearsOfService);
        }
        
        if (isEditing) {
          result = await supabase
            .from('retirement_departures')
            .update(eventData)
            .eq('id', editingEvent.id);
        } else {
          result = await supabase
            .from('retirement_departures')
            .insert(eventData);
        }
          
      } else if (formData.eventType === 'Malheureux') {
        const eventData = {
          title: formData.title,
          member_name: formData.memberName,
          event_date: eventDate.toISOString().split('T')[0],
          description: formData.description,
          family_support_message: formData.thought,
          category: formData.category === 'autre' ? formData.customCategory : formData.category,
          custom_category: formData.category === 'autre' ? formData.customCategory : null,
          image_url: imageUrl,
          ...(isEditing ? {} : { created_by: user?.id })
        };
        
        if (isEditing) {
          result = await supabase
            .from('difficult_events')
            .update(eventData)
            .eq('id', editingEvent.id);
        } else {
          result = await supabase
            .from('difficult_events')
            .insert(eventData);
        }
      }

      const { data, error } = result || { data: null, error: new Error('Type d\'événement non reconnu') };

      if (error) throw error;

      toast.success(isEditing ? 'Événement modifié avec succès' : 'Événement ajouté avec succès');
      setShowForm(false);
      setEditingEvent(null);
      
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
        yearsOfService: '',
        position: ''
      });

      // Refresh the events list
      fetchAllEvents();
    } catch (error) {
      console.error('Error:', error);
      toast.error(editingEvent ? 'Erreur lors de la modification de l\'événement' : 'Erreur lors de l\'ajout de l\'événement');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0];
      setFormData(prev => ({ ...prev, [name]: file }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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
                  <DialogTitle className="text-primary">
                    {editingEvent ? 'Modifier l\'événement' : 'Ajouter un événement'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Type d'événement *</label>
                    <Select onValueChange={(value) => handleSelectChange('eventType', value)} value={formData.eventType} required>
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
                    <Select onValueChange={(value) => handleSelectChange('category', value)} value={formData.category} required>
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
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Années de service</label>
                        <Input
                          name="yearsOfService"
                        value={formData.yearsOfService}
                        onChange={handleInputChange}
                        placeholder="Nombre d'années de service"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Fonction</label>
                      <Input
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        placeholder="Fonction occupée"
                      />
                    </div>
                    </>
                  )}

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" className="text-gray-600 hover:text-gray-700 border-gray-300 hover:border-gray-400" onClick={() => {
                      setShowForm(false);
                      setEditingEvent(null);
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
                        yearsOfService: '',
                        position: ''
                      });
                    }}>
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
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-gray-600 mt-2">Chargement des événements...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Aucun événement enregistré</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => {
                const getCategoryIcon = (eventType: string, category: string) => {
                  if (eventType === 'Heureux') {
                    switch (category) {
                      case 'naissance': return Heart;
                      case 'mariage': return Heart;
                      case 'promotion': return Edit;
                      case 'bapteme': return Heart;
                      case 'anniversaire': return PartyPopper;
                      default: return PartyPopper;
                    }
                  } else if (eventType === 'Retraite') {
                    return Users;
                  } else {
                    switch (category) {
                      case 'deces': return Frown;
                      case 'maladie': return Frown;
                      case 'accident': return Frown;
                      default: return Frown;
                    }
                  }
                };

                const getCategoryColor = (eventType: string) => {
                  switch (eventType) {
                    case 'Heureux': return 'border-l-green-500 bg-green-50';
                    case 'Retraite': return 'border-l-blue-500 bg-blue-50';
                    case 'Malheureux': return 'border-l-gray-500 bg-gray-50';
                    default: return 'border-l-gray-500 bg-gray-50';
                  }
                };

                const IconComponent = getCategoryIcon(event.eventType, event.category);

                return (
                  <Card key={event.id} className={`overflow-hidden hover:shadow-xl transition-shadow duration-300 border-l-4 ${getCategoryColor(event.eventType)}`}>
                    {event.image && (
                      <div className="aspect-video overflow-hidden">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <IconComponent className="w-5 h-5 mr-2" />
                        {event.title}
                      </CardTitle>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {event.date}
                        </div>
                        {event.location && (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {event.location}
                          </div>
                        )}
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          {event.memberName}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-sm mb-3">{event.description}</p>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm"><strong>Type:</strong> {event.eventType}</p>
                        <p className="text-sm"><strong>Catégorie:</strong> {event.category}</p>
                        {event.yearsOfService && (
                          <p className="text-sm"><strong>Années de service:</strong> {event.yearsOfService}</p>
                        )}
                      </div>
                      {event.thought && (
                        <div className={`p-3 rounded-lg border-l-2 mb-4 ${
                          event.eventType === 'Heureux' ? 'bg-green-50 border-green-200' :
                          event.eventType === 'Retraite' ? 'bg-blue-50 border-blue-200' :
                          'bg-gray-50 border-gray-200'
                        }`}>
                          <p className={`text-sm italic ${
                            event.eventType === 'Heureux' ? 'text-green-800' :
                            event.eventType === 'Retraite' ? 'text-blue-800' :
                            'text-gray-800'
                          }`}>
                            <Heart className="h-3 w-3 inline mr-1" />
                            {event.thought}
                          </p>
                        </div>
                      )}
                      <div className="flex justify-end space-x-2">
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
                );
              })}
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
            <Dialog open={showForm} onOpenChange={setShowForm}>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Type d'événement *</label>
                      <Select onValueChange={(value) => handleSelectChange('eventType', value)} value={formData.eventType} required>
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
                      <Select onValueChange={(value) => handleSelectChange('category', value)} value={formData.category} required>
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
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Années de service</label>
                        <Input
                          name="yearsOfService"
                          value={formData.yearsOfService}
                          onChange={handleInputChange}
                          placeholder="Nombre d'années de service"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Fonction</label>
                        <Input
                          name="position"
                          value={formData.position}
                          onChange={handleInputChange}
                          placeholder="Fonction occupée"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" className="text-gray-600 hover:text-gray-700 border-gray-300 hover:border-gray-400" onClick={() => {
                      setShowForm(false);
                      setEditingEvent(null);
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
                        yearsOfService: '',
                        position: ''
                      });
                    }}>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => {
              const getCategoryIcon = (eventType: string, category: string) => {
                if (eventType === 'Heureux') {
                  switch (category) {
                    case 'naissance': return Heart;
                    case 'mariage': return Heart;
                    case 'promotion': return Edit;
                    case 'bapteme': return Heart;
                    case 'anniversaire': return PartyPopper;
                    default: return PartyPopper;
                  }
                } else if (eventType === 'Retraite') {
                  return Users;
                } else {
                  switch (category) {
                    case 'deces': return Frown;
                    case 'maladie': return Frown;
                    case 'accident': return Frown;
                    default: return Frown;
                  }
                }
              };

              const getCategoryColor = (eventType: string) => {
                switch (eventType) {
                  case 'Heureux': return 'border-l-green-500 bg-green-50';
                  case 'Retraite': return 'border-l-blue-500 bg-blue-50';
                  case 'Malheureux': return 'border-l-gray-500 bg-gray-50';
                  default: return 'border-l-gray-500 bg-gray-50';
                }
              };

              const IconComponent = getCategoryIcon(event.eventType, event.category);

              return (
                <Card key={event.id} className={`overflow-hidden hover:shadow-xl transition-shadow duration-300 border-l-4 ${getCategoryColor(event.eventType)}`}>
                  {event.image && (
                    <div className="aspect-video overflow-hidden">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <IconComponent className="w-5 h-5 mr-2" />
                      {event.title}
                    </CardTitle>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.date}
                      </div>
                      {event.location && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {event.location}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {event.memberName}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm mb-3">{event.description}</p>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm"><strong>Type:</strong> {event.eventType}</p>
                      <p className="text-sm"><strong>Catégorie:</strong> {event.category}</p>
                      {event.yearsOfService && (
                        <p className="text-sm"><strong>Années de service:</strong> {event.yearsOfService}</p>
                      )}
                    </div>
                    {event.thought && (
                      <div className={`p-3 rounded-lg border-l-2 mb-4 ${
                        event.eventType === 'Heureux' ? 'bg-green-50 border-green-200' :
                        event.eventType === 'Retraite' ? 'bg-blue-50 border-blue-200' :
                        'bg-gray-50 border-gray-200'
                      }`}>
                        <p className={`text-sm italic ${
                          event.eventType === 'Heureux' ? 'text-green-800' :
                          event.eventType === 'Retraite' ? 'text-blue-800' :
                          'text-gray-800'
                        }`}>
                          <Heart className="h-3 w-3 inline mr-1" />
                          {event.thought}
                        </p>
                      </div>
                    )}
                    <div className="flex justify-end space-x-2">
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
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardEvenementsSociaux;
