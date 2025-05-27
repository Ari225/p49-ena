import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NewsFormData {
  title: string;
  summary: string;
  category: string;
  image_url: string;
}

const DashboardAddNews = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<NewsFormData>({
    defaultValues: {
      title: '',
      summary: '',
      category: '',
      image_url: ''
    }
  });

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  const onSubmit = async (data: NewsFormData) => {
    setIsLoading(true);
    try {
      // Définir l'utilisateur actuel pour cette session
      await setUserContext(user.id);

      const { error } = await supabase
        .from('news')
        .insert({
          title: data.title,
          summary: data.summary,
          category: data.category,
          image_url: data.image_url || null,
          published_date: new Date().toISOString().split('T')[0],
          created_by: user.id
        });

      if (error) {
        console.error('Erreur lors de la création:', error);
        toast({
          title: "Erreur",
          description: `Erreur lors de la création de l'actualité: ${error.message}`,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Succès",
        description: "L'actualité a été créée avec succès"
      });

      navigate('/dashboard/news');
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue est survenue",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Ajouter une Actualité</h1>
            <p className="text-gray-600 mt-2">Créer une nouvelle actualité</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Nouvelle Actualité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    rules={{ required: "Le titre est requis" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titre</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Titre de l'actualité" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    rules={{ required: "La catégorie est requise" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Catégorie</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Catégorie de l'actualité" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Résumé</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Résumé de l'actualité" rows={4} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL de l'image (optionnel)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://exemple.com/image.jpg" type="url" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90">
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? 'Création...' : 'Créer l\'actualité'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardAddNews;
