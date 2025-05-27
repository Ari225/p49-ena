
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { setUserContext } from '@/utils/supabaseHelpers';

export const useSupabaseAuth = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Configurer l'ID utilisateur pour cette session
      setUserContext(user.id);
    }
  }, [user]);

  return { user };
};
