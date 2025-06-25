import React from 'react';
import { Link } from 'react-router-dom';
const FooterLinks = () => {
  return <div className="flex justify-center lg:justify-start mb-6 lg:mb-0">
      <div className="text-center lg:text-left w-full">
        <h3 className="text-lg font-semibold mb-3 lg:mb-4">Liens utiles</h3>
        <ul className="space-y-2">
          <li>
            <Link to="/historique" className="text-gray-300 hover:text-secondary transition-colors text-xs lg:text-base">
              Historique
            </Link>
          </li>
          <li>
            <Link to="/actualites" className="text-gray-300 hover:text-secondary transition-colors text-xs lg:text-base">
              Actualités
            </Link>
          </li>
          <li>
            <Link to="/agenda" className="text-gray-300 hover:text-secondary transition-colors text-xs lg:text-base">
              Agenda
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-gray-300 hover:text-secondary transition-colors text-xs lg:text-base">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>;
};
export default FooterLinks;