import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Activity, Plus, Edit, Trash2, Calendar, MapPin, Users, Upload, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const DashboardActivites = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    type: '',
    date: '',
    time: '',
    location: '',
    participants: '',
    description: ''
  });

  const mockActivities = [
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Upload image if selected
      let imageUrl = null;
      if (selectedImage) {
        const fileExt = selectedImage.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        
        // Note: You'll need to set up Supabase Storage for this to work
        // For now, we'll just use a placeholder
        imageUrl = `placeholder-${fileName}`;
      }

      // Insert activity into database
      const { data, error } = await supabase
        .from('activities')
        .insert({
          title: formData.title,
          category: formData.category,
          type: formData.category === 'Autre activité' ? formData.type : null,
          date: formData.date,
          time: formData.time,
          location: formData.location,
          participants: formData.participants,
          description: formData.description,
          image_url: imageUrl,
          created_by: user.id
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Activité créée !",
        description: "L'activité a été ajoutée avec succès.",
      });

      // Reset form
      setFormData({
        title: '',
        category: '',
        type: '',
        date: '',
        time: '',
        location: '',
        participants: '',
        description: ''
      });
      setSelectedImage(null);
      setImagePreview(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating activity:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer l'activité.",
        variant: "destructive"
      });
    }
  };

  const categoryOptions = [
    'Les Régionales',
    'Assemblées Générales', 
    'Réunions de constitution',
    'Autre activité'
  ];

  const typeOptions = [
    'Formation',
    'Séminaire',
    'Atelier',
    'Conférence',
    'Assemblée',
    'Table Ronde'
  ];

  const ActivityForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Titre de l'activité"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        required
      />
      
      <select
        className="w-full p-2 border rounded-md"
        value={formData.category}
        onChange={(e) => setFormData({...formData, category: e.target.value, type: ''})}
        required
      >
        <option value="">Catégorie</option>
        {categoryOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

      {formData.category === 'Autre activité' && (
        <select
          className="w-full p-2 border rounded-md"
          value={formData.type}
          onChange={(e) => setFormData({...formData, type: e.target.value})}
          required
        >
          <option value="">Type d'activité</option>
          {typeOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          required
        />
        <Input
          placeholder="Heure (ex: 09:00 - 17:00)"
          value={formData.time}
          onChange={(e) => setFormData({...formData, time: e.target.value})}
          required
        />
      </div>

      <Input
        placeholder="Lieu"
        value={formData.location}
        onChange={(e) => setFormData({...formData, location: e.target.value})}
        required
      />

      <Input
        placeholder="Nombre de participants"
        value={formData.participants}
        onChange={(e) => setFormData({...formData, participants: e.target.value})}
        required
      />

      <Textarea
        placeholder="Description de l'activité"
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        required
      />

      {/* Upload d'image */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Image de l'activité</label>
        {!imagePreview ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-2">
              <label htmlFor="image-upload" className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Cliquez pour téléverser une image
                </span>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Aperçu"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1">Publier l'activité</Button>
        <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
          Annuler
        </Button>
      </div>
    </form>
  );

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
                <ActivityForm />
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {mockActivities.map((activity) => (
              <Card key={activity.id}>
                {activity.image && (
                  <div className="w-full h-48 overflow-hidden rounded-t-lg">
                    <img 
                      src={activity.image} 
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    {activity.title}
                  </CardTitle>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-primary">{activity.category}</p>
                    {activity.type && (
                      <p className="text-sm text-gray-600">{activity.type}</p>
                    )}
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(activity.date).toLocaleDateString('fr-FR')} - {activity.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {activity.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {activity.participants}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{activity.description}</p>
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
                <ActivityForm />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockActivities.map((activity) => (
              <Card key={activity.id}>
                {activity.image && (
                  <div className="w-full h-48 overflow-hidden rounded-t-lg">
                    <img 
                      src={activity.image} 
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    {activity.title}
                  </CardTitle>
                  <div className="space-y-1">
                    <p className="font-medium text-primary">{activity.category}</p>
                    {activity.type && (
                      <p className="text-gray-600">{activity.type}</p>
                    )}
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(activity.date).toLocaleDateString('fr-FR')} - {activity.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {activity.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {activity.participants}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{activity.description}</p>
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
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardActivites;
