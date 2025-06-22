
export const useTranslation = () => {
  const t = (key: string) => {
    // Simple mock translation function
    const translations: Record<string, string> = {
      'common.loading': 'Chargement...',
      'common.error': 'Erreur',
      'common.success': 'Succès',
      'nav.home': 'Accueil',
      'nav.about': 'À propos',
      'nav.contact': 'Contact',
    };
    
    return translations[key] || key;
  };

  // Mock translateText function for dynamic translations
  const translateText = async (text: string, targetLang: string, sourceLang: string = 'fr'): Promise<string> => {
    // Simple mock - just return the original text for now
    return text;
  };

  // Mock isTranslating state
  const isTranslating = false;

  return { t, translateText, isTranslating };
};
