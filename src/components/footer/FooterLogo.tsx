
import React from 'react';

const FooterLogo = () => {
  return (
    <div className="flex flex-col mb-8 lg:mb-0">
      <div className="flex items-center justify-center lg:justify-start mb-4 lg:mb-5">
        <img 
          src="/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png" 
          alt="P49 ENA Logo" 
          className="h-10 w-10 lg:h-20 lg:w-auto object-contain" 
        />
      </div>
      <p className="text-gray-300 leading-relaxed mb-2 text-center lg:text-left text-xs lg:text-base max-w-[240px] mx-auto lg:mx-0">
        La P49, des Leaders d'excellence au service de la Nation.
      </p>
      <p className="text-gray-300 leading-relaxed mb-4 lg:mb-5 text-center lg:text-left text-xs lg:text-base max-w-[230px] mx-auto lg:mx-0">
        Plus qu'une promo, une famille unie et solidaire.
      </p>
    </div>
  );
};

export default FooterLogo;
