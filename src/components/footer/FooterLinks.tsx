
import React from 'react';

const FooterLinks = () => {
  return (
    <div className="flex justify-center lg:justify-start mb-6 lg:mb-0">
      <div className="text-center lg:text-left w-full">
        <h3 className="text-lg font-semibold mb-3 lg:mb-4">Liens utiles</h3>
        <ul className="space-y-2">
          <li>
            <a 
              href="https://www.ena.ci" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-secondary transition-colors text-xs lg:text-base"
            >
              École Nationale d'Administration CI
            </a>
          </li>
          <li>
            <a 
              href="https://www.fonctionpublique.gouv.ci" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-secondary transition-colors text-xs lg:text-base"
            >
              Fonction Publique
            </a>
          </li>
          <li>
            <a 
              href="https://www.gucaci.ciconcours.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-secondary transition-colors text-xs lg:text-base"
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
