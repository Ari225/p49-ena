
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PartyPopper, Plus, Edit, Trash2, Calendar, MapPin, Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardEvenementsSociaux = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    participants: '',
    description: '',
    category: ''
  });

  const mockEvents = [
    {
      id: '1',
      title: 'Gala annuel de la P49',
      date: '2024-05-15',
      time: '19:00',
      location: 'Hôtel Ivoire, Abidjan',
      participants: '200+',
      description: 'Soirée de gala annuelle réunissant tous les membres de la P49.',
      category: 'Gala'
    },
    {
      id: '2',
      title: 'Tournoi de golf inter-promotions',
      date: '2024-04-20',
      time: '08:00',
      location: 'Golf Club d\'Abidjan',
      participants: '50',
      description: 'Compétition sportive amicale entre les promotions.',
      category: 'Sport'
    }
  ];

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nouvel événement social:', formData);
    setShowForm(false);
    setFormData({ title: '', date: '', time: '', location: '', participants: '', description: '', category: '' });
  };

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Gestion Événements<br />Sociaux</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer les événements sociaux</p>
          </div>

          <div className="mb-4">
            <Button 
              onClick={() => setShowForm(!showForm)} 
              className="bg-primary hover:bg-primary/90 w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              {showForm ? 'Annuler' : 'Nouvel événement'}
            </Button>
          </div>

          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Ajouter un événement social</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Titre de l'événement"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    required
                  />
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
                  <select
                    className="w-full p-2 border rounded-md"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Catégorie</option>
                    <option value="Gala">Gala</option>
                    <option value="Sport">Sport</option>
                    <option value="Networking">Networking</option>
                    <option value="Culturel">Culturel</option>
                    <option value="Caritatif">Caritatif</option>
                  </select>
                  <Textarea
                    placeholder="Description de l'événement"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                  <Button type="submit" className="w-full">Publier</Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {mockEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <PartyPopper className="w-5 h-5 mr-2" />
                    {event.title}
                  </CardTitle>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(event.date).toLocaleDateString('fr-FR')} à {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {event.participants} participants
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{event.description}</p>
                  <p className="text-sm mb-4"><strong>Catégorie:</strong> {event.category}</p>
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
            <h1 className="text-3xl font-bold text-primary">Gestion Événements Sociaux</h1>
            <p className="text-gray-600 mt-2">Gérer les événements sociaux et activités conviviales</p>
          </div>

          <div className="mb-6">
            <Button 
              onClick={() => setShowForm(!showForm)} 
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              {showForm ? 'Annuler' : 'Nouvel événement social'}
            </Button>
          </div>

          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Ajouter un événement social</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Titre de l'événement"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    required
                  />
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
                  <select
                    className="p-2 border rounded-md"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Catégorie</option>
                    <option value="Gala">Gala</option>
                    <option value="Sport">Sport</option>
                    <option value="Networking">Networking</option>
                    <option value="Culturel">Culturel</option>
                    <option value="Caritatif">Caritatif</option>
                  </select>
                  <div className="md:col-span-2">
                    <Textarea
                      placeholder="Description de l'événement"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Button type="submit">Publier l'événement</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PartyPopper className="w-5 h-5 mr-2" />
                    {event.title}
                  </CardTitle>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(event.date).toLocaleDateString('fr-FR')} à {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {event.participants} participants
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{event.description}</p>
                  <p className="text-sm mb-4"><strong>Catégorie:</strong> {event.category}</p>
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

export default DashboardEvenementsSociaux;
