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
        // Requête directe pour récupérer les commissaires (id 22 et 23)
        const { data, error } = await supabase
          .from('instances_dir')
          .select('id, "Nom et Prénoms", "Poste"')
          .in('id', [22, 23])
          .order('id', { ascending: true });

        if (error) throw error;

        const formattedCommissaires: Commissaire[] = data?.map(member => ({
          id: member.id,
          name: member["Nom et Prénoms"],
          position: member["Poste"]
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