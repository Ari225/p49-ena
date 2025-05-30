
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Menu, ChevronDown, ChevronUp, X } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { AuthButtons } from './AuthButtons';

export const MobileHeader = () => {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleSubmenuToggle = (itemLabel: string) => {
    setOpenSubmenu(openSubmenu === itemLabel ? null : itemLabel);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenSubmenu(null);
  };

  const menuItems = [
    {
      title: t('header.presentation'),
      items: [
        { label: t('menu.history'), href: '/historique' },
        { label: t('menu.official_texts'), href: '/textes-officiels' },
        { label: t('menu.leadership'), href: '/instances-dirigeantes' },
        { label: t('menu.directory'), href: '/repertoire-membres' }
      ]
    },
    {
      title: t('header.activities'),
      items: [
        { label: t('menu.agenda'), href: '/agenda' },
        { label: t('menu.regional'), href: '/regionales' },
        { label: t('menu.assemblies'), href: '/assemblees-generales' },
        { label: t('menu.constitution_meetings'), href: '/reunions-constitution' }
      ]
    },
    {
      title: t('header.social_events'),
      items: [
        { label: t('menu.happy_events'), href: '/evenements-heureux' },
        { label: t('menu.retirement'), href: '/departs-retraite' },
        { label: t('menu.necrology'), href: '/necrologie' }
      ]
    },
    {
      title: t('header.careers'),
      items: [
        { label: t('menu.training'), href: '/formations' },
        { label: t('menu.capacity_building'), href: '/renforcement-capacites' },
        { label: t('menu.coaching'), href: '/coaching-mentorat' },
        { label: t('menu.competition_news'), href: '/actualites-concours' }
      ]
    },
    {
      title: t('header.perspectives'),
      items: [
        { label: t('menu.latest_edition'), href: '/derniere-edition' },
        { label: t('menu.editorial_team'), href: '/equipe-editoriale' },
        { label: 'Écho des régions', href: '/echo-regions' },
        { label: t('menu.news'), href: '/actualites' },
        { label: t('menu.archives'), href: '/archives' },
        { label: t('menu.suggestions'), href: '/suggestions' }
      ]
    }
  ];

  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between px-[25px] py-3">
        {/* Logo à gauche */}
        <div className="flex items-center space-x-2 flex-1">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png" 
              alt="P49 ENA Logo" 
              className="h-10 w-10" 
            />
          </Link>
        </div>
        
        {/* Switchers de langue au centre */}
        <div className="flex items-center justify-center flex-1">
          <LanguageToggle isMobile={true} />
        </div>
        
        {/* Menu hamburger à droite */}
        <div className="flex justify-end flex-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="p-2"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay avec animation de glissade */}
      <div className={`absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 max-h-[calc(100vh-60px)] overflow-y-auto z-40 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <nav className="px-[25px] py-[15px]">
          {menuItems.map(menu => (
            <div key={menu.title}>
              <button 
                onClick={() => handleSubmenuToggle(menu.title)} 
                className="w-full flex items-center justify-between px-6 py-3 text-left text-gray-700 hover:text-primary transition-colors text-sm font-medium"
              >
                <span className="text-left">{menu.title}</span>
                {openSubmenu === menu.title ? (
                  <ChevronUp className="h-4 w-4 ml-auto" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-auto" />
                )}
              </button>
              {openSubmenu === menu.title && (
                <div className="bg-gray-50">
                  {menu.items.map(item => (
                    <Link 
                      key={item.href} 
                      to={item.href} 
                      onClick={closeMobileMenu} 
                      className="block px-10 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors text-left"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <AuthButtons isMobile={true} onMobileMenuClose={closeMobileMenu} />
        </nav>
      </div>
    </div>
  );
};
