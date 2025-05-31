
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, AlertCircle, Stethoscope, Car } from 'lucide-react';
import { EventCategory, DifficultEvent } from '@/types/difficultEvents';
import { EventCard } from './EventCard';
import { EmptyEventState } from './EmptyEventState';

interface EventCategoryTabsProps {
  events: DifficultEvent[];
}

const categories: EventCategory[] = [
  { id: 'tous', label: 'Tous', icon: Heart },
  { id: 'deces', label: 'Décès', icon: Heart },
  { id: 'maladie', label: 'Maladies', icon: Stethoscope },
  { id: 'accident', label: 'Accidents', icon: Car },
  { id: 'autre_difficile', label: 'Autres', icon: AlertCircle }
];

export const EventCategoryTabs: React.FC<EventCategoryTabsProps> = ({ events }) => {
  const getFilteredEvents = (category: string) => {
    if (category === 'tous') return events;
    return events.filter(event => event.category === category);
  };

  return (
    <Tabs defaultValue="tous" className="w-full">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex items-center gap-1 text-xs lg:text-sm"
            >
              <IconComponent className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="hidden sm:inline">{category.label}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>

      {categories.map((category) => (
        <TabsContent key={category.id} value={category.id} className="space-y-6">
          {getFilteredEvents(category.id).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredEvents(category.id).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <EmptyEventState />
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};
