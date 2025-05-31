
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DifficultEvent } from '@/types/difficultEvents';

export const useDifficultEvents = () => {
  const [events, setEvents] = useState<DifficultEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('difficult_events')
        .select('*')
        .order('event_date', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching difficult events:', error);
    } finally {
      setLoading(false);
    }
  };

  return { events, loading };
};
