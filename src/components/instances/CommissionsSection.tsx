
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CommissionsSection = () => {
  const commissions = [
    {
      title: "Commission chargée de la Mobilisation des Ressources Humaines",
      tasks: [
        "Elle est chargée de proposer et de mettre en œuvre des stratégies de mobilisation des énarques de la promotion 2009-2010 de l'ENA autour des activités organisées par le bureau exécutif.",
        "Elle est également chargée de mobiliser les Autorités, services et organisations nationales qui peuvent aider le Réseau à atteindre ses objectifs."
      ]
    },
    {
      title: "Commission chargée de la Mobilisation Financière",
      tasks: [
        "Elle est chargée de proposer des stratégies visant, d'une part, à mobiliser les cotisations des membres du réseau ainsi que les dons, et, d'autre part à développer des sources de revenu pour le compte du réseau."
      ]
    },
    {
      title: "Commission Culturelle",
      tasks: [
        "Elle est chargée de proposer et d'animer des activités culturelles, artistiques, récréatives, festives diverses (sortie détente, bal annuel, cérémonies diverses, colonies de vacances)."
      ]
    },
    {
      title: "Commission Sociale",
      tasks: [
        "Elle est chargée de proposer et de mettre en œuvre des stratégies de soutien aux membres du réseau en matière :",
        "• de facilitation de départ des membres à la retraite ;",
        "• d'assistance des retraités et de leurs ayants droit ;",
        "• de soutien, en cas de décès ou d'évènement malheureux."
      ]
    },
    {
      title: "Commission Carrière, Renforcement des Capacités, Promotion et Protection des Droits Professionnels",
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
    },
    {
      title: "Commission Communication",
      tasks: [
        "Elle est chargée de :",
        "• l'animation des canaux de communication de la P49 ENA ;",
        "• la gestion des relations avec la presse ;",
        "• la communication des activités et évènements concernant la vie du réseau."
      ]
    },
    {
      title: "Commission Organisation",
      tasks: [
        "Elle est chargée de la planification, de la mise en œuvre, de la coordination du suivi et de l'évaluation des activités prévues."
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Les Commissions du Réseau P49 ENA
      </h2>
      
      <div className="grid gap-6">
        {commissions.map((commission, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-primary">
                {commission.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {commission.tasks.map((task, taskIndex) => (
                  <p key={taskIndex} className="text-gray-700 leading-relaxed">
                    {task}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommissionsSection;
