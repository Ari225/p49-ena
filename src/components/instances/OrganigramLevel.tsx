
import React from 'react';
import MemberOrganigramCard from './MemberOrganigramCard';
import OrganigramConnectionLine from './OrganigramConnectionLine';
import { OrganigramMember } from './organigramData';

interface OrganigramLevelProps {
  level: OrganigramMember[];
  levelIndex: number;
  organigramLevels: OrganigramMember[][];
  isMobile: boolean;
  isTablet?: boolean;
}

const OrganigramLevel: React.FC<OrganigramLevelProps> = ({
  level,
  levelIndex,
  organigramLevels,
  isMobile,
  isTablet = false
}) => {
  // Fonction pour déterminer la configuration de grille optimale
  const getGridConfig = () => {
    const memberCount = level.length;
    
    if (isMobile) {
      // Configuration mobile : toujours une seule colonne pour éviter le chevauchement
      return {
        gridCols: 'grid-cols-1',
        maxWidth: 'max-w-sm',
        gap: 'gap-6'
      };
    }
    
    if (isTablet) {
      // Configuration tablette
      switch (memberCount) {
        case 1:
          return {
            gridCols: 'grid-cols-1',
            maxWidth: 'max-w-md',
            gap: 'gap-8'
          };
        case 2:
          return {
            gridCols: 'grid-cols-1 sm:grid-cols-2',
            maxWidth: 'max-w-2xl',
            gap: 'gap-10'
          };
        case 3:
          return {
            gridCols: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
            maxWidth: 'max-w-4xl',
            gap: 'gap-8'
          };
        case 4:
          return {
            gridCols: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4',
            maxWidth: 'max-w-5xl',
            gap: 'gap-8'
          };
        default:
          return {
            gridCols: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
            maxWidth: 'max-w-5xl',
            gap: 'gap-8'
          };
      }
    }
    
    // Configuration desktop basée sur le nombre de membres
    switch (memberCount) {
      case 1:
        return {
          gridCols: 'grid-cols-1',
          maxWidth: 'max-w-md',
          gap: 'gap-12'
        };
      case 2:
        return {
          gridCols: 'grid-cols-1 sm:grid-cols-2',
          maxWidth: 'max-w-3xl',
          gap: 'gap-16'
        };
      case 3:
        return {
          gridCols: 'grid-cols-1 md:grid-cols-3',
          maxWidth: 'max-w-5xl',
          gap: 'gap-12'
        };
      case 4:
        return {
          gridCols: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
          maxWidth: 'max-w-6xl',
          gap: 'gap-10'
        };
      default:
        return {
          gridCols: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
          maxWidth: 'max-w-7xl',
          gap: 'gap-10'
        };
    }
  };

  const gridConfig = getGridConfig();
  
  return (
    <div className="relative w-full">
      {/* Render connection lines to next level */}
      {levelIndex < organigramLevels.length - 1 && !isMobile && (
        <div className="absolute inset-0 z-0">
          {organigramLevels[levelIndex + 1].map((_, nextIndex) => (
            <OrganigramConnectionLine
              key={`${levelIndex}-${nextIndex}`}
              fromLevel={levelIndex}
              toLevel={levelIndex + 1}
              fromIndex={level.length > 1 ? Math.floor(level.length / 2) : 0}
              toIndex={nextIndex}
              organigramLevels={organigramLevels}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          ))}
        </div>
      )}
      
      <div className="flex justify-center relative z-10">
        <div className={`grid ${gridConfig.gridCols} ${gridConfig.maxWidth} ${gridConfig.gap} mx-auto w-full`}>
          {level.map((member, index) => (
            <div 
              key={index} 
              className={`
                relative transform transition-all duration-300 hover:scale-105 hover:z-20
                ${isMobile ? 'mx-auto max-w-xs w-full' : ''}
              `}
            >
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
