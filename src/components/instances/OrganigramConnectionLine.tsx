
import React from 'react';
import { OrganigramMember } from './organigramData';

interface ConnectionLineProps {
  fromLevel: number;
  toLevel: number;
  fromIndex?: number;
  toIndex?: number;
  organigramLevels: OrganigramMember[][];
  isMobile: boolean;
}

const OrganigramConnectionLine: React.FC<ConnectionLineProps> = ({
  fromLevel,
  toLevel,
  fromIndex = 0,
  toIndex = 0,
  organigramLevels,
  isMobile
}) => {
  if (isMobile) return null;

  const verticalSpacing = 80; // Espacement réduit pour s'adapter au nouveau layout
  
  const fromLevelData = organigramLevels[fromLevel];
  const toLevelData = organigramLevels[toLevel];
  
  // Calcul des positions amélioré
  const getCardXPosition = (levelIndex: number, cardIndex: number, levelSize: number) => {
    if (levelSize === 1) return 0;
    if (levelSize === 2) return (cardIndex - 0.5) * 350;
    if (levelSize === 3) return (cardIndex - 1) * 300;
    if (levelSize === 4) return (cardIndex - 1.5) * 280;
    return (cardIndex - (levelSize - 1) / 2) * 260;
  };

  const fromX = getCardXPosition(fromLevel, fromIndex, fromLevelData.length);
  const toX = getCardXPosition(toLevel, toIndex, toLevelData.length);
  
  const startY = 0;
  const endY = verticalSpacing;
  const connectionHeight = endY - startY;

  // Connexion simple et élégante
  const connectionWidth = Math.max(
    Math.abs(toX - fromX) + 100,
    400
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
      
      {/* Ligne principale avec gradient et ombre */}
      <path
        d={`M ${connectionWidth/2 + fromX} ${startY} 
            L ${connectionWidth/2 + fromX} ${connectionHeight * 0.5} 
            L ${connectionWidth/2 + toX} ${connectionHeight * 0.5} 
            L ${connectionWidth/2 + toX} ${connectionHeight}`}
        stroke="url(#lineGradient)"
        strokeWidth="2.5"
        fill="none"
        markerEnd={`url(#arrow-${fromLevel}-${toLevel}-${toIndex})`}
        filter="url(#connectionShadow)"
        className="transition-all duration-300"
      />
    </svg>
  );
};

export default OrganigramConnectionLine;
