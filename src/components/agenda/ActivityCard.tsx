
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, CalendarPlus, Eye } from 'lucide-react';

interface Activity {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  participants: string;
  description: string;
  type: string;
  status: string;
  calendarDate: Date;
  image?: string;
}

interface ActivityCardProps {
  activity: Activity;
  getEventTypeColor: (type: string) => string;
  handleAddToCalendar: (activity: Activity) => void;
  isPast?: boolean;
}

const ActivityCard = ({ activity, getEventTypeColor, handleAddToCalendar, isPast = false }: ActivityCardProps) => {
  return (
    <Card className={`hover:shadow-lg transition-shadow duration-300 ${isPast ? 'opacity-80' : ''}`}>
      {activity.image && (
        <div className="w-full h-40 overflow-hidden rounded-t-lg">
          <img 
            src={activity.image} 
            alt={activity.title}
            className={`w-full h-full object-cover ${isPast ? 'grayscale' : ''}`}
          />
        </div>
      )}
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge className={isPast ? "bg-gray-100 text-gray-700" : getEventTypeColor(activity.type)}>
            {activity.type}
          </Badge>
          <span className="text-sm text-gray-500">
            {activity.date}
          </span>
        </div>
        <h3 className={`font-semibold mb-2 ${isPast ? 'text-gray-600' : 'text-primary'}`}>
          {activity.title}
        </h3>
        <div className={`space-y-1 text-sm mb-3 ${isPast ? 'text-gray-500' : 'text-gray-600'}`}>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {activity.time}
          </div>
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {activity.location}
          </div>
        </div>
        <div className="flex gap-2">
          <Button asChild size="sm" variant="outline" className={isPast ? "w-full" : "flex-1"}>
            <Link to={`/activites/${activity.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              {isPast ? "Voir détails" : "Détails"}
            </Link>
          </Button>
          {!isPast && (
            <Button
              size="sm"
              onClick={() => handleAddToCalendar(activity)}
              className="bg-green-600 hover:bg-green-700"
            >
              <CalendarPlus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
