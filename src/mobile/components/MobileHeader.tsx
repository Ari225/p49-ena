
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMobileNavigation } from '../hooks/useMobileNavigation';

interface MobileHeaderProps {
  logo?: string;
  title?: string;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ 
  logo = "/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png",
  title = "P49 ENA"
}) => {
  const { isMenuOpen, toggleMenu, closeMenu } = useMobileNavigation();

  const menuItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Historique', path: '/historique' },
    { label: 'Actualités', path: '/actualites' },
    { label: 'Témoignages', path: '/temoignages' },
    { label: 'Galerie', path: '/galerie' },
    { label: 'Écho Régions', path: '/echo-regions' },
    { label: 'Journal', path: '/derniere-edition' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-blue shadow-md md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt={title} className="h-8 w-8" />
            <span className="font-bold text-primary text-lg">{title}</span>
          </Link>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={closeMenu} />
          <div className="absolute top-16 left-0 right-0 bg-white shadow-lg">
            <nav className="py-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className="block px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHeader;
