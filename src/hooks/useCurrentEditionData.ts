import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface JournalEdition {
  id: string;
  title: string;
  summary: string;
  cover_image_url?: string;
  pdf_url: string;
  publish_date: string;
  page_count: number;
  status: string;
}

export const useCurrentEditionData = () => {
  const [currentEdition, setCurrentEdition] = useState<JournalEdition | null>(null);
  const [recentEditions, setRecentEditions] = useState<JournalEdition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEditions();
  }, []);

  const fetchEditions = async () => {
    try {
      setLoading(true);
      
      // Récupérer l'édition publiée (la plus récente avec status 'publie')
      const { data: publishedData, error: publishedError } = await supabase
        .from('journal_editions')
        .select('*')
        .eq('status', 'publie')
        .order('publish_date', { ascending: false })
        .limit(1);

      if (publishedError) throw publishedError;

      const published = publishedData?.[0];
      if (published) {
        setCurrentEdition({
          id: published.id,
          title: published.title,
          summary: published.summary || '',
          cover_image_url: published.cover_image_url,
          pdf_url: published.pdf_url || '',
          publish_date: published.publish_date,
          page_count: published.page_count || 0,
          status: published.status
        });

        // Récupérer les éditions récentes (archivées, antérieures à l'édition publiée)
        const { data: recentData, error: recentError } = await supabase
          .from('journal_editions')
          .select('*')
          .eq('status', 'archive')
          .lt('publish_date', published.publish_date)
          .order('publish_date', { ascending: false })
          .limit(2);

        if (recentError) throw recentError;

        const recentEditionsFormatted: JournalEdition[] = (recentData || []).map(edition => ({
          id: edition.id,
          title: edition.title,
          summary: edition.summary || '',
          cover_image_url: edition.cover_image_url,
          pdf_url: edition.pdf_url || '',
          publish_date: edition.publish_date,
          page_count: edition.page_count || 0,
          status: edition.status
        }));

        setRecentEditions(recentEditionsFormatted);
      }
    } catch (err) {
      setError('Erreur lors du chargement des éditions');
      console.error('Error fetching editions:', err);
    } finally {
      setLoading(false);
    }
  };

  return { 
    currentEdition, 
    recentEditions, 
    loading, 
    error 
  };
};