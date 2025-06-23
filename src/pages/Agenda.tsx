
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users, Calendar as CalendarIcon, CalendarPlus, Eye } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { addToCalendar, parseEventDate } from '@/utils/calendarUtils';
import { useToast } from '@/hooks/use-toast';

const Agenda = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Toutes les activités (récentes et à venir)
  const allActivities = [
    // Activités à venir
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
      calendarDate: new Date(2024, 3, 15), // Avril = 3 (0-indexed)
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop"
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
      calendarDate: new Date(2024, 3, 22),
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop"
    },
    // Activités récentes
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
      calendarDate: new Date(2024, 2, 20), // Mars = 2
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=250&fit=crop"
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
      calendarDate: new Date(2024, 2, 10),
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=250&fit=crop"
    },
    // Événements additionnels pour le calendrier
    {
      id: 5,
      title: "Assemblée Générale Extraordinaire",
      date: "15 Juin 2024",
      time: "09:00",
      location: "Hôtel Ivoire, Abidjan",
      type: "AG",
      participants: "120 participants attendus",
      description: "Assemblée générale extraordinaire pour les amendements statutaires",
      status: "À venir",
      calendarDate: new Date(2024, 5, 15)
    },
    {
      id: 6,
      title: "Régionale Centre",
      date: "28 Juin 2024",
      time: "14:00",
      location: "Yamoussoukro",
      type: "Régionale",
      participants: "45 participants attendus",
      description: "Rencontre régionale des membres du centre",
      status: "À venir",
      calendarDate: new Date(2024, 5, 28)
    }
  ];

  // Filtrer les événements par date sélectionnée
  const selectedDateEvents = allActivities.filter(event => 
    selectedDate && 
    event.calendarDate.toDateString() === selectedDate.toDateString()
  );

  // Fonction pour déterminer si une date a des événements
  const hasEvents = (date: Date) => {
    return allActivities.some(event => event.calendarDate.toDateString() === date.toDateString());
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'AG': 
      case 'Assemblée': return 'bg-red-100 text-red-800';
      case 'Régionale': return 'bg-blue-100 text-blue-800';
      case 'Formation': 
      case 'Atelier': return 'bg-green-100 text-green-800';
      case 'Conférence': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header with Background Image */}
        <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/436fe1b1-52ae-4d7a-a153-a06e2b8567ce.png" 
              alt="Background agenda" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-4' : 'px-8 lg:px-[100px]'}`}>
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold mb-4 md:mb-6 animate-fade-in`}>
              Agenda P49
            </h1>
            <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
              Consultez le calendrier de toutes nos activités à venir et récentes
            </p>
          </div>
        </section>

        {/* Contenu principal */}
        <section className={`py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Calendrier */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    Calendrier des Activités
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    modifiers={{
                      hasEvents: (date) => hasEvents(date)
                    }}
                    modifiersStyles={{
                      hasEvents: { 
                        backgroundColor: '#3b82f6', 
                        color: 'white',
                        fontWeight: 'bold'
                      }
                    }}
                  />
                  <div className="mt-4 text-sm text-gray-600">
                    <p>Les dates en bleu indiquent des activités planifiées</p>
                  </div>
                </CardContent>
              </Card>

              {/* Événements du jour sélectionné */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedDate ? `Activités du ${formatDate(selectedDate)}` : 'Sélectionnez une date'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDateEvents.length > 0 ? (
                    <div className="space-y-4">
                      {selectedDateEvents.map((event) => (
                        <div key={event.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-primary">{event.title}</h3>
                            <Badge className={getEventTypeColor(event.type)}>
                              {event.type}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                          <div className="space-y-1 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              {event.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              {event.location}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2" />
                              {event.participants}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button asChild size="sm" variant="outline">
                              <Link to={`/activites/${event.id}`}>
                                <Eye className="h-4 w-4 mr-1" />
                                Voir détails
                              </Link>
                            </Button>
                            {event.status === 'À venir' && (
                              <Button
                                size="sm"
                                onClick={() => handleAddToCalendar(event)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CalendarPlus className="h-4 w-4 mr-1" />
                                Calendrier
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      Aucune activité prévue pour cette date
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Activités à venir */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Activités à venir</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
                  {upcomingActivities.map((activity) => (
                    <Card key={activity.id} className="hover:shadow-lg transition-shadow duration-300">
                      {activity.image && (
                        <div className="w-full h-40 overflow-hidden rounded-t-lg">
                          <img 
                            src={activity.image} 
                            alt={activity.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={getEventTypeColor(activity.type)}>
                            {activity.type}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {activity.date}
                          </span>
                        </div>
                        <h3 className="font-semibold text-primary mb-2">{activity.title}</h3>
                        <div className="space-y-1 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {activity.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {activity.location}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button asChild size="sm" variant="outline" className="flex-1">
                            <Link to={`/activites/${activity.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              Détails
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAddToCalendar(activity)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CalendarPlus className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activités récentes */}
            <Card>
              <CardHeader>
                <CardTitle>Activités récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
                  {pastActivities.map((activity) => (
                    <Card key={activity.id} className="hover:shadow-lg transition-shadow duration-300 opacity-80">
                      {activity.image && (
                        <div className="w-full h-40 overflow-hidden rounded-t-lg">
                          <img 
                            src={activity.image} 
                            alt={activity.title}
                            className="w-full h-full object-cover grayscale"
                          />
                        </div>
                      )}
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-gray-100 text-gray-700">
                            {activity.type}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {activity.date}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-600 mb-2">{activity.title}</h3>
                        <div className="space-y-1 text-sm text-gray-500 mb-3">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {activity.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {activity.location}
                          </div>
                        </div>
                        <Button asChild size="sm" variant="outline" className="w-full">
                          <Link to={`/activites/${activity.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            Voir détails
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Agenda;
