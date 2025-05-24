
import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: 'fr' | 'en';
  setLanguage: (lang: 'fr' | 'en') => void;
  t: (key: string) => string;
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
    'menu.regional': 'Régionales',
    'menu.assemblies': 'Assemblées Générales',
    'menu.constitution_meetings': 'Réunions de constitution',
    'menu.happy_events': 'Évènements heureux',
    'menu.retirement': 'Départs à la retraite',
    'menu.necrology': 'Nécrologie',
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
    'home.about_description': 'Le Réseau des Énarques de la 49ème Promotion de l\'École Nationale d\'Administration de Côte d\'Ivoire est une association qui regroupe les diplômés de cette promotion prestigieuse. Notre mission est de maintenir les liens de fraternité, de promouvoir l\'excellence dans la fonction publique et de contribuer au développement de notre pays.',
    'home.news_title': 'Actualités',
    'home.communiques_title': 'Communiqués',
    'footer.rights': 'Tous droits réservés',
    'dashboard.admin': 'Administration',
    'dashboard.editor': 'Rédaction',
    'login.title': 'Connexion',
    'login.username': 'Nom d\'utilisateur',
    'login.password': 'Mot de passe',
    'login.submit': 'Se connecter'
  },
  en: {
    'header.presentation': 'Presentation',
    'header.activities': 'Activities',
    'header.social_events': 'Social Events',
    'header.careers': 'Careers+',
    'header.perspectives': 'Perspectives 49',
    'header.contact': 'Contact Us',
    'header.login': 'Login',
    'menu.history': 'Network History',
    'menu.official_texts': 'Official Texts',
    'menu.leadership': 'Leadership',
    'menu.directory': 'Member Directory',
    'menu.agenda': 'Agenda',
    'menu.regional': 'Regional',
    'menu.assemblies': 'General Assemblies',
    'menu.constitution_meetings': 'Constitution Meetings',
    'menu.happy_events': 'Happy Events',
    'menu.retirement': 'Retirements',
    'menu.necrology': 'Necrology',
    'menu.training': 'Training',
    'menu.capacity_building': 'Capacity Building',
    'menu.coaching': 'Coaching & Mentoring',
    'menu.competition_news': 'Competition News',
    'menu.latest_edition': 'Latest Edition',
    'menu.editorial_team': 'Editorial Team',
    'menu.news': 'News',
    'menu.archives': 'Archives',
    'menu.suggestions': 'Make Suggestions',
    'home.hero_title': 'NETWORK OF P49 ENARQUES',
    'home.hero_subtitle': 'P49, a united and supportive family',
    'home.about_title': 'About P49-ENA',
    'home.about_description': 'The Network of Graduates from the 49th Promotion of the National School of Administration of Côte d\'Ivoire is an association that brings together graduates from this prestigious promotion. Our mission is to maintain fraternal bonds, promote excellence in public service, and contribute to the development of our country.',
    'home.news_title': 'News',
    'home.communiques_title': 'Press Releases',
    'footer.rights': 'All rights reserved',
    'dashboard.admin': 'Administration',
    'dashboard.editor': 'Editorial',
    'login.title': 'Login',
    'login.username': 'Username',
    'login.password': 'Password',
    'login.submit': 'Sign In'
  }
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['fr']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
