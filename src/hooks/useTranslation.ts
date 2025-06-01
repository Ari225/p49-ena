
import { useState, useEffect } from 'react';

interface Translation {
  key: string;
  fr: string;
  en: string;
}

export const useTranslation = () => {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTranslating, setIsTranslating] = useState(false);

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

  const translateText = async (text: string, targetLang: 'fr' | 'en', sourceLang: 'fr' | 'en' = 'fr'): Promise<string> => {
    setIsTranslating(true);
    try {
      // Mock translation - in a real app, this would call a translation service
      if (targetLang === sourceLang) return text;
      
      // Simple mock translations for demo
      const mockTranslations: { [key: string]: { [key: string]: string } } = {
        'fr': {
          'Bienvenue': 'Welcome',
          'À propos': 'About',
          'Contact': 'Contact'
        },
        'en': {
          'Welcome': 'Bienvenue',
          'About': 'À propos',
          'Contact': 'Contact'
        }
      };
      
      return mockTranslations[sourceLang]?.[text] || text;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    } finally {
      setIsTranslating(false);
    }
  };

  return { translate, loading, translateText, isTranslating };
};
