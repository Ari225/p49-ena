
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Calendar, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DashboardStatsProps {
  isMobile?: boolean;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ isMobile = false }) => {
  const [stats, setStats] = useState([
    {
      title: 'Articles Publiés',
      value: '0',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Activités',
      value: '0',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Événements',
      value: '0',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      title: 'Visiteurs Mensuels',
      value: '0',
      icon: Eye,
      color: 'text-orange-600'
    }
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Comptage des articles publiés
        const { count: articlesCount } = await supabase
          .from('blog_articles')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'valide');

        // Comptage des activités
        const { count: activitiesCount } = await supabase
          .from('activities')
          .select('*', { count: 'exact', head: true });

        // Comptage des événements (sociaux + difficiles)
        const { count: socialEventsCount } = await supabase
          .from('social_events')
          .select('*', { count: 'exact', head: true });

        const { count: difficultEventsCount } = await supabase
          .from('difficult_events')
          .select('*', { count: 'exact', head: true });

        const totalEvents = (socialEventsCount || 0) + (difficultEventsCount || 0);

        // Visiteurs mensuels - pour l'instant simulation, à remplacer par une vraie solution analytics
        const currentMonth = new Date().getMonth();
        const visitorsCount = Math.floor(Math.random() * 1000) + 500; // Simulation temporaire

        setStats([
          {
            title: 'Articles Publiés',
            value: (articlesCount || 0).toString(),
            icon: FileText,
            color: 'text-blue-600'
          },
          {
            title: 'Activités',
            value: (activitiesCount || 0).toString(),
            icon: Users,
            color: 'text-green-600'
          },
          {
            title: 'Événements',
            value: totalEvents.toString(),
            icon: Calendar,
            color: 'text-purple-600'
          },
          {
            title: 'Visiteurs Mensuels',
            value: visitorsCount.toLocaleString(),
            icon: Eye,
            color: 'text-orange-600'
          }
        ]);

      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
      }
    };

    fetchStats();
  }, []);

  if (isMobile) {
    return (
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
    );
  }

  return (
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
  );
};

export default DashboardStats;
