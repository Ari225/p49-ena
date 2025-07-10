
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Frown, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const EvenementsSociauxSection = () => {
  const isMobile = useIsMobile();
  
  const events = [
    {
      title: "Événements Heureux",
      description: "Mariages, anniversaires, promotions, baptêmes et autres moments de joie",
      icon: Heart,
      link: "/evenements-heureux",
      color: "bg-green-100 text-green-600",
      backgroundImage: "/lovable-uploads/bonheur.jpg"
    },
    {
      title: "Départs à la Retraite", 
      description: "Honorer nos membres qui partent à la retraite après des années de service",
      icon: Users,
      link: "/departs-retraite",
      color: "bg-blue-100 text-blue-600",
      backgroundImage: "/lovable-uploads/retraite.avif"
    },
    {
      title: "Évènements Malheureux",
      description: "Soutien et solidarité dans les moments difficiles",
      icon: Frown,
      link: "/evenements-malheureux",
      color: "bg-gray-100 text-gray-600", 
      backgroundImage: "/lovable-uploads/malheur.jpg"
    }
  ];

  return (
    <section className={`py-16 bg-accent/10 ${
      // Mobile
      isMobile ? 'px-[25px]' : 
      // Tablet
      'px-8 md:px-12 ' +
      // Desktop
      'lg:px-[100px]'
    }`}>
      <div className="container mx-auto px-0">
        <div className={`text-center ${
          // Mobile
          isMobile ? 'mb-8' : 
          // Tablet & Desktop
          'mb-8 md:mb-12'
        }`}>
          <h2 className={`font-bold text-primary ${
            // Mobile
            isMobile ? 'text-xl mb-3' : 
            // Tablet & Desktop
            'text-2xl md:text-3xl mb-4'
          }`}>
            Évènements sociaux
          </h2>
          <p className={`text-gray-700 max-w-3xl mx-auto ${
            // Mobile
            isMobile ? 'text-sm' : 
            // Tablet & Desktop
            'text-base'
          }`}>
            La P49 accompagne ses membres dans tous les moments importants de leur vie, 
            qu'ils soient heureux ou difficiles. Découvrez nos événements sociaux.
          </p>
        </div>

        <div className={`grid mb-8 ${
          // Mobile
          isMobile ? 'grid-cols-1 gap-4 mb-4' : 
          // Tablet
          'grid-cols-1 md:grid-cols-2 gap-6 ' +
          // Desktop
          'lg:grid-cols-3 lg:gap-8'
        }`}>
          {events.map((event, index) => (
            <Card key={index} className={`hover:shadow-lg transition-shadow duration-300 overflow-hidden relative ${
              // Mobile
              isMobile ? 'mb-4' : 
              // Tablet & Desktop
              ''
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
                  // Mobile
                  isMobile ? 'pb-2' : 
                  // Tablet & Desktop
                  'pb-4'
                }`}>
                  <div className={`rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto ${
                    // Mobile
                    isMobile ? 'w-12 h-12 mb-2' : 
                    // Tablet & Desktop
                    'w-16 h-16 mb-4'
                  }`}>
                    <event.icon className={`text-white ${
                      // Mobile
                      isMobile ? 'h-6 w-6' : 
                      // Tablet & Desktop
                      'h-8 w-8'
                    }`} />
                  </div>
                  <CardTitle className={`text-white ${
                    // Mobile
                    isMobile ? 'text-lg' : 
                    // Tablet & Desktop
                    'text-xl'
                  }`}>
                    {event.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="text-center p-6">
                  <p className={`text-white/90 ${
                    // Mobile
                    isMobile ? 'mb-4 text-sm' : 
                    // Tablet & Desktop
                    'mb-6 text-base'
                  }`}>
                    {event.description}
                  </p>
                  <Button asChild className="w-full bg-white text-primary hover:bg-white/90">
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
            // Mobile
            isMobile ? 'text-sm' : 
            // Tablet & Desktop
            'text-base'
          }`}>
            Vous souhaitez partager un événement ou avez besoin de soutien ?
          </p>
          <Button asChild variant="outline" className={
            // Mobile
            isMobile ? 'w-full' : 
            // Tablet & Desktop
            ''
          }>
            <Link to="/contact">Nous contacter</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EvenementsSociauxSection;
