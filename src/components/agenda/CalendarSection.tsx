
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { fr } from 'date-fns/locale';

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
      return 'rounded-md border scale-90 w-full'; // Mobile - réduit la taille
    } else if (isTablet) {
      return 'rounded-md border w-full scale-105'; // Tablette - augmenté
    } else {
      return 'rounded-md border w-full scale-110'; // Desktop - augmenté
    }
  };

  // Fonction pour obtenir les classes de container selon la version
  const getContainerClasses = () => {
    if (isMobile) {
      return 'flex justify-center items-center w-full overflow-hidden'; // Mobile
    } else if (isTablet) {
      return 'flex justify-center items-center w-full min-h-[350px] px-2'; // Tablette
    } else {
      return 'flex justify-center items-center w-full min-h-[450px] px-8'; // Desktop
    }
  };

  // Fonction pour obtenir les classes du titre selon la version
  const getTitleClasses = () => {
    if (isMobile) {
      return 'text-base'; // Mobile
    } else if (isTablet) {
      return 'text-lg'; // Tablette
    } else {
      return 'text-xl'; // Desktop
    }
  };

  // Fonction pour obtenir les classes de padding selon la version
  const getCardPadding = () => {
    if (isMobile) {
      return 'p-3'; // Mobile
    } else if (isTablet) {
      return 'p-4'; // Tablette
    } else {
      return 'p-6'; // Desktop
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader className={getCardPadding()}>
        <CardTitle className={`flex items-center ${getTitleClasses()}`}>
          <CalendarIcon className="h-5 w-5 mr-2" />
          Calendrier des Activités
        </CardTitle>
      </CardHeader>
      <CardContent className={getCardPadding()}>
        <div className={getContainerClasses()}>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onSelectDate}
            className={getCalendarClasses()}
            locale={fr}
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
