
import React from 'react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { organigramLevels } from './organigramData';
import OrganigramLevel from './OrganigramLevel';

const BureauExecutifSection = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Mobile Version
  if (isMobile) {
    return (
      <section className="relative">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-center mb-8 text-primary">
            Bureau Exécutif
          </h2>
          
          <div className="relative max-w-sm mx-auto px-4">
            <div className="space-y-12">
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
        </div>
      </section>
    );
  }

  // Tablet Version
  if (isTablet) {
    return (
      <section className="relative">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center mb-10 text-primary">
            Bureau Exécutif
          </h2>
          
          <div className="relative max-w-5xl mx-auto px-6">
            <div className="space-y-16">
              {organigramLevels.map((level, levelIndex) => (
                <OrganigramLevel
                  key={levelIndex}
                  level={level}
                  levelIndex={levelIndex}
                  organigramLevels={organigramLevels}
                  isMobile={false}
                  isTablet={isTablet}
                />
              ))}
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
        <h2 className="text-4xl font-bold text-center mb-16 text-primary">
          Bureau Exécutif
        </h2>
        
        <div className="relative max-w-7xl mx-auto px-8">
          <div className="space-y-24">
            {organigramLevels.map((level, levelIndex) => (
              <OrganigramLevel
                key={levelIndex}
                level={level}
                levelIndex={levelIndex}
                organigramLevels={organigramLevels}
                isMobile={false}
                isTablet={false}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BureauExecutifSection;
