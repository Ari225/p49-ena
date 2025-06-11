
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import EditorSidebar from '@/components/EditorSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardProfile = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  if (!user) {
    return <div>Non autorisé</div>;
  }

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-4 pb-20">
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
                <div>
                  <label className="text-sm font-medium">Nom d'utilisateur</label>
                  <p className="text-gray-600">{user.username}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Rôle</label>
                  <p className="text-gray-600">{user.role === 'admin' ? 'Administrateur' : 'Rédacteur'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <EditorSidebar />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex">
        <EditorSidebar />
        
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
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nom d'utilisateur</label>
                  <p className="text-gray-600">{user.username}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Rôle</label>
                  <p className="text-gray-600">{user.role === 'admin' ? 'Administrateur' : 'Rédacteur'}</p>
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
