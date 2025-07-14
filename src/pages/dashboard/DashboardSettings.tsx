
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { isAdmin } from '@/utils/roleUtils';

const DashboardSettings = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  if (!user || !isAdmin(user)) {
    return <div>Non autorisé</div>;
  }

  // MOBILE VERSION
  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Paramètres</h1>
            <p className="text-gray-600 mt-1 text-sm">Configuration du système</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Settings className="mr-2 h-5 w-5" />
                Paramètres généraux
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Configuration du système à venir...</p>
            </CardContent>
          </Card>
        </div>
        <AdminSidebar />
      </Layout>
    );
  }

  // TABLET VERSION
  if (isTablet) {
    return (
      <Layout>
        <div className="px-[30px] py-[40px] pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Paramètres</h1>
            <p className="text-gray-600 mt-2">Configuration du système</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Settings className="mr-3 h-6 w-6" />
                Paramètres généraux
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Configuration du système à venir...</p>
            </CardContent>
          </Card>
        </div>
        <AdminSidebar />
      </Layout>
    );
  }

  // DESKTOP VERSION
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Paramètres</h1>
            <p className="text-gray-600 mt-2">Configuration du système</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Paramètres généraux
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Configuration du système à venir...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardSettings;
