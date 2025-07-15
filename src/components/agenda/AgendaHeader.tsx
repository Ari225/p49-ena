
import React from 'react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const AgendaHeader = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // ========== VERSION MOBILE ==========
  if (isMobile) {
    return (
      <section className="relative h-[30vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/436fe1b1-52ae-4d7a-a153-a06e2b8567ce.png" 
            alt="Background agenda" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>
        
        <div className="relative z-10 text-center px-[25px]">
          <h1 className="text-3xl font-bold mb-4 animate-fade-in">
            Agenda P49
          </h1>
          <p className="text-base italic mb-6 animate-fade-in text-white font-normal max-w-3xl mx-auto">
            Consultez le calendrier de toutes nos activités à venir et récentes
          </p>
        </div>
      </section>
    );
  }

  // ========== VERSION TABLETTE ==========
  if (isTablet) {
    return (
      <section className="relative h-[45vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/436fe1b1-52ae-4d7a-a153-a06e2b8567ce.png" 
            alt="Background agenda" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>
        
        <div className="relative z-10 text-center px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in">
            Agenda P49
          </h1>
          <p className="text-lg md:text-xl italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto">
            Consultez le calendrier de toutes nos activités à venir et récentes
          </p>
        </div>
      </section>
    );
  }

  // ========== VERSION DESKTOP ==========
  return (
    <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/436fe1b1-52ae-4d7a-a153-a06e2b8567ce.png" 
          alt="Background agenda" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>
      
      <div className="relative z-10 text-center px-[100px]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fade-in">
          Agenda P49
        </h1>
        <p className="text-lg md:text-xl italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto">
          Consultez le calendrier de toutes nos activités à venir et récentes
        </p>
      </div>
    </section>
  );
};

export default AgendaHeader;
