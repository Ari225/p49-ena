
export interface PopupItem {
  id: string;
  title: string;
  message: string;
  type: 'welcome' | 'announcement' | 'alert';
  isActive: boolean;
  created_date: string;
  image_url?: string;
  display_duration: number;
  priority: 'low' | 'medium' | 'high';
  target_audience: 'all' | 'members' | 'admins';
  auto_close: boolean;
}

export interface PopupFormData {
  title: string;
  message: string;
  type: 'welcome' | 'announcement' | 'alert';
  display_duration: number;
  priority: 'low' | 'medium' | 'high';
  target_audience: 'all' | 'members' | 'admins';
  auto_close: boolean;
}
