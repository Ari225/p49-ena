
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import EditorSidebar from '@/components/EditorSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Calendar, Eye } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Import dashboard pages
import DashboardUsers from './dashboard/DashboardUsers';
import DashboardNews from './dashboard/DashboardNews';
import DashboardBlog from './dashboard/DashboardBlog';
import DashboardJournal from './dashboard/DashboardJournal';
import DashboardEvents from './dashboard/DashboardEvents';
import DashboardSettings from './dashboard/DashboardSettings';
import DashboardNotifications from './dashboard/DashboardNotifications';
import DashboardPopups from './dashboard/DashboardPopups';
import DashboardProfile from './dashboard/DashboardProfile';
import DashboardSubmitted from './dashboard/DashboardSubmitted';
import DashboardMyArticles from './dashboard/DashboardMyArticles';
import DashboardNewArticle from './dashboard/DashboardNewArticle';
import DashboardJournalArticles from './dashboard/DashboardJournalArticles';
import DashboardAddNews from './dashboard/DashboardAddNews';
import DashboardAddUser from './dashboard/DashboardAddUser';
import DashboardAddJournal from './dashboard/DashboardAddJournal';

const DashboardHome = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

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

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">
              Bienvenue, {user?.username}
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              {user?.role === 'admin' ? 'Panneau d\'administration' : 'Espace rédacteur'}
            </p>
          </div>

          {/* Stats Grid for Mobile */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-3 pt-3">
                    <CardTitle className="text-xs font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <Icon className={`h-3 w-3 ${stat.color}`} />
                  </CardHeader>
                  <CardContent className="px-3 pt-2 pb-3">
                    <div className="text-xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="px-4 py-3">
              <CardTitle className="text-lg">Activité Récente</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-2 p-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Nouvel article publié</p>
                    <p className="text-xs text-gray-600">Article "Formation continue" publié il y a 2 heures</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Nouveau membre inscrit</p>
                    <p className="text-xs text-gray-600">Jean Kouassi a rejoint le réseau il y a 5 heures</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Événement créé</p>
                    <p className="text-xs text-gray-600">Assemblée générale programmée pour le 30 mars</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {user?.role === 'admin' ? <AdminSidebar /> : <EditorSidebar />}
        </div>
      </Layout>
    );
  }

  // Desktop version (original layout)
  return (
    <Layout>
      <div className="flex">
        {user?.role === 'admin' ? <AdminSidebar /> : <EditorSidebar />}
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">
              Bienvenue, {user?.username}
            </h1>
            <p className="text-gray-600 mt-2">
              {user?.role === 'admin' ? 'Panneau d\'administration' : 'Espace rédacteur'}
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

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Non autorisé</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<DashboardHome />} />
      <Route path="/users" element={<DashboardUsers />} />
      <Route path="/news" element={<DashboardNews />} />
      <Route path="/blog" element={<DashboardBlog />} />
      <Route path="/journal" element={<DashboardJournal />} />
      <Route path="/events" element={<DashboardEvents />} />
      <Route path="/settings" element={<DashboardSettings />} />
      <Route path="/notifications" element={<DashboardNotifications />} />
      <Route path="/popups" element={<DashboardPopups />} />
      <Route path="/profile" element={<DashboardProfile />} />
      <Route path="/submitted" element={<DashboardSubmitted />} />
      <Route path="/my-articles" element={<DashboardMyArticles />} />
      <Route path="/new-article" element={<DashboardNewArticle />} />
      <Route path="/journal-articles" element={<DashboardJournalArticles />} />
      <Route path="/add-news" element={<DashboardAddNews />} />
      <Route path="/add-user" element={<DashboardAddUser />} />
      <Route path="/add-journal" element={<DashboardAddJournal />} />
    </Routes>
  );
};

export default Dashboard;
