
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { isAdmin } from '@/utils/roleUtils';

const DashboardAddUser = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: ''
  });
  const [creating, setCreating] = useState(false);

  if (!user || !isAdmin(user)) {
    return <div>Non autorisé</div>;
  }

  const roles = [
    { value: 'admin_secondaire', label: 'Administrateur secondaire' },
    { value: 'redacteur', label: 'Rédacteur' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.firstName || !formData.lastName || !formData.role || !formData.password) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setCreating(true);

    try {
      console.log('Création utilisateur depuis DashboardAddUser:', formData);
      
      // Création simple d'un hash pour le mot de passe (en production, utiliser bcrypt)
      const passwordHash = btoa(formData.password); // Base64 simple pour test

      // Insertion dans la base de données
      const { data: newUser, error } = await supabase
        .from('app_users')
        .insert({
          username: formData.username,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          role: formData.role as 'admin_principal' | 'admin_secondaire' | 'redacteur',
          password_hash: passwordHash
        })
        .select()
        .single();

      if (error) {
        console.error('Erreur lors de la création:', error);
        toast.error(`Erreur lors de la création: ${error.message}`);
        setCreating(false);
        return;
      }

      console.log('Utilisateur créé avec succès:', newUser);
      toast.success('Utilisateur créé avec succès !');
      
      // Reset form
      setFormData({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        password: ''
      });

      // Redirection vers la liste des utilisateurs
      setTimeout(() => {
        navigate('/dashboard/users');
      }, 1500);
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Erreur lors de la création de l\'utilisateur');
    } finally {
      setCreating(false);
    }
  };

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <Link to="/dashboard/users" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux utilisateurs
            </Link>
            <h1 className="text-3xl font-bold text-primary">Nouvel Utilisateur</h1>
            <p className="text-gray-600 mt-2">Créer un nouveau compte utilisateur</p>
          </div>

          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Informations de l'utilisateur</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Prénom *</label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="Prénom"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Nom *</label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Nom de famille"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nom d'utilisateur *</label>
                  <Input
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="Nom d'utilisateur unique"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="adresse@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Rôle *</label>
                  <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mot de passe *</label>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Mot de passe"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" asChild>
                    <Link to="/dashboard/users">Annuler</Link>
                  </Button>
                  <Button type="submit" disabled={creating}>
                    {creating ? 'Création...' : 'Créer l\'utilisateur'}
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

export default DashboardAddUser;
