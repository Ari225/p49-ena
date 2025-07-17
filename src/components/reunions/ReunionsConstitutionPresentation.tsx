
import React from 'react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const ReunionsConstitutionPresentation = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Version Mobile
  if (isMobile) {
    return (
      <section className="py-8 bg-white px-[25px]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-primary mb-4">Qu'est-ce qu'une Réunion de Constitution ?</h2>
            <p className="text-gray-700 text-sm">
              Les Réunions de Constitution sont des sessions spéciales organisées pour accueillir, 
              former et intégrer les nouveaux membres de la P49. C'est un moment privilégié 
              d'échange et de partage des valeurs de notre association.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">8</div>
              <div className="text-gray-600 text-xs">Réunions organisées</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">180+</div>
              <div className="text-gray-600 text-xs">Nouveaux membres intégrés</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">98%</div>
              <div className="text-gray-600 text-xs">Taux de satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">6</div>
              <div className="text-gray-600 text-xs">Régions couvertes</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Version Tablette
  if (isTablet) {
    return (
      <section className="py-12 bg-white px-[50px]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-primary mb-4">Qu'est-ce qu'une Réunion de Constitution ?</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Les Réunions de Constitution sont des sessions spéciales organisées pour accueillir, 
              former et intégrer les nouveaux membres de la P49. C'est un moment privilégié 
              d'échange et de partage des valeurs de notre association.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">8</div>
              <div className="text-gray-600">Réunions organisées</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">180+</div>
              <div className="text-gray-600">Nouveaux membres intégrés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-gray-600">Taux de satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">6</div>
              <div className="text-gray-600">Régions couvertes</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Version Desktop
  return (
    <section className="py-16 bg-white px-[100px]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-6">Qu'est-ce qu'une Réunion de Constitution ?</h2>
          <p className="text-gray-700 max-w-4xl mx-auto text-lg">
            Les Réunions de Constitution sont des sessions spéciales organisées pour accueillir, 
            former et intégrer les nouveaux membres de la P49. C'est un moment privilégié 
            d'échange et de partage des valeurs de notre association.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">8</div>
            <div className="text-gray-600 text-lg">Réunions organisées</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">180+</div>
            <div className="text-gray-600 text-lg">Nouveaux membres intégrés</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">98%</div>
            <div className="text-gray-600 text-lg">Taux de satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">6</div>
            <div className="text-gray-600 text-lg">Régions couvertes</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReunionsConstitutionPresentation;
