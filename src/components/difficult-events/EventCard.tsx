
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Heart, AlertCircle, Stethoscope, Car } from 'lucide-react';
import { DifficultEvent } from '@/types/difficultEvents';

interface EventCardProps {
  event: DifficultEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'deces': return Heart;
      case 'maladie': return Stethoscope;
      case 'accident': return Car;
      default: return AlertCircle;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'deces': return 'Décès';
      case 'maladie': return 'Maladies';
      case 'accident': return 'Accidents';
      case 'autre_difficile': return 'Autres';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'deces': return 'bg-gray-100 text-gray-700';
      case 'maladie': return 'bg-red-100 text-red-700';
      case 'accident': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const IconComponent = getCategoryIcon(event.category);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-gray-400">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-gray-800 mb-2">{event.title}</CardTitle>
            <p className="text-gray-600 font-medium">{event.member_name}</p>
          </div>
          <div className="bg-gray-100 text-gray-600 p-2 rounded-full">
            <IconComponent className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <Calendar className="h-4 w-4 mr-2" />
          {new Date(event.event_date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {event.image_url && (
          <img 
            src={event.image_url} 
            alt={event.title}
            className="w-full h-32 object-cover rounded mb-3 grayscale"
          />
        )}
        
        {event.description && (
          <p className="text-gray-700 text-sm mb-3">{event.description}</p>
        )}
        
        {event.family_support_message && (
          <div className="bg-blue-50 p-3 rounded-lg border-l-2 border-blue-200 mb-3">
            <p className="text-sm text-gray-700 italic">
              <Heart className="h-3 w-3 inline mr-1" />
              {event.family_support_message}
            </p>
          </div>
        )}
        
        <Badge className={getCategoryColor(event.category)}>
          {getCategoryLabel(event.category)}
        </Badge>
      </CardContent>
    </Card>
  );
};
