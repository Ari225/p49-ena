
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

  const verticalSpacing = 340;
  const cardHeight = 220;
  
  const fromLevelData = organigramLevels[fromLevel];
  const toLevelData = organigramLevels[toLevel];
  
  // Calculate card positions
  const getCardXPosition = (levelIndex: number, cardIndex: number, levelSize: number) => {
    if (levelSize === 1) return 0;
    if (levelSize === 2) return (cardIndex - 0.5) * 400;
    if (levelSize === 3) return (cardIndex - 1) * 350;
    return (cardIndex - (levelSize - 1) / 2) * 320;
  };

  const fromX = getCardXPosition(fromLevel, fromIndex, fromLevelData.length);
  const toX = getCardXPosition(toLevel, toIndex, toLevelData.length);
  
  const startY = (fromLevel * verticalSpacing) + cardHeight;
  const endY = (toLevel * verticalSpacing) - 20;
  const connectionHeight = endY - startY;

  // For single source to single target
  if (fromLevelData.length === 1 && toLevelData.length === 1) {
    return (
      <svg
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: startY,
          transform: 'translateX(-50%)',
          width: Math.max(Math.abs(toX - fromX) + 40, 60),
          height: connectionHeight,
          zIndex: 0
        }}
      >
        <defs>
          <marker
            id={`arrow-${fromLevel}-${toLevel}`}
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="4"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path
              d="M0,0 L0,8 L8,4 z"
              fill="#1f2937"
              className="drop-shadow-sm"
            />
          </marker>
          <filter id="lineShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.2"/>
          </filter>
        </defs>
        <path
          d={`M 30 0 L 30 ${connectionHeight - 20} L ${30 + (toX - fromX)} ${connectionHeight - 20} L ${30 + (toX - fromX)} ${connectionHeight}`}
          stroke="#1f2937"
          strokeWidth="2"
          fill="none"
          markerEnd={`url(#arrow-${fromLevel}-${toLevel})`}
          filter="url(#lineShadow)"
          className="transition-all duration-300"
        />
      </svg>
    );
  }

  // For single source to multiple targets or multiple sources
  const connectionWidth = Math.max(
    Math.abs(getCardXPosition(toLevel, 0, toLevelData.length) - getCardXPosition(toLevel, toLevelData.length - 1, toLevelData.length)) + 280,
    600
  );

  return (
    <svg
      className="absolute pointer-events-none"
      style={{
        left: '50%',
        top: startY,
        transform: 'translateX(-50%)',
        width: connectionWidth + 100,
        height: connectionHeight,
        zIndex: 0
      }}
    >
      <defs>
        <marker
          id={`arrow-multi-${fromLevel}-${toLevel}-${toIndex}`}
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path
            d="M0,0 L0,8 L8,4 z"
            fill="#1f2937"
            className="drop-shadow-sm"
          />
        </marker>
        <filter id="multiLineShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.2"/>
        </filter>
      </defs>
      
      {/* Main vertical line from source */}
      <line
        x1={(connectionWidth + 100) / 2 + fromX}
        y1="0"
        x2={(connectionWidth + 100) / 2 + fromX}
        y2={connectionHeight * 0.6}
        stroke="#1f2937"
        strokeWidth="2"
        filter="url(#multiLineShadow)"
        className="transition-all duration-300"
      />
      
      {/* Horizontal distribution line */}
      {toLevelData.length > 1 && (
        <line
          x1={(connectionWidth + 100) / 2 + getCardXPosition(toLevel, 0, toLevelData.length)}
          y1={connectionHeight * 0.6}
          x2={(connectionWidth + 100) / 2 + getCardXPosition(toLevel, toLevelData.length - 1, toLevelData.length)}
          y2={connectionHeight * 0.6}
          stroke="#1f2937"
          strokeWidth="2"
          filter="url(#multiLineShadow)"
          className="transition-all duration-300"
        />
      )}
      
      {/* Vertical line to target */}
      <line
        x1={(connectionWidth + 100) / 2 + toX}
        y1={connectionHeight * 0.6}
        x2={(connectionWidth + 100) / 2 + toX}
        y2={connectionHeight}
        stroke="#1f2937"
        strokeWidth="2"
        markerEnd={`url(#arrow-multi-${fromLevel}-${toLevel}-${toIndex})`}
        filter="url(#multiLineShadow)"
        className="transition-all duration-300"
      />
    </svg>
  );
};

export default OrganigramConnectionLine;
