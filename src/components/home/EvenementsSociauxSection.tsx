
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PartyPopper, GraduationCap, Dove } from 'lucide-react';

const EvenementsSociauxSection = () => {
  const socialEvents = [
    {
      type: 'heureux',
      icon: PartyPopper,
      title: 'Mariage de Mme Koné Awa',
      date: '20 Mars 2024',
      description: 'Félicitations pour cette belle union',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop',
      color: 'bg-green-500'
    },
    {
      type: 'retraite',
      icon: GraduationCap,
      title: 'Départ en retraite de M. Yao Jean',
      date: '15 Mars 2024',
      description: '35 années de service exemplaire',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
      color: 'bg-blue-500'
    },
    {
      type: 'deuil',
      icon: Dove,
      title: 'Hommage à Mme Traoré Fatou',
      date: '10 Mars 2024',
      description: 'Nos pensées accompagnent sa famille',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop',
      color: 'bg-gray-500'
    }
  ];

  return (
    <section className="bg-white py-[100px] px-[100px]">
      <div className="container mx-auto px-0">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Événements Sociaux</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Partageons ensemble les moments importants de la vie de nos membres
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {socialEvents.map((event, index) => {
            const IconComponent = event.icon;
            return (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-3 right-3 ${event.color} text-white p-2 rounded-full`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                  <p className="text-xs text-gray-500">{event.date}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center">
          <Button asChild className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
            <Link to="/evenements-heureux">Consulter les annonces sociales</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EvenementsSociauxSection;
