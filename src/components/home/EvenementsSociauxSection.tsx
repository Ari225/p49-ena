
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const EvenementsSociauxSection = () => {
  const isMobile = useIsMobile();
  const events = [{
    title: "Événements Heureux",
    description: "Mariages, anniversaires, promotions, baptêmes et autres moments de joie",
    icon: Heart,
    link: "/evenements-heureux",
    color: "bg-green-100 text-green-600",
    backgroundImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop"
  }, {
    title: "Départs à la Retraite",
    description: "Honorer nos membres qui partent à la retraite après des années de service",
    icon: Users,
    link: "/departs-retraite",
    color: "bg-blue-100 text-blue-600",
    backgroundImage: "https://images.unsplash.com/photo-1559223607-a43c990c692f?w=400&h=300&fit=crop"
  }, {
    title: "Évènements Malheureux",
    description: "Soutien et solidarité dans les moments difficiles",
    emoji: "😞",
    link: "/evenements-malheureux",
    color: "bg-gray-100 text-gray-600",
    backgroundImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop"
  }];

  return (
    <section className={`py-16 bg-accent/10 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
      <div className="container mx-auto px-0">
        <div className={`text-center mb-${isMobile ? '8' : '12'}`}>
          <h2 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-primary mb-${isMobile ? '3' : '4'}`}>
            Événements Sociaux
          </h2>
          <p className={`text-gray-700 max-w-3xl mx-auto ${isMobile ? 'text-sm' : ''}`}>
            La P49 accompagne ses membres dans tous les moments importants de leur vie, 
            qu'ils soient heureux ou difficiles. Découvrez nos événements sociaux.
          </p>
        </div>

        <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-3 gap-8'} mb-8`}>
          {events.map((event, index) => (
            <Card key={index} className={`hover:shadow-lg transition-shadow duration-300 overflow-hidden relative ${isMobile ? 'mb-4' : ''}`}>
              {/* Background Image covering entire card */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${event.backgroundImage})` }}
              >
                <div className="absolute inset-0 bg-primary/80"></div>
              </div>
              
              {/* Content overlay */}
              <div className="relative z-10 text-white">
                <CardHeader className={`text-center pb-${isMobile ? '2' : '4'}`}>
                  <div className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-${isMobile ? '2' : '4'}`}>
                    {event.emoji ? (
                      <span className={`${isMobile ? 'text-2xl' : 'text-3xl'}`}>{event.emoji}</span>
                    ) : (
                      <event.icon className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-white`} />
                    )}
                  </div>
                  <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} text-white`}>
                    {event.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="text-center p-6">
                  <p className={`text-white/90 mb-${isMobile ? '4' : '6'} ${isMobile ? 'text-sm' : ''}`}>
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
          <p className={`text-gray-600 mb-4 ${isMobile ? 'text-sm' : ''}`}>
            Vous souhaitez partager un événement ou avez besoin de soutien ?
          </p>
          <Button asChild variant="outline" className={isMobile ? 'w-full' : ''}>
            <Link to="/contact">Nous contacter</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EvenementsSociauxSection;
