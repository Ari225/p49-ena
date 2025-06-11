
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardPopups = () => {
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
            <h1 className="text-2xl font-bold text-primary">Pop-ups & Communiqués</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer les pop-ups et communiqués</p>
          </div>

          <div className="mb-4">
            <Button className="bg-primary hover:bg-primary/90 w-full">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau pop-up
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <MessageSquare className="mr-2 h-5 w-5" />
                Pop-ups actifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Aucun pop-up actif</p>
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
            <h1 className="text-3xl font-bold text-primary">Pop-ups & Communiqués</h1>
            <p className="text-gray-600 mt-2">Gérer les pop-ups et communiqués du site</p>
          </div>

          <div className="mb-6">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau pop-up
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Pop-ups et communiqués
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Aucun pop-up ou communiqué pour le moment</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPopups;
