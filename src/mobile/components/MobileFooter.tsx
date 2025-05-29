
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const MobileFooter: React.FC = () => {
  return (
    <footer className="bg-primary text-white md:hidden">
      <div className="px-4 py-6">
        {/* Logo et nom */}
        <div className="text-center mb-6">
          <img 
            src="/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png" 
            alt="P49 ENA" 
            className="h-12 w-12 mx-auto mb-2"
          />
          <h3 className="text-lg font-bold">P49 ENA</h3>
          <p className="text-sm opacity-80">Association des Anciens de la 49e Promotion</p>
        </div>

        {/* Liens rapides */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Liens Rapides</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link to="/historique" className="opacity-80 hover:opacity-100">Historique</Link>
            <Link to="/actualites" className="opacity-80 hover:opacity-100">Actualités</Link>
            <Link to="/temoignages" className="opacity-80 hover:opacity-100">Témoignages</Link>
            <Link to="/galerie" className="opacity-80 hover:opacity-100">Galerie</Link>
            <Link to="/echo-regions" className="opacity-80 hover:opacity-100">Écho Régions</Link>
            <Link to="/derniere-edition" className="opacity-80 hover:opacity-100">Journal</Link>
          </div>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Contact</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>communication@p49-ena.ci</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+225 01 02 03 04 05</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Abidjan, Côte d'Ivoire</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs opacity-60 border-t border-white/20 pt-4">
          <p>&copy; 2024 P49 ENA. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default MobileFooter;
