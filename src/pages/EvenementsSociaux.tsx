
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const EvenementsSociaux = () => {
  const isMobile = useIsMobile();

  const upcomingEvents = [
    {
      title: "Gala annuel de la P49",
      date: "2024-05-15",
      time: "19:00",
      location: "Hôtel Ivoire, Abidjan",
      participants: "200+",
      description: "Soirée de gala annuelle réunissant tous les membres de la P49 pour célébrer nos réalisations.",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=250&fit=crop"
    },
    {
      title: "Tournoi de golf inter-promotions",
      date: "2024-04-20",
      time: "08:00",
      location: "Golf Club d'Abidjan",
      participants: "50",
      description: "Compétition sportive amicale entre les différentes promotions de l'ENA.",
      image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=250&fit=crop"
    },
    {
      title: "Déjeuner de networking",
      date: "2024-04-10",
      time: "12:30",
      location: "Restaurant Le Jardin",
      participants: "30",
      description: "Rencontre conviviale pour échanger sur les expériences professionnelles.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop"
    }
  ];

  const pastEvents = [
    {
      title: "Soirée culturelle ivoirienne",
      date: "2024-02-14",
      description: "Célébration de la culture ivoirienne avec spectacles et dégustation.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop"
    },
    {
      title: "Match de football caritatif",
      date: "2024-01-28",
      description: "Événement sportif au profit d'une œuvre caritative locale.",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop"
    }
  ];

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <section className={`bg-primary text-white py-20 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Événements Sociaux</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Participez à nos événements conviviaux et renforcez les liens au sein de notre communauté
            </p>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className={`py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">
              Événements à venir
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-primary text-lg">{event.title}</CardTitle>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(event.date).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {event.participants} participants
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm">{event.description}</p>
                    <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors w-full">
                      S'inscrire
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Past Events Section */}
        <section className={`bg-accent/30 py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">
              Événements passés
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pastEvents.map((event, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-primary text-lg">{event.title}</CardTitle>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(event.date).toLocaleDateString('fr-FR')}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm">{event.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default EvenementsSociaux;
