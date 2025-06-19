
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const CommissionsSection = () => {
  const isMobile = useIsMobile();
  
  // Organiser les commissions en colonnes basées sur leur contenu
  const leftColumnCommissions = [
    {
      title: "Commission chargée de la Mobilisation des Ressources Humaines",
      president: "KPONE Bérenger",
      tasks: [
        "Elle est chargée de proposer et de mettre en œuvre des stratégies de mobilisation des énarques de la promotion 2009-2010 de l'ENA autour des activités organisées par le bureau exécutif.",
        "Elle est également chargée de mobiliser les Autorités, services et organisations nationales qui peuvent aider le Réseau à atteindre ses objectifs."
      ]
    },
    {
      title: "Commission Culturelle",
      president: "AHOURE Noël",
      tasks: [
        "Elle est chargée de proposer et d'animer des activités culturelles, artistiques, récréatives, festives diverses (sortie détente, bal annuel, cérémonies diverses, colonies de vacances)."
      ]
    },
    {
      title: "Commission Communication",
      president: "SILUE Kiyala",
      tasks: [
        "Elle est chargée de :",
        "• l'animation des canaux de communication de la P49 ENA ;",
        "• la gestion des relations avec la presse ;",
        "• la communication des activités et évènements concernant la vie du réseau."
      ]
    },
    {
      title: "Commission Organisation",
      president: "SORO Thima",
      tasks: [
        "Elle est chargée de la planification, de la mise en œuvre, de la coordination du suivi et de l'évaluation des activités prévues."
      ]
    }
  ];

  const rightColumnCommissions = [
    {
      title: "Commission chargée de la Mobilisation Financière",
      president: "ABOUA Sopie IDA épouse KOUADIO",
      tasks: [
        "Elle est chargée de proposer des stratégies visant, d'une part, à mobiliser les cotisations des membres du réseau ainsi que les dons, et, d'autre part à développer des sources de revenu pour le compte du réseau."
      ]
    },
    {
      title: "Commission Sociale",
      president: "ODJE Marie-Clémence",
      tasks: [
        "Elle est chargée de proposer et de mettre en œuvre des stratégies de soutien aux membres du réseau en matière :",
        "• de facilitation de départ des membres à la retraite ;",
        "• d'assistance des retraités et de leurs ayants droit ;",
        "• de soutien, en cas de décès ou d'évènement malheureux."
      ]
    },
    {
      title: "Commission Carrière, Renforcement des Capacités, Promotion et Protection des Droits Professionnels",
      president: "KROU Allou Luc",
      tasks: [
        "Elle est chargée:",
        "• d'informer, de conseiller, d'aider et de suivre les membres dans la conduite de leur parcours professionnel ;",
        "• de proposer des activités de renforcement des capacités des membres (formation en vue d'accroître leur capacité d'action et d'actualiser leurs connaissances pour une administration plus performante) ;",
        "• de détecter d'éventuels postes existant (au niveau de l'Etat, des collectivités locales et organismes publics divers, organisations internationales, entreprises publiques et privées) en vue d'en informer les membres ;",
        "• de proposer des activités de partage d'expérience professionnelle avec les élèves de l'Ecole Nationale d'Administration ;",
        "• d'aider à la protection des droits professionnels et à la négociation sociale ;",
        "• de proposer des thèmes d'étude liés notamment à la réforme de l'Etat, la modernisation de l'Administration et toutes les questions liées à l'actualité ;",
        "• de proposer la publication d'écrits."
      ]
    }
  ];

  const CommissionCard = ({ commission, index }: { commission: any, index: number }) => (
    <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-primary h-fit">
      <CardHeader className={isMobile ? 'pb-3' : ''}>
        <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} text-primary mb-2`}>
          {commission.title}
        </CardTitle>
        <div className={`bg-primary/10 rounded-lg p-3 ${isMobile ? 'mb-2' : 'mb-3'}`}>
          <p className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold text-primary`}>
            <span className="text-gray-700">Président : </span>
            {commission.president}
          </p>
        </div>
      </CardHeader>
      <CardContent className={isMobile ? 'pt-0' : ''}>
        <div className="space-y-2">
          {commission.tasks.map((task: string, taskIndex: number) => (
            <p key={taskIndex} className={`text-gray-700 leading-relaxed ${isMobile ? 'text-sm' : ''}`}>
              {task}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center ${isMobile ? 'mb-6' : 'mb-8'} text-primary`}>
        Les Commissions du Réseau P49 ENA
      </h2>
      
      {isMobile ? (
        <div className="grid gap-6 grid-cols-1">
          {[...leftColumnCommissions, ...rightColumnCommissions].map((commission, index) => (
            <CommissionCard key={index} commission={commission} index={index} />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-2">
          <div className="space-y-6">
            {leftColumnCommissions.map((commission, index) => (
              <CommissionCard key={index} commission={commission} index={index} />
            ))}
          </div>
          <div className="space-y-6">
            {rightColumnCommissions.map((commission, index) => (
              <CommissionCard key={index} commission={commission} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommissionsSection;
