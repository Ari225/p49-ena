import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UpcomingFormation {
  id: string;
  title: string;
  description: string;
  date_debut: string | null;
  date_limite: string | null;
  date_ouverture: string | null;
  lieu: string | null;
  nombre_places: string | null;
  duree_formation: string | null;
  niveau: string | null;
  type_formation: string | null;
}

export const useUpcomingFormation = () => {
  const [formation, setFormation] = useState<UpcomingFormation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUpcomingFormation = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('career_announcements')
        .select('id, title, description, date_debut, date_limite, date_ouverture, lieu, nombre_places, duree_formation, niveau, type_formation')
        .eq('category', 'Formations')
        .eq('is_active', true)
        .gte('date_debut', new Date().toISOString().split('T')[0]) // Only future formations
        .order('date_debut', { ascending: true })
        .limit(1)
        .maybeSingle();

      if (error) {
        throw error;
      }

      setFormation(data);
    } catch (err) {
      console.error('Erreur lors du chargement de la formation:', err);
      setError('Erreur lors du chargement de la formation');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingFormation();
  }, []);

  return {
    formation,
    loading,
    error,
    refetch: fetchUpcomingFormation
  };
};