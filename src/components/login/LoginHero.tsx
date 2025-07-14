
import React from 'react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const LoginHero = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  if (isMobile) {
    return (
      <section className="relative h-[30vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/d0535478-3ab2-4846-a655-f5cd50daa143.png" 
            alt="Background connexion" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>
        
        <div className="relative z-10 text-center px-[25px]">
          <h1 className="text-2xl font-bold mb-[10px] animate-fade-in">
            Espace de Connexion
          </h1>
          <p className="text-sm italic mb-6 animate-fade-in text-white font-normal">
            Accédez à votre tableau de bord
          </p>
        </div>
      </section>
    );
  }

  if (isTablet) {
    return (
      <section className="relative h-[45vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/d0535478-3ab2-4846-a655-f5cd50daa143.png" 
            alt="Background connexion" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>
        
        <div className="relative z-10 text-center px-[50px]">
          <h1 className="text-4xl font-bold mb-[10px] animate-fade-in">
            Espace de Connexion
          </h1>
          <p className="text-base italic mb-6 animate-fade-in text-white font-normal">
            Accédez à votre tableau de bord administrateur
          </p>
        </div>
      </section>
    );
  }

  // Desktop version
  return (
    <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/d0535478-3ab2-4846-a655-f5cd50daa143.png" 
          alt="Background connexion" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>
      
      <div className="relative z-10 text-center px-8 lg:px-[100px]">
        <h1 className="text-6xl md:text-6xl lg:text-6xl font-bold mb-[10px] md:mb-[10px] animate-fade-in">
          Espace de Connexion
        </h1>
        <p className="text-lg md:text-lg italic mb-6 md:mb-8 animate-fade-in text-white font-normal">
          Accédez à votre tableau de bord administrateur
        </p>
      </div>
    </section>
  );
};

export default LoginHero;
