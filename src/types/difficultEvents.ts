
export interface DifficultEvent {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  category: string;
  member_name: string;
  family_support_message: string | null;
  image_url: string | null;
}

export interface EventCategory {
  id: string;
  label: string;
  icon: any;
}
