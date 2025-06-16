
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardCommuniques = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    urgency: 'normal'
  });

  const mockCommuniques = [
    {
      id: '1',
      title: 'Communiqué urgent',
      description: 'Report de l\'événement prévu le 25 mars 2024.',
      type: 'Communiqué urgent',
      urgency: 'urgent',
      published_date: '2024-03-20'
    },
    {
      id: '2',
      title: 'Nouvelle inscription',
      description: 'Ouverture des inscriptions pour la formation de mars.',
      type: 'Information',
      urgency: 'normal',
      published_date: '2024-03-15'
    }
  ];

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nouveau communiqué:', formData);
    setShowForm(false);
    setFormData({ title: '', description: '', type: '', urgency: 'normal' });
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
      case 'important':
        return <Badge className="bg-orange-100 text-orange-800">Important</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
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
              onClick={() => setShowForm(!showForm)} 
              className="bg-primary hover:bg-primary/90 w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              {showForm ? 'Annuler' : 'Nouveau communiqué'}
            </Button>
          </div>

          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Ajouter un communiqué</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Titre du communiqué"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                  <Textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Type de communiqué"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    required
                  />
                  <select
                    className="w-full p-2 border rounded-md"
                    value={formData.urgency}
                    onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                  >
                    <option value="normal">Normal</option>
                    <option value="important">Important</option>
                    <option value="urgent">Urgent</option>
                  </select>
                  <Button type="submit" className="w-full">Publier</Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {mockCommuniques.map((communique) => (
              <Card key={communique.id}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    {getUrgencyBadge(communique.urgency)}
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(communique.published_date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{communique.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{communique.description}</p>
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
            <h1 className="text-3xl font-bold text-primary">Gestion des Communiqués</h1>
            <p className="text-gray-600 mt-2">Gérer les communiqués du site</p>
          </div>

          <div className="mb-6">
            <Button 
              onClick={() => setShowForm(!showForm)} 
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              {showForm ? 'Annuler' : 'Nouveau communiqué'}
            </Button>
          </div>

          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Ajouter un communiqué</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Titre du communiqué"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                  <Textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Type de communiqué"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    required
                  />
                  <select
                    className="w-full p-2 border rounded-md"
                    value={formData.urgency}
                    onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                  >
                    <option value="normal">Normal</option>
                    <option value="important">Important</option>
                    <option value="urgent">Urgent</option>
                  </select>
                  <Button type="submit">Publier le communiqué</Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCommuniques.map((communique) => (
              <Card key={communique.id}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    {getUrgencyBadge(communique.urgency)}
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(communique.published_date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{communique.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{communique.description}</p>
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

export default DashboardCommuniques;
