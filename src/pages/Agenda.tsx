
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users, Calendar as CalendarIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Agenda = () => {
  const isMobile = useIsMobile();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Événements pour le calendrier
  const events = [
    {
      id: 1,
      title: "Assemblée Générale Extraordinaire",
      date: new Date(2024, 5, 15), // 15 juin 2024
      time: "09:00",
      location: "Hôtel Ivoire, Abidjan",
      type: "AG",
      participants: 120,
      description: "Assemblée générale extraordinaire pour les amendements statutaires"
    },
    {
      id: 2,
      title: "Régionale Centre",
      date: new Date(2024, 5, 28), // 28 juin 2024
      time: "14:00",
      location: "Yamoussoukro",
      type: "Régionale",
      participants: 45,
      description: "Rencontre régionale des membres du centre"
    },
    {
      id: 3,
      title: "Formation Leadership Digital",
      date: new Date(2024, 6, 5), // 5 juillet 2024
      time: "08:30",
      location: "ENA Abidjan",
      type: "Formation",
      participants: 25,
      description: "Atelier de formation sur le leadership à l'ère numérique"
    },
    {
      id: 4,
      title: "Réunion de Constitution Ouest",
      date: new Date(2024, 6, 12), // 12 juillet 2024
      time: "10:00",
      location: "Man",
      type: "Constitution",
      participants: 30,
      description: "Réunion de constitution pour la région Ouest"
    },
    {
      id: 5,
      title: "Régionale Nord",
      date: new Date(2024, 6, 20), // 20 juillet 2024
      time: "15:00",
      location: "Korhogo",
      type: "Régionale",
      participants: 38,
      description: "Rencontre régionale des membres du nord"
    }
  ];

  // Filtrer les événements par date sélectionnée
  const selectedDateEvents = events.filter(event => 
    selectedDate && 
    event.date.toDateString() === selectedDate.toDateString()
  );

  // Fonction pour déterminer si une date a des événements
  const hasEvents = (date: Date) => {
    return events.some(event => event.date.toDateString() === date.toDateString());
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'AG': return 'bg-red-100 text-red-800';
      case 'Régionale': return 'bg-blue-100 text-blue-800';
      case 'Formation': return 'bg-green-100 text-green-800';
      case 'Constitution': return 'bg-purple-100 text-purple-800';
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

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className={`bg-primary text-white py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Agenda P49</h1>
            <p className="text-xl opacity-90">
              Consultez le calendrier de toutes nos activités à venir
            </p>
          </div>
        </section>

        {/* Contenu principal */}
        <section className={`py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                          <div className="space-y-1 text-sm text-gray-600">
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
                              {event.participants} participants attendus
                            </div>
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

            {/* Prochaines activités */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Prochaines Activités</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {events.slice(0, 6).map((event) => (
                    <div key={event.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {event.date.toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <h3 className="font-semibold text-primary mb-2">{event.title}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {event.location}
                        </div>
                      </div>
                    </div>
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
