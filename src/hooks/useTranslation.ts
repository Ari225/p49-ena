
import { useState, useEffect } from 'react';

interface Translation {
  key: string;
  fr: string;
  en: string;
}

export const useTranslation = () => {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTranslations();
  }, []);

  const fetchTranslations = async () => {
    try {
      setLoading(true);
      // Mock translations instead of Supabase
      const mockTranslations: Translation[] = [
        { key: 'welcome', fr: 'Bienvenue', en: 'Welcome' },
        { key: 'about', fr: 'À propos', en: 'About' },
        { key: 'contact', fr: 'Contact', en: 'Contact' }
      ];
      setTranslations(mockTranslations);
    } catch (error) {
      console.error('Error fetching translations:', error);
    } finally {
      setLoading(false);
    }
  };

  const translate = (key: string, language: 'fr' | 'en') => {
    const translation = translations.find(t => t.key === key);
    return translation ? translation[language] : key;
  };

  return { translate, loading };
};
