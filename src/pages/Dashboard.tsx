
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import EditorSidebar from '@/components/EditorSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Calendar, Eye } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Non autorisé</div>;
  }

  const stats = [
    {
      title: 'Articles Publiés',
      value: '24',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Membres Actifs',
      value: '156',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Événements',
      value: '8',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      title: 'Visiteurs Mensuels',
      value: '2,341',
      icon: Eye,
      color: 'text-orange-600'
    }
  ];

  return (
    <Layout>
      <div className="flex">
        {user.role === 'admin' ? <AdminSidebar /> : <EditorSidebar />}
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">
              Bienvenue, {user.username}
            </h1>
            <p className="text-gray-600 mt-2">
              {user.role === 'admin' ? 'Panneau d\'administration' : 'Espace rédacteur'}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Activité Récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Nouvel article publié</p>
                    <p className="text-sm text-gray-600">Article "Formation continue" publié il y a 2 heures</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Nouveau membre inscrit</p>
                    <p className="text-sm text-gray-600">Jean Kouassi a rejoint le réseau il y a 5 heures</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Événement créé</p>
                    <p className="text-sm text-gray-600">Assemblée générale programmée pour le 30 mars</p>
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

export default Dashboard;
