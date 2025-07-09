
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const WelcomeMessageContent = () => {
  const isMobile = useIsMobile();
  
  const textSizes = {
    title: isMobile ? 'text-xl' : 'text-5xl',
    body: isMobile ? 'text-xs' : 'text-base',
    signature: isMobile ? 'text-base' : 'text-lg',
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8">
      <h2 className={`${textSizes.title} font-bold text-primary mb-15`}>
        Message de bienvenue
      </h2>
      <div className={`text-gray-700 leading-relaxed mb-15 ${textSizes.body}`}>
        <p className="mb-4">
          Chères visiteuses, chers visiteurs,
        </p>
        <p className="mb-4 text-justify">
          C'est avec une grande joie et un profond sentiment de fierté que je vous souhaite 
          la bienvenue sur le site officiel du Réseau de la P49.
        </p>
        <p className="mb-4 text-justify">
          Notre réseau est bien plus qu'un regroupement d'anciens élèves : c'est une communauté solidaire, guidée par les valeurs d'excellence, de responsabilité et d'engagement citoyen. Issus de la promotion 2009-2010 de l'École Nationale d'Administration, nous avons choisi de rester unis et actifs au service de notre pays.
        </p>
        <p className="mb-4 text-justify">
          Ce site reflète notre identité, notre organisation, nos actions et notre vision. Vous y trouverez notre histoire, nos textes de référence et un répertoire interactif de nos membres. C'est aussi un espace de dialogue, de partage et de collaboration, fidèle à l'esprit qui nous unit depuis l'ENA.
        </p>
        <p className="mb-4 text-justify">
          Le Réseau de la P49 est un levier de transformation, un lieu d'échanges interprofessionnels et un acteur de l'innovation sociale. Ensemble, nous croyons en la force du collectif pour construire un avenir meilleur.
        </p>
        <p className="mb-4 text-justify">
          Je vous invite à parcourir nos différentes rubriques et à vous imprégner de l'âme de notre réseau. Que vous soyez membre, partenaire, ami ou simplement curieux, soyez les bienvenus chez nous. Ensemble, continuons de bâtir, d'innover et de faire rayonner les valeurs de la P49.
        </p>
        <p className={`text-primary`}>
          Avec toute ma considération,
        </p>
      </div>
      <p className={`font-semibold text-primary mb-5 ${textSizes.signature}`}>
        Madame MEL Méléï Marcelle
      </p>
      <p className={`font-medium text-primary`}>
        Présidente du Réseau P49
      </p>
    </div>
  );
};

export default WelcomeMessageContent;
