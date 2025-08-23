
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock, ArrowLeft, CalendarPlus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { addToCalendar, parseEventDate } from '@/utils/calendarUtils';
import { useToast } from '@/hooks/use-toast';
import { useActivities } from '@/hooks/useActivities';

const ActiviteDetail = () => {
  const { id } = useParams();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { activities } = useActivities();

  const activity = activities.find(a => a.id === id);

  // Calculer le statut automatique basé sur la date/heure
  const getActivityStatus = (activity: any) => {
    if (!activity) return 'À venir';
    
    const now = new Date();
    const activityDate = new Date(activity.date);
    
    // Si l'activité a une heure de fin, vérifier si elle est passée
    if (activity.end_time) {
      const [hours, minutes] = activity.end_time.split(':');
      const activityEndDateTime = new Date(activityDate);
      activityEndDateTime.setHours(parseInt(hours), parseInt(minutes));
      return activityEndDateTime < now ? 'Terminé' : 'À venir';
    }
    
    // Si l'activité a une heure de début, vérifier si elle est passée
    if (activity.start_time) {
      const [hours, minutes] = activity.start_time.split(':');
      const activityStartDateTime = new Date(activityDate);
      activityStartDateTime.setHours(parseInt(hours), parseInt(minutes));
      return activityStartDateTime < now ? 'Terminé' : 'À venir';
    }
    
    // Si pas d'heure, comparer seulement les dates
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    return activityDate < todayStart ? 'Terminé' : 'À venir';
  };

  const currentStatus = activity ? getActivityStatus(activity) : 'À venir';

  if (!activity) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className={`text-center max-w-md mx-auto ${isMobile ? 'px-6' : 'px-8'}`}>
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Activité non trouvée</h1>
            <p className="text-gray-600 mb-8">L'activité que vous recherchez n'existe pas ou a été supprimée.</p>
            <Link to="/agenda">
              <Button className="bg-primary hover:bg-primary/90">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à l'agenda
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleAddToCalendar = () => {
    try {
      const timeRange = activity.start_time && activity.end_time 
        ? `${activity.start_time} - ${activity.end_time}` 
        : '09:00 - 17:00';
      
      const { startDate, endDate } = parseEventDate(activity.date, timeRange);
      
      addToCalendar({
        title: activity.title,
        description: `${activity.description}\n\nCatégorie: ${activity.other_category || activity.category}`,
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

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section avec Image */}
        <div className="relative">
          {(activity.image || activity.image_url) && (
            <div className="h-80 md:h-96 overflow-hidden">
              <img 
                src={activity.image || activity.image_url} 
                alt={activity.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
          )}
          
          {/* Bouton retour en overlay */}
          <div className="absolute top-6 left-6">
            <Link to="/agenda">
              <Button 
                variant="ghost" 
                className="text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm border border-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
            </Link>
          </div>

          {/* Contenu en overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm ${
                  currentStatus === 'À venir' 
                    ? 'bg-primary/90 text-white' 
                    : 'bg-gray-500/90 text-white'
                }`}>
                  {activity.other_category || activity.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm ${
                  currentStatus === 'À venir'
                    ? 'bg-green-500/90 text-white'
                    : 'bg-gray-400/90 text-white'
                }`}>
                  {currentStatus}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                {activity.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/90">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(activity.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {activity.start_time}
                  {activity.end_time && ` - ${activity.end_time}`}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {activity.location}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className={`max-w-4xl mx-auto py-12 ${isMobile ? 'px-6' : 'px-8'}`}>
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl text-primary flex items-center mb-6">
              <Calendar className="w-5 h-5 mr-2" />
              Description de l'activité
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              {activity.description}
            </p>
          </div>

          {/* Bouton d'action */}
          {currentStatus === 'À venir' && (
            <div className="mt-8 text-center">
              <Button
                onClick={handleAddToCalendar}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              >
                <CalendarPlus className="w-5 h-5 mr-2" />
                Ajouter au calendrier
              </Button>
            </div>
          )}

          {/* Bouton retour en bas */}
          <div className="mt-12 text-center">
            <Link to="/agenda">
              <Button variant="outline" size="lg" className="bg-white hover:bg-gray-50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voir toutes les activités
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ActiviteDetail;
