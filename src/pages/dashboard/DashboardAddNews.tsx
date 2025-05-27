
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const DashboardAddNews = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    category: '',
    image_url: '',
    published_date: new Date().toISOString().split('T')[0]
  });

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('news')
        .insert([{
          ...formData,
          created_by: user.id
        }]);

      if (error) {
        toast({
          title: "Erreur",
          description: "Erreur lors de l'ajout de l'actualité",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Succès",
        description: "Actualité ajoutée avec succès"
      });

      // Reset form
      setFormData({
        title: '',
        summary: '',
        category: '',
        image_url: '',
        published_date: new Date().toISOString().split('T')[0]
      });

    } catch (error) {
      console.error('Error adding news:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Nouvelle Actualité</h1>
            <p className="text-gray-600 mt-2">Ajouter une nouvelle actualité</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Détails de l'actualité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Titre</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Titre de l'actualité"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Catégorie</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    placeholder="Catégorie (ex: Événements, Formation, etc.)"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Résumé</label>
                  <Textarea
                    value={formData.summary}
                    onChange={(e) => handleInputChange('summary', e.target.value)}
                    placeholder="Résumé de l'actualité"
                    rows={4}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">URL de l'image</label>
                  <Input
                    value={formData.image_url}
                    onChange={(e) => handleInputChange('image_url', e.target.value)}
                    placeholder="URL de l'image"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Date de publication</label>
                  <Input
                    type="date"
                    value={formData.published_date}
                    onChange={(e) => handleInputChange('published_date', e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  <Save className="mr-2 h-4 w-4" />
                  Publier l'actualité
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardAddNews;
