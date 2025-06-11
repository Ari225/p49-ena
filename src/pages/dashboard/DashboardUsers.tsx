
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus, Edit, Trash2, Shield, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  created_at: string;
}

const DashboardUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Mock data instead of Supabase
      const mockUsers: User[] = [
        {
          id: '1',
          username: 'admin',
          first_name: 'Admin',
          last_name: 'P49',
          email: 'admin@p49.com',
          role: 'admin',
          created_at: '2024-01-01'
        },
        {
          id: '2',
          username: 'editor1',
          first_name: 'Jean',
          last_name: 'Dupont',
          email: 'jean.dupont@p49.com',
          role: 'editor',
          created_at: '2024-01-10'
        }
      ];
      setUsers(mockUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4 text-red-600" />;
      case 'editor':
        return <Edit className="h-4 w-4 text-blue-600" />;
      default:
        return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrateur';
      case 'editor':
        return 'Rédacteur';
      default:
        return 'Membre';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'editor':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1 ml-64 p-8">
            <div className="text-center">Chargement...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Gestion des Utilisateurs</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer les comptes et permissions</p>
          </div>

          <div className="mb-6">
            <Button asChild className="bg-primary hover:bg-primary/90 w-full">
              <Link to="/dashboard/add-user">
                <Plus className="mr-2 h-4 w-4" />
                Nouvel utilisateur
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Users className="mr-2 h-5 w-5" />
                Liste des Utilisateurs ({users.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Aucun utilisateur trouvé
                  </p>
                ) : (
                  users.map((userItem) => (
                    <div key={userItem.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start space-x-4 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          {getRoleIcon(userItem.role)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{userItem.first_name} {userItem.last_name}</h3>
                          <p className="text-sm text-gray-600">
                            @{userItem.username} • {userItem.email}
                          </p>
                          <p className="text-xs text-gray-500">
                            Créé le {new Date(userItem.created_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded text-sm ${getRoleBadgeColor(userItem.role)}`}>
                          {getRoleLabel(userItem.role)}
                        </span>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {userItem.id !== user?.id && (
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
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
            <h1 className="text-3xl font-bold text-primary">Gestion des Utilisateurs</h1>
            <p className="text-gray-600 mt-2">Gérer les comptes et permissions des utilisateurs</p>
          </div>

          <div className="mb-6">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/dashboard/add-user">
                <Plus className="mr-2 h-4 w-4" />
                Nouvel utilisateur
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Liste des Utilisateurs ({users.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Aucun utilisateur trouvé
                  </p>
                ) : (
                  users.map((userItem) => (
                    <div key={userItem.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          {getRoleIcon(userItem.role)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{userItem.first_name} {userItem.last_name}</h3>
                          <p className="text-sm text-gray-600">
                            @{userItem.username} • {userItem.email}
                          </p>
                          <p className="text-xs text-gray-500">
                            Créé le {new Date(userItem.created_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-sm ${getRoleBadgeColor(userItem.role)}`}>
                          {getRoleLabel(userItem.role)}
                        </span>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {userItem.id !== user?.id && (
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardUsers;
