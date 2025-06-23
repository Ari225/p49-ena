
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';

interface CalendarSectionProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  hasEvents: (date: Date) => boolean;
}

const CalendarSection = ({ selectedDate, onSelectDate, hasEvents }: CalendarSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2" />
          Calendrier des Activités
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onSelectDate}
          className="rounded-md border"
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
        <div className="mt-4 text-sm text-gray-600">
          <p>Les dates en bleu indiquent des activités planifiées</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarSection;
