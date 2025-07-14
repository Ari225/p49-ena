
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
    // Utiliser les profils codés en dur au lieu de Supabase
    const hardcodedUsers: User[] = [
      {
        id: '1',
        username: 'ari_dale',
        first_name: 'Aristide',
        last_name: 'Dalé',
        email: 'aristide.dale@p49.com',
        role: 'admin_principal',
        created_at: '2024-01-01T00:00:00.000Z',
        image_url: '/lovable-uploads/2cd61362-ab99-4adc-901a-5bef1c338e97.png'
      },
      {
        id: '2',
        username: 'kouam_p49',
        first_name: 'Kouamé',
        last_name: '',
        email: 'kouame@p49.com',
        role: 'redacteur',
        created_at: '2024-01-01T00:00:00.000Z',
        image_url: '/lovable-uploads/e479be1a-3b50-400f-ab57-37aecdd654ed.png'
      }
    ];

    setUsers(hardcodedUsers);
    setLoading(false);
  }, []);

  const handleUserAdded = () => {
    // Pour le moment, ne fait rien car on utilise des profils codés en dur
    console.log('Utilisateur ajouté (fonctionnalité à implémenter)');
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
