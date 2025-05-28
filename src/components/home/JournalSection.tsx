import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
const JournalSection = () => {
  return <section className="bg-accent/30 py-12 md:py-16 lg:py-[100px] px-4 md:px-8 lg:px-[100px]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 md:mb-12 text-center lg:text-left">
          Notre Journal
        </h2>
        <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-12">
          <div className="lg:w-1/3 w-full">
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-lg shadow-xl">
              <div className="bg-white p-3 md:p-6 rounded-lg px-0 py-0">
                <img src="/lovable-uploads/ec8d10e9-3108-4b8f-9db7-6734f1399fcc.png" alt="Perspectives 49 Journal" className="w-full h-auto object-contain" />
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 w-full rounded-xl py-6 md:py-12 px-4 md:px-[20px] bg-transparent lg:py-0">
            <h3 className="font-bold mb-10 md:mb-10 text-center bg-primary text-white py-2 md:py-[10px] rounded-lg text-lg md:text-xl">
              Perspectives 49 - Bulletin n°1
            </h3>
            <p className="leading-relaxed mb-10 md:mb-10 text-justify text-secondary-foreground text-sm md:text-base">
              Ce premier numéro de Perspectives 49 inaugure un journal d'information engagé, ancré dans les réalités locales et soucieux de valoriser les initiatives citoyennes.

              Le bulletin s'organise autour de quatre rubriques principales. La rubrique Actualités citoyennes propose un décryptage des faits marquants et des enjeux sociaux. Le Dossier spécial offre un éclairage sur l'entrepreneuriat des jeunes et les dynamiques économiques émergentes. La rubrique Vie associative met en avant les actions communautaires et les projets de terrain. Enfin, Culture & expressions valorise les talents locaux et les pratiques artistiques.

              Avec une approche rigoureuse et accessible, Perspectives 49 ambitionne d'informer, de questionner et d'inspirer.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button asChild className="bg-primary hover:bg-primary/90 text-sm md:text-base px-4 md:px-6 py-2 md:py-3">
                <Link to="/derniere-edition">Dernière édition</Link>
              </Button>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white text-sm md:text-base px-4 md:px-6 py-2 md:py-3">
                <Link to="/archives">Archives</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default JournalSection;