import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
const JournalSection = () => {
  const isMobile = useIsMobile();
  return <section className={`bg-accent/30 py-12 md:py-16 lg:py-[100px] ${isMobile ? 'px-[25px]' : 'px-4 md:px-8 lg:px-[100px]'}`}>
      <div className="container mx-auto px-0">
        <h2 className={`text-2xl md:text-3xl font-bold text-primary mb-8 md:mb-12 ${isMobile ? 'text-center' : 'text-center lg:text-left'}`}>
          Notre Journal
        </h2>
        <div className={`flex ${isMobile ? 'flex-col space-y-6' : 'flex-col lg:flex-row'} items-center ${!isMobile ? 'space-y-6 lg:space-y-0 lg:space-x-12' : ''}`}>
          <div className={`${isMobile ? 'w-full max-w-[280px]' : 'lg:w-1/3 w-full'}`}>
            <div className="bg-white rounded-lg shadow-xl">
              <div className={`bg-white rounded-lg ${isMobile ? 'p-3' : 'p-3 md:p-6'} py-0 px-0 mx-0`}>
                <img alt="Perspectives 49 Journal" className="w-full h-auto object-contain" src="/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg" />
              </div>
            </div>
          </div>
          <div className={`${isMobile ? 'w-full' : 'lg:w-2/3 w-full'} rounded-xl ${isMobile ? 'py-0 px-0' : 'py-6 md:py-12 px-4 md:px-[20px]'} bg-transparent lg:py-0`}>
            <h3 className={`${isMobile ? 'mb-6 text-center bg-primary text-white py-2 rounded-lg text-base' : 'mb-10 md:mb-10 text-center bg-primary text-white py-2 md:py-[10px] rounded-lg text-lg md:text-xl'} font-semibold`}>
              Perspectives 49 - Bulletin n°1
            </h3>
            <p className={`leading-relaxed ${isMobile ? 'mb-6 text-justify font-normal text-gray-700 text-sm' : 'mb-10 md:mb-10 text-justify font-normal text-gray-700 text-sm md:text-base'}`}>
              Ce premier numéro de Perspectives 49 inaugure un journal d'information engagé, ancré dans les réalités locales et soucieux de valoriser les initiatives citoyennes.

              Le bulletin s'organise autour de quatre rubriques principales. La rubrique Actualités citoyennes propose un décryptage des faits marquants et des enjeux sociaux. Le Dossier spécial offre un éclairage sur l'entrepreneuriat des jeunes et les dynamiques économiques émergentes. La rubrique Vie associative met en avant les actions communautaires et les projets de terrain. Enfin, Culture & expressions valorise les talents locaux et les pratiques artistiques.

              Avec une approche rigoureuse et accessible, Perspectives 49 ambitionne d'informer, de questionner et d'inspirer.
            </p>
            <div className={`flex ${isMobile ? 'flex-col gap-3 w-full' : 'flex-col sm:flex-row gap-3 md:gap-4'} justify-center`}>
              <Button asChild className={`bg-primary text-white hover:bg-primary transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${isMobile ? 'w-full py-3' : 'px-4 py-2 rounded flex items-center text-sm md:text-base'}`}>
                <Link to="/derniere-edition" className="bg-primary text-white hover:bg-primary py-[5px] px-[15px] rounded flex items-center text-sm md:text-base transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold">
                  Dernière édition
                </Link>
              </Button>
              <Button asChild variant="outline" className={`border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200 ${isMobile ? 'w-full py-3' : 'text-sm md:text-base px-4 md:px-6 py-2 md:py-3'}`}>
                <Link to="/archives" className="border-primary text-primary hover:bg-primary hover:text-white font-medium py-[5px] px-[15px] rounded transition-colors duration-200 text-base">
                  Archives
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default JournalSection;