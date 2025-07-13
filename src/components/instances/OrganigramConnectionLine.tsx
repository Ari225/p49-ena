
import React from 'react';
import { OrganigramMember } from './organigramData';

interface ConnectionLineProps {
  fromLevel: number;
  toLevel: number;
  fromIndex?: number;
  toIndex?: number;
  organigramLevels: OrganigramMember[][];
  isMobile: boolean;
  isTablet?: boolean;
}

const OrganigramConnectionLine: React.FC<ConnectionLineProps> = ({
  fromLevel,
  toLevel,
  fromIndex = 0,
  toIndex = 0,
  organigramLevels,
  isMobile,
  isTablet = false
}) => {
  if (isMobile) return null;

  // Ajustement de l'espacement vertical selon la version
  const verticalSpacing = isTablet ? 120 : 140;
  
  const fromLevelData = organigramLevels[fromLevel];
  const toLevelData = organigramLevels[toLevel];
  
  // Calcul des positions optimisé pour éviter les débordements
  const getCardXPosition = (levelIndex: number, cardIndex: number, levelSize: number) => {
    if (levelSize === 1) return 0;
    
    // Ajustement des espacements selon la version
    const spacing = isTablet ? 280 : 320;
    
    if (levelSize === 2) return (cardIndex - 0.5) * spacing;
    if (levelSize === 3) return (cardIndex - 1) * (spacing * 0.9);
    if (levelSize === 4) return (cardIndex - 1.5) * (spacing * 0.8);
    return (cardIndex - (levelSize - 1) / 2) * (spacing * 0.75);
  };

  const fromX = getCardXPosition(fromLevel, fromIndex, fromLevelData.length);
  const toX = getCardXPosition(toLevel, toIndex, toLevelData.length);
  
  const startY = 0;
  const endY = verticalSpacing;
  const connectionHeight = endY - startY;

  // Connexion professionnelle avec largeur adaptative
  const connectionWidth = Math.max(
    Math.abs(toX - fromX) + (isTablet ? 150 : 200),
    isTablet ? 500 : 600
  );

  return (
    <svg
      className="absolute pointer-events-none"
      style={{
        left: '50%',
        top: startY,
        transform: 'translateX(-50%)',
        width: connectionWidth,
        height: connectionHeight,
        zIndex: 0
      }}
    >
      <defs>
        <marker
          id={`arrow-${fromLevel}-${toLevel}-${toIndex}`}
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path
            d="M0,0 L0,8 L8,4 z"
            fill="#151D3B"
            className="drop-shadow-sm"
          />
        </marker>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#151D3B" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#151D3B" stopOpacity="0.4"/>
        </linearGradient>
        <filter id="connectionShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15"/>
        </filter>
      </defs>
      
      {/* Ligne principale avec design professionnel */}
      <path
        d={`M ${connectionWidth/2 + fromX} ${startY + 20} 
            L ${connectionWidth/2 + fromX} ${connectionHeight * 0.4} 
            Q ${connectionWidth/2 + fromX} ${connectionHeight * 0.5} ${connectionWidth/2 + (fromX + toX) / 2} ${connectionHeight * 0.5}
            Q ${connectionWidth/2 + toX} ${connectionHeight * 0.5} ${connectionWidth/2 + toX} ${connectionHeight * 0.6}
            L ${connectionWidth/2 + toX} ${connectionHeight - 20}`}
        stroke="url(#lineGradient)"
        strokeWidth={isTablet ? "2.5" : "3"}
        fill="none"
        markerEnd={`url(#arrow-${fromLevel}-${toLevel}-${toIndex})`}
        filter="url(#connectionShadow)"
        className="transition-all duration-300 hover:stroke-primary"
        strokeDasharray="none"
      />
    </svg>
  );
};

export default OrganigramConnectionLine;
