
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import EditorSidebar from '@/components/EditorSidebar';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { isAdmin } from '@/utils/roleUtils';
import DashboardStats from './DashboardStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { getRelativeTime } from '@/utils/timeUtils';

const DashboardHome = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const userIsAdmin = isAdmin(user);

  const [activities, setActivities] = useState<Array<{
    title: string;
    description: string;
    color: string;
  }>>([]);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        const recentActivities: Array<{
          title: string;
          description: string;
          color: string;
          timestamp: number;
        }> = [];

        // Récupérer les articles récents
        const { data: articles } = await supabase
          .from('blog_articles')
          .select('title, created_at')
          .order('created_at', { ascending: false })
          .limit(3);

        if (articles) {
          articles.forEach(article => {
            const timeAgo = getRelativeTime(article.created_at);
            recentActivities.push({
              title: 'Nouvel article créé',
              description: `Article "${article.title}" créé ${timeAgo}`,
              color: 'bg-green-500',
              timestamp: new Date(article.created_at).getTime()
            });
          });
        }

        // Récupérer les nouveaux utilisateurs
        const { data: users } = await supabase
          .from('app_users')
          .select('first_name, last_name, role, created_at')
          .order('created_at', { ascending: false })
          .limit(3);

        if (users) {
          users.forEach(user => {
            const timeAgo = getRelativeTime(user.created_at);
            const roleLabel = user.role === 'admin_principal' ? 'Admin Principal' : 
                            user.role === 'admin_secondaire' ? 'Admin Secondaire' : 'Rédacteur';
            recentActivities.push({
              title: 'Nouveau membre inscrit',
              description: `${user.first_name} ${user.last_name} (${roleLabel}) a rejoint ${timeAgo}`,
              color: 'bg-blue-500',
              timestamp: new Date(user.created_at).getTime()
            });
          });
        }

        // Récupérer les actualités récentes
        const { data: news } = await supabase
          .from('news')
          .select('title, created_at')
          .order('created_at', { ascending: false })
          .limit(2);

        if (news) {
          news.forEach(newsItem => {
            const timeAgo = getRelativeTime(newsItem.created_at);
            recentActivities.push({
              title: 'Nouvelle actualité créée',
              description: `Actualité "${newsItem.title}" créée ${timeAgo}`,
              color: 'bg-orange-500',
              timestamp: new Date(newsItem.created_at).getTime()
            });
          });
        }

        // Trier par timestamp et limiter aux 10 plus récentes
        recentActivities.sort((a, b) => b.timestamp - a.timestamp);
        setActivities(recentActivities.slice(0, 10));
      } catch (error) {
        console.error('Erreur lors de la récupération des activités récentes:', error);
        setActivities([{
          title: 'Activité récente',
          description: 'Aucune activité récente disponible',
          color: 'bg-gray-500'
        }]);
      }
    };

    fetchRecentActivities();
  }, []);

  // MOBILE VERSION
  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">
              Bienvenue, {user?.firstName || user?.username}
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              {userIsAdmin ? 'Panneau d\'administration' : 'Espace rédacteur'}
            </p>
          </div>

          <DashboardStats isMobile={true} />
          
          <Card>
            <CardHeader className="px-4 py-3">
              <CardTitle className="text-lg">Activités récentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 ${activity.color} rounded-full`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-gray-600">{activity.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          {userIsAdmin ? <AdminSidebar /> : <EditorSidebar />}
        </div>
      </Layout>
    );
  }

  // TABLET VERSION
  if (isTablet) {
    return (
      <Layout>
        <div className="px-[30px] py-[40px] pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">
              Bienvenue, {user?.firstName || user?.username}
            </h1>
            <p className="text-gray-600 mt-2">
              {userIsAdmin ? 'Panneau d\'administration' : 'Espace rédacteur'}
            </p>
          </div>

          <DashboardStats isMobile={false} />
          
          <Card>
            <CardHeader>
              <CardTitle>Activités récentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 ${activity.color} rounded-full`}></div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          {userIsAdmin ? <AdminSidebar /> : <EditorSidebar />}
        </div>
      </Layout>
    );
  }

  // DESKTOP VERSION
  return (
    <Layout>
      <div className="flex">
        {userIsAdmin ? <AdminSidebar /> : <EditorSidebar />}
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">
              Bienvenue, {user?.firstName || user?.username}
            </h1>
            <p className="text-gray-600 mt-2">
              {userIsAdmin ? 'Panneau d\'administration' : 'Espace rédacteur'}
            </p>
          </div>

          <DashboardStats />
          
          <Card>
            <CardHeader>
              <CardTitle>Activités récentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 ${activity.color} rounded-full`}></div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardHome;
