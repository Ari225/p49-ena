
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

  return { t };
};
