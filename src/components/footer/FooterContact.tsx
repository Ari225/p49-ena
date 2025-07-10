
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MapPopup from '../MapPopup';

interface FooterContactProps {
  variant?: 'mobile' | 'tablet' | 'desktop';
}

const FooterContact: React.FC<FooterContactProps> = ({ variant = 'desktop' }) => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <div className="flex justify-center lg:justify-start mb-6 lg:mb-0">
      <div className="text-center lg:text-left w-full min-w-[50px] lg:w-[200px]">
        <Link to="/contact">
          <h3 className={`font-semibold mb-3 lg:mb-4 w-auto lg:w-20 hover:text-secondary transition-colors cursor-pointer ${
            variant === 'mobile' ? 'text-base' :
            variant === 'tablet' ? 'text-lg' :
            'text-lg'
          }`}>
            Coordonnées
          </h3>
        </Link>
        <div className={`space-y-2 text-gray-300 w-auto lg:w-[200px] ${
          variant === 'mobile' ? 'text-xs' :
          variant === 'tablet' ? 'text-sm' :
          'text-xs lg:text-base'
        }`}>
          <button 
            onClick={() => setIsMapOpen(true)}
            className="w-auto lg:w-[200px] text-left hover:text-secondary transition-colors cursor-pointer"
          >
            Siège de la P49 ENA
          </button>
          <p className="w-auto lg:w-[200px]">infos_reseau@p49-ena.ci</p>
          <p className="w-auto lg:w-[200px]">+225 27 21 27 47 58</p>
        </div>
      </div>
      <MapPopup isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
    </div>
  );
};

export default FooterContact;
