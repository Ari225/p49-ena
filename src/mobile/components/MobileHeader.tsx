
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMobileNavigation } from '../hooks/useMobileNavigation';
import { useLanguage } from '@/context/LanguageContext';

interface MobileHeaderProps {
  logo?: string;
  title?: string;
}

interface MenuItem {
  label: string;
  path?: string;
  submenu?: { label: string; path: string }[];
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ 
  logo = "/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png",
  title = "P49 ENA"
}) => {
  const { isMenuOpen, toggleMenu, closeMenu } = useMobileNavigation();
  const { language, setLanguage, t } = useLanguage();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    { label: 'Accueil', path: '/' },
    { 
      label: 'Présentation',
      submenu: [
        { label: 'Historique du réseau', path: '/historique' },
        { label: 'Textes officiels', path: '/textes-officiels' },
        { label: 'Instances dirigeantes', path: '/instances-dirigeantes' },
        { label: 'Répertoire des membres', path: '/repertoire-membres' }
      ]
    },
    {
      label: 'Activités',
      submenu: [
        { label: 'Agenda', path: '/agenda' },
        { label: 'Régionales', path: '/regionales' },
        { label: 'Assemblées Générales', path: '/assemblees-generales' },
        { label: 'Réunions de constitution', path: '/reunions-constitution' }
      ]
    },
    {
      label: 'Évènements sociaux',
      submenu: [
        { label: 'Évènements heureux', path: '/evenements-heureux' },
        { label: 'Départs à la retraite', path: '/departs-retraite' },
        { label: 'Nécrologie', path: '/necrologie' }
      ]
    },
    {
      label: 'Carrières+',
      submenu: [
        { label: 'Formations', path: '/formations' },
        { label: 'Renforcement des capacités', path: '/renforcement-capacites' },
        { label: 'Coaching & mentorat', path: '/coaching-mentorat' },
        { label: 'Actualités des concours', path: '/actualites-concours' }
      ]
    },
    {
      label: 'Perspectives 49',
      submenu: [
        { label: 'Dernière édition', path: '/derniere-edition' },
        { label: 'Équipe éditoriale', path: '/equipe-editoriale' },
        { label: 'Actualités', path: '/actualites' },
        { label: 'Archives', path: '/archives' },
        { label: 'Faire des suggestions', path: '/suggestions' }
      ]
    },
    { label: 'Témoignages', path: '/temoignages' },
    { label: 'Galerie', path: '/galerie' },
    { label: 'Écho Régions', path: '/echo-regions' }
  ];

  const handleSubmenuToggle = (itemLabel: string) => {
    setOpenSubmenu(openSubmenu === itemLabel ? null : itemLabel);
  };

  const handleLanguageToggle = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md md:hidden">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo à gauche - style modifié pour mobile */}
          <div className="flex items-center space-x-2 flex-1">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt={title} className="h-3 w-3" />
              <span className="font-bold text-primary text-xs">{title}</span>
            </Link>
          </div>
          
          {/* Switchers de langue au centre */}
          <div className="flex items-center justify-center flex-1">
            <button
              onClick={handleLanguageToggle}
              className="flex items-center space-x-1 px-2 py-1 text-xs font-medium text-primary border border-primary/20 rounded"
            >
              <span>{language.toUpperCase()}</span>
              <span className="text-primary/60">|</span>
              <span className="text-primary/60">{language === 'fr' ? 'EN' : 'FR'}</span>
            </button>
          </div>
          
          {/* Menu hamburger à droite */}
          <div className="flex justify-end flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={closeMenu} />
          <div className="absolute top-16 left-0 right-0 bg-white shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="py-4">
              {menuItems.map((item) => (
                <div key={item.label}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => handleSubmenuToggle(item.label)}
                        className="w-full flex items-center justify-between px-6 py-3 text-left text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
                      >
                        <span className="text-left">{item.label}</span>
                        {openSubmenu === item.label ? (
                          <ChevronUp className="h-4 w-4 ml-auto" />
                        ) : (
                          <ChevronDown className="h-4 w-4 ml-auto" />
                        )}
                      </button>
                      {openSubmenu === item.label && (
                        <div className="bg-gray-50">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              onClick={closeMenu}
                              className="block px-10 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors text-left"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path!}
                      onClick={closeMenu}
                      className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors text-left"
                    >
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Boutons Contact et Connexion sur la même ligne */}
              <div className="flex items-center gap-4 px-6 py-3 mt-4 border-t border-gray-200">
                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="flex-1 text-center px-4 py-2 text-sm font-medium text-primary border border-primary rounded hover:bg-primary hover:text-white transition-colors"
                >
                  Contactez-nous
                </Link>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex-1 text-center px-4 py-2 text-sm font-medium text-white bg-primary rounded hover:bg-primary/90 transition-colors"
                >
                  Connexion
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHeader;
