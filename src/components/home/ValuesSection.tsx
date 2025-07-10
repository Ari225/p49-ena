
import React from 'react';
import { Handshake, Zap, Heart, Shield } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const ValuesSection = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  const values = [
    {
      title: "Connexion",
      description: "Entretenir des liens solides entre membres du réseau",
      icon: Handshake
    },
    {
      title: "Action", 
      description: "Agir ensemble pour le développement et l'excellence",
      icon: Zap
    },
    {
      title: "Solidarité",
      description: "Accompagner chaque membre dans sa carrière", 
      icon: Heart
    },
    {
      title: "Dévouement",
      description: "Servir avec engagement au profit de la nation",
      icon: Shield
    }
  ];

  return (
    <section className={`bg-white ${isMobile ? 'py-[50px] px-[25px]' : isTablet ? 'py-[50px] px-[50px]' : 'py-12 md:py-16 lg:py-[100px] px-4 md:px-8 lg:px-[100px]'}`}>
      <div className="container mx-auto px-0">
        <h2 className={`${isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl'} text-center text-primary mb-[50px] md:mb-[50px] font-bold`}>
          Valeurs de la P49
        </h2>
        
        {isMobile ? (
          <div className="space-y-6">
            {/* Première rangée - Connexion et Action */}
            <div className="grid grid-cols-2 gap-4">
              {[values[0], values[1]].map((value, index) => (
                <div key={index} className="text-center grid place-items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 bg-secondary/80">
                    <value.icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-primary mb-1 text-base font-semibold">
                    {value.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-gray-700 max-w-[130px] text-center px-1 font-normal">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Deuxième rangée - Solidarité et Dévouement */}
            <div className="grid grid-cols-2 gap-4">
              {[values[2], values[3]].map((value, index) => (
                <div key={index} className="text-center grid place-items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 bg-secondary/80">
                    <value.icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-primary mb-1 text-base font-semibold">
                    {value.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-gray-700 max-w-[130px] text-center px-1 font-normal">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : isTablet ? (
          <div className="grid grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 bg-secondary/80">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-primary mb-3 text-lg font-semibold">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-700 text-center font-normal px-4">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 bg-secondary/80">
                  <value.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-primary mb-2 md:mb-3 text-xl md:text-xl font-semibold">
                  {value.title}
                </h3>
                <p style={{ minHeight: '3rem' }} className="text-sm leading-relaxed text-gray-700 text-center font-normal px-[50px]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ValuesSection;
