
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

interface CalendarSectionProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  hasEvents: (date: Date) => boolean;
}

const CalendarSection = ({ selectedDate, onSelectDate, hasEvents }: CalendarSectionProps) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Fonction pour obtenir les classes du calendrier selon la version
  const getCalendarClasses = () => {
    if (isMobile) {
      return 'rounded-md border w-full max-w-full'; // Mobile
    } else if (isTablet) {
      return 'rounded-md border w-full'; // Tablette
    } else {
      return 'rounded-md border w-full scale-110 transform'; // Desktop - étendu pour combler l'espace
    }
  };

  // Fonction pour obtenir les classes de container selon la version
  const getContainerClasses = () => {
    if (isMobile) {
      return 'flex justify-center'; // Mobile - centre le calendrier
    } else if (isTablet) {
      return 'flex justify-center'; // Tablette - centre le calendrier
    } else {
      return 'flex justify-center items-center p-4'; // Desktop - centre et ajoute du padding
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2" />
          Calendrier des Activités
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={getContainerClasses()}>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onSelectDate}
            className={getCalendarClasses()}
            modifiers={{
              hasEvents: (date) => hasEvents(date)
            }}
            modifiersStyles={{
              hasEvents: { 
                backgroundColor: '#3b82f6', 
                color: 'white',
                fontWeight: 'bold'
              }
            }}
          />
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>Les dates en bleu indiquent des activités planifiées</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarSection;
