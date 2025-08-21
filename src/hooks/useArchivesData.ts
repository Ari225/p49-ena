
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Archive {
  id: string;
  title: string;
  year: number;
  month: string;
  category: string;
  file_url: string;
  cover_image_url?: string;
  description?: string;
  summary: string;
  pdf_url: string;
  publish_date: string;
  page_count: number;
  status: string;
}

export const useArchivesData = () => {
  const [archives, setArchives] = useState<Archive[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    fetchArchives();
  }, []);

  const fetchArchives = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('journal_editions')
        .select('*')
        .eq('status', 'archive')
        .order('publish_date', { ascending: false });

      if (error) throw error;

      const formattedArchives: Archive[] = (data || []).map(edition => ({
        id: edition.id,
        title: edition.title,
        year: new Date(edition.publish_date).getFullYear(),
        month: new Date(edition.publish_date).toLocaleDateString('fr-FR', { month: 'long' }),
        category: 'Journal archivé',
        file_url: edition.pdf_url || '',
        cover_image_url: edition.cover_image_url,
        description: edition.summary,
        summary: edition.summary || '',
        pdf_url: edition.pdf_url || '',
        publish_date: edition.publish_date,
        page_count: edition.page_count || 0,
        status: edition.status
      }));

      setArchives(formattedArchives);
    } catch (err) {
      setError('Erreur lors du chargement des archives');
    } finally {
      setLoading(false);
    }
  };

  const filteredJournals = useMemo(() => {
    return archives.filter(archive => {
      const matchesSearch = searchTerm === '' || 
        archive.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        archive.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  }, [archives, searchTerm]);

  const availableYears = useMemo(() => {
    const years = [...new Set(archives.map(archive => archive.year.toString()))];
    return years.sort((a, b) => parseInt(b) - parseInt(a));
  }, [archives]);

  const clearFilters = () => {
    setSearchTerm('');
  };

  return { 
    archives, 
    loading, 
    error, 
    filteredJournals,
    searchTerm,
    setSearchTerm,
    clearFilters,
    availableYears: []
  };
};
