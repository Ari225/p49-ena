
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface LanguageToggleProps {
  mobile?: boolean;
}

const LanguageToggle = ({ mobile = false }: LanguageToggleProps) => {
  const { language, setLanguage } = useLanguage();

  const buttonClass = mobile 
    ? `px-2 py-1 text-xs font-medium rounded transition-colors`
    : `px-2 py-1 text-sm font-medium rounded transition-colors`;

  const activeClass = 'bg-primary text-white';
  const inactiveClass = 'text-gray-700 hover:bg-accent';

  return (
    <div className="flex items-center space-x-1">
      <button 
        onClick={() => setLanguage('fr')} 
        className={`${buttonClass} ${language === 'fr' ? activeClass : inactiveClass}`}
      >
        FR
      </button>
      <button 
        onClick={() => setLanguage('en')} 
        className={`${buttonClass} ${language === 'en' ? activeClass : inactiveClass}`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
