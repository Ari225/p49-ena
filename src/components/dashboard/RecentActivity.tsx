
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

interface RecentActivityProps {
  isMobile?: boolean;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ isMobile = false }) => {
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
        }> = [];

        // Récupérer les articles récents
        const { data: articles } = await supabase
          .from('blog_articles')
          .select('title, created_at')
          .order('created_at', { ascending: false })
          .limit(2);

        if (articles) {
          articles.forEach(article => {
            const timeAgo = Math.floor((Date.now() - new Date(article.created_at).getTime()) / (1000 * 60 * 60));
            recentActivities.push({
              title: 'Nouvel article créé',
              description: `Article "${article.title}" créé il y a ${timeAgo}h`,
              color: 'bg-green-500'
            });
          });
        }

        // Récupérer les nouveaux utilisateurs
        const { data: users } = await supabase
          .from('app_users')
          .select('first_name, last_name, created_at')
          .order('created_at', { ascending: false })
          .limit(2);

        if (users) {
          users.forEach(user => {
            const timeAgo = Math.floor((Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60));
            recentActivities.push({
              title: 'Nouveau membre inscrit',
              description: `${user.first_name} ${user.last_name} a rejoint il y a ${timeAgo}h`,
              color: 'bg-blue-500'
            });
          });
        }

        // Récupérer les événements récents
        const { data: events } = await supabase
          .from('social_events')
          .select('title, created_at')
          .order('created_at', { ascending: false })
          .limit(1);

        if (events) {
          events.forEach(event => {
            const timeAgo = Math.floor((Date.now() - new Date(event.created_at).getTime()) / (1000 * 60 * 60));
            recentActivities.push({
              title: 'Nouvel événement créé',
              description: `Événement "${event.title}" créé il y a ${timeAgo}h`,
              color: 'bg-purple-500'
            });
          });
        }

        // Limiter à 3 activités les plus récentes
        setActivities(recentActivities.slice(0, 3));

      } catch (error) {
        console.error('Erreur lors de la récupération des activités récentes:', error);
        // En cas d'erreur, afficher des données par défaut
        setActivities([
          {
            title: 'Activité récente',
            description: 'Aucune activité récente disponible',
            color: 'bg-gray-500'
          }
        ]);
      }
    };

    fetchRecentActivities();
  }, []);

  if (isMobile) {
    return (
      <Card>
        <CardHeader className="px-4 py-3">
          <CardTitle className="text-lg">Activité Récente</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-2 p-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 ${activity.color} rounded-full`}></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-xs text-gray-600">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activité Récente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 ${activity.color} rounded-full`}></div>
              <div className="flex-1">
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
