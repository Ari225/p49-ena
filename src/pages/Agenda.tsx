
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
    selectedDate && event.calendarDate.toDateString() === selectedDate.toDateString()
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
      return 'grid-cols-1 gap-6'; // Mobile - plus d'espace
    } else if (isTablet) {
      return 'grid-cols-2 gap-8'; // Tablette - plus d'espace
    } else {
      return 'md:grid-cols-2 lg:grid-cols-3 gap-8'; // Desktop - plus d'espace
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-primary/5">
        <AgendaHeader />

        {/* Contenu principal redesigné */}
        <section className={`py-20 ${getPaddingClasses()}`}>
          <div className="container mx-auto px-0">
            {/* Section calendrier et événements du jour - Design amélioré */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
                <CalendarSection 
                  selectedDate={selectedDate} 
                  onSelectDate={setSelectedDate} 
                  hasEvents={hasEvents} 
                />
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
                <DayEventsSection 
                  selectedDate={selectedDate} 
                  selectedDateEvents={selectedDateEvents} 
                  formatDate={formatDate} 
                  getEventTypeColor={getEventTypeColor} 
                  handleAddToCalendar={handleAddToCalendar} 
                />
              </div>
            </div>

            {/* Activités à venir - Design amélioré */}
            <div className="mb-16">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl shadow-lg border border-white/30 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary to-primary/90 text-white">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <span className="w-2 h-8 bg-secondary rounded-full mr-4"></span>
                    Activités à venir
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className={`grid ${getGridClasses()}`}>
                    {upcomingActivities.map(activity => (
                      <div key={activity.id} className="transform hover:scale-[1.02] transition-all duration-300">
                        <ActivityCard 
                          activity={activity} 
                          getEventTypeColor={getEventTypeColor} 
                          handleAddToCalendar={handleAddToCalendar} 
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </div>
            </div>

            {/* Activités récentes - Design amélioré */}
            <div>
              <div className="bg-gradient-to-r from-gray-100/80 to-gray-200/60 rounded-2xl shadow-lg border border-white/30 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 text-white">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <span className="w-2 h-8 bg-secondary rounded-full mr-4"></span>
                    Activités récentes
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className={`grid ${getGridClasses()}`}>
                    {pastActivities.map(activity => (
                      <div key={activity.id} className="transform hover:scale-[1.02] transition-all duration-300">
                        <ActivityCard 
                          activity={activity} 
                          getEventTypeColor={getEventTypeColor} 
                          handleAddToCalendar={handleAddToCalendar} 
                          isPast={true} 
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Agenda;
