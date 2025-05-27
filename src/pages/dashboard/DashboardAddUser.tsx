
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { setUserContext } from '@/utils/supabaseHelpers';

interface UserFormData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'admin_principal' | 'admin_secondaire' | 'redacteur';
  password: string;
}

const DashboardAddUser = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserFormData>({
    defaultValues: {
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      role: 'redacteur',
      password: ''
    }
  });

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  const onSubmit = async (data: UserFormData) => {
    setIsLoading(true);
    try {
      // Définir l'utilisateur actuel pour cette session
      await setUserContext(user.id);

      // Hash du mot de passe simple (cohérent avec le système de connexion)
      const password_hash = btoa(data.password); // Simple base64

      console.log('Création utilisateur avec données:', {
        username: data.username,
        email: data.email,
        role: data.role,
        password_hash
      });

      const { error } = await supabase
        .from('app_users')
        .insert({
          username: data.username,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          role: data.role,
          password_hash: password_hash
        });

      if (error) {
        console.error('Erreur lors de la création:', error);
        toast({
          title: "Erreur",
          description: `Erreur lors de la création de l'utilisateur: ${error.message}`,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Succès",
        description: "L'utilisateur a été créé avec succès"
      });

      navigate('/dashboard/users');
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
            <h1 className="text-3xl font-bold text-primary">Ajouter un Utilisateur</h1>
            <p className="text-gray-600 mt-2">Créer un nouvel utilisateur</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserPlus className="mr-2 h-5 w-5" />
                Nouvel Utilisateur
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="first_name"
                      rules={{ required: "Le prénom est requis" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prénom</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Prénom" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="last_name"
                      rules={{ required: "Le nom est requis" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Nom" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="username"
                    rules={{ required: "Le nom d'utilisateur est requis" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom d'utilisateur</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Nom d'utilisateur" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    rules={{ 
                      required: "L'email est requis",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email invalide"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="email@exemple.com" type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    rules={{ required: "Le rôle est requis" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rôle</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un rôle" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="redacteur">Rédacteur</SelectItem>
                            <SelectItem value="admin_secondaire">Admin Secondaire</SelectItem>
                            <SelectItem value="admin_principal">Admin Principal</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    rules={{ 
                      required: "Le mot de passe est requis",
                      minLength: {
                        value: 6,
                        message: "Le mot de passe doit contenir au moins 6 caractères"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Mot de passe" type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90">
                    <UserPlus className="mr-2 h-4 w-4" />
                    {isLoading ? 'Création...' : 'Créer l\'utilisateur'}
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

export default DashboardAddUser;
