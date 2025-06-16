
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Activity, Plus, Edit, Trash2, Calendar, MapPin, Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardActivites = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    date: '',
    location: '',
    organizer: '',
    description: '',
    participants: ''
  });

  const mockActivities = [
    {
      id: '1',
      title: 'Formation en Leadership',
      type: 'Formation',
      date: '2024-04-15',
      location: 'ENA Abidjan',
      organizer: 'Commission Formation',
      description: 'Formation intensive sur les techniques de leadership moderne.',
      participants: '30'
    },
    {
      id: '2',
      title: 'Séminaire sur la Digitalisation',
      type: 'Séminaire',
      date: '2024-04-25',
      location: 'Centre de Conférences',
      organizer: 'Commission Modernisation',
      description: 'Exploration des outils numériques pour l\'administration.',
      participants: '50'
    }
  ];

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nouvelle activité:', formData);
    setShowForm(false);
    setFormData({ title: '', type: '', date: '', location: '', organizer: '', description: '', participants: '' });
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
            <Button 
              onClick={() => setShowForm(!showForm)} 
              className="bg-primary hover:bg-primary/90 w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              {showForm ? 'Annuler' : 'Nouvelle activité'}
            </Button>
          </div>

          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Ajouter une activité</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Titre de l'activité"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                  <select
                    className="w-full p-2 border rounded-md"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    required
                  >
                    <option value="">Type d'activité</option>
                    <option value="Formation">Formation</option>
                    <option value="Séminaire">Séminaire</option>
                    <option value="Atelier">Atelier</option>
                    <option value="Conférence">Conférence</option>
                    <option value="Table Ronde">Table Ronde</option>
                  </select>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Lieu"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Organisateur"
                    value={formData.organizer}
                    onChange={(e) => setFormData({...formData, organizer: e.target.value})}
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
                  <Button type="submit" className="w-full">Publier</Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {mockActivities.map((activity) => (
              <Card key={activity.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    {activity.title}
                  </CardTitle>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-primary">{activity.type}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(activity.date).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {activity.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {activity.participants} participants
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{activity.description}</p>
                  <p className="text-sm mb-4"><strong>Organisateur:</strong> {activity.organizer}</p>
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
            <Button 
              onClick={() => setShowForm(!showForm)} 
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              {showForm ? 'Annuler' : 'Nouvelle activité'}
            </Button>
          </div>

          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Ajouter une activité</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Titre de l'activité"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                  <select
                    className="p-2 border rounded-md"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    required
                  >
                    <option value="">Type d'activité</option>
                    <option value="Formation">Formation</option>
                    <option value="Séminaire">Séminaire</option>
                    <option value="Atelier">Atelier</option>
                    <option value="Conférence">Conférence</option>
                    <option value="Table Ronde">Table Ronde</option>
                  </select>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Lieu"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Organisateur"
                    value={formData.organizer}
                    onChange={(e) => setFormData({...formData, organizer: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Nombre de participants"
                    value={formData.participants}
                    onChange={(e) => setFormData({...formData, participants: e.target.value})}
                    required
                  />
                  <div className="md:col-span-2">
                    <Textarea
                      placeholder="Description de l'activité"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Button type="submit">Publier l'activité</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockActivities.map((activity) => (
              <Card key={activity.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    {activity.title}
                  </CardTitle>
                  <div className="space-y-1">
                    <p className="font-medium text-primary">{activity.type}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(activity.date).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {activity.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {activity.participants} participants
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{activity.description}</p>
                  <p className="text-sm mb-4"><strong>Organisateur:</strong> {activity.organizer}</p>
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
