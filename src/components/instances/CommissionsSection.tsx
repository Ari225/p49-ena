
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const CommissionsSection = () => {
  const isMobile = useIsMobile();
  
  const commissions = [
    {
      title: "Commission chargée de la Mobilisation des Ressources Humaines",
      president: "KPONE Bérenger",
      tasks: [
        "Elle est chargée de proposer et de mettre en œuvre des stratégies de mobilisation des énarques de la promotion 2009-2010 de l'ENA autour des activités organisées par le bureau exécutif.",
        "Elle est également chargée de mobiliser les Autorités, services et organisations nationales qui peuvent aider le Réseau à atteindre ses objectifs."
      ],
      size: "large"
    },
    {
      title: "Commission chargée de la Mobilisation Financière",
      president: "ABOUA Sopie IDA épouse KOUADIO",
      tasks: [
        "Elle est chargée de proposer des stratégies visant, d'une part, à mobiliser les cotisations des membres du réseau ainsi que les dons, et, d'autre part à développer des sources de revenu pour le compte du réseau."
      ],
      size: "medium"
    },
    {
      title: "Commission Culturelle",
      president: "AHOURE Noël",
      tasks: [
        "Elle est chargée de proposer et d'animer des activités culturelles, artistiques, récréatives, festives diverses (sortie détente, bal annuel, cérémonies diverses, colonies de vacances)."
      ],
      size: "medium"
    },
    {
      title: "Commission Sociale",
      president: "ODJE Marie-Clémence",
      tasks: [
        "Elle est chargée de proposer et de mettre en œuvre des stratégies de soutien aux membres du réseau en matière :",
        "• de facilitation de départ des membres à la retraite ;",
        "• d'assistance des retraités et de leurs ayants droit ;",
        "• de soutien, en cas de décès ou d'évènement malheureux."
      ],
      size: "medium"
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
      ],
      size: "large"
    },
    {
      title: "Commission Communication",
      president: "SILUE Kiyala",
      tasks: [
        "Elle est chargée de :",
        "• l'animation des canaux de communication de la P49 ENA ;",
        "• la gestion des relations avec la presse ;",
        "• la communication des activités et évènements concernant la vie du réseau."
      ],
      size: "medium"
    },
    {
      title: "Commission Organisation",
      president: "SORO Thima",
      tasks: [
        "Elle est chargée de la planification, de la mise en œuvre, de la coordination du suivi et de l'évaluation des activités prévues."
      ],
      size: "small"
    }
  ];

  // Organiser les commissions par colonnes selon leur taille de contenu
  const organizeCommissions = () => {
    if (isMobile) {
      return [commissions]; // Une seule colonne sur mobile
    }

    const column1 = [];
    const column2 = [];
    
    // Répartir selon la taille du contenu pour équilibrer les colonnes
    let column1Height = 0;
    let column2Height = 0;
    
    commissions.forEach(commission => {
      const weight = commission.size === 'large' ? 3 : commission.size === 'medium' ? 2 : 1;
      
      if (column1Height <= column2Height) {
        column1.push(commission);
        column1Height += weight;
      } else {
        column2.push(commission);
        column2Height += weight;
      }
    });

    return [column1, column2];
  };

  const columns = organizeCommissions();

  return (
    <div className="space-y-8">
      <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center ${isMobile ? 'mb-6' : 'mb-8'} text-primary`}>
        Les Commissions du Réseau P49 ENA
      </h2>
      
      <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-6">
            {column.map((commission, index) => (
              <Card key={`${columnIndex}-${index}`} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-primary">
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
                    {commission.tasks.map((task, taskIndex) => (
                      <p key={taskIndex} className={`text-gray-700 leading-relaxed ${isMobile ? 'text-sm' : ''}`}>
                        {task}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommissionsSection;
