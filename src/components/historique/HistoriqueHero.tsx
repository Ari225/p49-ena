
import React from 'react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const HistoriqueHero = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <section className={`relative ${
      isMobile ? 'h-[30vh]' : 
      isTablet ? 'h-[45vh]' : 
      'h-[60vh]'
    } flex items-center justify-center text-white overflow-hidden`}>
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/historique_bg.webp" 
          alt="Background historique" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>
      
      <div className={`relative z-10 text-center ${
        isMobile ? 'px-[25px]' : 
        isTablet ? 'px-[50px]' : 
        'px-8 lg:px-[100px]'
      }`}>
        <h1 className={`font-bold mb-4 md:mb-6 animate-fade-in ${
          isMobile ? 'text-3xl' : 
          isTablet ? 'text-4xl' : 
          'text-6xl md:text-6xl lg:text-6xl'
        }`}>
          Historique du Réseau
        </h1>
        <p className={`italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto ${
          isMobile ? 'text-sm' : 
          isTablet ? 'text-base' : 
          'text-lg md:text-xl'
        }`}>
          Historique, création et situation administrative de l'association
        </p>
      </div>
    </section>
  );
};

export default HistoriqueHero;
