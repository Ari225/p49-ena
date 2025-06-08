
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ActivitesSection = () => {
  const isMobile = useIsMobile();
  
  const upcomingActivities = [
    {
      id: 1,
      title: "Formation en Leadership Public",
      date: "15 Avril 2024",
      time: "09:00 - 17:00",
      location: "ENA Abidjan",
      participants: "25 places disponibles",
      description: "Formation intensive sur les techniques de leadership dans l'administration publique moderne.",
      type: "Formation",
      status: "À venir"
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
      status: "À venir"
    }
  ];

  const pastActivities = [
    {
      id: 3,
      title: "Assemblée Générale Ordinaire",
      date: "20 Mars 2024",
      time: "09:00 - 16:00", 
      location: "ENA Abidjan",
      participants: "80 membres présents",
      description: "Assemblée générale ordinaire avec présentation du bilan et perspectives 2024.",
      type: "Assemblée",
      status: "Terminé"
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
      status: "Terminé"
    }
  ];

  return (
    <section className={`bg-white py-12 md:py-16 lg:py-[100px] ${isMobile ? 'px-[25px]' : 'px-4 md:px-8 lg:px-[100px]'}`}>
      <div className="container mx-auto px-0">
        <div className="text-center mb-8 md:mb-12">
          <h2 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold text-primary mb-4`}>
            Activités
          </h2>
          <p className={`text-gray-700 max-w-3xl mx-auto ${isMobile ? 'text-sm' : 'text-base md:text-base'}`}>
            Découvrez nos activités à venir et nos événements récents
          </p>
        </div>

        {/* Activités à venir */}
        <div className="mb-8 md:mb-12">
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} font-semibold text-primary mb-6 flex items-center`}>
            <Calendar className="w-5 h-5 mr-2" />
            Activités à venir
          </h3>
          <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-2 gap-6'}`}>
            {upcomingActivities.map((activity) => (
              <Card key={activity.id} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-primary">
                <CardContent className="p-4 md:p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-primary text-white px-2 py-1 rounded text-xs font-medium">
                      {activity.type}
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                      {activity.status}
                    </span>
                  </div>
                  
                  <h4 className="font-semibold text-primary mb-3 text-lg">
                    {activity.title}
                  </h4>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {activity.description}
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      <span>{activity.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      <span>{activity.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-primary" />
                      <span>{activity.participants}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Activités passées */}
        <div className="mb-8 md:mb-12">
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} font-semibold text-primary mb-6 flex items-center`}>
            <Calendar className="w-5 h-5 mr-2" />
            Activités récentes
          </h3>
          <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-2 gap-6'}`}>
            {pastActivities.map((activity) => (
              <Card key={activity.id} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-gray-400">
                <CardContent className="p-4 md:p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-medium">
                      {activity.type}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                      {activity.status}
                    </span>
                  </div>
                  
                  <h4 className="font-semibold text-primary mb-3 text-lg">
                    {activity.title}
                  </h4>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {activity.description}
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{activity.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{activity.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{activity.participants}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button asChild className={`bg-primary hover:bg-primary text-white py-[5px] px-[15px] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold ${isMobile ? 'w-full' : 'text-sm md:text-sm'}`}>
            <Link to="/activites" className="flex items-center justify-center">
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
