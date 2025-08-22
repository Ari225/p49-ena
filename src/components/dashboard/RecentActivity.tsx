import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { getRelativeTime } from '@/utils/timeUtils';
interface RecentActivityProps {
  isMobile?: boolean;
}
const RecentActivity: React.FC<RecentActivityProps> = ({
  isMobile = false
}) => {
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

        // Récupérer les nouveaux utilisateurs avec leur rôle
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

        // Récupérer les événements heureux récents
        const { data: happyEvents } = await supabase
          .from('happy_events')
          .select('title, created_at')
          .order('created_at', { ascending: false })
          .limit(2);
        
        if (happyEvents) {
          happyEvents.forEach(event => {
            const timeAgo = getRelativeTime(event.created_at);
            recentActivities.push({
              title: 'Nouvel événement heureux créé',
              description: `Événement "${event.title}" créé ${timeAgo}`,
              color: 'bg-purple-500',
              timestamp: new Date(event.created_at).getTime()
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

        // Récupérer les médias récents
        const { data: media } = await supabase
          .from('media_items')
          .select('title, created_at')
          .order('created_at', { ascending: false })
          .limit(2);
        
        if (media) {
          media.forEach(mediaItem => {
            const timeAgo = getRelativeTime(mediaItem.created_at);
            recentActivities.push({
              title: 'Nouveau média ajouté',
              description: `Média "${mediaItem.title}" ajouté ${timeAgo}`,
              color: 'bg-pink-500',
              timestamp: new Date(mediaItem.created_at).getTime()
            });
          });
        }

        // Récupérer les éditions de journal récentes
        const { data: journals } = await supabase
          .from('journal_editions')
          .select('title, created_at')
          .order('created_at', { ascending: false })
          .limit(2);
        
        if (journals) {
          journals.forEach(journal => {
            const timeAgo = getRelativeTime(journal.created_at);
            recentActivities.push({
              title: 'Nouvelle édition du journal',
              description: `Journal "${journal.title}" créé ${timeAgo}`,
              color: 'bg-indigo-500',
              timestamp: new Date(journal.created_at).getTime()
            });
          });
        }

        // Récupérer les événements difficiles récents
        const { data: difficultEvents } = await supabase
          .from('difficult_events')
          .select('title, created_at')
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (difficultEvents) {
          difficultEvents.forEach(event => {
            const timeAgo = getRelativeTime(event.created_at);
            recentActivities.push({
              title: 'Événement difficile ajouté',
              description: `"${event.title}" ajouté ${timeAgo}`,
              color: 'bg-red-500',
              timestamp: new Date(event.created_at).getTime()
            });
          });
        }

        // Récupérer les événements heureux récents (deuxième appel)
        const { data: moreHappyEvents } = await supabase
          .from('happy_events')
          .select('title, created_at')
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (moreHappyEvents) {
          moreHappyEvents.forEach(event => {
            const timeAgo = getRelativeTime(event.created_at);
            recentActivities.push({
              title: 'Événement heureux ajouté',
              description: `"${event.title}" ajouté ${timeAgo}`,
              color: 'bg-yellow-500',
              timestamp: new Date(event.created_at).getTime()
            });
          });
        }

        // Récupérer les départs à la retraite récents
        const { data: retirements } = await supabase
          .from('retirement_departures')
          .select('member_name, created_at')
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (retirements) {
          retirements.forEach(retirement => {
            const timeAgo = getRelativeTime(retirement.created_at);
            recentActivities.push({
              title: 'Départ à la retraite ajouté',
              description: `Départ de ${retirement.member_name} ajouté ${timeAgo}`,
              color: 'bg-gray-500',
              timestamp: new Date(retirement.created_at).getTime()
            });
          });
        }

        // Trier par timestamp et limiter aux 10 plus récentes
        recentActivities.sort((a, b) => b.timestamp - a.timestamp);
        setActivities(recentActivities.slice(0, 10));
      } catch (error) {
        console.error('Erreur lors de la récupération des activités récentes:', error);
        // En cas d'erreur, afficher des données par défaut
        setActivities([{
          title: 'Activité récente',
          description: 'Aucune activité récente disponible',
          color: 'bg-gray-500'
        }]);
      }
    };
    fetchRecentActivities();
  }, []);
  if (isMobile) {
    return <Card>
        <CardHeader className="px-4 py-3">
          <CardTitle className="text-lg">Activité Récente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-4">
          {activities.map((activity, index) => 
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 ${activity.color} rounded-full`}></div>
              <div className="flex-1">
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-xs text-gray-600">{activity.description}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>;
  }
  return <Card>
      <CardHeader>
        <CardTitle>Activités récentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => 
          <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className={`w-2 h-2 ${activity.color} rounded-full`}></div>
            <div className="flex-1">
              <p className="font-medium">{activity.title}</p>
              <p className="text-sm text-gray-600">{activity.description}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>;
};
export default RecentActivity;