
import { useState, useEffect } from 'react';

export interface Archive {
  id: string;
  title: string;
  year: number;
  month: string;
  category: string;
  file_url: string;
  cover_image_url?: string;
  description?: string;
}

export const useArchivesData = () => {
  const [archives, setArchives] = useState<Archive[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          description: 'Édition de janvier 2024 du journal Perspectives 49'
        },
        {
          id: '2',
          title: 'Perspectives 49 - Décembre 2023',
          year: 2023,
          month: 'Décembre',
          category: 'Revue mensuelle',
          file_url: '/lovable-uploads/sample.pdf',
          cover_image_url: '/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg',
          description: 'Édition de décembre 2023 du journal Perspectives 49'
        }
      ];
      setArchives(mockArchives);
    } catch (err) {
      setError('Erreur lors du chargement des archives');
    } finally {
      setLoading(false);
    }
  };

  return { archives, loading, error };
};
