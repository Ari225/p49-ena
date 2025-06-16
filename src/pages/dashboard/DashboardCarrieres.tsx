
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, Plus, Edit, Trash2, MapPin, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardCarrieres = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    description: '',
    requirements: '',
    salary: ''
  });

  const mockOffers = [
    {
      id: '1',
      title: 'Directeur des Ressources Humaines',
      company: 'Ministère de la Fonction Publique',
      location: 'Abidjan',
      type: 'CDI',
      description: 'Poste de direction pour la gestion des ressources humaines.',
      salary: 'À négocier',
      posted_date: '2024-03-20'
    },
    {
      id: '2',
      title: 'Conseiller en Politiques Publiques',
      company: 'Cabinet du Premier Ministre',
      location: 'Yamoussoukro',
      type: 'CDD',
      description: 'Analyse et élaboration de politiques publiques.',
      salary: '1 500 000 FCFA',
      posted_date: '2024-03-18'
    }
  ];

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nouvelle offre:', formData);
    setShowForm(false);
    setFormData({ title: '', company: '', location: '', type: '', description: '', requirements: '', salary: '' });
  };

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Gestion<br />Carrières+</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer les offres d'emploi</p>
          </div>

          <div className="mb-4">
            <Button 
              onClick={() => setShowForm(!showForm)} 
              className="bg-primary hover:bg-primary/90 w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              {showForm ? 'Annuler' : 'Nouvelle offre'}
            </Button>
          </div>

          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Ajouter une offre d'emploi</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Titre du poste"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Entreprise/Organisation"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Localisation"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                  <select
                    className="w-full p-2 border rounded-md"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    required
                  >
                    <option value="">Type de contrat</option>
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="Stage">Stage</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                  <Textarea
                    placeholder="Description du poste"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                  <Textarea
                    placeholder="Exigences et qualifications"
                    value={formData.requirements}
                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  />
                  <Input
                    placeholder="Salaire"
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                  />
                  <Button type="submit" className="w-full">Publier</Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {mockOffers.map((offer) => (
              <Card key={offer.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    {offer.title}
                  </CardTitle>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-primary">{offer.company}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {offer.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(offer.posted_date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{offer.description}</p>
                  <p className="text-sm"><strong>Type:</strong> {offer.type}</p>
                  <p className="text-sm mb-4"><strong>Salaire:</strong> {offer.salary}</p>
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
            <h1 className="text-3xl font-bold text-primary">Gestion Carrières+</h1>
            <p className="text-gray-600 mt-2">Gérer les offres d'emploi et opportunités de carrière</p>
          </div>

          <div className="mb-6">
            <Button 
              onClick={() => setShowForm(!showForm)} 
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              {showForm ? 'Annuler' : 'Nouvelle offre d\'emploi'}
            </Button>
          </div>

          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Ajouter une offre d'emploi</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Titre du poste"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Entreprise/Organisation"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Localisation"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                  <select
                    className="p-2 border rounded-md"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    required
                  >
                    <option value="">Type de contrat</option>
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="Stage">Stage</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                  <div className="md:col-span-2">
                    <Textarea
                      placeholder="Description du poste"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Textarea
                      placeholder="Exigences et qualifications"
                      value={formData.requirements}
                      onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                    />
                  </div>
                  <Input
                    placeholder="Salaire"
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                  />
                  <div className="md:col-span-2">
                    <Button type="submit">Publier l'offre</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockOffers.map((offer) => (
              <Card key={offer.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    {offer.title}
                  </CardTitle>
                  <div className="space-y-1">
                    <p className="font-medium text-primary">{offer.company}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {offer.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(offer.posted_date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{offer.description}</p>
                  <p className="text-sm"><strong>Type:</strong> {offer.type}</p>
                  <p className="text-sm mb-4"><strong>Salaire:</strong> {offer.salary}</p>
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

export default DashboardCarrieres;
