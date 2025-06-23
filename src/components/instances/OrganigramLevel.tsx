
import React from 'react';
import MemberOrganigramCard from './MemberOrganigramCard';
import OrganigramConnectionLine from './OrganigramConnectionLine';
import { OrganigramMember } from './organigramData';

interface OrganigramLevelProps {
  level: OrganigramMember[];
  levelIndex: number;
  organigramLevels: OrganigramMember[][];
  isMobile: boolean;
}

const OrganigramLevel: React.FC<OrganigramLevelProps> = ({
  level,
  levelIndex,
  organigramLevels,
  isMobile
}) => {
  const verticalSpacing = isMobile ? 280 : 340;
  
  return (
    <div 
      key={levelIndex} 
      className="absolute w-full" 
      style={{ top: `${levelIndex * verticalSpacing}px` }}
    >
      {/* Render connection lines to next level */}
      {levelIndex < organigramLevels.length - 1 && !isMobile && (
        <div className="absolute inset-0">
          {organigramLevels[levelIndex + 1].map((_, nextIndex) => (
            <OrganigramConnectionLine
              key={`${levelIndex}-${nextIndex}`}
              fromLevel={levelIndex}
              toLevel={levelIndex + 1}
              fromIndex={level.length > 1 ? Math.floor(level.length / 2) : 0}
              toIndex={nextIndex}
              organigramLevels={organigramLevels}
              isMobile={isMobile}
            />
          ))}
        </div>
      )}
      
      <div className="flex justify-center">
        <div className={`grid ${isMobile ? 'gap-4' : 'gap-8'} ${
          level.length === 1 ? 'grid-cols-1 max-w-sm' :
          level.length === 2 ? `grid-cols-1 ${isMobile ? 'max-w-xs' : 'sm:grid-cols-2'} ${isMobile ? '' : 'max-w-3xl'}` :
          level.length === 3 ? `grid-cols-1 ${isMobile ? 'max-w-xs' : 'sm:grid-cols-2 lg:grid-cols-3'} ${isMobile ? '' : 'max-w-5xl'}` :
          `grid-cols-1 ${isMobile ? 'max-w-xs' : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'} ${isMobile ? '' : 'max-w-7xl'}`
        }`}>
          {level.map((member, index) => (
            <div key={index} className="relative transform hover:scale-105 transition-all duration-300 hover:z-10">
              <MemberOrganigramCard
                name={member.name}
                position={member.position}
                phone={member.phone}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganigramLevel;
