
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Calendar, Eye } from 'lucide-react';

interface DashboardStatsProps {
  isMobile?: boolean;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ isMobile = false }) => {
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
