
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Plus, Edit, Eye } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardEvents = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-4 pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Gestion des Événements</h1>
            <p className="text-gray-600 mt-1 text-sm">Planifier et gérer les événements de la P49</p>
          </div>

          <div className="mb-4">
            <Button className="bg-primary hover:bg-primary/90 w-full">
              <Plus className="mr-2 h-4 w-4" />
              Nouvel événement
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Calendar className="mr-2 h-5 w-5" />
                Événements à venir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="mb-2">
                    <h3 className="font-medium text-sm">Assemblée Générale Annuelle</h3>
                    <p className="text-xs text-gray-600">30 mars 2024 - Hôtel Ivoire, Abidjan</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Planifié</span>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="mb-2">
                    <h3 className="font-medium text-sm">Formation Leadership</h3>
                    <p className="text-xs text-gray-600">15 avril 2024 - Centre de Formation ENA</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Brouillon</span>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
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
            <h1 className="text-3xl font-bold text-primary">Gestion des Événements</h1>
            <p className="text-gray-600 mt-2">Planifier et gérer les événements de la P49</p>
          </div>

          <div className="mb-6">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Nouvel événement
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Événements à venir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">Assemblée Générale Annuelle</h3>
                    <p className="text-sm text-gray-600">30 mars 2024 - Hôtel Ivoire, Abidjan</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">Planifié</span>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">Formation Leadership</h3>
                    <p className="text-sm text-gray-600">15 avril 2024 - Centre de Formation ENA</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">Brouillon</span>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardEvents;
