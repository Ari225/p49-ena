
export interface PopupItem {
  id: string;
  title: string;
  message?: string;
  type: 'announcement' | 'welcome' | 'alert' | 'information' | 'other';
  other_type?: string;
  isActive: boolean;
  created_date: string;
  image_url?: string;
  target_audience: 'all_visitors' | 'all_users' | 'admins_only' | 'editors_only';
  author: string;
  position?: string;
}

export interface PopupFormData {
  title: string;
  message?: string;
  type: 'announcement' | 'welcome' | 'alert' | 'information' | 'other';
  other_type?: string;
  target_audience: 'all_visitors' | 'all_users' | 'admins_only' | 'editors_only';
  author: string;
  position?: string;
}
