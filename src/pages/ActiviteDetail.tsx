
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock, ArrowLeft, CalendarPlus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { addToCalendar, parseEventDate } from '@/utils/calendarUtils';
import { useToast } from '@/hooks/use-toast';

const ActiviteDetail = () => {
  const { id } = useParams();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Données simulées des activités
  const allActivities = [
    {
      id: 1,
      title: "Formation en Leadership Public",
      date: "15 Avril 2024",
      time: "09:00 - 17:00",
      location: "ENA Abidjan",
      participants: "25 places disponibles",
      description: "Formation intensive sur les techniques de leadership dans l'administration publique moderne. Cette formation couvre les aspects essentiels du leadership, la gestion d'équipe, et les stratégies de communication efficace dans un contexte administratif.",
      type: "Formation",
      status: "À venir",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Conférence sur la Digitalisation",
      date: "22 Avril 2024", 
      time: "14:00 - 18:00",
      location: "Hôtel Ivoire",
      participants: "100 participants",
      description: "Conférence sur les enjeux de la transformation numérique dans les services publics. Découvrez les dernières innovations technologiques et leur impact sur l'efficacité administrative.",
      type: "Conférence",
      status: "À venir",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Assemblée Générale Ordinaire",
      date: "20 Mars 2024",
      time: "09:00 - 16:00", 
      location: "ENA Abidjan",
      participants: "80 membres présents",
      description: "Assemblée générale ordinaire avec présentation du bilan et perspectives 2024. Participation active de tous les membres pour définir les orientations futures de l'association.",
      type: "Assemblée",
      status: "Terminé",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=400&fit=crop"
    },
    {
      id: 4,
      title: "Atelier Gestion de Projet",
      date: "10 Mars 2024",
      time: "08:30 - 12:30",
      location: "Centre de formation",
      participants: "15 participants",
      description: "Atelier pratique sur la gestion de projet dans l'administration publique. Méthodologies agiles, outils de planification et techniques de suivi de projet.",
      type: "Atelier",
      status: "Terminé",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=400&fit=crop"
    }
  ];

  const activity = allActivities.find(a => a.id === parseInt(id || '0'));

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

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section avec Image */}
        <div className="relative">
          <div className="h-80 md:h-96 overflow-hidden">
            <img 
              src={activity.image} 
              alt={activity.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
          
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
                  activity.status === 'À venir' 
                    ? 'bg-primary/90 text-white' 
                    : 'bg-gray-500/90 text-white'
                }`}>
                  {activity.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm ${
                  activity.status === 'À venir'
                    ? 'bg-green-500/90 text-white'
                    : 'bg-gray-400/90 text-white'
                }`}>
                  {activity.status}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                {activity.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/90">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {activity.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {activity.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {activity.location}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  {activity.participants}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className={`max-w-4xl mx-auto py-12 ${isMobile ? 'px-6' : 'px-8'}`}>
          {/* Description */}
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-primary flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Description de l'activité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-base">
                {activity.description}
              </p>
            </CardContent>
          </Card>

          {/* Bouton d'action */}
          {activity.status === 'À venir' && (
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
