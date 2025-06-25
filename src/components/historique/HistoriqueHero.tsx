
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const HistoriqueHero = () => {
  const isMobile = useIsMobile();

  return (
    <section className={`relative ${isMobile ? 'h-[30vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/01e1d6d1-f868-4738-9ee3-2feed399f243.png" 
          alt="Background historique" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>
      
      <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
        <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold mb-4 md:mb-6 animate-fade-in`}>
          Historique du Réseau
        </h1>
        <p className={`${isMobile ? 'text-sm' : 'text-lg md:text-xl'} italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
          Historique, création et situation administrative de l'association
        </p>
      </div>
    </section>
  );
};

export default HistoriqueHero;
