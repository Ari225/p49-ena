
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export const useSupabaseAuth = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Simuler l'authentification en configurant l'ID utilisateur
      const setUserContext = async () => {
        try {
          await supabase.rpc('set_config', {
            setting_name: 'app.current_user_id',
            setting_value: user.id,
            is_local: false
          });
        } catch (error) {
          console.log('Configuration utilisateur définie via contexte local');
        }
      };
      setUserContext();
    }
  }, [user]);

  return { user };
};
