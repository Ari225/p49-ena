
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

  // Données simulées des activités (en réalité, cela viendrait d'une API)
  const allActivities = [
    {
      id: 1,
      title: "Formation en Leadership Public",
      date: "15 Avril 2024",
      time: "09:00 - 17:00",
      location: "ENA Abidjan",
      participants: "25 places disponibles",
      description: "Formation intensive sur les techniques de leadership dans l'administration publique moderne.",
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
      description: "Conférence sur les enjeux de la transformation numérique dans les services publics.",
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
      description: "Assemblée générale ordinaire avec présentation du bilan et perspectives 2024.",
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
      description: "Atelier pratique sur la gestion de projet dans l'administration publique.",
      type: "Atelier",
      status: "Terminé",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=400&fit=crop"
    }
  ];

  const activity = allActivities.find(a => a.id === parseInt(id || '0'));

  if (!activity) {
    return (
      <Layout>
        <div className={`min-h-screen bg-gray-50 ${isMobile ? 'px-[25px]' : 'px-[100px]'} py-16`}>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Activité non trouvée</h1>
            <Link to="/agenda">
              <Button>Retour à l'agenda</Button>
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
      <div className={`min-h-screen bg-gray-50 ${isMobile ? 'px-[25px]' : 'px-[100px]'} py-16`}>
        <div className="container mx-auto px-0">
          {/* Bouton retour */}
          <Link to="/agenda" className="inline-flex items-center mb-6 text-primary hover:text-primary/80">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'agenda
          </Link>

          <Card className="max-w-4xl mx-auto">
            {activity.image && (
              <div className="w-full h-64 md:h-80 overflow-hidden rounded-t-lg">
                <img 
                  src={activity.image} 
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <CardHeader>
              <div className="flex justify-between items-start mb-3">
                <span className={`px-3 py-1 rounded text-sm font-medium ${
                  activity.status === 'À venir' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-500 text-white'
                }`}>
                  {activity.type}
                </span>
                <span className={`px-3 py-1 rounded text-sm font-medium ${
                  activity.status === 'À venir'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {activity.status}
                </span>
              </div>
              
              <CardTitle className="text-2xl md:text-3xl text-primary mb-4">
                {activity.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-primary" />
                    <span className="font-medium">{activity.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-3 text-primary" />
                    <span>{activity.time}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-primary" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-3 text-primary" />
                    <span>{activity.participants}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-primary mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{activity.description}</p>
              </div>

              {activity.status === 'À venir' && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleAddToCalendar}
                    className="bg-green-600 hover:bg-green-700 text-white flex-1"
                  >
                    <CalendarPlus className="w-4 h-4 mr-2" />
                    Ajouter au calendrier
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ActiviteDetail;
