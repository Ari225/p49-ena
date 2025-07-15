
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
      return 'rounded-md border scale-90 w-full'; // Mobile - réduit la taille pour éviter le débordement
    } else if (isTablet) {
      return 'rounded-md border'; // Tablette - taille normale
    } else {
      return 'rounded-md border'; // Desktop - taille normale
    }
  };

  // Fonction pour obtenir les classes de container selon la version
  const getContainerClasses = () => {
    if (isMobile) {
      return 'flex justify-center items-center w-full overflow-hidden'; // Mobile - centre avec gestion du débordement
    } else if (isTablet) {
      return 'flex justify-center items-center w-full min-h-[400px] px-4'; // Tablette - centre le calendrier avec plus d'espace
    } else {
      return 'flex justify-center items-center w-full min-h-[450px] px-8'; // Desktop - centre le calendrier avec plus d'espace
    }
  };

  return (
    <Card className="h-fit">
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
