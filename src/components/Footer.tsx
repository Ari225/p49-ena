
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription for:', email);
    setEmail('');
  };

  return (
    <footer className="bg-primary text-white px-4 lg:px-[100px] py-8 lg:py-[50px]">
      <div className="container mx-auto px-0">
        {/* Desktop Layout - Original */}
        <div className="hidden lg:block">
          {/* Top Section - Logo and Description */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 lg:mb-12">
            {/* Logo */}
            <div className="flex items-center mb-4 lg:mb-0">
              <img 
                src="/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png" 
                alt="P49 ENA Logo" 
                className="h-16 lg:h-20 w-auto object-contain" 
              />
            </div>
            
            {/* Description */}
            <div className="flex flex-col space-y-2 lg:text-right">
              <p className="text-gray-300 leading-relaxed max-w-[280px] lg:max-w-[240px] text-sm lg:text-base">
                La P49, des Leaders d'excellence au service de la Nation.
              </p>
              <p className="text-gray-300 leading-relaxed max-w-[280px] lg:max-w-[230px] text-sm lg:text-base">
                Plus qu'une promo, une famille unie et solidaire.
              </p>
            </div>
          </div>

          {/* Middle Section - Links and Contact */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-8 lg:mb-12">
            {/* Quick Links */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/historique" className="text-gray-300 hover:text-secondary transition-colors text-sm lg:text-base">
                    Historique
                  </Link>
                </li>
                <li>
                  <Link to="/actualites" className="text-gray-300 hover:text-secondary transition-colors text-sm lg:text-base">
                    Actualités
                  </Link>
                </li>
                <li>
                  <Link to="/agenda" className="text-gray-300 hover:text-secondary transition-colors text-sm lg:text-base">
                    Agenda
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-secondary transition-colors text-sm lg:text-base">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p className="text-sm lg:text-base">Abidjan, Côte d'Ivoire</p>
                <p className="text-sm lg:text-base">communication@p49-ena.ci</p>
                <p className="text-sm lg:text-base">+225 07 79 05 47 16</p>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mb-8 lg:mb-12">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4 max-w-md">
              Restez informé de nos actualités et événements
            </p>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input 
                  type="email" 
                  placeholder="Votre email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 flex-1" 
                  required 
                />
                <Button 
                  type="submit" 
                  className="bg-secondary hover:bg-secondary/90 text-primary whitespace-nowrap"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  S'abonner
                </Button>
              </div>
            </form>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/20 pt-6">
            <div className="text-sm text-gray-400 text-center lg:text-left">
              © 2024 P49 ENA. {t('footer.rights')}.
            </div>
          </div>
        </div>

        {/* Mobile Layout - New Structure */}
        <div className="lg:hidden">
          {/* Top Section - Logo (left) and Description (right) */}
          <div className="flex items-start justify-between mb-6">
            {/* Logo à gauche */}
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png" 
                alt="P49 ENA Logo" 
                className="h-12 w-auto object-contain" 
              />
            </div>
            
            {/* Description à droite */}
            <div className="flex flex-col space-y-1 text-right max-w-[180px]">
              <p className="text-gray-300 leading-relaxed text-xs">
                La P49, des Leaders d'excellence au service de la Nation.
              </p>
              <p className="text-gray-300 leading-relaxed text-xs">
                Plus qu'une promo, une famille unie et solidaire.
              </p>
            </div>
          </div>

          {/* Middle Section - Links and Contact on same row */}
          <div className="flex gap-6 mb-6">
            {/* Quick Links */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold mb-3">Liens Rapides</h3>
              <ul className="space-y-1">
                <li>
                  <Link to="/historique" className="text-gray-300 hover:text-secondary transition-colors text-xs">
                    Historique
                  </Link>
                </li>
                <li>
                  <Link to="/actualites" className="text-gray-300 hover:text-secondary transition-colors text-xs">
                    Actualités
                  </Link>
                </li>
                <li>
                  <Link to="/agenda" className="text-gray-300 hover:text-secondary transition-colors text-xs">
                    Agenda
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-secondary transition-colors text-xs">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold mb-3">Contact</h3>
              <div className="space-y-1 text-gray-300">
                <p className="text-xs">Abidjan, Côte d'Ivoire</p>
                <p className="text-xs">communication@p49-ena.ci</p>
                <p className="text-xs">+225 07 79 05 47 16</p>
              </div>
            </div>
          </div>

          {/* Newsletter Section - Below links and contact */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3">Newsletter</h3>
            <p className="text-gray-300 text-xs mb-3">
              Restez informé de nos actualités et événements
            </p>
            <form onSubmit={handleNewsletterSubmit}>
              <div className="flex flex-col gap-2">
                <Input 
                  type="email" 
                  placeholder="Votre email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-sm" 
                  required 
                />
                <Button 
                  type="submit" 
                  className="bg-secondary hover:bg-secondary/90 text-primary text-xs py-2"
                >
                  <Mail className="h-3 w-3 mr-1" />
                  S'abonner
                </Button>
              </div>
            </form>
          </div>

          {/* Copyright - At the bottom */}
          <div className="border-t border-white/20 pt-4">
            <div className="text-xs text-gray-400 text-center">
              © 2024 P49 ENA. {t('footer.rights')}.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
