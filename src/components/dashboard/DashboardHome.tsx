
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import EditorSidebar from '@/components/EditorSidebar';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { isAdmin } from '@/utils/roleUtils';
import DashboardStats from './DashboardStats';
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

        // Récupérer les articles de blog récents
        const { data: articles } = await supabase
          .from('blog_articles')
          .select('title, created_at')
          .order('created_at', { ascending: false })
          .limit(2);

        if (articles) {
          articles.forEach(article => {
            const timeAgo = getRelativeTime(article.created_at);
            recentActivities.push({
              title: 'Nouvel article de blog',
              description: `"${article.title}" créé ${timeAgo}`,
              color: 'bg-green-500',
              timestamp: new Date(article.created_at).getTime()
            });
          });
        }

        // Récupérer les actualités récentes (écho des régions inclus)
        const { data: news } = await supabase
          .from('news')
          .select('title, category, created_at')
          .order('created_at', { ascending: false })
          .limit(2);

        if (news) {
          news.forEach(newsItem => {
            const timeAgo = getRelativeTime(newsItem.created_at);
            const type = newsItem.category === 'echo_regions' ? 'Écho des régions' : 'Actualité';
            recentActivities.push({
              title: `Nouveau(lle) ${type}`,
              description: `"${newsItem.title}" créé ${timeAgo}`,
              color: 'bg-orange-500',
              timestamp: new Date(newsItem.created_at).getTime()
            });
          });
        }

        // Récupérer les annonces carrières+ récentes
        const { data: careers } = await supabase
          .from('career_announcements')
          .select('title, category, created_at')
          .order('created_at', { ascending: false })
          .limit(2);

        if (careers) {
          careers.forEach(career => {
            const timeAgo = getRelativeTime(career.created_at);
            recentActivities.push({
              title: 'Nouvelle annonce Carrières+',
              description: `${career.category}: "${career.title}" créé ${timeAgo}`,
              color: 'bg-purple-500',
              timestamp: new Date(career.created_at).getTime()
            });
          });
        }

        // Récupérer les suggestions récentes
        const { data: suggestions } = await supabase
          .from('suggestions')
          .select('subject, name, created_at')
          .order('created_at', { ascending: false })
          .limit(2);

        if (suggestions) {
          suggestions.forEach(suggestion => {
            const timeAgo = getRelativeTime(suggestion.created_at);
            recentActivities.push({
              title: 'Nouvelle suggestion',
              description: `"${suggestion.subject}" de ${suggestion.name} ${timeAgo}`,
              color: 'bg-yellow-500',
              timestamp: new Date(suggestion.created_at).getTime()
            });
          });
        }

        // Récupérer les messages de contact récents
        const { data: contacts } = await supabase
          .from('contacts')
          .select('subject, name, created_at')
          .order('created_at', { ascending: false })
          .limit(2);

        if (contacts) {
          contacts.forEach(contact => {
            const timeAgo = getRelativeTime(contact.created_at);
            recentActivities.push({
              title: 'Nouveau message de contact',
              description: `"${contact.subject}" de ${contact.name} ${timeAgo}`,
              color: 'bg-blue-500',
              timestamp: new Date(contact.created_at).getTime()
            });
          });
        }

        // Récupérer les communiqués récents
        const { data: communiques } = await supabase
          .from('communiques')
          .select('title, created_at')
          .order('created_at', { ascending: false })
          .limit(2);

        if (communiques) {
          communiques.forEach(communique => {
            const timeAgo = getRelativeTime(communique.created_at);
            recentActivities.push({
              title: 'Nouveau communiqué',
              description: `"${communique.title}" créé ${timeAgo}`,
              color: 'bg-red-500',
              timestamp: new Date(communique.created_at).getTime()
            });
          });
        }

        // Récupérer les nouveaux témoignages
        const { data: testimonials } = await supabase
          .from('testimonials')
          .select('member_name, created_at')
          .order('created_at', { ascending: false })
          .limit(2);

        if (testimonials) {
          testimonials.forEach(testimonial => {
            const timeAgo = getRelativeTime(testimonial.created_at);
            recentActivities.push({
              title: 'Nouveau témoignage',
              description: `Témoignage de ${testimonial.member_name} ${timeAgo}`,
              color: 'bg-indigo-500',
              timestamp: new Date(testimonial.created_at).getTime()
            });
          });
        }

        // Récupérer les éditions de journal récentes
        const { data: journals } = await supabase
          .from('journal_editions')
          .select('title, created_at')
          .order('created_at', { ascending: false })
          .limit(1);

        if (journals) {
          journals.forEach(journal => {
            const timeAgo = getRelativeTime(journal.created_at);
            recentActivities.push({
              title: 'Nouvelle édition du journal',
              description: `"${journal.title}" créé ${timeAgo}`,
              color: 'bg-teal-500',
              timestamp: new Date(journal.created_at).getTime()
            });
          });
        }

        // Récupérer les médias récents
        const { data: media } = await supabase
          .from('media_items')
          .select('title, category, created_at')
          .order('created_at', { ascending: false })
          .limit(2);

        if (media) {
          media.forEach(mediaItem => {
            const timeAgo = getRelativeTime(mediaItem.created_at);
            recentActivities.push({
              title: 'Nouveau média ajouté',
              description: `${mediaItem.category}: "${mediaItem.title}" ${timeAgo}`,
              color: 'bg-pink-500',
              timestamp: new Date(mediaItem.created_at).getTime()
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
          
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-3">Activités récentes</h2>
            <div className="space-y-2">
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
          </div>
          
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
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Activités récentes</h2>
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
          </div>
          
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
          
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-6">Activités récentes</h2>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardHome;
