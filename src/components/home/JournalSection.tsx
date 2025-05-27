
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const JournalSection = () => {
  return (
    <section className="bg-white py-[100px] px-[100px]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary mb-12 text-left">Notre Journal</h2>
        <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
          <div className="lg:w-1/3">
            <div className="bg-gradient-to-br from-primary to-primary/80 p-8 rounded-lg shadow-xl px-0 py-0">
              <div className="bg-white p-6 rounded-lg">
                <img src="/lovable-uploads/ec8d10e9-3108-4b8f-9db7-6734f1399fcc.png" alt="Perspectives 49 Journal" className="w-full h-auto object-contain" />
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 rounded-xl py-[75px] px-[20px] bg-transparent">
            <h3 className="font-bold mb-6 text-center bg-primary text-white py-[10px] rounded-lg text-xl">Perspectives 49 - Bulletin n°1</h3>
            <p className="leading-relaxed mb-6 text-justify text-secondary-foreground">
              Ce premier numéro de Perspectives 49 inaugure un journal d'information engagé, ancré dans les réalités locales et soucieux de valoriser les initiatives citoyennes.

              Le bulletin s'organise autour de quatre rubriques principales. La rubrique Actualités citoyennes propose un décryptage des faits marquants et des enjeux sociaux. Le Dossier spécial offre un éclairage sur l'entrepreneuriat des jeunes et les dynamiques économiques émergentes. La rubrique Vie associative met en avant les actions communautaires et les projets de terrain. Enfin, Culture & expressions valorise les talents locaux et les pratiques artistiques.

              Avec une approche rigoureuse et accessible, Perspectives 49 ambitionne d'informer, de questionner et d'inspirer.
            </p>
            <div className="flex space-x-4 flex justify-center">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/derniere-edition">Dernière édition</Link>
              </Button>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                <Link to="/archives">Archives</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JournalSection;
