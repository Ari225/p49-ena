
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RecentActivityProps {
  isMobile?: boolean;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ isMobile = false }) => {
  const activities = [
    {
      title: 'Nouvel article publié',
      description: 'Article "Formation continue" publié il y a 2 heures',
      color: 'bg-green-500'
    },
    {
      title: 'Nouveau membre inscrit',
      description: 'Jean Kouassi a rejoint le réseau il y a 5 heures',
      color: 'bg-blue-500'
    },
    {
      title: 'Événement créé',
      description: 'Assemblée générale programmée pour le 30 mars',
      color: 'bg-purple-500'
    }
  ];

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
