import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface LatestCareerQuote {
  id: string;
  quote: string;
  member_name: string;
  member_first_name: string;
  member_position: string;
}

export const useLatestCareerQuote = () => {
  const [quote, setQuote] = useState<LatestCareerQuote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestQuote = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('career_quotes')
          .select('id, quote, member_name, member_first_name, member_position')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) throw error;
        
        setQuote(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
        console.error('Erreur lors du chargement de la citation:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestQuote();
  }, []);

  return { quote, loading, error };
};