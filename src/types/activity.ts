
export interface Activity {
  id: string;
  title: string;
  category: 'Conférence' | 'Atelier' | 'Formation' | 'Réunion' | 'Événement social' | 'Les Régionales' | 'Autre';
  other_category?: string;
  date: string;
  end_date?: string;
  start_time: string;
  end_time: string;
  location: string;
  brief_description: string;
  description: string;
  status: 'À venir' | 'Terminé';
  image?: string;
  image_url?: string;
  created_by?: string;
  participation_fees?: ParticipationFee[];
}

export interface ParticipationFee {
  name: string;
  amount: string;
}

export interface ActivityFormData {
  title: string;
  category: string;
  other_category: string;
  date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  location: string;
  brief_description: string;
  description: string;
  participation_fees: ParticipationFee[];
}

export const categoryOptions = [
  'Conférence',
  'Atelier',
  'Formation',
  'Réunion',
  'Événement social',
  'Les Régionales',
  'Autre'
] as const;
