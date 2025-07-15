
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
    <Card className={`hover:shadow-lg transition-shadow duration-300 ${isPast ? 'opacity-80' : ''} h-full flex flex-col`}>
      {activity.image && (
        <div className="w-full h-48 overflow-hidden rounded-t-lg">
          <img 
            src={activity.image} 
            alt={activity.title}
            className={`w-full h-full object-cover transition-all duration-300 ${isPast ? 'grayscale' : 'hover:scale-105'}`}
          />
        </div>
      )}
      <CardContent className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <Badge className={isPast ? "bg-gray-100 text-gray-700" : getEventTypeColor(activity.type)}>
            {activity.type}
          </Badge>
          <span className={`text-sm ${isPast ? 'text-gray-500' : 'text-gray-600'}`}>
            {activity.date}
          </span>
        </div>
        
        <h3 className={`font-semibold mb-2 text-lg ${isPast ? 'text-gray-600' : 'text-primary'}`}>
          {activity.title}
        </h3>
        
        <p className={`text-sm mb-3 flex-1 line-clamp-2 ${isPast ? 'text-gray-500' : 'text-gray-600'}`}>
          {activity.description}
        </p>
        
        <div className={`space-y-2 text-sm mb-4 ${isPast ? 'text-gray-500' : 'text-gray-600'}`}>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-2 flex-shrink-0" />
            <span className="truncate">{activity.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-2 flex-shrink-0" />
            <span className="truncate">{activity.location}</span>
          </div>
        </div>
        
        <div className="flex gap-2 mt-auto">
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
              className="bg-green-600 hover:bg-green-700 flex-shrink-0"
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
