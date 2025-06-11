
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import EditorSidebar from '@/components/EditorSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, FileText, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Dashboard = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  if (!user) {
    return <div>Non autorisé</div>;
  }

  const isAdmin = user.role === 'admin';

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Tableau de bord</h1>
            <p className="text-gray-600 mt-1 text-sm">{isAdmin ? 'Administration' : 'Rédaction'}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Statistiques
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Vue d'ensemble des activités</p>
              </CardContent>
            </Card>

            {isAdmin && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Utilisateurs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Gestion des utilisateurs</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Contenus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Articles et actualités</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Événements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Gestion des événements</p>
              </CardContent>
            </Card>
          </div>
        </div>
        {isAdmin ? <AdminSidebar /> : <EditorSidebar />}
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex">
        {isAdmin ? <AdminSidebar /> : <EditorSidebar />}
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Tableau de bord</h1>
            <p className="text-gray-600 mt-2">{isAdmin ? 'Administration générale' : 'Espace rédacteur'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Statistiques
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Vue d'ensemble des activités récentes</p>
              </CardContent>
            </Card>

            {isAdmin && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Utilisateurs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Gestion des administrateurs et rédacteurs</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Contenus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Articles, actualités et publications</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Événements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Planification et gestion des événements</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
