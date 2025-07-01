import React from 'react';
const FooterContact = () => {
  return <div className="flex justify-center lg:justify-start mb-6 lg:mb-0">
      <div className="text-center lg:text-left w-full min-w-[50px] lg:w-[200px]">
        <h3 className="text-lg font-semibold mb-3 lg:mb-4 w-auto lg:w-20">Contacts</h3>
        <div className="space-y-2 text-gray-300 text-xs lg:text-base w-auto lg:w-[200px]">
          <p className="w-auto lg:w-[200px]">Abidjan, Côte d'Ivoire</p>
          <p className="w-auto lg:w-[200px]">infos_reseau@p49-ena.ci</p>
          <p className="w-auto lg:w-[200px]">27 21 27 47 58</p>
        </div>
      </div>
    </div>;
};
export default FooterContact;