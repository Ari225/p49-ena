
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { organigramLevels } from './organigramData';
import OrganigramLevel from './OrganigramLevel';

const BureauExecutifSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative">
      <div className="relative z-10">
        <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center ${isMobile ? 'mb-8' : 'mb-12'} text-primary`}>
          Bureau Exécutif
        </h2>
        
        {/* Organigramme Structure */}
        <div className="relative max-w-7xl mx-auto" style={{ minHeight: `${organigramLevels.length * 340}px` }}>
          {organigramLevels.map((level, levelIndex) => (
            <OrganigramLevel
              key={levelIndex}
              level={level}
              levelIndex={levelIndex}
              organigramLevels={organigramLevels}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BureauExecutifSection;
