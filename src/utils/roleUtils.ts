
import { User } from '@/context/AuthContext';

export const isAdmin = (user: User | null): boolean => {
  return user?.role === 'admin_principal' || user?.role === 'admin_secondaire';
};

export const isAdminPrincipal = (user: User | null): boolean => {
  return user?.role === 'admin_principal';
};

export const isAdminSecondaire = (user: User | null): boolean => {
  return user?.role === 'admin_secondaire';
};

export const isRedacteur = (user: User | null): boolean => {
  return user?.role === 'redacteur';
};
