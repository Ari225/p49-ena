
import React from 'react';
import { Heart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const DifficultEventsHeader = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/8686ede3-f750-45db-a93e-c58913dc701e.png" 
          alt="Background événements malheureux" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>
      
      <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
        <Heart className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} mx-auto mb-6`} />
        <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold mb-4 md:mb-6 animate-fade-in`}>
          Événements Malheureux
        </h1>
        <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
          Unis dans l'épreuve, nous apportons notre soutien et notre compassion à ceux qui traversent des moments difficiles
        </p>
      </div>
    </section>
  );
};

export default DifficultEventsHeader;
