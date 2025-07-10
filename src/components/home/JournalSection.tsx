
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const JournalSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className={`bg-accent/30 py-12 md:py-16 lg:py-[100px] ${
      // Mobile
      isMobile ? 'px-[25px]' : 
      // Tablet
      'px-8 md:px-12 ' +
      // Desktop
      'lg:px-[100px]'
    }`}>
      <div className="container mx-auto px-0">
        <h2 className={`font-bold text-primary mb-8 md:mb-12 ${
          // Mobile
          isMobile ? 'text-xl text-center' : 
          // Tablet
          'text-2xl md:text-3xl text-center ' +
          // Desktop
          'lg:text-left'
        }`}>Notre journal</h2>
        <div className={`flex items-center ${
          // Mobile
          isMobile ? 'flex-col space-y-6' : 
          // Tablet
          'flex-col md:space-y-8 ' +
          // Desktop
          'lg:flex-row lg:space-y-0 lg:space-x-12'
        }`}>
          <div className={`${
            // Mobile
            isMobile ? 'w-full max-w-[280px]' : 
            // Tablet
            'w-full md:max-w-[400px] ' +
            // Desktop
            'lg:w-1/3 lg:max-w-none'
          }`}>
            <div className="bg-white rounded-lg shadow-xl">
              <div className="bg-white rounded-lg p-0 py-0 px-0 mx-0">
                <img alt="Perspectives 49 Journal" className="w-full rounded-lg h-auto object-contain" src="/lovable-uploads/Pers49.webp" />
              </div>
            </div>
          </div>
          <div className={`rounded-xl bg-transparent ${
            // Mobile
            isMobile ? 'w-full py-0 px-0' : 
            // Tablet
            'w-full py-6 md:py-8 px-4 md:px-[20px] ' +
            // Desktop
            'lg:w-2/3 lg:py-0'
          }`}>
            <h3 className={`font-semibold mb-6 text-center bg-primary text-white py-2 rounded-lg ${
              // Mobile
              isMobile ? 'text-base md:mb-10' : 
              // Tablet
              'text-lg md:text-xl py-2 md:py-[10px] ' +
              // Desktop
              'md:mb-10'
            }`}>
              Perspectives 49 - Bulletin n°1
            </h3>
            <p className={`leading-relaxed text-justify font-normal text-gray-700 ${
              // Mobile
              isMobile ? 'mb-6 text-sm' : 
              // Tablet
              'mb-8 md:mb-10 text-sm md:text-base ' +
              // Desktop
              'md:mb-10'
            }`}>
              Ce premier numéro de Perspectives 49 inaugure un journal d'information engagé, ancré dans les réalités locales et soucieux de valoriser les initiatives citoyennes.

              Le bulletin s'organise autour de quatre rubriques principales. La rubrique Actualités citoyennes propose un décryptage des faits marquants et des enjeux sociaux. Le Dossier spécial offre un éclairage sur l'entrepreneuriat des jeunes et les dynamiques économiques émergentes. La rubrique Vie associative met en avant les actions communautaires et les projets de terrain. Enfin, Culture & expressions valorise les talents locaux et les pratiques artistiques.

              Avec une approche rigoureuse et accessible, Perspectives 49 ambitionne d'informer, de questionner et d'inspirer.
            </p>
            <div className={`flex justify-center ${
              // Mobile
              isMobile ? 'flex-row gap-3 w-full' : 
              // Tablet & Desktop
              'flex-row gap-3 md:gap-4'
            }`}>
              <Button asChild className={`bg-primary text-white hover:bg-primary transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
                // Mobile
                isMobile ? 'flex-1 py-3' : 
                // Tablet & Desktop
                'px-4 py-2 rounded flex items-center text-sm md:text-base'
              }`}>
                <Link to="/journal" className="bg-primary text-white hover:bg-primary py-[5px] px-[15px] rounded flex items-center text-sm md:text-base transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold">
                  Dernière édition
                </Link>
              </Button>
              <Button asChild variant="outline" className={`border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200 ${
                // Mobile
                isMobile ? 'flex-1 py-3' : 
                // Tablet & Desktop
                'text-sm md:text-base px-4 md:px-6 py-2 md:py-3'
              }`}>
                <Link to="/journal" className="border-primary text-primary hover:bg-primary hover:text-white font-medium py-[5px] px-[15px] rounded transition-colors duration-200 text-base">
                  Archives
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JournalSection;
