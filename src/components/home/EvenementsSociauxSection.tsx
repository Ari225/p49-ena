
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Briefcase, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const EvenementsSociauxSection = () => {
  const isMobile = useIsMobile();
  
  const events = [
    {
      title: "Événements Heureux",
      description: "Mariages, anniversaires, promotions, baptêmes et autres moments de joie",
      icon: Heart,
      link: "/evenements-heureux",
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Départs à la Retraite",
      description: "Honorer nos membres qui partent à la retraite après des années de service",
      icon: Users,
      link: "/departs-retraite",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Évènements Malheureux",
      description: "Soutien et solidarité dans les moments difficiles",
      icon: Briefcase,
      link: "/evenements-difficiles",
      color: "bg-gray-100 text-gray-600"
    }
  ];

  return (
    <section className={`py-16 bg-accent/10 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Événements Sociaux</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            La P49 accompagne ses membres dans tous les moments importants de leur vie, 
            qu'ils soient heureux ou difficiles. Découvrez nos événements sociaux.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {events.map((event, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${event.color}`}>
                  <event.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl text-primary">{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-6">{event.description}</p>
                <Button asChild className="w-full">
                  <Link to={event.link} className="flex items-center justify-center">
                    Découvrir
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Vous souhaitez partager un événement ou avez besoin de soutien ?
          </p>
          <Button asChild variant="outline">
            <Link to="/contact">Nous contacter</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EvenementsSociauxSection;
