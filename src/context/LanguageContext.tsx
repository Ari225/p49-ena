import React, { createContext, useContext, useState, useCallback } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface LanguageContextType {
  language: 'fr' | 'en';
  setLanguage: (lang: 'fr' | 'en') => void;
  t: (key: string, fallback?: string) => string;
  translateAndCache: (text: string, key?: string) => Promise<string>;
  isTranslating: boolean;
}

const translations = {
  fr: {
    'header.presentation': 'Présentation',
    'header.activities': 'Activités',
    'header.social_events': 'Évènements sociaux',
    'header.careers': 'Carrières+',
    'header.perspectives': 'Perspectives 49',
    'header.contact': 'Contactez-nous',
    'header.login': 'Connexion',
    'menu.history': 'Historique du réseau',
    'menu.official_texts': 'Textes officiels',
    'menu.leadership': 'Instances dirigeantes',
    'menu.directory': 'Répertoire des membres',
    'menu.agenda': 'Agenda',
    'menu.regional': 'Les Régionales',
    'menu.assemblies': 'Assemblées Générales',
    'menu.constitution_meetings': 'Réunions de constitution',
    'menu.happy_events': 'Évènements heureux',
    'menu.retirement': 'Départs à la retraite',
    'menu.difficult_events': 'Évènements malheureux',
    'menu.training': 'Formations',
    'menu.capacity_building': 'Renforcement des capacités',
    'menu.coaching': 'Coaching & mentorat',
    'menu.competition_news': 'Actualités des concours',
    'menu.latest_edition': 'Dernière édition',
    'menu.editorial_team': 'Équipe éditoriale',
    'menu.news': 'Actualités',
    'menu.archives': 'Archives',
    'menu.suggestions': 'Faire des suggestions',
    'home.hero_title': 'RÉSEAU DES ÉNARQUES DE LA P49',
    'home.hero_subtitle': 'La P49, une famille unie et solidaire',
    'home.about_title': 'À propos de la P49-ENA',
    'home.about_description': 'Le Réseau des Énarques de la 49e Promotion de l\'École Nationale d\'Administration (ENA) de Côte d\'Ivoire est une association qui réunit les diplômés de cette promotion emblématique. Fondé sur des valeurs de fraternité, de solidarité et d\'engagement, le réseau vise à entretenir les liens entre ses membres et à prolonger l\'esprit de cohésion au-delà de la formation. Notre mission est double : d\'une part, renforcer les relations humaines et professionnelles entre les membres à travers des initiatives collectives ; d\'autre part, promouvoir l\'excellence dans la fonction publique en encourageant l\'éthique, la compétence et le service à la nation. À travers ses actions, le réseau entend contribuer activement au développement de la Côte d\'Ivoire et faire rayonner les valeurs qui ont forgé l\'identité de la 49e promotion.',
    'home.news_title': 'Actualités',
    'home.communiques_title': 'Communiqués',
    'footer.rights': 'Tous droits réservés',
    'dashboard.admin': 'Administration',
    'dashboard.editor': 'Rédaction',
    'login.title': 'Connexion',
    'login.username': 'Nom d\'utilisateur',
    'login.password': 'Mot de passe',
    'login.submit': 'Se connecter',
    'official_documents_title': 'Textes officiels',
    'official_documents_subtitle': 'Documents de création et de fonctionnement de la P49',
    'founding_documents': 'Documents fondateurs',
    'founding_documents_description': 'Découvrez les documents officiels qui ont marqué la création et l\'organisation du Réseau des Énarques de la 49e Promotion. Ces textes fondamentaux définissent notre mission, nos valeurs et notre mode de fonctionnement.',
    'download_document': 'Télécharger le document',
    'need_help': 'Besoin d\'aide ?',
    'documents_help_text': 'Pour toute question concernant ces documents ou pour obtenir des copies certifiées, n\'hésitez pas à nous contacter.',
    'contact_us': 'Nous contacter'
  },
  en: {
    'header.presentation': 'Presentation',
    'header.activities': 'Activities',
    'header.social_events': 'Social events',
    'header.careers': 'Careers+',
    'header.perspectives': 'Perspectives 49',
    'header.contact': 'Contact us',
    'header.login': 'Login',
    'menu.history': 'Network history',
    'menu.official_texts': 'Official texts',
    'menu.leadership': 'Leadership',
    'menu.directory': 'Member directory',
    'menu.agenda': 'Agenda',
    'menu.regional': 'The Regionals',
    'menu.assemblies': 'General assemblies',
    'menu.constitution_meetings': 'Constitution meetings',
    'menu.happy_events': 'Happy events',
    'menu.retirement': 'Retirements',
    'menu.difficult_events': 'Unfortunate events',
    'menu.training': 'Training',
    'menu.capacity_building': 'Capacity building',
    'menu.coaching': 'Coaching & mentoring',
    'menu.competition_news': 'Competition news',
    'menu.latest_edition': 'Latest edition',
    'menu.editorial_team': 'Editorial team',
    'menu.news': 'News',
    'menu.archives': 'Archives',
    'menu.suggestions': 'Make suggestions',
    'home.hero_title': 'NETWORK OF P49 ENARQUES',
    'home.hero_subtitle': 'P49, a united and supportive family',
    'home.about_title': 'About P49-ENA',
    'home.about_description': 'The Network of Graduates from the 49th Promotion of the National School of Administration of Côte d\'Ivoire is an association that brings together graduates from this prestigious promotion. Our mission is to maintain fraternal bonds, promote excellence in public service, and contribute to the development of our country.',
    'home.news_title': 'News',
    'home.communiques_title': 'Press releases',
    'footer.rights': 'All rights reserved',
    'dashboard.admin': 'Administration',
    'dashboard.editor': 'Editorial',
    'login.title': 'Login',
    'login.username': 'Username',
    'login.password': 'Password',
    'login.submit': 'Sign in',
    'official_documents_title': 'Official documents',
    'official_documents_subtitle': 'Creation and operational documents of P49',
    'founding_documents': 'Founding documents',
    'founding_documents_description': 'Discover the official documents that marked the creation and organization of the Network of 49th Promotion Graduates. These fundamental texts define our mission, values and operating procedures.',
    'download_document': 'Download document',
    'need_help': 'Need help?',
    'documents_help_text': 'For any questions about these documents or to obtain certified copies, please do not hesitate to contact us.',
    'contact_us': 'Contact us'
  }
};

// Cache for dynamic translations
const dynamicTranslations: { [key: string]: { [lang: string]: string } } = {};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const { translateText, isTranslating } = useTranslation();

  const t = (key: string, fallback?: string): string => {
    // Check static translations first
    const staticTranslation = translations[language][key as keyof typeof translations['fr']];
    if (staticTranslation) return staticTranslation;

    // Check dynamic translations cache
    const dynamicTranslation = dynamicTranslations[key]?.[language];
    if (dynamicTranslation) return dynamicTranslation;

    // Return fallback or key
    return fallback || key;
  };

  const translateAndCache = useCallback(async (text: string, key?: string): Promise<string> => {
    if (language === 'fr') return text;

    const cacheKey = key || text;
    
    // Check if already cached
    if (dynamicTranslations[cacheKey]?.[language]) {
      return dynamicTranslations[cacheKey][language];
    }

    try {
      const translatedText = await translateText(text, language, 'fr');
      
      // Cache the translation
      if (!dynamicTranslations[cacheKey]) {
        dynamicTranslations[cacheKey] = {};
      }
      dynamicTranslations[cacheKey][language] = translatedText;
      
      return translatedText;
    } catch (error) {
      console.error('Translation failed:', error);
      return text;
    }
  }, [language, translateText]);

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      translateAndCache,
      isTranslating 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
