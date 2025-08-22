
import React from 'react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { useBureauExecutif } from '@/hooks/useBureauExecutif';
import MemberOrganigramCard from './MemberOrganigramCard';

const BureauExecutifSection = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Mobile Version
  if (isMobile) {
    return <section className="relative">
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-center mb-[25px] md:mb-[25px] text-primary">
            Bureau Exécutif
          </h2>
          
          <div className="relative max-w-sm mx-auto px-0">
            <div className="space-y-4">
              {organigramLevels.map((level, levelIndex) => <OrganigramLevel key={levelIndex} level={level} levelIndex={levelIndex} organigramLevels={organigramLevels} isMobile={isMobile} />)}
            </div>
          </div>
        </div>
      </section>;
  }

  // Tablet Version
  if (isTablet) {
    return <section className="relative">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-center mb-[30px] md:mb-[30px] text-primary">
            Bureau Exécutif
          </h2>
          
          <div className="relative max-w-5xl mx-auto px-0">
            <div className="space-y-6">
              {organigramLevels.map((level, levelIndex) => <OrganigramLevel key={levelIndex} level={level} levelIndex={levelIndex} organigramLevels={organigramLevels} isMobile={false} isTablet={isTablet} />)}
            </div>
          </div>
        </div>
      </section>;
  }

  // Desktop Version
  return <section className="relative">
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-center mb-[35px] md:mb-[35px] text-primary">
          Bureau Exécutif
        </h2>
        
        <div className="relative max-w-7xl mx-auto px-8">
          <div className="space-y-8">
            {organigramLevels.map((level, levelIndex) => <OrganigramLevel key={levelIndex} level={level} levelIndex={levelIndex} organigramLevels={organigramLevels} isMobile={false} isTablet={false} />)}
          </div>
        </div>
      </div>
    </section>;
};

export default BureauExecutifSection;
