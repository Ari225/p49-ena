
export interface Activity {
  id: string;
  title: string;
  category: 'Formation' | 'Conférence' | 'Réunion' | 'Assemblée générale' | 'Autre';
  other_category?: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  brief_description: string;
  description: string;
  status: 'À venir' | 'Terminé';
  image?: string;
  image_url?: string;
  created_by?: string;
}

export interface ActivityFormData {
  title: string;
  category: string;
  other_category: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  brief_description: string;
  description: string;
}

export const categoryOptions = [
  'Formation',
  'Conférence',
  'Réunion',
  'Assemblée générale',
  'Autre'
] as const;
