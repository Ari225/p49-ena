import React from 'react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { useCommissaires } from '@/hooks/useCommissaires';
import MemberOrganigramCard from './MemberOrganigramCard';

const CommissairesSection = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { commissaires, loading, error } = useCommissaires();

  if (loading) {
    return (
      <section className="py-3">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-[25px] md:mb-[30px] lg:mb-[35px] text-primary">
          Commissaires aux Comptes
        </h2>
        <div className="text-center">Chargement...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-3">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-[25px] md:mb-[30px] lg:mb-[35px] text-primary">
          Commissaires aux Comptes
        </h2>
        <div className="text-center text-red-600">Erreur : {error}</div>
      </section>
    );
  }

  // Mobile Version
  if (isMobile) {
    return (
      <section className="py-3">
        <h2 className="text-xl font-bold text-center mb-[25px] text-primary">
          Commissaires aux Comptes
        </h2>
        <div className="grid grid-cols-1 gap-5 max-w-sm mx-auto">
          {commissaires.map((member) => (
            <MemberOrganigramCard
              key={member.id}
              name={member.name}
              position={member.position}
              phone=""
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
        <h2 className="text-2xl font-bold text-center mb-[30px] text-primary">
          Commissaires aux Comptes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {commissaires.map((member) => (
            <div key={member.id} className="max-w-[280px] mx-auto w-full">
              <MemberOrganigramCard
                name={member.name}
                position={member.position}
                phone=""
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
      <h2 className="text-3xl font-bold text-center mb-[35px] text-primary">
        Commissaires aux Comptes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {commissaires.map((member) => (
          <MemberOrganigramCard
            key={member.id}
            name={member.name}
            position={member.position}
            phone=""
          />
        ))}
      </div>
    </section>
  );
};

export default CommissairesSection;