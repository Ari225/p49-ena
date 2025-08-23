import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Activity } from '@/types/activity';
import { useToast } from '@/hooks/use-toast';

export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('activities')
        .select(`
          *,
          les_regionales (
            end_date,
            participation_fees
          )
        `)
        .order('date', { ascending: false });

      if (error) {
        throw error;
      }

      const formattedActivities: Activity[] = data?.map(activity => ({
        id: activity.id,
        title: activity.title,
        category: activity.category as Activity['category'],
        other_category: activity.other_category,
        date: activity.date,
        end_date: activity.end_date || activity.les_regionales?.[0]?.end_date,
        start_time: activity.start_time ? activity.start_time.substring(0, 5) : '',
        end_time: activity.end_time ? activity.end_time.substring(0, 5) : '',
        location: activity.location,
        brief_description: activity.brief_description || '',
        description: activity.description,
        status: activity.status as Activity['status'],
        image_url: activity.image_url,
        created_by: activity.created_by,
        participation_fees: activity.les_regionales?.[0]?.participation_fees ? 
          JSON.parse(activity.les_regionales[0].participation_fees as string) : undefined
      })) || [];

      setActivities(formattedActivities);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des activités';
      setError(errorMessage);
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteActivity = async (activityId: string) => {
    try {
      const { error } = await supabase
        .from('activities')
        .delete()
        .eq('id', activityId);

      if (error) throw error;

      setActivities(prev => prev.filter(activity => activity.id !== activityId));
      toast({
        title: "Succès",
        description: "Activité supprimée avec succès",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la suppression';
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return {
    activities,
    loading,
    error,
    refetch: fetchActivities,
    deleteActivity
  };
};