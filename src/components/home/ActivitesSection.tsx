
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, BookOpen, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ActivitesSection = () => {
  const isMobile = useIsMobile();
  
  const activities = [
    {
      title: "Formations continues",
      description: "Programmes de formation pour le développement professionnel",
      icon: BookOpen,
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600"
    },
    {
      title: "Événements de réseautage",
      description: "Rencontres et échanges entre membres de la promotion",
      icon: Users,
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600"
    },
    {
      title: "Conférences",
      description: "Conférences thématiques sur l'administration publique",
      icon: Calendar,
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600"
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
            Découvrez nos diverses activités pour renforcer les liens et développer vos compétences
          </p>
        </div>

        <div className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'md:grid-cols-3 gap-8'} mb-8 md:mb-12`}>
          {activities.map((activity, index) => (
            <Card key={index} className={`${activity.color} hover:shadow-lg transition-shadow duration-300`}>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
                  <activity.icon className={`h-8 w-8 ${activity.iconColor}`} />
                </div>
                <CardTitle className="text-xl text-primary">
                  {activity.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  {activity.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild className={`bg-primary hover:bg-primary text-white py-[5px] px-[15px] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold ${isMobile ? 'w-full' : 'text-base md:text-base'}`}>
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
