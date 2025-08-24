import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface DelegueRegional {
  id: number;
  name: string;
  position: string;
  region: string;
}

export const useDeleguesRegionaux = () => {
  const [delegues, setDelegues] = useState<DelegueRegional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeleguesRegionaux = async () => {
      try {
        setLoading(true);
        console.log('🔍 Début récupération délégués régionaux...');
        
        const { data, error } = await supabase
          .from('instances_dir')
          .select('*')
          .eq('Position', 'delegues_regionaux')
          .order('id');

        console.log('📊 Réponse brute Supabase:', { data, error });

        if (error) {
          console.error('❌ Erreur Supabase:', error);
          throw error;
        }

        if (!data) {
          console.warn('⚠️ Aucune donnée retournée');
          setDelegues([]);
          return;
        }

        const formattedDelegues: DelegueRegional[] = data.map((delegue: any) => {
          console.log('🔄 Traitement délégué:', delegue);
          return {
            id: delegue.id,
            name: delegue["Nom et Prénoms"] || 'Nom non défini',
            position: delegue["Poste"] || 'Poste non défini',
            region: delegue["Région"] || 'Région non définie'
          };
        });

        console.log('✅ Délégués formatés:', formattedDelegues);
        setDelegues(formattedDelegues);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement';
        console.error('💥 Erreur complète:', err);
        setError(errorMessage);
      } finally {
        setLoading(false);
        console.log('🏁 Fin du chargement des délégués');
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