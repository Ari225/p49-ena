
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users, CalendarPlus, Eye } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

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

interface DayEventsSectionProps {
  selectedDate: Date | undefined;
  selectedDateEvents: Activity[];
  formatDate: (date: Date) => string;
  getEventTypeColor: (type: string) => string;
  handleAddToCalendar: (activity: Activity) => void;
}

const DayEventsSection = ({ 
  selectedDate, 
  selectedDateEvents, 
  formatDate, 
  getEventTypeColor, 
  handleAddToCalendar 
}: DayEventsSectionProps) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Fonction pour obtenir les classes de boutons selon la version
  const getButtonClasses = () => {
    if (isMobile) {
      return 'flex-col gap-2'; // Mobile - boutons empilés
    } else if (isTablet) {
      return 'flex-row gap-2'; // Tablette - boutons en ligne
    } else {
      return 'flex-row gap-2'; // Desktop - boutons en ligne
    }
  };

  // Fonction pour obtenir la taille de bouton selon la version
  const getButtonSize = (): "default" | "sm" | "lg" | "icon" => {
    if (isMobile) {
      return 'sm'; // Mobile - petits boutons
    } else if (isTablet) {
      return 'sm'; // Tablette - petits boutons
    } else {
      return 'sm'; // Desktop - petits boutons
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {selectedDate ? `Activités du ${formatDate(selectedDate)}` : 'Sélectionnez une date'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedDateEvents.length > 0 ? (
          <div className="space-y-4">
            {selectedDateEvents.map((event) => (
              <div key={event.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-primary">{event.title}</h3>
                  <Badge className={getEventTypeColor(event.type)}>
                    {event.type}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                <div className="space-y-1 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {event.participants}
                  </div>
                </div>
                <div className={`flex ${getButtonClasses()}`}>
                  <Button asChild size={getButtonSize()} variant="outline">
                    <Link to={`/activites/${event.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      Voir détails
                    </Link>
                  </Button>
                  {event.status === 'À venir' && (
                    <Button
                      size={getButtonSize()}
                      onClick={() => handleAddToCalendar(event)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CalendarPlus className="h-4 w-4 mr-1" />
                      {isMobile ? 'Calendrier' : 'Calendrier'}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            Aucune activité prévue pour cette date
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DayEventsSection;
