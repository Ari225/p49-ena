
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Frown, ChevronRight } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const EvenementsSociauxSection = () => {
  const isMobile = useIsMobile();
  const isTab = useIsTablet();
  
  const events = [
    {
      title: "Évènements heureux",
      description: "Mariages, anniversaires, promotions, baptêmes et autres moments de joie",
      icon: Heart,
      link: "/evenements-heureux",
      color: "bg-green-100 text-green-600",
      backgroundImage: "/lovable-uploads/bonheur.jpg"
    },
    {
      title: "Départs à la retraite", 
      description: "Honorer nos membres qui partent à la retraite après des années de service",
      icon: Users,
      link: "/departs-retraite",
      color: "bg-blue-100 text-blue-600",
      backgroundImage: "/lovable-uploads/retraite.avif"
    },
    {
      title: "Évènements malheureux",
      description: "Soutien et solidarité dans les moments difficiles",
      icon: Frown,
      link: "/evenements-malheureux",
      color: "bg-gray-100 text-gray-600", 
      backgroundImage: "/lovable-uploads/malheur.jpg"
    }
  ];

  return (
    <section className={`py-16 bg-accent/10 ${
      isMobile ? 'px-[25px]' : 
      isTab ? 'px-[50px]' :
      'px-8 md:px-12 lg:px-[100px]' // Desktop
    }`}>
      <div className="container mx-auto px-0">
        <div className={`text-center ${
          isMobile ? 'mb-8' : 
          isTab ? 'mb-10' :
          'mb-8 md:mb-12' // Desktop
        }`}>
          <h2 className={`font-bold text-primary ${
            isMobile ? 'text-xl mb-3' : 
            isTab ? 'text-2xl mb-4' :
            'text-3xl md:text-3xl mb-4' // Desktop
          }`}>
            Évènements sociaux
          </h2>
          <p className={`text-gray-700 max-w-3xl mx-auto ${
            isMobile ? 'text-xs' : 
            isTab ? 'text-sm' :
            'text-base' // Desktop
          }`}>
            La P49 accompagne ses membres dans tous les moments importants de leur vie, 
            qu'ils soient heureux ou difficiles. Découvrez nos événements sociaux.
          </p>
        </div>

        <div className={`grid mb-8 ${
          isMobile ? 'grid-cols-1 gap-4 mb-4' : 
          isTab ? 'grid-cols-2 gap-6 mb-8' :
          'grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3 lg:gap-8' // Desktop
        }`}>
          {events.map((event, index) => (
            <Card key={index} className={`hover:shadow-lg transition-shadow duration-300 overflow-hidden relative ${
              isMobile ? 'mb-4' : 
              isTab ? 'mb-0' :
              '' // Desktop
            }`}>
              {/* Background Image covering entire card */}
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: `url(${event.backgroundImage})` }}
              >
                <div className="absolute inset-0 bg-primary/80"></div>
              </div>
              
              {/* Content overlay */}
              <div className="relative z-10 text-white">
                <CardHeader className={`text-center ${
                  isMobile ? 'pb-2' : 
                  isTab ? 'pb-3' :
                  'pb-4' // Desktop
                }`}>
                  <div className={`rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto ${
                    isMobile ? 'w-12 h-12 mb-2' : 
                    isTab ? 'w-14 h-14 mb-3' :
                    'w-16 h-16 mb-4' // Desktop
                  }`}>
                    <event.icon className={`text-white ${
                      isMobile ? 'h-6 w-6' : 
                      isTab ? 'h-7 w-7' :
                      'h-8 w-8' // Desktop
                    }`} />
                  </div>
                  <CardTitle className={`text-white ${
                    isMobile ? 'text-lg' : 
                    isTab ? 'text-xl' :
                    'text-xl' // Desktop
                  }`}>
                    {event.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="text-center p-6">
                  <p className={`text-white/90 ${
                    isMobile ? 'mb-4 text-sm' : 
                    isTab ? 'mb-5 text-base' :
                    'mb-6 text-base' // Desktop
                  }`}>
                    {event.description}
                  </p>
                  <Button asChild className={`w-full bg-white text-primary hover:bg-white/90 ${isMobile ? 'text-xs' : isTab ? 'text-sm' :'text-sm'}`}>
                    <Link to={event.link} className="flex items-center justify-center">
                      Découvrir
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className={`text-gray-600 mb-4 ${
            isMobile ? 'text-xs' : 
            isTab ? 'text-sm' :
            'text-base' // Desktop
          }`}>
            Vous souhaitez partager un événement ou avez besoin de soutien ?
          </p>
          <Button asChild variant="outline" className={
            isMobile ? 'w-full text-xs' : 
            isTab ? 'px-8 py-3 text-sm' :
            'text-sm' // Desktop
          }>
            <Link to="/contact">Nous contacter</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EvenementsSociauxSection;
