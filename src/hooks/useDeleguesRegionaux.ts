import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface DelegueRegional {
  id: number;
  name: string;
  position: string;
}

export const useDeleguesRegionaux = () => {
  const [delegues, setDelegues] = useState<DelegueRegional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeleguesRegionaux = async () => {
      try {
        setLoading(true);
        console.log('Début de la récupération des délégués régionaux...');
        
        const { data, error } = await supabase
          .from('instances_dir')
          .select('id, "Nom et Prénoms", "Poste"')
          .eq('Position', 'delegues_regionaux')
          .order('id');

        console.log('Réponse Supabase délégués:', { data, error });

        if (error) throw error;

        const formattedDelegues: DelegueRegional[] = (data as any[])?.map((delegue: any) => ({
          id: delegue.id,
          name: delegue["Nom et Prénoms"],
          position: delegue["Poste"]
        })) || [];

        console.log('Délégués formatés:', formattedDelegues);
        setDelegues(formattedDelegues);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
        console.error('Erreur lors du chargement des délégués régionaux:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeleguesRegionaux();
  }, []);

  // Organiser les délégués par lignes de 3
  const organizeInRows = () => {
    const rows: DelegueRegional[][] = [];
    for (let i = 0; i < delegues.length; i += 3) {
      rows.push(delegues.slice(i, i + 3));
    }
    return rows;
  };

  return {
    delegues,
    organizedRows: organizeInRows(),
    loading,
    error
  };
};