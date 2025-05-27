
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, Shield, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
}

const DashboardUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('app_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin_principal':
        return 'Admin Principal';
      case 'admin_secondaire':
        return 'Admin Secondaire';
      case 'redacteur':
        return 'Rédacteur';
      default:
        return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin_principal':
        return 'bg-red-100 text-red-800';
      case 'admin_secondaire':
        return 'bg-orange-100 text-orange-800';
      case 'redacteur':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Gestion des Utilisateurs</h1>
            <p className="text-gray-600 mt-2">Gérer les administrateurs et rédacteurs</p>
          </div>

          <div className="mb-6">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/dashboard/add-user">
                <UserPlus className="mr-2 h-4 w-4" />
                Ajouter un utilisateur
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Liste des Utilisateurs
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
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          {userItem.role.includes('admin') ? (
                            <Shield className="h-5 w-5 text-white" />
                          ) : (
                            <Edit className="h-5 w-5 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {userItem.first_name && userItem.last_name 
                              ? `${userItem.first_name} ${userItem.last_name}` 
                              : userItem.username}
                          </p>
                          <p className="text-sm text-gray-600">{userItem.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-sm ${getRoleColor(userItem.role)}`}>
                          {getRoleLabel(userItem.role)}
                        </span>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
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
