
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface JournalEdition {
  id: string;
  title: string;
  summary: string;
  cover_image_url: string;
  pdf_url: string;
  publish_date: string;
  page_count: number;
  status: string;
}

export const useArchivesData = () => {
  const [journals, setJournals] = useState<JournalEdition[]>([]);
  const [filteredJournals, setFilteredJournals] = useState<JournalEdition[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    fetchJournals();
  }, []);

  useEffect(() => {
    filterJournals();
  }, [journals, searchTerm, selectedMonth, selectedYear]);

  const fetchJournals = async () => {
    try {
      const { data, error } = await supabase
        .from('journal_editions')
        .select('*')
        .eq('status', 'publie')
        .order('publish_date', { ascending: false });

      if (error) throw error;
      setJournals(data || []);
    } catch (error) {
      console.error('Error fetching journals:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterJournals = () => {
    let filtered = journals;

    if (searchTerm) {
      filtered = filtered.filter(journal => 
        journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        journal.summary?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedMonth || selectedYear) {
      filtered = filtered.filter(journal => {
        const date = new Date(journal.publish_date);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());

        if (selectedMonth && selectedYear) {
          return month === selectedMonth && year === selectedYear;
        } else if (selectedMonth) {
          return month === selectedMonth;
        } else if (selectedYear) {
          return year === selectedYear;
        }
        return true;
      });
    }

    setFilteredJournals(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedMonth('');
    setSelectedYear('');
  };

  const availableYears = [...new Set(journals.map(journal => 
    new Date(journal.publish_date).getFullYear().toString()
  ))].sort((a, b) => b.localeCompare(a));

  return {
    journals,
    filteredJournals,
    loading,
    searchTerm,
    setSearchTerm,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    clearFilters,
    availableYears
  };
};
