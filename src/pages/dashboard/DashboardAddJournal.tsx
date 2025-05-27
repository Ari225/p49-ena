
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const DashboardAddJournal = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    cover_image_url: '',
    pdf_url: '',
    page_count: '',
    publish_date: new Date().toISOString().split('T')[0]
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
      // Archive previous published journal
      await supabase
        .from('journal_editions')
        .update({ status: 'archive' })
        .eq('status', 'publie');

      // Add new journal
      const { error } = await supabase
        .from('journal_editions')
        .insert([{
          ...formData,
          page_count: formData.page_count ? parseInt(formData.page_count) : null,
          status: 'publie',
          created_by: user.id
        }]);

      if (error) {
        toast({
          title: "Erreur",
          description: "Erreur lors de l'ajout du journal",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Succès",
        description: "Nouvelle édition du journal publiée avec succès"
      });

      // Reset form
      setFormData({
        title: '',
        summary: '',
        cover_image_url: '',
        pdf_url: '',
        page_count: '',
        publish_date: new Date().toISOString().split('T')[0]
      });

    } catch (error) {
      console.error('Error adding journal:', error);
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
            <h1 className="text-3xl font-bold text-primary">Nouvelle Édition</h1>
            <p className="text-gray-600 mt-2">Publier une nouvelle édition du journal</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Détails de l'édition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Titre de l'édition</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Ex: Perspectives - Édition Mars 2024"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Résumé</label>
                  <Textarea
                    value={formData.summary}
                    onChange={(e) => handleInputChange('summary', e.target.value)}
                    placeholder="Résumé de cette édition"
                    rows={4}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">URL de l'image de couverture</label>
                  <Input
                    value={formData.cover_image_url}
                    onChange={(e) => handleInputChange('cover_image_url', e.target.value)}
                    placeholder="URL de l'image de couverture"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">URL du PDF</label>
                  <Input
                    value={formData.pdf_url}
                    onChange={(e) => handleInputChange('pdf_url', e.target.value)}
                    placeholder="URL du fichier PDF"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre de pages</label>
                  <Input
                    type="number"
                    value={formData.page_count}
                    onChange={(e) => handleInputChange('page_count', e.target.value)}
                    placeholder="Nombre de pages"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Date de publication</label>
                  <Input
                    type="date"
                    value={formData.publish_date}
                    onChange={(e) => handleInputChange('publish_date', e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  <Save className="mr-2 h-4 w-4" />
                  Publier l'édition
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardAddJournal;
