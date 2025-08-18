
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock, ChevronRight, CalendarPlus, Eye } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { addToCalendar, parseEventDate } from '@/utils/calendarUtils';
import { useToast } from '@/hooks/use-toast';
import { useActivities } from '@/hooks/useActivities';

const ActivitesSection = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { toast } = useToast();
  const { activities, loading } = useActivities();

  // Filtrer et trier les activités selon la date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingActivities = activities
    .filter(activity => new Date(activity.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 2);

  const pastActivities = activities
    .filter(activity => new Date(activity.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  const handleAddToCalendar = (activity: any) => {
    try {
      // Sur mobile/tablette, créer une URL pour ouvrir directement le calendrier
      if (isMobile || isTablet) {
        const startDate = new Date(activity.date);
        if (activity.start_time) {
          const [hours, minutes] = activity.start_time.split(':');
          startDate.setHours(parseInt(hours), parseInt(minutes));
        }
        
        const endDate = new Date(activity.date);
        if (activity.end_time) {
          const [hours, minutes] = activity.end_time.split(':');
          endDate.setHours(parseInt(hours), parseInt(minutes));
        } else {
          endDate.setHours(startDate.getHours() + 2); // Durée par défaut de 2h
        }
        
        // Formater pour Google Calendar
        const formatDateForGoogle = (date: Date) => {
          return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };
        
        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(activity.title)}&dates=${formatDateForGoogle(startDate)}/${formatDateForGoogle(endDate)}&details=${encodeURIComponent(activity.brief_description || activity.description)}&location=${encodeURIComponent(activity.location)}`;
        
        window.open(googleCalendarUrl, '_blank');
        
        toast({
          title: "Calendrier ouvert !",
          description: "L'événement s'ouvre dans votre application calendrier."
        });
      } else {
        // Sur desktop, télécharger le fichier ICS
        const timeRange = activity.start_time && activity.end_time 
          ? `${activity.start_time} - ${activity.end_time}` 
          : '09:00 - 17:00';
        
        const { startDate, endDate } = parseEventDate(activity.date, timeRange);
        
        addToCalendar({
          title: activity.title,
          description: `${activity.brief_description || activity.description}\n\nCatégorie: ${activity.other_category || activity.category}`,
          startDate,
          endDate,
          location: activity.location
        });
        
        toast({
          title: "Événement ajouté !",
          description: "L'activité a été sauvegardée dans votre calendrier."
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'événement au calendrier.",
        variant: "destructive"
      });
    }
  };

  // Fonctions pour obtenir les classes selon la version
  const getSectionPadding = () => {
    if (isMobile) {
      return 'py-12 px-[25px]'; // Mobile
    } else if (isTablet) {
      return 'py-14 px-[50px]'; // Tablette
    } else {
      return 'py-16 lg:py-[100px] px-4 md:px-8 lg:px-[100px]'; // Desktop
    }
  };

  const getTitleClasses = () => {
    if (isMobile) {
      return 'text-xl'; // Mobile
    } else if (isTablet) {
      return 'text-2xl'; // Tablette
    } else {
      return 'text-3xl md:text-3xl'; // Desktop
    }
  };

  const getDescriptionClasses = () => {
    if (isMobile) {
      return 'text-xs'; // Mobile
    } else if (isTablet) {
      return 'text-sm'; // Tablette
    } else {
      return 'text-base md:text-base'; // Desktop
    }
  };

  const getSectionTitleClasses = () => {
    if (isMobile) {
      return 'text-base'; // Mobile
    } else if (isTablet) {
      return 'text-lg'; // Tablette
    } else {
      return 'text-lg md:text-lg'; // Desktop
    }
  };

  const getGridClasses = () => {
    if (isMobile) {
      return 'grid grid-cols-1 gap-4'; // Mobile - 1 colonne
    } else if (isTablet) {
      return 'grid grid-cols-2 gap-5'; // Tablette - 2 colonnes
    } else {
      return 'grid grid-cols-1 md:grid-cols-2 gap-6'; // Desktop - 2 colonnes
    }
  };

  const getButtonClasses = () => {
    if (isMobile) {
      return 'w-full text-xs'; // Mobile - pleine largeur
    } else if (isTablet) {
      return 'text-sm'; // Tablette - largeur normale
    } else {
      return 'text-sm md:text-sm'; // Desktop - largeur normale
    }
  };

  return (
    <section className={`bg-white ${getSectionPadding()}`}>
      <div className="container mx-auto px-0">
        <div className="text-center mb-[50px] md:mb-[50px]">
          <h2 className={`${getTitleClasses()} font-bold text-primary mb-[10px] md:mb-[10px]`}>
            Agenda
          </h2>
          <p className={`text-gray-700 max-w-3xl mx-auto ${getDescriptionClasses()}`}>
            Découvrez nos activités à venir et nos événements récents
          </p>
        </div>

        {/* Activités à venir */}
        <div className="mb-8 md:mb-12">
          <h3 className={`${getSectionTitleClasses()} font-semibold text-primary mb-[10px] md:mb-[10px] flex items-center`}>
            <Calendar className="w-5 h-5 mr-2" />
            Activités à venir
          </h3>
          <div className={getGridClasses()}>
            {upcomingActivities.slice(0, 2).map(activity => (
              <Card key={activity.id} className="hover:shadow-lg transition-shadow duration-300">
                {(activity.image || activity.image_url) && (
                  <div className="w-full h-48 overflow-hidden rounded-t-lg">
                    <img src={activity.image || activity.image_url} alt={activity.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <CardContent className="p-4 md:p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-primary text-white px-2 py-1 rounded text-xs font-medium">
                      {activity.other_category || activity.category}
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                      {activity.status}
                    </span>
                  </div>
                  
                  <h4 className={`font-semibold text-primary mb-3 text-lg ${isMobile ? 'text-lg' : isTablet ? 'text-xl' :'text-xl md:text-xl'}`}>
                    {activity.title}
                  </h4>
                  
                  <p className={`text-gray-700 mb-4 ${isMobile ? 'text-xs' : isTablet ? 'text-sm' :'text-sm md:text-sm'}`}>
                    {activity.brief_description}
                  </p>
                  
                  <div className={`space-y-2 text-gray-700 mb-4 ${isMobile ? 'text-xs' : isTablet ? 'text-sm' :'text-sm md:text-sm'}`}>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      <span>{new Date(activity.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      <span>
                        {activity.start_time}
                        {activity.end_time && ` - ${activity.end_time}`}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      <span>{activity.location}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button asChild variant="outline" className={`flex-1 ${isMobile ? 'text-xs' : isTablet ? 'text-sm' :'text-sm md:text-sm'}`}>
                      <Link to={`/activites/${activity.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        Voir détails
                      </Link>
                    </Button>
                    <Button 
                      onClick={() => handleAddToCalendar(activity)} 
                      className="bg-green-600 hover:bg-green-700 text-white" 
                      size="sm"
                    >
                      <CalendarPlus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Activités passées - Afficher seulement s'il y en a */}
        {pastActivities.length > 0 && (
          <div className="mb-8 md:mb-12">
            <h3 className={`${getSectionTitleClasses()} font-semibold text-primary mb-[10px] md:mb-[10px] flex items-center`}>
              <Calendar className="w-5 h-5 mr-2" />
              Activités récentes
            </h3>
            <div className={getGridClasses()}>
            {pastActivities.map(activity => (
              <Card key={activity.id} className="hover:shadow-lg transition-shadow duration-300 opacity-80">
                {(activity.image || activity.image_url) && (
                  <div className="w-full h-48 overflow-hidden rounded-t-lg">
                    <img src={activity.image || activity.image_url} alt={activity.title} className="w-full h-full object-cover grayscale" />
                  </div>
                )}
                <CardContent className="p-4 md:p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-medium">
                      {activity.other_category || activity.category}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                      Terminé
                    </span>
                  </div>
                  
                  <h4 className={`font-semibold text-gray-600 mb-3 text-lg ${isMobile ? 'text-lg' : isTablet ? 'text-lg' :'text-xl md:text-xl'}`}>
                    {activity.title}
                  </h4>
                  
                  <p className={`text-gray-500 mb-4 ${isMobile ? 'text-xs' : isTablet ? 'text-sm' :'text-sm md:text-sm'}`}>
                    {activity.brief_description}
                  </p>
                  
                  <div className={`space-y-2 text-gray-500 mb-4 ${isMobile ? 'text-xs' : isTablet ? 'text-sm' :'text-sm md:text-sm'}`}>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{new Date(activity.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      <span>
                        {activity.start_time}
                        {activity.end_time && ` - ${activity.end_time}`}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{activity.location}</span>
                    </div>
                  </div>

                  <Button asChild variant="outline" className={`w-full ${isMobile ? 'text-xs' : isTablet ? 'text-sm' :'text-sm md:text-sm'}`}>
                    <Link to={`/activites/${activity.id}`}>
                      <Eye className="w-4 h-4 mr-2" />
                      Voir détails
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <Button asChild className={`bg-primary hover:bg-primary text-white py-[5px] px-[15px] h-10 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold ${getButtonClasses()}`}>
            <Link to="/agenda" className="flex items-center justify-center">
              Voir toutes nos activités
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ActivitesSection;
