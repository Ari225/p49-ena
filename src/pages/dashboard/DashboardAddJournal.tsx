import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { BookOpen, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface JournalFormData {
  title: string;
  summary: string;
  publish_date: string;
  status: 'publie' | 'archive';
  cover_image_url: string;
  pdf_url: string;
  page_count: string;
}

const DashboardAddJournal = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<JournalFormData>({
    defaultValues: {
      title: '',
      summary: '',
      publish_date: new Date().toISOString().split('T')[0],
      status: 'publie',
      cover_image_url: '',
      pdf_url: '',
      page_count: ''
    }
  });

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  const onSubmit = async (data: JournalFormData) => {
    setIsLoading(true);
    try {
      // Définir l'utilisateur actuel pour cette session
      await setUserContext(user.id);

      const { error } = await supabase
        .from('journal_editions')
        .insert({
          title: data.title,
          summary: data.summary || null,
          publish_date: data.publish_date,
          status: data.status,
          cover_image_url: data.cover_image_url || null,
          pdf_url: data.pdf_url || null,
          page_count: data.page_count ? parseInt(data.page_count) : null,
          created_by: user.id
        });

      if (error) {
        console.error('Erreur lors de la création:', error);
        toast({
          title: "Erreur",
          description: `Erreur lors de la création de l'édition: ${error.message}`,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Succès",
        description: "L'édition du journal a été créée avec succès"
      });

      navigate('/dashboard/journal');
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
            <h1 className="text-3xl font-bold text-primary">Ajouter une Édition</h1>
            <p className="text-gray-600 mt-2">Créer une nouvelle édition du journal</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Nouvelle Édition
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
                          <Input {...field} placeholder="Titre de l'édition" />
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
                          <Textarea {...field} placeholder="Résumé de l'édition" rows={4} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="publish_date"
                      rules={{ required: "La date de publication est requise" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date de publication</FormLabel>
                          <FormControl>
                            <Input {...field} type="date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      rules={{ required: "Le statut est requis" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Statut</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un statut" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="publie">Publié</SelectItem>
                              <SelectItem value="archive">Archivé</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="cover_image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL de l'image de couverture (optionnel)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://exemple.com/couverture.jpg" type="url" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pdf_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL du PDF (optionnel)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://exemple.com/journal.pdf" type="url" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="page_count"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de pages (optionnel)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="24" type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90">
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? 'Création...' : 'Créer l\'édition'}
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

export default DashboardAddJournal;
