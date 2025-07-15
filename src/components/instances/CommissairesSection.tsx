
import React from 'react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import MemberOrganigramCard from './MemberOrganigramCard';

const CommissairesSection = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  const commissaires = [
    { name: "CISSE Almamy", position: "Commissaire aux Comptes", phone: "0708535270" },
    { name: "AMOA Brou Etienne", position: "Commissaire aux Comptes Adjoint", phone: "0708878381" }
  ];

  // Mobile Version
  if (isMobile) {
    return (
      <section className="py-3">
        <h2 className="text-xl font-bold text-center mb-[25px] md:mb-[25px] text-primary">
          Commissaires aux Comptes
        </h2>
        <div className="grid grid-cols-1 gap-5 max-w-sm mx-auto">
          {commissaires.map((member, index) => (
            <MemberOrganigramCard
              key={index}
              name={member.name}
              position={member.position}
              phone={member.phone}
            />
          ))}
        </div>
      </section>
    );
  }

  // Tablet Version - Uniformisation avec max-w-[280px]
  if (isTablet) {
    return (
      <section className="py-4">
        <h2 className="text-2xl font-bold text-center mb-[30px] md:mb-[30px] text-primary">
          Commissaires aux Comptes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {commissaires.map((member, index) => (
            <div key={index} className="max-w-[280px] mx-auto w-full">
              <MemberOrganigramCard
                name={member.name}
                position={member.position}
                phone={member.phone}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Desktop Version
  return (
    <section className="py-6">
      <h2 className="text-3xl font-bold text-center mb-[35px] md:mb-[35px] text-primary">
        Commissaires aux Comptes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {commissaires.map((member, index) => (
          <MemberOrganigramCard
            key={index}
            name={member.name}
            position={member.position}
            phone={member.phone}
          />
        ))}
      </div>
    </section>
  );
};

export default CommissairesSection;
