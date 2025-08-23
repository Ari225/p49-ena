import React from 'react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
const ReunionsConstitutionHero = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  return <section className={`relative ${isMobile ? 'h-[30vh]' : isTablet ? 'h-[45vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
      <div className="absolute inset-0">
        <img src="/lovable-uploads/92f8a2dc-a96b-43e9-93dd-b8dec8af0527.png" alt="Background réunions constitution" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>
      
      <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : isTablet ? 'px-[50px]' : 'px-8 lg:px-[100px]'}`}>
        <h1 className={`font-bold mb-[10px] md:mb-[10px] animate-fade-in ${isMobile ? 'text-2xl' : isTablet ? 'text-4xl' : 'text-6xl md:text-6xl lg:text-6xl'}`}>Réunions de constitution</h1>
        <p className={`italic mb-6 md:mb-8 animate-fade-in text-white font-normal ${isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-lg md:text-lg'}`}>
          Accueil et intégration des nouveaux membres de la P49
        </p>
      </div>
    </section>;
};
export default ReunionsConstitutionHero;