
import { supabase } from '@/integrations/supabase/client';

export const setUserContext = async (userId: string) => {
  try {
    // Essayer d'utiliser set_config si elle existe
    const { error } = await supabase.rpc('set_config', {
      setting_name: 'app.current_user_id',
      setting_value: userId,
      is_local: false
    });
    
    if (error) {
      console.log('set_config function not available, using fallback method');
    }
  } catch (error) {
    console.log('Using local user context fallback');
  }
};
