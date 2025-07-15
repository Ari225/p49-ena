
import React from 'react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const AgendaHeader = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Fonction pour obtenir les classes de hauteur selon la version
  const getHeightClasses = () => {
    if (isMobile) {
      return 'h-[30vh]'; // Mobile - 30% de la hauteur viewport
    } else if (isTablet) {
      return 'h-[40vh]'; // Tablette - 40% de la hauteur viewport
    } else {
      return 'h-[60vh]'; // Desktop - 60% de la hauteur viewport
    }
  };

  // Fonction pour obtenir les classes de padding selon la version
  const getPaddingClasses = () => {
    if (isMobile) {
      return 'px-[25px]'; // Mobile - padding fixe
    } else if (isTablet) {
      return 'px-6'; // Tablette - padding moyen
    } else {
      return 'px-8 lg:px-[100px]'; // Desktop - padding large
    }
  };

  // Fonction pour obtenir les classes de titre selon la version
  const getTitleClasses = () => {
    if (isMobile) {
      return 'text-2xl'; // Mobile - titre plus petit
    } else if (isTablet) {
      return 'text-3xl md:text-4xl'; // Tablette - titre moyen
    } else {
      return 'text-4xl md:text-5xl lg:text-6xl'; // Desktop - titre grand
    }
  };

  // Fonction pour obtenir les classes de texte selon la version
  const getTextClasses = () => {
    if (isMobile) {
      return 'text-sm'; // Mobile - texte plus petit
    } else if (isTablet) {
      return 'text-base'; // Tablette - texte moyen
    } else {
      return 'text-lg md:text-xl'; // Desktop - texte grand
    }
  };

  // Fonction pour obtenir les classes de marge selon la version
  const getMarginClasses = () => {
    if (isMobile) {
      return 'mb-3 md:mb-4'; // Mobile - marge plus petite
    } else if (isTablet) {
      return 'mb-4 md:mb-5'; // Tablette - marge moyenne
    } else {
      return 'mb-4 md:mb-6'; // Desktop - marge grande
    }
  };

  return (
    <section className={`relative ${getHeightClasses()} flex items-center justify-center text-white overflow-hidden`}>
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/436fe1b1-52ae-4d7a-a153-a06e2b8567ce.png" 
          alt="Background agenda" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>
      
      <div className={`relative z-10 text-center ${getPaddingClasses()}`}>
        <h1 className={`${getTitleClasses()} font-bold ${getMarginClasses()} animate-fade-in`}>
          Agenda P49
        </h1>
        <p className={`${getTextClasses()} italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
          Consultez le calendrier de toutes nos activités à venir et récentes
        </p>
      </div>
    </section>
  );
};

export default AgendaHeader;
