
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Edit, Trash2, Shield, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import AddUserDialog from '@/components/users/AddUserDialog';

interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  created_at: string;
  image_url?: string;
}

const DashboardUsers = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

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
          created_at: '2024-01-01',
          image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
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

  const handleUserAdded = () => {
    // Refresh the users list when a new user is added
    fetchUsers();
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

  const UserCard = ({ userItem }: { userItem: User }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3 mb-3">
        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center flex-shrink-0 border border-primary/20 overflow-hidden">
          {userItem.image_url ? (
            <img 
              src={userItem.image_url} 
              alt={`${userItem.first_name} ${userItem.last_name}`}
              className="w-full h-full object-cover"
            />
          ) : (
            getRoleIcon(userItem.role)
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-900 truncate">{userItem.first_name} {userItem.last_name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(userItem.role)}`}>
              {getRoleLabel(userItem.role)}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">
            @{userItem.username}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            {userItem.email}
          </p>
          <p className="text-xs text-gray-400">
            Membre depuis le {new Date(userItem.created_at).toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>
      <div className="flex space-x-2 pt-2 border-t border-gray-100">
        <Button variant="outline" size="sm" className="flex-1 text-xs">
          <Edit className="h-3 w-3 mr-1" />
          Modifier
        </Button>
        {userItem.id !== user?.id && (
          <Button variant="outline" size="sm" className="flex-1 text-xs text-red-600 hover:text-red-700 hover:border-red-300">
            <Trash2 className="h-3 w-3 mr-1" />
            Supprimer
          </Button>
        )}
      </div>
    </div>
  );

  if (loading) {
    if (isMobile) {
      return (
        <Layout>
          <div className="px-[25px] py-[50px] pb-20">
            <div className="text-center">Chargement...</div>
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
            <h1 className="text-xl font-bold text-primary leading-tight">
              Gestion des Utilisateurs
            </h1>
            <p className="text-gray-600 mt-2 text-sm">Gérer les comptes et permissions</p>
          </div>

          <div className="mb-6 w-full">
            <AddUserDialog onUserAdded={handleUserAdded} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-primary flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Utilisateurs ({users.length})
              </h2>
            </div>
            
            {users.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">Aucun utilisateur trouvé</p>
              </div>
            ) : (
              <div className="space-y-3">
                {users.map((userItem) => (
                  <UserCard key={userItem.id} userItem={userItem} />
                ))}
              </div>
            )}
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
            <h1 className="text-3xl font-bold text-primary">Gestion des Utilisateurs</h1>
            <p className="text-gray-600 mt-2">Gérer les comptes et permissions des utilisateurs</p>
          </div>

          <div className="mb-6">
            <AddUserDialog onUserAdded={handleUserAdded} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Liste des Utilisateurs ({users.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {users.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500">Aucun utilisateur trouvé</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {users.map((userItem) => (
                    <UserCard key={userItem.id} userItem={userItem} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardUsers;
