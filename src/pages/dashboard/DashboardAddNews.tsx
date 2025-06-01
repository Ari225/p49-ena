
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardAddNews = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    category: '',
    image: null as File | null
  });
  const [uploading, setUploading] = useState(false);

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  const categories = ['Formation', 'Événement', 'Partenariat', 'Actualité'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.category) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setUploading(true);

    try {
      // Mock submission - in a real app, this would upload files and save to database
      console.log('Submitting news data:', formData);
      
      toast.success('Actualité créée avec succès !');
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        summary: '',
        category: '',
        image: null
      });
    } catch (error) {
      console.error('Error creating news:', error);
      toast.error('Erreur lors de la création de l\'actualité');
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <Link to="/dashboard/news" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux actualités
            </Link>
            <h1 className="text-3xl font-bold text-primary">Nouvelle Actualité</h1>
            <p className="text-gray-600 mt-2">Créer une nouvelle actualité</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informations de l'actualité</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Titre *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Titre de l'actualité"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Catégorie *</label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Résumé</label>
                  <Textarea
                    value={formData.summary}
                    onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                    placeholder="Résumé de l'actualité (optionnel)"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Contenu *</label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Contenu détaillé de l'actualité"
                    rows={8}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <span className="text-primary font-medium">Cliquez pour uploader</span>
                      <span className="text-gray-500"> ou glissez-déposez</span>
                    </label>
                    {formData.image && (
                      <p className="mt-2 text-sm text-gray-600">{formData.image.name}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" asChild>
                    <Link to="/dashboard/news">Annuler</Link>
                  </Button>
                  <Button type="submit" disabled={uploading}>
                    {uploading ? 'Création...' : 'Créer l\'actualité'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardAddNews;
