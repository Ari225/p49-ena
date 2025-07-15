
import React from 'react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import MemberOrganigramCard from './MemberOrganigramCard';

const DeleguesRegionauxSection = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  const delegues = [
    { name: "GNEPA Samuel", position: "Délégué Régional Est", phone: "0707879789" },
    { name: "NENE Salimatou", position: "Déléguée Régionale Centre", phone: "0758156531" },
    { name: "TAPE Alain", position: "Délégué Régional Nord", phone: "0707240414" },
    { name: "KOFFI Konan Ernest", position: "Délégué Zone Sud Ouest", phone: "0101127191" }
  ];

  // Mobile Version
  if (isMobile) {
    return (
      <section className="py-6">
        <h2 className="text-xl font-bold text-center mb-[50px] md:mb-[50px] text-primary">
          Délégués Régionaux
        </h2>
        <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto">
          {delegues.map((member, index) => (
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
        <h2 className="text-2xl font-bold text-center mb-[50px] md:mb-[50px] text-primary">
          Délégués Régionaux
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {delegues.map((member, index) => (
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
      <h2 className="text-3xl font-bold text-center mb-[50px] md:mb-[50px] text-primary">
        Délégués Régionaux
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {delegues.map((member, index) => (
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

export default DeleguesRegionauxSection;
