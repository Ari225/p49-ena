
import React from 'react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import MemberOrganigramCard from './MemberOrganigramCard';
import { useDeleguesRegionaux } from '@/hooks/useDeleguesRegionaux';

const DeleguesRegionauxSection = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { delegues, organizedRows, loading, error } = useDeleguesRegionaux();
  
  console.log('🎯 DeleguesRegionauxSection rendu - État:', { 
    deleguesCount: delegues.length, 
    organizedRowsCount: organizedRows.length,
    loading, 
    error,
    isMobile,
    isTablet 
  });

  if (loading) {
    return (
      <section className="py-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          Délégués Régionaux
        </h2>
        <div className="text-center">Chargement des délégués...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          Délégués Régionaux
        </h2>
        <div className="text-center text-red-600">Erreur: {error}</div>
      </section>
    );
  }

  if (delegues.length === 0) {
    return (
      <section className="py-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          Délégués Régionaux
        </h2>
        <div className="text-center">Aucun délégué régional trouvé.</div>
      </section>
    );
  }

  // Mobile Version
  if (isMobile) {
    return (
      <section className="py-3">
        <h2 className="text-xl font-bold text-center mb-[25px] md:mb-[25px] text-primary">
          Délégués Régionaux
        </h2>
        <div className="grid grid-cols-1 gap-5 max-w-sm mx-auto">
          {delegues.map((delegue) => (
            <MemberOrganigramCard
              key={delegue.id}
              name={delegue.name}
              position={delegue.position}
              phone=""
            />
          ))}
        </div>
      </section>
    );
  }

  // Tablet Version - 3 par ligne
  if (isTablet) {
    return (
      <section className="py-4">
        <h2 className="text-2xl font-bold text-center mb-[30px] md:mb-[30px] text-primary">
          Délégués Régionaux
        </h2>
        <div className="space-y-5 max-w-4xl mx-auto">
          {organizedRows.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-3 gap-5">
              {row.map((delegue) => (
                <div key={delegue.id} className="max-w-[280px] mx-auto w-full">
                  <MemberOrganigramCard
                    name={delegue.name}
                    position={delegue.position}
                    phone=""
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Desktop Version - 3 par ligne
  return (
    <section className="py-6">
      <h2 className="text-3xl font-bold text-center mb-[35px] md:mb-[35px] text-primary">
        Délégués Régionaux
      </h2>
      <div className="space-y-5 max-w-6xl mx-auto">
        {organizedRows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-3 gap-5 justify-items-center">
            {row.map((delegue) => (
              <MemberOrganigramCard
                key={delegue.id}
                name={delegue.name}
                position={delegue.position}
                phone=""
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default DeleguesRegionauxSection;
