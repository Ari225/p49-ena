
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Calendar, MapPin, Users, Edit, Trash2 } from 'lucide-react';
import { Activity as ActivityType } from '@/types/activity';

interface ActivityCardProps {
  activity: ActivityType;
  onEdit?: (activity: ActivityType) => void;
  onDelete?: (activity: ActivityType) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onEdit, onDelete }) => {
  return (
    <Card>
      {activity.image && (
        <div className="w-full h-48 overflow-hidden rounded-t-lg">
          <img 
            src={activity.image} 
            alt={activity.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          {activity.title}
        </CardTitle>
        <div className="space-y-1">
          <p className="text-sm font-medium text-primary">{activity.category}</p>
          {activity.type && (
            <p className="text-sm text-gray-600">{activity.type}</p>
          )}
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(activity.date).toLocaleDateString('fr-FR')} - {activity.time}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            {activity.location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            {activity.participants}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{activity.description}</p>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onEdit?.(activity)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Modifier
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="text-red-600"
            onClick={() => onDelete?.(activity)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Supprimer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
