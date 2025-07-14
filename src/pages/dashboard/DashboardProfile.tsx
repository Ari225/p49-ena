
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import EditorSidebar from '@/components/EditorSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const DashboardProfile = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  if (!user) {
    return <div>Non autorisé</div>;
  }

  const isAdmin = user.role === 'admin_principal' || user.role === 'admin_secondaire';
  const SidebarComponent = isAdmin ? AdminSidebar : EditorSidebar;

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin_principal':
        return 'Administrateur Principal';
      case 'admin_secondaire':
        return 'Administrateur Secondaire';
      case 'redacteur':
        return 'Rédacteur';
      default:
        return 'Membre';
    }
  };

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Mon Profil</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer mon profil</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <User className="mr-2 h-5 w-5" />
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-16 w-16">
                    {user.image_url ? (
                      <AvatarImage src={user.image_url} alt={`${user.firstName} ${user.lastName}`} />
                    ) : null}
                    <AvatarFallback>
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{user.firstName} {user.lastName}</h3>
                    <p className="text-sm text-gray-600">@{user.username}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Rôle</label>
                  <p className="text-gray-600">{getRoleLabel(user.role)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <SidebarComponent />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex">
        <SidebarComponent />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Mon Profil</h1>
            <p className="text-gray-600 mt-2">Gérer mes informations personnelles</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center space-x-6 mb-6">
                  <Avatar className="h-20 w-20">
                    {user.image_url ? (
                      <AvatarImage src={user.image_url} alt={`${user.firstName} ${user.lastName}`} />
                    ) : null}
                    <AvatarFallback>
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-xl">{user.firstName} {user.lastName}</h3>
                    <p className="text-gray-600">@{user.username}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Rôle</label>
                  <p className="text-gray-600">{getRoleLabel(user.role)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardProfile;
