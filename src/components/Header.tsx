import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
const Header = () => {
  const {
    language,
    setLanguage,
    t
  } = useLanguage();
  const {
    user,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const menuItems = [{
    title: t('header.presentation'),
    items: [{
      label: t('menu.history'),
      href: '/historique'
    }, {
      label: t('menu.official_texts'),
      href: '/textes-officiels'
    }, {
      label: t('menu.leadership'),
      href: '/instances-dirigeantes'
    }, {
      label: t('menu.directory'),
      href: '/repertoire-membres'
    }]
  }, {
    title: t('header.activities'),
    items: [{
      label: t('menu.agenda'),
      href: '/agenda'
    }, {
      label: t('menu.regional'),
      href: '/regionales'
    }, {
      label: t('menu.assemblies'),
      href: '/assemblees-generales'
    }, {
      label: t('menu.constitution_meetings'),
      href: '/reunions-constitution'
    }]
  }, {
    title: t('header.social_events'),
    items: [{
      label: t('menu.happy_events'),
      href: '/evenements-heureux'
    }, {
      label: t('menu.retirement'),
      href: '/departs-retraite'
    }, {
      label: t('menu.necrology'),
      href: '/necrologie'
    }]
  }, {
    title: t('header.careers'),
    items: [{
      label: t('menu.training'),
      href: '/formations'
    }, {
      label: t('menu.capacity_building'),
      href: '/renforcement-capacites'
    }, {
      label: t('menu.coaching'),
      href: '/coaching-mentorat'
    }, {
      label: t('menu.competition_news'),
      href: '/actualites-concours'
    }]
  }, {
    title: t('header.perspectives'),
    items: [{
      label: t('menu.latest_edition'),
      href: '/derniere-edition'
    }, {
      label: t('menu.editorial_team'),
      href: '/equipe-editoriale'
    }, {
      label: 'Écho des régions',
      href: '/echo-regions'
    }, {
      label: t('menu.news'),
      href: '/actualites'
    }, {
      label: t('menu.archives'),
      href: '/archives'
    }, {
      label: t('menu.suggestions'),
      href: '/suggestions'
    }]
  }];
  return <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-[100px] py-[15px]">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png" alt="P49 ENA Logo" className="h-20 w-auto object-contain" />
            </Link>
          </div>

          {/* Desktop Navigation - Center Section */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-1">
              {menuItems.map((menu, index) => <DropdownMenu key={index}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-gray-700 hover:text-primary hover:bg-accent transition-colors duration-200 flex items-center space-x-1 px-3 py-2 text-sm">
                      <span className="font-medium whitespace-nowrap">{menu.title}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg mt-9">
                    {menu.items.map((item, itemIndex) => <DropdownMenuItem key={itemIndex} asChild>
                        <Link to={item.href} className="w-full text-gray-700 hover:bg-accent hover:text-primary transition-colors duration-200 px-[20px] py-[10px]">
                          {item.label}
                        </Link>
                      </DropdownMenuItem>)}
                  </DropdownMenuContent>
                </DropdownMenu>)}
            </div>
          </nav>

          {/* Right Section - Language & Auth */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Language Toggle */}
            <div className="flex items-center space-x-1">
              <button onClick={() => setLanguage('fr')} className={`px-2 py-1 text-sm font-medium rounded transition-colors ${language === 'fr' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-accent'}`}>
                FR
              </button>
              <button onClick={() => setLanguage('en')} className={`px-2 py-1 text-sm font-medium rounded transition-colors ${language === 'en' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-accent'}`}>
                EN
              </button>
            </div>

            {/* Contact/Login Button */}
            {user ? <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-md transition-colors duration-200">
                    {user.username}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-white border border-gray-200 shadow-lg">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="w-full px-4 py-2 text-gray-700 hover:bg-accent">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="w-full px-4 py-2 text-gray-700 hover:bg-accent cursor-pointer">
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> : <div className="flex space-x-2">
                <Link to="/contact">
                  <Button className="bg-primary text-white hover:bg-primary py-[5px] px-[15px] rounded flex items-center text-sm md:text-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold">
                    {t('header.contact')}
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-medium px-4 py-2 rounded-md transition-colors duration-200 text-sm">
                    {t('header.login')}
                  </Button>
                </Link>
              </div>}

            {/* Mobile Menu Button */}
            <Button variant="ghost" className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <div className="lg:hidden bg-white border-t border-gray-200 py-4">
            {menuItems.map((menu, index) => <div key={index} className="mb-4">
                <div className="font-medium text-primary mb-2 px-4">{menu.title}</div>
                {menu.items.map((item, itemIndex) => <Link key={itemIndex} to={item.href} className="block px-8 py-2 text-gray-700 hover:bg-accent hover:text-primary transition-colors duration-200" onClick={() => setIsMobileMenuOpen(false)}>
                    {item.label}
                  </Link>)}
              </div>)}
          </div>}
      </div>
    </header>;
};
export default Header;