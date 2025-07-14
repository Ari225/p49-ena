
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Plus, Edit, Trash2, Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { isAdmin } from '@/utils/roleUtils';

const DashboardEchoRegions = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    chef_lieu: '',
    representant: '',
    membres: '',
    derniere_activite: ''
  });

  const mockRegions = [
    {
      id: '1',
      name: 'Région du Centre',
      chef_lieu: 'Yamoussoukro',
      representant: 'Dr. Kouakou Marie',
      membres: 120,
      derniere_activite: 'Formation sur la gouvernance locale - Mars 2024'
    },
    {
      id: '2',
      name: 'Région de l\'Ouest',
      chef_lieu: 'Man',
      representant: 'M. Traoré Seydou',
      membres: 85,
      derniere_activite: 'Assemblée régionale - Février 2024'
    }
  ];

  if (!user || !isAdmin(user)) {
    return <div>Non autorisé</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nouvelle région:', formData);
    setShowForm(false);
    setFormData({ name: '', chef_lieu: '', representant: '', membres: '', derniere_activite: '' });
  };

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Gestion Écho<br />des Régions</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer les informations régionales</p>
          </div>

          <div className="mb-4">
            <Button 
              onClick={() => setShowForm(!showForm)} 
              className="bg-primary hover:bg-primary/90 w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              {showForm ? 'Annuler' : 'Nouvelle région'}
            </Button>
          </div>

          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Ajouter une région</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Nom de la région"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Chef-lieu"
                    value={formData.chef_lieu}
                    onChange={(e) => setFormData({...formData, chef_lieu: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Représentant"
                    value={formData.representant}
                    onChange={(e) => setFormData({...formData, representant: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Nombre de membres"
                    type="number"
                    value={formData.membres}
                    onChange={(e) => setFormData({...formData, membres: e.target.value})}
                    required
                  />
                  <Textarea
                    placeholder="Dernière activité"
                    value={formData.derniere_activite}
                    onChange={(e) => setFormData({...formData, derniere_activite: e.target.value})}
                    required
                  />
                  <Button type="submit" className="w-full">Ajouter</Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {mockRegions.map((region) => (
              <Card key={region.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    {region.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{region.chef_lieu}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <p><strong>Représentant:</strong> {region.representant}</p>
                    <p className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <strong>Membres:</strong> {region.membres}
                    </p>
                    <p><strong>Dernière activité:</strong> {region.derniere_activite}</p>
                  </div>
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
            <h1 className="text-3xl font-bold text-primary">Gestion Écho des Régions</h1>
            <p className="text-gray-600 mt-2">Gérer les informations régionales</p>
          </div>

          <div className="mb-6">
            <Button 
              onClick={() => setShowForm(!showForm)} 
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              {showForm ? 'Annuler' : 'Nouvelle région'}
            </Button>
          </div>

          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Ajouter une région</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Nom de la région"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Chef-lieu"
                    value={formData.chef_lieu}
                    onChange={(e) => setFormData({...formData, chef_lieu: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Représentant"
                    value={formData.representant}
                    onChange={(e) => setFormData({...formData, representant: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Nombre de membres"
                    type="number"
                    value={formData.membres}
                    onChange={(e) => setFormData({...formData, membres: e.target.value})}
                    required
                  />
                  <Textarea
                    placeholder="Dernière activité"
                    value={formData.derniere_activite}
                    onChange={(e) => setFormData({...formData, derniere_activite: e.target.value})}
                    required
                  />
                  <Button type="submit">Ajouter la région</Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockRegions.map((region) => (
              <Card key={region.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    {region.name}
                  </CardTitle>
                  <p className="text-gray-600">{region.chef_lieu}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <p><strong>Représentant:</strong> {region.representant}</p>
                    <p className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <strong>Membres:</strong> {region.membres}
                    </p>
                    <p><strong>Dernière activité:</strong> {region.derniere_activite}</p>
                  </div>
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

export default DashboardEchoRegions;
