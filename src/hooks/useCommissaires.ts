import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Commissaire {
  id: number;
  name: string;
  position: string;
}

export const useCommissaires = () => {
  const [commissaires, setCommissaires] = useState<Commissaire[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommissaires = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.rpc('get_commissaires_members');

        if (error) throw error;

        const formattedCommissaires: Commissaire[] = (data as any[])?.map((member: any) => ({
          id: member.id,
          name: member.nom_prenoms,
          position: member.poste
        })) || [];

        setCommissaires(formattedCommissaires);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
        console.error('Erreur lors du chargement des commissaires:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommissaires();
  }, []);

  return {
    commissaires,
    loading,
    error
  };
};