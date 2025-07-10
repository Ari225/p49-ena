
import React from 'react';

interface FooterLinksProps {
  variant?: 'mobile' | 'tablet' | 'desktop';
}

const FooterLinks: React.FC<FooterLinksProps> = ({ variant = 'desktop' }) => {
  return (
    <div className="flex justify-center lg:justify-start mb-6 lg:mb-0">
      <div className="text-center lg:text-left w-full">
        <h3 className={`font-semibold mb-3 lg:mb-4 ${
          variant === 'mobile' ? 'text-base' :
          variant === 'tablet' ? 'text-lg' :
          'text-lg'
        }`}>
          Liens utiles
        </h3>
        <ul className="space-y-2">
          <li>
            <a 
              href="https://www.ena.ci" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`text-gray-300 hover:text-secondary transition-colors ${
                variant === 'mobile' ? 'text-xs' :
                variant === 'tablet' ? 'text-sm' :
                'text-xs lg:text-base'
              }`}
            >
              École Nationale d'Administration
            </a>
          </li>
          <li>
            <a 
              href="https://www.fonctionpublique.gouv.ci" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`text-gray-300 hover:text-secondary transition-colors ${
                variant === 'mobile' ? 'text-xs' :
                variant === 'tablet' ? 'text-sm' :
                'text-xs lg:text-base'
              }`}
            >
              Fonction Publique
            </a>
          </li>
          <li>
            <a 
              href="https://www.gucaci.ciconcours.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`text-gray-300 hover:text-secondary transition-colors ${
                variant === 'mobile' ? 'text-xs' :
                variant === 'tablet' ? 'text-sm' :
                'text-xs lg:text-base'
              }`}
            >
              Concours administratifs
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FooterLinks;
