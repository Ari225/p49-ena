
export interface Activity {
  id: string;
  title: string;
  category: 'Les Régionales' | 'Assemblées Générales' | 'Réunions de constitution' | 'Autre activité';
  type?: string;
  date: string;
  time: string;
  location: string;
  participants: string;
  description: string;
  status: 'À venir' | 'Terminé';
  image?: string;
  image_url?: string;
  created_by?: string;
}

export interface ActivityFormData {
  title: string;
  category: string;
  type: string;
  date: string;
  time: string;
  location: string;
  participants: string;
  description: string;
}

export const categoryOptions = [
  'Les Régionales',
  'Assemblées Générales', 
  'Réunions de constitution',
  'Autre activité'
] as const;

export const typeOptions = [
  'Formation',
  'Séminaire',
  'Atelier',
  'Conférence',
  'Assemblée',
  'Table Ronde'
] as const;
