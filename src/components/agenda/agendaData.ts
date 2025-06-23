
export const allActivities = [
  // Activités à venir
  {
    id: 1,
    title: "Formation en Leadership Public",
    date: "15 Avril 2024",
    time: "09:00 - 17:00",
    location: "ENA Abidjan",
    participants: "25 places disponibles",
    description: "Formation intensive sur les techniques de leadership dans l'administration publique moderne.",
    type: "Formation",
    status: "À venir",
    calendarDate: new Date(2024, 3, 15), // Avril = 3 (0-indexed)
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    title: "Conférence sur la Digitalisation",
    date: "22 Avril 2024", 
    time: "14:00 - 18:00",
    location: "Hôtel Ivoire",
    participants: "100 participants",
    description: "Conférence sur les enjeux de la transformation numérique dans les services publics.",
    type: "Conférence",
    status: "À venir",
    calendarDate: new Date(2024, 3, 22),
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop"
  },
  // Activités récentes
  {
    id: 3,
    title: "Assemblée Générale Ordinaire",
    date: "20 Mars 2024",
    time: "09:00 - 16:00", 
    location: "ENA Abidjan",
    participants: "80 membres présents",
    description: "Assemblée générale ordinaire avec présentation du bilan et perspectives 2024.",
    type: "Assemblée",
    status: "Terminé",
    calendarDate: new Date(2024, 2, 20), // Mars = 2
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=250&fit=crop"
  },
  {
    id: 4,
    title: "Atelier Gestion de Projet",
    date: "10 Mars 2024",
    time: "08:30 - 12:30",
    location: "Centre de formation",
    participants: "15 participants",
    description: "Atelier pratique sur la gestion de projet dans l'administration publique.",
    type: "Atelier",
    status: "Terminé",
    calendarDate: new Date(2024, 2, 10),
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=250&fit=crop"
  },
  // Événements additionnels pour le calendrier
  {
    id: 5,
    title: "Assemblée Générale Extraordinaire",
    date: "15 Juin 2024",
    time: "09:00",
    location: "Hôtel Ivoire, Abidjan",
    type: "AG",
    participants: "120 participants attendus",
    description: "Assemblée générale extraordinaire pour les amendements statutaires",
    status: "À venir",
    calendarDate: new Date(2024, 5, 15)
  },
  {
    id: 6,
    title: "Régionale Centre",
    date: "28 Juin 2024",
    time: "14:00",
    location: "Yamoussoukro",
    type: "Régionale",
    participants: "45 participants attendus",
    description: "Rencontre régionale des membres du centre",
    status: "À venir",
    calendarDate: new Date(2024, 5, 28)
  }
];

export const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'AG': 
    case 'Assemblée': return 'bg-red-100 text-red-800';
    case 'Régionale': return 'bg-blue-100 text-blue-800';
    case 'Formation': 
    case 'Atelier': return 'bg-green-100 text-green-800';
    case 'Conférence': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
