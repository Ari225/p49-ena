import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PartyPopper, GraduationCap, Heart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const EvenementsSociauxSection = () => {
  const isMobile = useIsMobile();
  
  const socialEvents = [{
    type: 'heureux',
    icon: PartyPopper,
    title: 'Mariage de Mme Koné Awa',
    date: '20 Mars 2024',
    description: 'Félicitations pour cette belle union',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop',
    color: 'bg-green-500'
  }, {
    type: 'retraite',
    icon: GraduationCap,
    title: 'Départ en retraite de M. Yao Jean',
    date: '15 Mars 2024',
    description: '35 années de service exemplaire',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
    color: 'bg-blue-500'
  }, {
    type: 'deuil',
    icon: Heart,
    title: 'Hommage à Mme Traoré Fatou',
    date: '10 Mars 2024',
    description: 'Nos pensées accompagnent sa famille',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop',
    color: 'bg-gray-500'
  }];
  
  return (
    <section className={`bg-accent/30 py-12 md:py-16 lg:py-[100px] ${isMobile ? 'px-[25px]' : 'px-4 md:px-8 lg:px-[100px]'}`}>
      <div className="container mx-auto px-0">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-3xl font-bold text-primary mb-4">Événements sociaux</h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-base px-4">
            Partageons ensemble les moments importants de la vie de nos membres
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {socialEvents.map((event, index) => {
          const IconComponent = event.icon;
          return (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-32 md:h-48">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  <div className={`absolute top-2 md:top-3 right-2 md:right-3 ${event.color} text-white p-2 rounded-full`}>
                    <IconComponent className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
                <CardContent className="p-4 md:p-6">
                  <h3 className="font-semibold text-primary mb-2 text-sm md:text-base line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-700 text-sm md:text-sm mb-2 md:mb-3 line-clamp-2 font-normal">
                    {event.description}
                  </p>
                  <p className="text-xs text-gray-700 font-normal">{event.date}</p>
                </CardContent>
              </Card>
          );
        })}
        </div>
        
        <div className="text-center">
          <Button asChild className="bg-primary hover:bg-primary text-base md:text-base text-white py-[5px] px-[15px] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold">
            <Link to="/evenements-heureux">
              <span className="hidden sm:inline">Consulter les annonces sociales</span>
              <span className="sm:hidden">Annonces sociales</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EvenementsSociauxSection;
