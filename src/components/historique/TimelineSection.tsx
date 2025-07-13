
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const TimelineSection = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const timeline = [
    {
      year: 'À ce jour',
      title: 'Suite de la procédure',
      description: "La procédure pour l'obtention de l'arrêté est en cours."
    },
    {
      year: '20 mars 2024',
      title: 'Récépissé de dépôt de dossier d\'association',
      description: 'N°0412/PA/SG/D1, il a été délivré par la Préfecture d\'Abidjan, après une déclaration faite.'
    },
    {
      year: '25 novembre 2023',
      title: 'Adoption des statuts et règlements intérieurs',
      description: "À l'occasion d'une assemblée générale qui s'est tenue lors des Régionales de Yamoussoukro, en vue d'officialiser l'existence de l'association."
    },
    {
      year: '24 juin 2023',
      title: 'Assemblée générale élective',
      description: "À l'ENA, après des réunions tenues par les membres fondateurs en 2017 et en 2019, ainsi que plusieurs cadres d'échanges."
    }
  ];

  // Mobile Version
  if (isMobile) {
    return (
      <section className="py-16 px-[25px] bg-gradient-to-b from-accent/30 to-white">
        <div className="container mx-auto px-0">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-center text-primary mb-16">
              Chronologie
            </h2>
            <div className="relative">
              {timeline.map((event, index) => (
                <div key={index} className="relative flex items-center justify-center mb-8">
                  <Card className="w-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-4">
                        <div className="bg-primary text-white font-bold text-lg px-4 py-2 rounded-lg shadow-md">
                          {event.year}
                        </div>
                      </div>
                      <h3 className="text-base font-bold mb-4 text-primary">
                        {event.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-left text-sm">
                        {event.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Tablet Version
  if (isTablet) {
    return (
      <section className="py-20 px-[50px] bg-gradient-to-b from-accent/30 to-white">
        <div className="container mx-auto px-0">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-primary mb-16">
              Chronologie
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary"></div>
              
              {timeline.map((event, index) => (
                <div key={index} className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full border-4 border-white shadow-xl z-10 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  
                  <Card className={`w-5/12 ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'} shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border-l-4 border-l-primary`}>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-primary text-white font-bold text-lg px-4 py-2 rounded-lg shadow-md">
                          {event.year}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-4 text-primary">
                        {event.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-left text-base">
                        {event.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop Version
  return (
    <section className="py-[100px] px-8 md:px-[100px] bg-gradient-to-b from-accent/30 to-white">
      <div className="container mx-auto px-0">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-16">
            Chronologie
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary"></div>
            
            {timeline.map((event, index) => (
              <div key={index} className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full border-4 border-white shadow-xl z-10 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                
                <Card className={`w-5/12 ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'} shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border-l-4 border-l-primary`}>
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="bg-primary text-white font-bold text-lg px-4 py-2 rounded-lg shadow-md">
                        {event.year}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-primary">
                      {event.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-left text-base">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
