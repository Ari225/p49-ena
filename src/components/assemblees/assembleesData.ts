
export const assembleesPassees = [
  {
    id: 1,
    type: "Assemblée Générale Ordinaire",
    date: "20 Mars 2024",
    lieu: "Hôtel Ivoire, Abidjan",
    participants: 135,
    duree: "6 heures",
    president: "M. KOUADIO Jean-Baptiste",
    decisions: [
      "Adoption du rapport moral 2023",
      "Validation du rapport financier",
      "Élection du nouveau bureau",
      "Modification des statuts",
      "Programme d'activités 2024"
    ],
    documents: [
      { nom: "Rapport moral 2023", type: "PDF" },
      { nom: "Rapport financier 2023", type: "PDF" },
      { nom: "Procès-verbal AG", type: "PDF" }
    ],
    status: "Terminée",
    resume: "Assemblée générale ordinaire marquée par la présentation des bilans 2023 et l'adoption du programme d'activités pour 2024. Forte participation des membres."
  },
  {
    id: 2,
    type: "Assemblée Générale Extraordinaire",
    date: "15 Novembre 2023",
    lieu: "Palais de la Culture, Abidjan",
    participants: 98,
    duree: "4 heures",
    president: "M. KOUADIO Jean-Baptiste",
    decisions: [
      "Révision des cotisations",
      "Création nouvelles commissions",
      "Partenariats stratégiques"
    ],
    documents: [
      { nom: "Projet révision statuts", type: "PDF" },
      { nom: "Procès-verbal AGE", type: "PDF" }
    ],
    status: "Terminée",
    resume: "Assemblée extraordinaire consacrée aux réformes structurelles et à l'adaptation aux nouveaux défis de l'administration publique."
  }
];

export const assembleesFutures = [
  {
    id: 3,
    type: "Assemblée Générale Extraordinaire",
    date: "15 Juin 2024",
    lieu: "Hôtel Ivoire, Abidjan",
    participants: 120,
    duree: "5 heures",
    president: "M. KOUADIO Jean-Baptiste",
    ordreJour: [
      "Amendements statutaires",
      "Politique de formation",
      "Nouvelles adhésions",
      "Projet de digitalisation",
      "Partenariats internationaux"
    ],
    inscriptions: "Ouvertes jusqu'au 10 juin",
    status: "À venir",
    resume: "Assemblée extraordinaire pour adopter les nouvelles orientations stratégiques de la P49 et valider les projets de modernisation."
  }
];
