
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { organigramLevels } from './organigramData';
import OrganigramLevel from './OrganigramLevel';

const BureauExecutifSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className={`bg-gradient-to-br from-blue-50 via-white to-indigo-50 ${isMobile ? 'p-4' : 'p-8'} relative overflow-hidden`}>
      {/* Modern grid background */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="modernGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
              <circle cx="0" cy="0" r="1" fill="#cbd5e1" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#modernGrid)"/>
        </svg>
      </div>
      
      <div className="relative z-10">
        <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center ${isMobile ? 'mb-8' : 'mb-12'} text-primary bg-white/90 backdrop-blur-sm rounded-2xl py-6 px-8 mx-auto w-fit shadow-xl border border-primary/20`}>
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
