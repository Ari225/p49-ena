
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import EditorSidebar from '@/components/EditorSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardSubmitted = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  if (!user) {
    return <div>Non autorisé</div>;
  }

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary leading-tight">
              Articles<br />Soumis
            </h1>
            <p className="text-gray-600 mt-1 text-sm">Mes articles en attente</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Send className="mr-2 h-5 w-5" />
                Articles en attente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Aucun article soumis pour le moment</p>
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
            <h1 className="text-3xl font-bold text-primary">Articles Soumis</h1>
            <p className="text-gray-600 mt-2">Mes articles en attente de validation</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="mr-2 h-5 w-5" />
                Articles en attente de validation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Aucun article soumis pour le moment</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardSubmitted;
