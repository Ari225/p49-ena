
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import EditorSidebar from '@/components/EditorSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PenTool, Edit, Eye, Trash2 } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const DashboardMyArticles = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  if (!user) {
    return <div>Non autorisé</div>;
  }

  // MOBILE VERSION
  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Mes Articles</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer vos articles personnels</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <PenTool className="mr-2 h-5 w-5" />
                Mes articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="mb-3">
                    <h3 className="font-medium">Mon expérience en tant que fonctionnaire</h3>
                    <p className="text-sm text-gray-600">Brouillon - Dernière modification il y a 2 jours</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">Brouillon</span>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="mb-3">
                    <h3 className="font-medium">L'importance de la formation continue</h3>
                    <p className="text-sm text-gray-600">Soumis pour révision le 5 mars 2024</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">En révision</span>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <EditorSidebar />
      </Layout>
    );
  }

  // TABLET VERSION
  if (isTablet) {
    return (
      <Layout>
        <div className="px-[30px] py-[40px] pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Mes Articles</h1>
            <p className="text-gray-600 mt-2">Gérer vos articles personnels</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <PenTool className="mr-3 h-6 w-6" />
                Articles créés par {user.username}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">Mon expérience en tant que fonctionnaire</h3>
                    <p className="text-sm text-gray-600">Brouillon - Dernière modification il y a 2 jours</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">Brouillon</span>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">L'importance de la formation continue</h3>
                    <p className="text-sm text-gray-600">Soumis pour révision le 5 mars 2024</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">En révision</span>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <EditorSidebar />
      </Layout>
    );
  }

  // DESKTOP VERSION
  return (
    <Layout>
      <div className="flex">
        <EditorSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Mes Articles</h1>
            <p className="text-gray-600 mt-2">Gérer vos articles personnels</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PenTool className="mr-2 h-5 w-5" />
                Articles créés par {user.username}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">Mon expérience en tant que fonctionnaire</h3>
                    <p className="text-sm text-gray-600">Brouillon - Dernière modification il y a 2 jours</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">Brouillon</span>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">L'importance de la formation continue</h3>
                    <p className="text-sm text-gray-600">Soumis pour révision le 5 mars 2024</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">En révision</span>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
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

export default DashboardMyArticles;
