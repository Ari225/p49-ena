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
        // Utilisation de la même fonction RPC mais filtrage des commissaires
        const { data, error } = await supabase.rpc('get_bureau_executif_members');

        if (error) throw error;

        // Filtrer seulement les commissaires aux comptes (id 22 et 23)
        const commissairesData = (data as any[])?.filter(member => 
          [22, 23].includes(member.id)
        ) || [];

        const formattedCommissaires: Commissaire[] = commissairesData.map(member => ({
          id: member.id,
          name: member.nom_prenoms,
          position: member.poste
        }));

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