import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { addToCalendar, parseEventDate } from '@/utils/calendarUtils';
import { useToast } from '@/hooks/use-toast';
import AgendaHeader from '@/components/agenda/AgendaHeader';
import CalendarSection from '@/components/agenda/CalendarSection';
import DayEventsSection from '@/components/agenda/DayEventsSection';
import ActivityCard from '@/components/agenda/ActivityCard';
import { allActivities, getEventTypeColor } from '@/components/agenda/agendaData';
const Agenda = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const {
    toast
  } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Filtrer les événements par date sélectionnée
  const selectedDateEvents = allActivities.filter(event => selectedDate && event.calendarDate.toDateString() === selectedDate.toDateString());

  // Fonction pour déterminer si une date a des événements
  const hasEvents = (date: Date) => {
    return allActivities.some(event => event.calendarDate.toDateString() === date.toDateString());
  };
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const handleAddToCalendar = (activity: any) => {
    try {
      const {
        startDate,
        endDate
      } = parseEventDate(activity.date, activity.time);
      addToCalendar({
        title: activity.title,
        description: `${activity.description}\n\nType: ${activity.type}\nParticipants: ${activity.participants}`,
        startDate,
        endDate,
        location: activity.location
      });
      toast({
        title: "Événement ajouté !",
        description: "L'activité a été sauvegardée dans votre calendrier."
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'événement au calendrier.",
        variant: "destructive"
      });
    }
  };

  // Séparer les activités à venir et récentes
  const upcomingActivities = allActivities.filter(activity => activity.status === 'À venir');
  const pastActivities = allActivities.filter(activity => activity.status === 'Terminé');

  // Fonction pour obtenir les classes de padding selon la version
  const getPaddingClasses = () => {
    if (isMobile) {
      return 'px-[25px]'; // Mobile
    } else if (isTablet) {
      return 'px-[50px]'; // Tablette
    } else {
      return 'px-[100px]'; // Desktop
    }
  };

  // Fonction pour obtenir les classes de grid selon la version
  const getGridClasses = () => {
    if (isMobile) {
      return 'grid-cols-1 gap-4'; // Mobile
    } else if (isTablet) {
      return 'grid-cols-2 gap-6'; // Tablette
    } else {
      return 'md:grid-cols-2 lg:grid-cols-3 gap-6'; // Desktop
    }
  };
  return <Layout>
      <div className="min-h-screen bg-gray-50">
        <AgendaHeader />

        {/* Contenu principal */}
        <section className={`py-16 ${getPaddingClasses()}`}>
          <div className="container mx-auto px-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <CalendarSection selectedDate={selectedDate} onSelectDate={setSelectedDate} hasEvents={hasEvents} />

              <DayEventsSection selectedDate={selectedDate} selectedDateEvents={selectedDateEvents} formatDate={formatDate} getEventTypeColor={getEventTypeColor} handleAddToCalendar={handleAddToCalendar} />
            </div>

            {/* Activités à venir */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Activités à venir</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`grid ${getGridClasses()}`}>
                  {upcomingActivities.map(activity => <ActivityCard key={activity.id} activity={activity} getEventTypeColor={getEventTypeColor} handleAddToCalendar={handleAddToCalendar} />)}
                </div>
              </CardContent>
            </Card>

            {/* Activités récentes */}
            <Card>
              <CardHeader>
                <CardTitle>Activités récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`grid ${getGridClasses()}`}>
                  {pastActivities.map(activity => <ActivityCard key={activity.id} activity={activity} getEventTypeColor={getEventTypeColor} handleAddToCalendar={handleAddToCalendar} isPast={true} />)}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>;
};
export default Agenda;