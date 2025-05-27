
import { supabase } from '@/integrations/supabase/client';

export const setUserContext = async (userId: string) => {
  try {
    // Pour le moment, nous utilisons une approche simple
    // L'ID utilisateur sera géré côté client via le contexte d'authentification
    console.log('Setting user context for user:', userId);
    
    // Nous stockons l'ID utilisateur localement pour éviter les problèmes de récursion RLS
    localStorage.setItem('current_user_id', userId);
    
    // Note: Une fois que les politiques RLS seront corrigées dans Supabase,
    // nous pourrons implémenter une fonction personnalisée plus robuste
  } catch (error) {
    console.log('Error setting user context:', error);
  }
};

// Fonction utilitaire pour obtenir l'ID utilisateur actuel
export const getCurrentUserId = (): string | null => {
  return localStorage.getItem('current_user_id');
};
