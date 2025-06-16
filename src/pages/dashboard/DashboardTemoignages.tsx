
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star, Plus, Edit, Trash2, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardTemoignages = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    content: '',
    rating: '5'
  });

  const mockTestimonials = [
    {
      id: '1',
      name: 'Dr. Kouakou Marie',
      position: 'Directrice Générale, Ministère de l\'Éducation',
      content: 'La P49 m\'a permis de développer un réseau professionnel solide et de bénéficier d\'opportunités de formation continue.',
      rating: 5,
      date: '2024-03-15'
    },
    {
      id: '2',
      name: 'M. Traoré Seydou',
      position: 'Préfet de Région',
      content: 'Grâce au réseau P49, j\'ai pu échanger avec d\'autres collègues sur les meilleures pratiques administratives.',
      rating: 5,
      date: '2024-03-10'
    }
  ];

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nouveau témoignage:', formData);
    setShowForm(false);
    setFormData({ name: '', position: '', content: '', rating: '5' });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Gestion des<br />Témoignages</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer les témoignages des membres</p>
          </div>

          <div className="mb-4">
            <Button 
              onClick={() => setShowForm(!showForm)} 
              className="bg-primary hover:bg-primary/90 w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              {showForm ? 'Annuler' : 'Nouveau témoignage'}
            </Button>
          </div>

          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Ajouter un témoignage</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Nom complet"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Poste/Fonction"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    required
                  />
                  <Textarea
                    placeholder="Témoignage"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    required
                  />
                  <select
                    className="w-full p-2 border rounded-md"
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: e.target.value})}
                  >
                    <option value="5">5 étoiles</option>
                    <option value="4">4 étoiles</option>
                    <option value="3">3 étoiles</option>
                    <option value="2">2 étoiles</option>
                    <option value="1">1 étoile</option>
                  </select>
                  <Button type="submit" className="w-full">Publier</Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {mockTestimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <User className="w-8 h-8 text-primary bg-primary/10 rounded-full p-1 mr-3" />
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <p className="text-sm text-gray-600">{testimonial.position}</p>
                      </div>
                    </div>
                    <div className="flex">{renderStars(testimonial.rating)}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
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
            <h1 className="text-3xl font-bold text-primary">Gestion des Témoignages</h1>
            <p className="text-gray-600 mt-2">Gérer les témoignages des membres</p>
          </div>

          <div className="mb-6">
            <Button 
              onClick={() => setShowForm(!showForm)} 
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              {showForm ? 'Annuler' : 'Nouveau témoignage'}
            </Button>
          </div>

          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Ajouter un témoignage</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Nom complet"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                    <Input
                      placeholder="Poste/Fonction"
                      value={formData.position}
                      onChange={(e) => setFormData({...formData, position: e.target.value})}
                      required
                    />
                  </div>
                  <Textarea
                    placeholder="Témoignage"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    required
                  />
                  <select
                    className="w-full p-2 border rounded-md"
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: e.target.value})}
                  >
                    <option value="5">5 étoiles</option>
                    <option value="4">4 étoiles</option>
                    <option value="3">3 étoiles</option>
                    <option value="2">2 étoiles</option>
                    <option value="1">1 étoile</option>
                  </select>
                  <Button type="submit">Publier le témoignage</Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockTestimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <User className="w-10 h-10 text-primary bg-primary/10 rounded-full p-2 mr-3" />
                      <div>
                        <CardTitle>{testimonial.name}</CardTitle>
                        <p className="text-gray-600">{testimonial.position}</p>
                      </div>
                    </div>
                    <div className="flex">{renderStars(testimonial.rating)}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
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

export default DashboardTemoignages;
