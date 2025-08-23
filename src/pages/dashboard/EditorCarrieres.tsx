import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import EditorSidebar from '@/components/EditorSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, Plus, Edit, Trash2, MapPin, Calendar, Loader2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect } from 'react';

interface JobOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements?: string;
  salary: string;
  posted_date: string;
}

const EditorCarrieres = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
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

  const mockOffers: JobOffer[] = [
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
    },
    {
      id: '3',
      title: 'Chargé de Communication',
      company: 'Ministère de l\'Information',
      location: 'Abidjan',
      type: 'CDD',
      description: 'Gestion de la communication institutionnelle et des relations publiques.',
      salary: '800 000 FCFA',
      posted_date: '2024-03-15'
    }
  ];

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Simulation du chargement
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nouvelle offre:', formData);
    setShowForm(false);
    setFormData({ title: '', company: '', location: '', type: '', description: '', requirements: '', salary: '' });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen">
        {!isMobile && <EditorSidebar />}
        <div className={`flex-1 ${!isMobile ? 'ml-64' : ''}`}>
          <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  const renderForm = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Ajouter une offre d'emploi</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <option value="Consultation">Consultation</option>
            </select>
          </div>
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
            placeholder="Salaire (ex: 1 200 000 FCFA ou À négocier)"
            value={formData.salary}
            onChange={(e) => setFormData({...formData, salary: e.target.value})}
            required
          />
          <div className="flex space-x-2">
            <Button type="submit">Publier l'offre</Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
              Annuler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  const renderJobCard = (offer: JobOffer) => (
    <Card key={offer.id}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Briefcase className="w-5 h-5 mr-2" />
          {offer.title}
        </CardTitle>
        <div className="space-y-1">
          <p className="font-medium text-primary">{offer.company}</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            {offer.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(offer.posted_date).toLocaleDateString('fr-FR')}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-3">{offer.description}</p>
        <div className="space-y-2 mb-4">
          <p className="text-sm"><strong>Type:</strong> {offer.type}</p>
          <p className="text-sm"><strong>Salaire:</strong> {offer.salary}</p>
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <Edit className="h-4 w-4 mr-1" />
            Modifier
          </Button>
          <Button size="sm" variant="destructive">
            <Trash2 className="h-4 w-4 mr-1" />
            Supprimer
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const mainContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Carrières+</h1>
          <p className="text-muted-foreground">
            Gérer les offres d'emploi et opportunités de carrière
          </p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          {showForm ? 'Annuler' : 'Nouvelle offre'}
        </Button>
      </div>

      {showForm && renderForm()}

      <div className="flex items-center">
        <h2 className="text-xl font-semibold flex items-center">
          <Briefcase className="mr-2 h-5 w-5" />
          Offres d'emploi ({mockOffers.length})
        </h2>
      </div>

      {mockOffers.length === 0 ? (
        <div className="text-center py-12">
          <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Aucune offre d'emploi</h3>
          <p className="text-muted-foreground">
            Aucune offre d'emploi n'a été publiée pour le moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockOffers.map(renderJobCard)}
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 pb-20">
          {mainContent}
        </div>
        <EditorSidebar />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <EditorSidebar />
      <main className="flex-1 ml-64">
        <div className="container mx-auto px-6 py-8">
          {mainContent}
        </div>
      </main>
    </div>
  );
};

export default EditorCarrieres;