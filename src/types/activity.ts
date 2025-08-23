
export interface Activity {
  id: string;
  title: string;
  category: 'Les Régionales' | 'Assemblées Générales' | 'Réunions de constitution' | 'Conférence' | 'Atelier' | 'Réunion' | 'Autre';
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
  session_president?: string; // Pour Assemblées Générales
  agenda_points?: string[]; // Pour Assemblées Générales
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
  session_president: string; // Pour Assemblées Générales
  agenda_points: string[]; // Pour Assemblées Générales
}

export const categoryOptions = [
  'Les Régionales',
  'Assemblées Générales',
  'Réunions de constitution',
  'Conférence',
  'Atelier',
  'Réunion',
  'Autre'
] as const;
