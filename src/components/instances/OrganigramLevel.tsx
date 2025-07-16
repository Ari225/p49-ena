
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
        gap: 'gap-5'
      };
    }
    
    if (isTablet) {
      // Configuration tablette - toutes les cartes ont la même taille
      const isConseillerLevel = level.some(member => member.position.toLowerCase().includes('conseiller'));
      const isPresidentCommissionLevel = level.some(member => member.position.toLowerCase().includes('président de commission'));
      
      if (isConseillerLevel || isPresidentCommissionLevel) {
        // Disposition 2 par ligne pour les Conseillers et Présidents de Commission
        return {
          gridCols: 'grid-cols-2',
          maxWidth: 'max-w-2xl',
          gap: 'gap-5'
        };
      }
      
      // Pour tous les autres niveaux en tablette
      switch (memberCount) {
        case 1:
          return {
            gridCols: 'grid-cols-1',
            maxWidth: 'max-w-md',
            gap: 'gap-5'
          };
        case 2:
          return {
            gridCols: 'grid-cols-2',
            maxWidth: 'max-w-2xl',
            gap: 'gap-5'
          };
        case 3:
          return {
            gridCols: 'grid-cols-3',
            maxWidth: 'max-w-3xl',
            gap: 'gap-5'
          };
        default:
          return {
            gridCols: 'grid-cols-2',
            maxWidth: 'max-w-2xl',
            gap: 'gap-5'
          };
      }
    }
    
    // Configuration desktop avec dimensions uniformes
    switch (memberCount) {
      case 1:
        return {
          gridCols: 'grid-cols-1',
          maxWidth: 'max-w-md',
          gap: 'gap-6'
        };
      case 2:
        return {
          gridCols: 'grid-cols-2',
          maxWidth: 'max-w-3xl',
          gap: 'gap-6'
        };
      case 3:
        return {
          gridCols: 'grid-cols-3',
          maxWidth: 'max-w-5xl',
          gap: 'gap-6'
        };
      case 4:
        return {
          gridCols: 'grid-cols-4',
          maxWidth: 'max-w-6xl',
          gap: 'gap-6'
        };
      default:
        return {
          gridCols: 'grid-cols-4',
          maxWidth: 'max-w-7xl',
          gap: 'gap-6'
        };
    }
  };

  const gridConfig = getGridConfig();
  const isSingleCard = level.length === 1;
  
  // Fonction pour vérifier si une carte doit être centrée (cas spéciaux)
  const shouldCenterCard = (member: OrganigramMember, index: number) => {
    // Centrer AHOURE Noël qui est seul sur sa ligne dans le niveau 9
    if (member.name === "AHOURE Noël" && level.length === 5) {
      return index === 4; // Dernier élément du niveau 9
    }
    
    // Centrer FALLE Daya Aymard qui est seul sur sa ligne dans le niveau 7
    if (member.name === "FALLE Daya Aymard" && level.length === 3) {
      return index === 2; // Dernier élément du niveau 7
    }
    
    return false;
  };
  
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
        <div className={`grid ${gridConfig.gridCols} ${gridConfig.maxWidth} ${gridConfig.gap} mx-auto w-full ${isSingleCard ? 'place-items-center' : 'place-items-center'}`}>
          {level.map((member, index) => {
            const shouldCenter = shouldCenterCard(member, index);
            
            return (
              <div 
                key={index} 
                className={`
                  relative transform transition-all duration-300 hover:scale-105 hover:z-20
                  ${isMobile ? 'mx-auto max-w-xs w-full' : isTablet ? 'w-full h-full' : 'flex justify-center'}
                  ${shouldCenter ? 'col-span-full flex justify-center' : ''}
                `}
              >
                <MemberOrganigramCard
                  name={member.name}
                  position={member.position}
                  phone={member.phone}
                />
              </div>
            );
          })}
        </div>
      </div>
      
    </div>
  );
};

export default OrganigramLevel;
