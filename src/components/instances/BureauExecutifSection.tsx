
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

  const ConnectionLine = ({ fromLevel, toLevel, fromIndex = 0, toIndex = 0, isSingle = false }: {
    fromLevel: number;
    toLevel: number;
    fromIndex?: number;
    toIndex?: number;
    isSingle?: boolean;
  }) => {
    if (isMobile) return null;

    // Calculer les positions et dimensions
    const verticalSpacing = 320; // Espacement entre les niveaux
    const cardWidth = 280; // Largeur approximative d'une carte
    const cardHeight = 200; // Hauteur approximative d'une carte
    
    const fromLevelData = organigramLevels[fromLevel];
    const toLevelData = organigramLevels[toLevel];
    
    // Position de départ (bas de la carte source)
    const getCardXPosition = (levelIndex: number, cardIndex: number, levelLength: number) => {
      if (levelLength === 1) return 0;
      if (levelLength === 2) return (cardIndex - 0.5) * 400;
      if (levelLength === 3) return (cardIndex - 1) * 350;
      return (cardIndex - (levelLength - 1) / 2) * 300;
    };

    const fromX = getCardXPosition(fromLevel, fromIndex, fromLevelData.length);
    const toX = getCardXPosition(toLevel, toIndex, toLevelData.length);
    
    const startY = (fromLevel * verticalSpacing) + cardHeight + 40;
    const endY = (toLevel * verticalSpacing) - 40;
    const midY = startY + (endY - startY) / 2;

    if (isSingle) {
      // Connexion simple pour une seule carte
      return (
        <svg 
          className="absolute pointer-events-none"
          style={{
            left: '50%',
            top: startY,
            transform: 'translateX(-50%)',
            width: Math.abs(toX - fromX) + 40,
            height: endY - startY,
            zIndex: 0
          }}
        >
          <defs>
            <marker
              id={`arrowhead-${fromLevel}-${toLevel}`}
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="#374151"
                className="drop-shadow-sm"
              />
            </marker>
          </defs>
          <path
            d={`M ${(Math.abs(toX - fromX) + 40) / 2 + fromX - toX} 0 
                Q ${(Math.abs(toX - fromX) + 40) / 2 + fromX - toX} 20 
                  ${(Math.abs(toX - fromX) + 40) / 2 + fromX - toX} 40
                L ${(Math.abs(toX - fromX) + 40) / 2 + fromX - toX} ${endY - startY - 60}
                Q ${(Math.abs(toX - fromX) + 40) / 2 + fromX - toX} ${endY - startY - 40}
                  ${(Math.abs(toX - fromX) + 40) / 2 + toX - fromX} ${endY - startY - 20}
                L ${(Math.abs(toX - fromX) + 40) / 2 + toX - fromX} ${endY - startY}`}
            stroke="#374151"
            strokeWidth="2"
            fill="none"
            markerEnd={`url(#arrowhead-${fromLevel}-${toLevel})`}
            className="drop-shadow-sm"
          />
        </svg>
      );
    }

    // Connexion en T inversé pour plusieurs cartes
    const connectionWidth = Math.max(Math.abs(toX - fromX) + cardWidth, cardWidth * toLevelData.length + 100);
    
    return (
      <svg 
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: startY,
          transform: 'translateX(-50%)',
          width: connectionWidth + 100,
          height: endY - startY,
          zIndex: 0
        }}
      >
        <defs>
          <marker
            id={`arrowhead-multi-${fromLevel}-${toLevel}-${toIndex}`}
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#374151"
              className="drop-shadow-sm"
            />
          </marker>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <dropShadow dx="0" dy="1" stdDeviation="1" floodColor="#00000020"/>
          </filter>
        </defs>
        
        {/* Ligne verticale depuis la carte source */}
        <line
          x1={(connectionWidth + 100) / 2 + fromX}
          y1="0"
          x2={(connectionWidth + 100) / 2 + fromX}
          y2="60"
          stroke="#374151"
          strokeWidth="2"
          filter="url(#shadow)"
        />
        
        {/* Ligne horizontale de distribution */}
        <line
          x1={(connectionWidth + 100) / 2 - connectionWidth / 2 + 50}
          y1="60"
          x2={(connectionWidth + 100) / 2 + connectionWidth / 2 - 50}
          y2="60"
          stroke="#374151"
          strokeWidth="2"
          filter="url(#shadow)"
        />
        
        {/* Ligne verticale vers chaque carte de destination */}
        <line
          x1={(connectionWidth + 100) / 2 + toX}
          y1="60"
          x2={(connectionWidth + 100) / 2 + toX}
          y2={endY - startY}
          stroke="#374151"
          strokeWidth="2"
          markerEnd={`url(#arrowhead-multi-${fromLevel}-${toLevel}-${toIndex})`}
          filter="url(#shadow)"
        />
      </svg>
    );
  };

  return (
    <section className={`bg-gradient-to-br from-accent/20 to-primary/5 ${isMobile ? 'p-4' : 'p-8'}`}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 20 0 L 0 0 0 20" fill="none" stroke="%23f3f4f6" stroke-width="0.5"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)"/%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="relative z-10">
        <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center ${isMobile ? 'mb-8' : 'mb-12'} text-primary bg-white/80 backdrop-blur-sm rounded-xl py-4 px-6 mx-auto w-fit shadow-lg border border-primary/10`}>
          Bureau Exécutif
        </h2>
        
        {/* Organigramme Structure */}
        <div className="relative max-w-7xl mx-auto" style={{ minHeight: `${organigramLevels.length * 320}px` }}>
          {organigramLevels.map((level, levelIndex) => (
            <div key={levelIndex} className="absolute w-full" style={{ top: `${levelIndex * 320}px` }}>
              {/* Connexions vers le niveau suivant */}
              {levelIndex < organigramLevels.length - 1 && !isMobile && (
                <div className="absolute inset-0">
                  {level.length === 1 ? (
                    // Connexion simple pour niveau à une carte
                    organigramLevels[levelIndex + 1].map((_, nextIndex) => (
                      <ConnectionLine
                        key={`${levelIndex}-${nextIndex}`}
                        fromLevel={levelIndex}
                        toLevel={levelIndex + 1}
                        fromIndex={0}
                        toIndex={nextIndex}
                        isSingle={organigramLevels[levelIndex + 1].length === 1}
                      />
                    ))
                  ) : (
                    // Connexions multiples regroupées
                    organigramLevels[levelIndex + 1].map((_, nextIndex) => (
                      <ConnectionLine
                        key={`${levelIndex}-${nextIndex}`}
                        fromLevel={levelIndex}
                        toLevel={levelIndex + 1}
                        fromIndex={Math.floor(level.length / 2)}
                        toIndex={nextIndex}
                        isSingle={false}
                      />
                    ))
                  )}
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
                    <div key={index} className="relative transform hover:scale-105 transition-all duration-300">
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
