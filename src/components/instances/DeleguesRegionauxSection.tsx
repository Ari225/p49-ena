
import React from 'react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import MemberOrganigramCard from './MemberOrganigramCard';

const DeleguesRegionauxSection = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  const delegues = [
    { name: "SORO Thima", position: "Délégué Régional Sud-Ouest", phone: "0506727271" },
    { name: "SILUE Kiyala", position: "Délégué Régional Nord-Est", phone: "0708767676" }
  ];

  // Mobile Version
  if (isMobile) {
    return (
      <section className="py-3">
        <h2 className="text-xl font-bold text-center mb-[25px] md:mb-[25px] text-primary">
          Délégués Régionaux
        </h2>
        <div className="grid grid-cols-1 gap-3 max-w-sm mx-auto">
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

  // Tablet Version - Uniformisation avec max-w-[280px] sur une seule ligne
  if (isTablet) {
    return (
      <section className="py-4">
        <h2 className="text-2xl font-bold text-center mb-[30px] md:mb-[30px] text-primary">
          Délégués Régionaux
        </h2>
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {delegues.map((member, index) => (
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
        Délégués Régionaux
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
