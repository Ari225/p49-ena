
import { useState, useEffect, useMemo } from 'react';

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
      // Mock data instead of Supabase
      const mockArchives: Archive[] = [
        {
          id: '1',
          title: 'Perspectives 49 - Janvier 2024',
          year: 2024,
          month: 'Janvier',
          category: 'Revue mensuelle',
          file_url: '/lovable-uploads/sample.pdf',
          cover_image_url: '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg',
          description: 'Édition de janvier 2024 du journal Perspectives 49',
          summary: 'Édition de janvier 2024 du journal Perspectives 49',
          pdf_url: '/lovable-uploads/sample.pdf',
          publish_date: '2024-01-15',
          page_count: 32,
          status: 'published'
        },
        {
          id: '2',
          title: 'Perspectives 49 - Décembre 2023',
          year: 2023,
          month: 'Décembre',
          category: 'Revue mensuelle',
          file_url: '/lovable-uploads/sample.pdf',
          cover_image_url: '/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg',
          description: 'Édition de décembre 2023 du journal Perspectives 49',
          summary: 'Édition de décembre 2023 du journal Perspectives 49',
          pdf_url: '/lovable-uploads/sample.pdf',
          publish_date: '2023-12-15',
          page_count: 28,
          status: 'published'
        }
      ];
      setArchives(mockArchives);
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
      
      const matchesMonth = selectedMonth === '' || archive.month === selectedMonth;
      const matchesYear = selectedYear === '' || archive.year.toString() === selectedYear;
      
      return matchesSearch && matchesMonth && matchesYear;
    });
  }, [archives, searchTerm, selectedMonth, selectedYear]);

  const availableYears = useMemo(() => {
    const years = [...new Set(archives.map(archive => archive.year.toString()))];
    return years.sort((a, b) => parseInt(b) - parseInt(a));
  }, [archives]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedMonth('');
    setSelectedYear('');
  };

  return { 
    archives, 
    loading, 
    error, 
    filteredJournals,
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
