
import React from 'react';
import MemberOrganigramCard from './MemberOrganigramCard';
import { useIsMobile } from '@/hooks/use-mobile';

const BureauExecutifSection = () => {
  const isMobile = useIsMobile();
  
  // Organized by hierarchy levels for organigramme
  const organigramLevels = [
    // Niveau 1: Président seul
    [
      { name: "MEL Meléï Marcelle", position: "Président", phone: "0707188863" }
    ],
    // Niveau 2: Vice-président sous le président
    [
      { name: "SANGARE Yacouba", position: "Vice-président", phone: "0708892909" }
    ],
    // Niveau 3: Secrétaire Général et Adjoint
    [
      { name: "DEKOULA Ange", position: "Secrétaire Général", phone: "0707127081" },
      { name: "EBROTIE Arnaud Angui", position: "Secrétaire Général Adjoint", phone: "0707261572" }
    ],
    // Niveau 4: Trésorier Général et Adjoint
    [
      { name: "ESSOH Loyou Jeannette", position: "Trésorier Général", phone: "0708037641" },
      { name: "SOMALA Solange", position: "Trésorier Général Adjoint", phone: "0758278832" }
    ],
    // Niveau 5: Secrétaire Coopération Internationale
    [
      { name: "IPAUD Michel", position: "Secrétaire chargé de la Coopération Internationale et de la Diaspora", phone: "0748818174" }
    ],
    // Niveau 6: Conseillers (4 membres)
    [
      { name: "KONE Mingoro Françoise", position: "Conseiller chargé de l'Organisation", phone: "0707094127" },
      { name: "POKOU Roger", position: "Conseiller chargé de la Communication", phone: "0749209420" },
      { name: "KOUAME Narcisse", position: "Conseiller chargé des Affaires Culturelles", phone: "0748436198" },
      { name: "YANSUEH Ignace", position: "Conseiller chargé des Affaires Sociales", phone: "0707247324" }
    ],
    // Niveau 7: Conseillers mobilisation et carrières (3 membres)
    [
      { name: "TIA Singoh Alexis", position: "Conseiller chargé de la Mobilisation des Ressources Financières", phone: "0709956666" },
      { name: "BADOUON Monhessio Marius", position: "Conseiller chargé de la Mobilisation des Ressources Humaines", phone: "0708082464" },
      { name: "FALLE Daya Aymard", position: "Conseiller chargé des Carrières, du Renforcement des Capacités et des Négociations sociales", phone: "0709141060" }
    ],
    // Niveau 8: Présidents de commissions (3 membres)
    [
      { name: "SORO Thima", position: "Président de la Commission chargée de l'Organisation", phone: "0758730418" },
      { name: "SILUE Kiyala", position: "Président de la Commission chargée de la Communication", phone: "0708963718" },
      { name: "AHOURE Noël", position: "Président de la Commission chargée des Affaires Culturelles", phone: "0102269396" }
    ],
    // Niveau 9: Présidents de commissions (4 membres)
    [
      { name: "KPONE Bérenger", position: "Président de la Commission chargée de la Mobilisation des Ressources Humaines", phone: "0707414607" },
      { name: "ABOUA Sopie IDA épouse KOUADIO", position: "Président de la Commission chargée de la Mobilisation des Ressources Financières", phone: "0707220179" },
      { name: "KROU Allou Luc", position: "Président de la Commission Carrières, Renforcement des Capacités et Promotion et Protection des Droits Professionnels", phone: "0748788169" },
      { name: "ODJE Marie-Clémence", position: "Président de la Commission des Affaires Sociales", phone: "0707616615" }
    ]
  ];

  const ConnectionLine = ({ fromLevel, toLevel, fromIndex = 0, toIndex = 0 }: {
    fromLevel: number;
    toLevel: number;
    fromIndex?: number;
    toIndex?: number;
  }) => {
    if (isMobile) return null;

    const verticalSpacing = 340;
    const cardHeight = 220;
    const cardWidth = 280;
    
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
      Math.abs(getCardXPosition(toLevel, 0, toLevelData.length) - getCardXPosition(toLevel, toLevelData.length - 1, toLevelData.length)) + cardWidth,
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
            <div key={levelIndex} className="absolute w-full" style={{ top: `${levelIndex * 340}px` }}>
              {/* Render connection lines to next level */}
              {levelIndex < organigramLevels.length - 1 && !isMobile && (
                <div className="absolute inset-0">
                  {organigramLevels[levelIndex + 1].map((_, nextIndex) => (
                    <ConnectionLine
                      key={`${levelIndex}-${nextIndex}`}
                      fromLevel={levelIndex}
                      toLevel={levelIndex + 1}
                      fromIndex={level.length > 1 ? Math.floor(level.length / 2) : 0}
                      toIndex={nextIndex}
                    />
                  ))}
                </div>
              )}
              
              <div className="flex justify-center">
                <div className={`grid gap-8 ${
                  level.length === 1 ? 'grid-cols-1 max-w-sm' :
                  level.length === 2 ? `grid-cols-1 ${isMobile ? 'sm:grid-cols-1' : 'sm:grid-cols-2'} max-w-3xl` :
                  level.length === 3 ? `grid-cols-1 ${isMobile ? 'sm:grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3'} max-w-5xl` :
                  `grid-cols-1 ${isMobile ? 'sm:grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'} max-w-7xl`
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default BureauExecutifSection;
