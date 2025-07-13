
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
      <section className="py-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">
          Commissaires aux Comptes
        </h2>
        <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto">
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

  // Tablet Version
  if (isTablet) {
    return (
      <section className="py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          Commissaires aux Comptes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
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

  // Desktop Version
  return (
    <section className="py-10">
      <h2 className="text-4xl font-bold text-center mb-12 text-primary">
        Commissaires aux Comptes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
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
