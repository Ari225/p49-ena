
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
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Filtrer les événements par date sélectionnée
  const selectedDateEvents = allActivities.filter(event => 
    selectedDate && 
    event.calendarDate.toDateString() === selectedDate.toDateString()
  );

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
      const { startDate, endDate } = parseEventDate(activity.date, activity.time);
      
      addToCalendar({
        title: activity.title,
        description: `${activity.description}\n\nType: ${activity.type}\nParticipants: ${activity.participants}`,
        startDate,
        endDate,
        location: activity.location
      });

      toast({
        title: "Événement ajouté !",
        description: "L'activité a été sauvegardée dans votre calendrier.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'événement au calendrier.",
        variant: "destructive",
      });
    }
  };

  // Séparer les activités à venir et récentes avec images de galerie
  const upcomingActivities = allActivities.filter(activity => activity.status === 'À venir').map(activity => ({
    ...activity,
    image: activity.id === 1 ? "/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg" :
           activity.id === 2 ? "/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg" :
           activity.id === 5 ? "/lovable-uploads/8cbb0164-0529-47c1-9caa-8244c17623b3.jpg" :
           activity.id === 6 ? "/lovable-uploads/cdf92e8b-3396-4192-b8a1-f94647a7b289.jpg" :
           "/lovable-uploads/Equipe.jpg"
  }));

  const pastActivities = allActivities.filter(activity => activity.status === 'Terminé').map(activity => ({
    ...activity,
    image: activity.id === 3 ? "/lovable-uploads/Equipe1.jpg" :
           activity.id === 4 ? "/lovable-uploads/P49Grid.webp" :
           activity.id === 7 ? "/lovable-uploads/Pers49.webp" :
           "/lovable-uploads/bonheur.jpg"
  }));

  // ========== VERSION MOBILE ==========
  if (isMobile) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <AgendaHeader />

          {/* Contenu principal mobile */}
          <section className="py-8 px-[25px]">
            {/* Calendrier et événements du jour - Mobile */}
            <div className="space-y-6 mb-8">
              <CalendarSection
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                hasEvents={hasEvents}
              />

              <DayEventsSection
                selectedDate={selectedDate}
                selectedDateEvents={selectedDateEvents}
                formatDate={formatDate}
                getEventTypeColor={getEventTypeColor}
                handleAddToCalendar={handleAddToCalendar}
              />
            </div>

            {/* Activités à venir - Mobile */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Activités à venir</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingActivities.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      getEventTypeColor={getEventTypeColor}
                      handleAddToCalendar={handleAddToCalendar}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activités récentes - Mobile */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activités récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pastActivities.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      getEventTypeColor={getEventTypeColor}
                      handleAddToCalendar={handleAddToCalendar}
                      isPast={true}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </Layout>
    );
  }

  // ========== VERSION TABLETTE ==========
  if (isTablet) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <AgendaHeader />

          {/* Contenu principal tablette */}
          <section className="py-12 px-8">
            {/* Calendrier et événements du jour - Tablette */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              <CalendarSection
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                hasEvents={hasEvents}
              />

              <DayEventsSection
                selectedDate={selectedDate}
                selectedDateEvents={selectedDateEvents}
                formatDate={formatDate}
                getEventTypeColor={getEventTypeColor}
                handleAddToCalendar={handleAddToCalendar}
              />
            </div>

            {/* Activités à venir - Tablette */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Activités à venir</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingActivities.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      getEventTypeColor={getEventTypeColor}
                      handleAddToCalendar={handleAddToCalendar}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activités récentes - Tablette */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Activités récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pastActivities.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      getEventTypeColor={getEventTypeColor}
                      handleAddToCalendar={handleAddToCalendar}
                      isPast={true}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </Layout>
    );
  }

  // ========== VERSION DESKTOP ==========
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <AgendaHeader />

        {/* Contenu principal desktop */}
        <section className="py-16 px-[100px]">
          {/* Calendrier et événements du jour - Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <CalendarSection
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              hasEvents={hasEvents}
            />

            <DayEventsSection
              selectedDate={selectedDate}
              selectedDateEvents={selectedDateEvents}
              formatDate={formatDate}
              getEventTypeColor={getEventTypeColor}
              handleAddToCalendar={handleAddToCalendar}
            />
          </div>

          {/* Activités à venir - Desktop */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Activités à venir</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingActivities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    getEventTypeColor={getEventTypeColor}
                    handleAddToCalendar={handleAddToCalendar}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activités récentes - Desktop */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Activités récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastActivities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    getEventTypeColor={getEventTypeColor}
                    handleAddToCalendar={handleAddToCalendar}
                    isPast={true}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default Agenda;
