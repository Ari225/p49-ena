
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlayCircle, Plus, Edit, Trash2, Image, FileText, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardMediatheque = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    category: '',
    description: '',
    url: '',
    tags: ''
  });

  const mockMedia = [
    {
      id: '1',
      title: 'Discours du Président - Assemblée Générale 2024',
      type: 'Vidéo',
      category: 'Événements',
      description: 'Allocution du président lors de l\'AG annuelle.',
      url: 'https://example.com/video1',
      date: '2024-03-20',
      tags: ['AG', 'Président', 'Discours']
    },
    {
      id: '2',
      title: 'Galerie Photos - Séminaire Leadership',
      type: 'Images',
      category: 'Formation',
      description: 'Photos du séminaire sur le leadership administratif.',
      url: 'https://example.com/gallery1',
      date: '2024-03-15',
      tags: ['Leadership', 'Formation', 'Photos']
    }
  ];

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nouveau média:', formData);
    setShowForm(false);
    setFormData({ title: '', type: '', category: '', description: '', url: '', tags: '' });
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'Vidéo':
        return <PlayCircle className="w-5 h-5" />;
      case 'Images':
        return <Image className="w-5 h-5" />;
      case 'Document':
        return <FileText className="w-5 h-5" />;
      default:
        return <PlayCircle className="w-5 h-5" />;
    }
  };

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Gestion de la<br />Médiathèque</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer les contenus multimédias</p>
          </div>

          <div className="mb-4">
            <Button 
              onClick={() => setShowForm(!showForm)} 
              className="bg-primary hover:bg-primary/90 w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              {showForm ? 'Annuler' : 'Nouveau média'}
            </Button>
          </div>

          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Ajouter un média</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Titre du média"
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
                    <option value="">Type de média</option>
                    <option value="Vidéo">Vidéo</option>
                    <option value="Images">Images</option>
                    <option value="Audio">Audio</option>
                    <option value="Document">Document</option>
                  </select>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Catégorie</option>
                    <option value="Événements">Événements</option>
                    <option value="Formation">Formation</option>
                    <option value="Discours">Discours</option>
                    <option value="Activités">Activités</option>
                    <option value="Archives">Archives</option>
                  </select>
                  <Input
                    placeholder="URL ou lien du média"
                    value={formData.url}
                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                    required
                  />
                  <Textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Tags (séparés par des virgules)"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  />
                  <Button type="submit" className="w-full">Publier</Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {mockMedia.map((media) => (
              <Card key={media.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    {getMediaIcon(media.type)}
                    <span className="ml-2">{media.title}</span>
                  </CardTitle>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-primary">{media.type} - {media.category}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(media.date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{media.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {media.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
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
            <h1 className="text-3xl font-bold text-primary">Gestion de la Médiathèque</h1>
            <p className="text-gray-600 mt-2">Gérer les contenus multimédias (vidéos, photos, documents)</p>
          </div>

          <div className="mb-6">
            <Button 
              onClick={() => setShowForm(!showForm)} 
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              {showForm ? 'Annuler' : 'Nouveau média'}
            </Button>
          </div>

          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Ajouter un média</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Titre du média"
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
                    <option value="">Type de média</option>
                    <option value="Vidéo">Vidéo</option>
                    <option value="Images">Images</option>
                    <option value="Audio">Audio</option>
                    <option value="Document">Document</option>
                  </select>
                  <select
                    className="p-2 border rounded-md"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Catégorie</option>
                    <option value="Événements">Événements</option>
                    <option value="Formation">Formation</option>
                    <option value="Discours">Discours</option>
                    <option value="Activités">Activités</option>
                    <option value="Archives">Archives</option>
                  </select>
                  <Input
                    placeholder="URL ou lien du média"
                    value={formData.url}
                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                    required
                  />
                  <div className="md:col-span-2">
                    <Textarea
                      placeholder="Description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      required
                    />
                  </div>
                  <Input
                    placeholder="Tags (séparés par des virgules)"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  />
                  <div className="md:col-span-2">
                    <Button type="submit">Publier le média</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockMedia.map((media) => (
              <Card key={media.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {getMediaIcon(media.type)}
                    <span className="ml-2">{media.title}</span>
                  </CardTitle>
                  <div className="space-y-1">
                    <p className="font-medium text-primary">{media.type} - {media.category}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(media.date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">{media.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {media.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
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

export default DashboardMediatheque;
