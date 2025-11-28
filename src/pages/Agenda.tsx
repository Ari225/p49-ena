
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Edit, Calendar as CalendarIcon } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { useActivities } from '@/hooks/useActivities';
import AgendaHeader from '@/components/agenda/AgendaHeader';
import CalendarSection from '@/components/agenda/CalendarSection';
import { Activity } from '@/types/activity';

const Agenda = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { activities, loading } = useActivities();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Calculer le statut automatique basé sur la date/heure
  const getActivityStatus = (activity: Activity) => {
    const now = new Date();
    const activityDate = new Date(activity.date);
    
    if (activity.end_time) {
      const [hours, minutes] = activity.end_time.split(':');
      const activityEndDateTime = new Date(activityDate);
      activityEndDateTime.setHours(parseInt(hours), parseInt(minutes));
      return activityEndDateTime < now ? 'Terminé' : 'À venir';
    }
    
    if (activity.start_time) {
      const [hours, minutes] = activity.start_time.split(':');
      const activityStartDateTime = new Date(activityDate);
      activityStartDateTime.setHours(parseInt(hours), parseInt(minutes));
      return activityStartDateTime < now ? 'Terminé' : 'À venir';
    }
    
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    return activityDate < todayStart ? 'Terminé' : 'À venir';
  };

  // Séparer les activités à venir et récentes avec limite de 6
  const upcomingActivities = activities
    .filter(activity => getActivityStatus(activity) === 'À venir')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6);
    
  const pastActivities = activities
    .filter(activity => getActivityStatus(activity) === 'Terminé')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  // Filtrer les événements par date sélectionnée
  const selectedDateEvents = activities.filter(activity => {
    if (!selectedDate) return false;
    const activityDate = new Date(activity.date);
    return activityDate.toDateString() === selectedDate.toDateString();
  });

  // Fonction pour déterminer si une date a des événements
  const hasEvents = (date: Date) => {
    return activities.some(activity => {
      const activityDate = new Date(activity.date);
      return activityDate.toDateString() === date.toDateString();
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleAddToCalendar = (activity: Activity) => {
    const activityDate = new Date(activity.date);
    const startTime = activity.start_time || '09:00';
    const endTime = activity.end_time || '17:00';
    
    const [startHours, startMinutes] = startTime.split(':');
    const [endHours, endMinutes] = endTime.split(':');
    
    const startDate = new Date(activityDate);
    startDate.setHours(parseInt(startHours), parseInt(startMinutes));
    
    const endDate = new Date(activityDate);
    endDate.setHours(parseInt(endHours), parseInt(endMinutes));

    if (isMobile || isTablet) {
      // Pour mobile et tablette : ouvrir Google Calendar
      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(activity.title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(activity.brief_description)}&location=${encodeURIComponent(activity.location)}`;
      window.open(googleCalendarUrl, '_blank');
    } else {
      // Pour desktop : télécharger fichier ICS
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//P49//P49 Events//EN',
        'BEGIN:VEVENT',
        `UID:${activity.id}@p49.com`,
        `DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        `DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        `SUMMARY:${activity.title}`,
        `DESCRIPTION:${activity.brief_description}`,
        `LOCATION:${activity.location}`,
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${activity.title}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
    
    toast({
      title: "Événement ajouté !",
      description: "L'activité a été sauvegardée dans votre calendrier."
    });
  };

  const handleViewDetails = (activityId: string) => {
    navigate(`/activites/${activityId}`);
  };

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
      <div className="min-h-screen bg-white">
        <AgendaHeader />

        {/* Contenu principal redesigné */}
        <section className={`py-16 ${getPaddingClasses()}`}>
          <div className="container mx-auto px-0">
            {/* Section calendrier et événements du jour */}
            <div className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CalendarSection 
                  selectedDate={selectedDate} 
                  onSelectDate={setSelectedDate} 
                  hasEvents={hasEvents} 
                />
                
                {/* Événements du jour sélectionné */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    {selectedDate ? formatDate(selectedDate) : 'Sélectionnez une date'}
                  </h3>
                  
                  {selectedDateEvents.length > 0 ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {selectedDateEvents.map(activity => {
                        const currentStatus = getActivityStatus(activity);
                        const isPast = currentStatus === 'Terminé';
                        
                        return (
                          <Card key={activity.id} className={`hover:shadow-md transition-shadow ${isPast ? 'opacity-80' : ''}`}>
                            {(activity.image || activity.image_url) && (
                              <div className="w-full aspect-square overflow-hidden rounded-t-lg">
                                <img 
                                  src={activity.image || activity.image_url} 
                                  alt={activity.title} 
                                  className={`w-full h-full object-cover ${isPast ? 'grayscale' : ''}`} 
                                />
                              </div>
                            )}
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${isPast ? 'bg-gray-500 text-white' : 'bg-primary text-white'}`}>
                                  {activity.other_category || activity.category}
                                </span>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${currentStatus === 'À venir' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                  {currentStatus}
                                </span>
                              </div>
                              
                              <h4 className={`font-semibold mb-2 ${isPast ? 'text-gray-600' : 'text-primary'}`}>
                                {activity.title}
                              </h4>
                              
                              <div className={`space-y-1 text-sm mb-3 ${isPast ? 'text-gray-500' : 'text-gray-700'}`}>
                                <div className="flex items-center">
                                  <Clock className={`w-4 h-4 mr-2 ${isPast ? 'text-gray-500' : 'text-primary'}`} />
                                  <span>
                                    {activity.start_time}
                                    {activity.end_time && ` - ${activity.end_time}`}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className={`w-4 h-4 mr-2 ${isPast ? 'text-gray-500' : 'text-primary'}`} />
                                  <span>{activity.location}</span>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="flex-1 text-xs"
                                  onClick={() => handleViewDetails(activity.id)}
                                >
                                  Détails
                                </Button>
                                 {!isPast && (
                                   <Button 
                                     size="sm" 
                                     className="text-xs bg-green-600 hover:bg-green-700 text-white"
                                     onClick={() => handleAddToCalendar(activity)}
                                   >
                                     <Calendar className="w-3 h-3 mr-1" />
                                     Ajouter
                                   </Button>
                                 )}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p>Aucune activité prévue pour cette date</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Activités à venir - Design épuré */}
            <div className="mb-16">
              <div className="bg-gray-50/50 border-b border-gray-100 mb-6 pb-4">
                <div className="text-xl font-medium text-gray-900 flex items-center">
                  <span className="w-1 h-6 bg-primary rounded-full mr-3"></span>
                  Activités à venir
                </div>
              </div>
              
              {upcomingActivities.length > 0 ? (
                <div className={`grid ${getGridClasses()}`}>
                  {upcomingActivities.map(activity => {
                    const currentStatus = getActivityStatus(activity);
                    const isPast = currentStatus === 'Terminé';
                    
                    return (
                      <Card key={activity.id} className={`hover:shadow-lg transition-shadow duration-300 ${isPast ? 'opacity-80' : ''}`}>
                        {(activity.image || activity.image_url) && (
                          <div className="w-full aspect-square overflow-hidden rounded-t-lg">
                            <img 
                              src={activity.image || activity.image_url} 
                              alt={activity.title} 
                              className={`w-full h-full object-cover ${isPast ? 'grayscale' : ''}`} 
                            />
                          </div>
                        )}
                        <CardContent className="p-4 md:p-6">
                          <div className="flex justify-between items-start mb-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${isPast ? 'bg-gray-500 text-white' : 'bg-primary text-white'}`}>
                              {activity.other_category || activity.category}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${currentStatus === 'À venir' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                              {currentStatus}
                            </span>
                          </div>
                          
                          <h4 className={`font-semibold mb-3 ${isPast ? 'text-gray-600' : 'text-primary'} ${isMobile ? 'text-lg' : isTablet ? 'text-lg' : 'text-xl md:text-xl'}`}>
                            {activity.title}
                          </h4>
                          
                          <div className={`space-y-2 mb-4 ${isPast ? 'text-gray-500' : 'text-gray-700'} ${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm md:text-sm'}`}>
                            <div className="flex items-center">
                              <Calendar className={`w-4 h-4 mr-2 ${isPast ? 'text-gray-500' : 'text-primary'}`} />
                              <span>{new Date(activity.date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className={`w-4 h-4 mr-2 ${isPast ? 'text-gray-500' : 'text-primary'}`} />
                              <span>
                                {activity.start_time}
                                {activity.end_time && ` - ${activity.end_time}`}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className={`w-4 h-4 mr-2 ${isPast ? 'text-gray-500' : 'text-primary'}`} />
                              <span>{activity.location}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className={`flex-1 ${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm md:text-sm'}`}
                              onClick={() => handleViewDetails(activity.id)}
                            >
                              Détails
                            </Button>
                            {!isPast && (
                              <Button 
                                size="sm" 
                                className={`bg-green-600 hover:bg-green-700 text-white ${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm md:text-sm'}`}
                                onClick={() => handleAddToCalendar(activity)}
                              >
                                <Calendar className="w-4 h-4 mr-1" />
                                Ajouter
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>Aucune activité à venir</p>
                </div>
              )}
            </div>

            {/* Activités récentes */}
            {pastActivities.length > 0 && (
              <div>
                <div className="bg-gray-50/50 border-b border-gray-100 mb-6 pb-4">
                  <div className="text-xl font-medium text-gray-600 flex items-center">
                    <span className="w-1 h-6 bg-gray-300 rounded-full mr-3"></span>
                    Activités récentes
                  </div>
                </div>
                
                <div className={`grid ${getGridClasses()}`}>
                  {pastActivities.map(activity => {
                    const currentStatus = getActivityStatus(activity);
                    const isPast = currentStatus === 'Terminé';
                    
                    return (
                      <Card key={activity.id} className={`hover:shadow-lg transition-shadow duration-300 ${isPast ? 'opacity-80' : ''}`}>
                        {(activity.image || activity.image_url) && (
                          <div className="w-full h-48 overflow-hidden rounded-t-lg">
                            <img 
                              src={activity.image || activity.image_url} 
                              alt={activity.title} 
                              className={`w-full h-full object-cover ${isPast ? 'grayscale' : ''}`} 
                            />
                          </div>
                        )}
                        <CardContent className="p-4 md:p-6">
                          <div className="flex justify-between items-start mb-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${isPast ? 'bg-gray-500 text-white' : 'bg-primary text-white'}`}>
                              {activity.other_category || activity.category}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${currentStatus === 'À venir' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                              {currentStatus}
                            </span>
                          </div>
                          
                          <h4 className={`font-semibold mb-3 ${isPast ? 'text-gray-600' : 'text-primary'} ${isMobile ? 'text-lg' : isTablet ? 'text-lg' : 'text-xl md:text-xl'}`}>
                            {activity.title}
                          </h4>
                          
                          <div className={`space-y-2 mb-4 ${isPast ? 'text-gray-500' : 'text-gray-700'} ${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm md:text-sm'}`}>
                            <div className="flex items-center">
                              <Calendar className={`w-4 h-4 mr-2 ${isPast ? 'text-gray-500' : 'text-primary'}`} />
                              <span>{new Date(activity.date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className={`w-4 h-4 mr-2 ${isPast ? 'text-gray-500' : 'text-primary'}`} />
                              <span>
                                {activity.start_time}
                                {activity.end_time && ` - ${activity.end_time}`}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className={`w-4 h-4 mr-2 ${isPast ? 'text-gray-500' : 'text-primary'}`} />
                              <span>{activity.location}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className={`flex-1 ${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm md:text-sm'}`}
                              onClick={() => handleViewDetails(activity.id)}
                            >
                              Détails
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Agenda;
