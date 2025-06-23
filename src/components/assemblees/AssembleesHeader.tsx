
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const AssembleesHeader = () => {
  const isMobile = useIsMobile();

  return (
    <section className={`relative ${isMobile ? 'h-[30vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/92f8a2dc-a96b-43e9-93dd-b8dec8af0527.png" 
          alt="Background assemblées générales" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>
      
      <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
        <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold mb-4 md:mb-6 animate-fade-in`}>
          Assemblées Générales
        </h1>
        <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
          Les moments forts de la démocratie participative de la P49
        </p>
      </div>
    </section>
  );
};

export default AssembleesHeader;
