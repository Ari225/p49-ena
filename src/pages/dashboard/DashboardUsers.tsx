import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import UsersList from '@/components/users/UsersList';
import UsersPageHeader from '@/components/users/UsersPageHeader';
import LoadingState from '@/components/users/LoadingState';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { isAdmin } from '@/utils/roleUtils';

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

  if (!user || !isAdmin(user)) {
    return <div>Non autorisé</div>;
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data: usersData, error } = await supabase
        .from('app_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        toast.error('Erreur lors du chargement des utilisateurs');
        return;
      }

      setUsers(usersData || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  const handleUserAdded = () => {
    // Refresh the users list when a new user is added
    fetchUsers();
  };

  if (loading) {
    return <LoadingState isMobile={isMobile} />;
  }

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <UsersPageHeader 
            userCount={users.length}
            onUserAdded={handleUserAdded}
            isMobile={true}
          />
          
          <UsersList users={users} currentUserId={user?.id} isMobile={true} />
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
          <UsersPageHeader 
            userCount={users.length}
            onUserAdded={handleUserAdded}
            isMobile={false}
          />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Liste des Utilisateurs ({users.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <UsersList users={users} currentUserId={user?.id} isMobile={false} />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardUsers;
