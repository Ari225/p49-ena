export interface AppUser {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'admin_principal' | 'admin_secondaire' | 'redacteur';
  created_at: string;
  image_url?: string;
}

export interface AuthUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email?: string;
  role: 'admin_principal' | 'admin_secondaire' | 'redacteur';
  image_url?: string;
}

// Fonction utilitaire pour convertir entre les deux types
export const appUserToAuthUser = (appUser: AppUser): AuthUser => ({
  id: appUser.id,
  username: appUser.username,
  firstName: appUser.first_name,
  lastName: appUser.last_name,
  email: appUser.email,
  role: appUser.role,
  image_url: appUser.image_url,
});

export const authUserToAppUser = (authUser: AuthUser, created_at: string = new Date().toISOString()): AppUser => ({
  id: authUser.id,
  username: authUser.username,
  first_name: authUser.firstName,
  last_name: authUser.lastName,
  email: authUser.email || '',
  role: authUser.role,
  created_at,
  image_url: authUser.image_url,
});