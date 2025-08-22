import React from 'react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { useBureauExecutif } from '@/hooks/useBureauExecutif';
import MemberOrganigramCard from './MemberOrganigramCard';
import OrganigramConnectionLine from './OrganigramConnectionLine';

const BureauExecutifSection = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { organizedLevels, loading, error } = useBureauExecutif();

  if (loading) {
    return (
      <section className="relative">
        <div className="relative z-10">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-[25px] md:mb-[30px] lg:mb-[35px] text-primary">
            Bureau Exécutif
          </h2>
          <div className="text-center">Chargement...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative">
        <div className="relative z-10">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-[25px] md:mb-[30px] lg:mb-[35px] text-primary">
            Bureau Exécutif
          </h2>
          <div className="text-center text-red-600">Erreur : {error}</div>
        </div>
      </section>
    );
  }

  const renderLevel = (level: any[], levelIndex: number) => {
    const memberCount = level.length;
    
    // Déterminer la classe grid en fonction du nombre de membres et de la taille d'écran
    let gridClass = '';
    if (isMobile) {
      // En mobile, toujours une seule colonne avec largeur fixe
      gridClass = 'grid grid-cols-1 gap-4 justify-items-center max-w-sm mx-auto';
    } else if (memberCount === 1) {
      gridClass = 'grid grid-cols-1 justify-items-center';
    } else if (memberCount === 2) {
      gridClass = 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 justify-items-center max-w-2xl mx-auto';
    } else if (memberCount === 3) {
      gridClass = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-items-center max-w-4xl mx-auto';
    }

    return (
      <div key={levelIndex} className="relative w-full">
        {/* Ligne de connexion vers le niveau suivant */}
        {!isMobile && levelIndex < organizedLevels.length - 1 && (
          <OrganigramConnectionLine
            fromLevel={levelIndex}
            toLevel={levelIndex + 1}
            fromIndex={0}
            toIndex={0}
            organigramLevels={organizedLevels}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        )}
        
        <div className={`${gridClass} ${levelIndex > 0 ? 'mt-6 md:mt-8' : ''} relative z-10`}>
          {level.map((member) => (
            <div key={member.id} className={isMobile ? 'w-full max-w-sm' : ''}>
              <MemberOrganigramCard
                name={member.name}
                position={member.position}
                phone=""
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Mobile Version
  if (isMobile) {
    return (
      <section className="relative">
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-center mb-[25px] text-primary">
            Bureau Exécutif
          </h2>
          
          <div className="relative max-w-sm mx-auto px-0">
            <div className="space-y-4">
              {organizedLevels.map((level, levelIndex) => renderLevel(level, levelIndex))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Tablet Version
  if (isTablet) {
    return (
      <section className="relative">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-center mb-[30px] text-primary">
            Bureau Exécutif
          </h2>
          
          <div className="relative max-w-5xl mx-auto px-0">
            <div className="space-y-6">
              {organizedLevels.map((level, levelIndex) => renderLevel(level, levelIndex))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop Version
  return (
    <section className="relative">
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-center mb-[35px] text-primary">
          Bureau Exécutif
        </h2>
        
        <div className="relative max-w-7xl mx-auto px-8">
          <div className="space-y-8">
            {organizedLevels.map((level, levelIndex) => renderLevel(level, levelIndex))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BureauExecutifSection;