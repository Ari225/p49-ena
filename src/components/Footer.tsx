import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
const Footer = () => {
  const {
    t
  } = useLanguage();
  const [email, setEmail] = useState('');
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription for:', email);
    setEmail('');
  };
  return <footer className="bg-primary text-white px-[100px] py-[50px]">
      <div className="container mx-auto px-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png" alt="P49 ENA Logo" className="h-20 w-auto object-contain" />
              
            </div>
            <p className="text-gray-300 leading-relaxed mb-4 w-[230px]">La P49, des Leaders d'excellence au service de la Nation. Plus qu'une promo, une famille unie et solidaire.</p>
            <div className="text-sm text-gray-400">
              © 2024 P49 ENA. {t('footer.rights')}.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><Link to="/historique" className="text-gray-300 hover:text-secondary transition-colors">Historique</Link></li>
              <li><Link to="/actualites" className="text-gray-300 hover:text-secondary transition-colors">Actualités</Link></li>
              <li><Link to="/agenda" className="text-gray-300 hover:text-secondary transition-colors">Agenda</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <p>Abidjan, Côte d'Ivoire</p>
              <p>Email: communication@p49-ena.ci</p>
              <p>Tél: +225 07 79 05 47 16</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">
              Restez informé de nos actualités et événements
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="flex">
                <Input type="email" placeholder="Votre email" value={email} onChange={e => setEmail(e.target.value)} className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-r-none" required />
                <Button type="submit" className="bg-secondary hover:bg-secondary/90 text-primary rounded-l-none">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;