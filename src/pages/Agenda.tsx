
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
      return 'grid-cols-1 gap-6'; // Mobile
    } else if (isTablet) {
      return 'grid-cols-2 gap-8'; // Tablette
    } else {
      return 'md:grid-cols-2 lg:grid-cols-3 gap-8'; // Desktop
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100">
        <AgendaHeader />

        {/* Contenu principal avec nouveau design */}
        <section className={`py-20 ${getPaddingClasses()}`}>
          <div className="container mx-auto px-4">
            {/* Section calendrier et événements du jour avec design amélioré */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-2xl shadow-lg border border-blue-100/50 overflow-hidden">
                  <CalendarSection
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                    hasEvents={hasEvents}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-white to-indigo-50/50 rounded-2xl shadow-lg border border-indigo-100/50 overflow-hidden">
                  <DayEventsSection
                    selectedDate={selectedDate}
                    selectedDateEvents={selectedDateEvents}
                    formatDate={formatDate}
                    getEventTypeColor={getEventTypeColor}
                    handleAddToCalendar={handleAddToCalendar}
                  />
                </div>
              </div>
            </div>

            {/* Activités à venir avec design moderne */}
            <div className="mb-16">
              <div className="bg-gradient-to-br from-white via-green-50/30 to-emerald-50/50 rounded-3xl shadow-xl border border-green-100/50 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <div className="w-2 h-8 bg-white rounded-full mr-4"></div>
                    Activités à venir
                  </h2>
                  <p className="text-green-100 mt-2">Découvrez nos prochains événements</p>
                </div>
                <div className="p-8">
                  <div className={`grid ${getGridClasses()}`}>
                    {upcomingActivities.map((activity) => (
                      <div key={activity.id} className="transform hover:scale-105 transition-all duration-300">
                        <ActivityCard
                          activity={activity}
                          getEventTypeColor={getEventTypeColor}
                          handleAddToCalendar={handleAddToCalendar}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Activités récentes avec design élégant */}
            <div>
              <div className="bg-gradient-to-br from-white via-slate-50/30 to-gray-50/50 rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-slate-600 to-gray-700 px-8 py-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <div className="w-2 h-8 bg-white rounded-full mr-4"></div>
                    Activités récentes
                  </h2>
                  <p className="text-slate-200 mt-2">Retour sur nos événements passés</p>
                </div>
                <div className="p-8">
                  <div className={`grid ${getGridClasses()}`}>
                    {pastActivities.map((activity) => (
                      <div key={activity.id} className="transform hover:scale-105 transition-all duration-300">
                        <ActivityCard
                          activity={activity}
                          getEventTypeColor={getEventTypeColor}
                          handleAddToCalendar={handleAddToCalendar}
                          isPast={true}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Agenda;
