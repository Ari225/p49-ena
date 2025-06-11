
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardNotifications = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Notifications</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer les notifications</p>
          </div>

          <div className="mb-4">
            <Button className="bg-primary hover:bg-primary/90 w-full">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle notification
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Bell className="mr-2 h-5 w-5" />
                Notifications récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Aucune notification pour le moment</p>
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
            <h1 className="text-3xl font-bold text-primary">Notifications</h1>
            <p className="text-gray-600 mt-2">Gérer les notifications du système</p>
          </div>

          <div className="mb-6">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle notification
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notifications récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Aucune notification pour le moment</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardNotifications;
