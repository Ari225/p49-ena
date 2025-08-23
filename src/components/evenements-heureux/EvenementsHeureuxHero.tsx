import React from 'react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const EvenementsHeureuxHero = () => {
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
          src="/lovable-uploads/bc525a09-b8a2-469f-b451-2f78bc437b6e.png" 
          alt="Background événements heureux" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>
      
      <div className={`relative z-10 text-center ${
        isMobile ? 'px-[25px]' : 
        isTablet ? 'px-[50px]' : 
        'px-8 lg:px-[100px]'
      }`}>
        <h1 className={`font-bold mb-[10px] md:mb-[10px] animate-fade-in ${
          isMobile ? 'text-2xl' : 
          isTablet ? 'text-4xl' : 
          'text-6xl md:text-6xl lg:text-6xl'
        }`}>
          Événements Heureux
        </h1>
        <p className={`italic mb-6 md:mb-8 animate-fade-in text-white font-normal ${
          isMobile ? 'text-sm' : 
          isTablet ? 'text-base' : 
          'text-lg md:text-lg'
        }`}>
          Célébrons ensemble les moments de joie, les réussites et les bonheurs qui illuminent notre communauté
        </p>
      </div>
    </section>
  );
};

export default EvenementsHeureuxHero;