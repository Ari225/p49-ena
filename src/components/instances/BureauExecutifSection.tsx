
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

  return (
    <section className={`bg-accent/30 ${isMobile ? 'p-4' : 'p-8'}`}>
      <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center ${isMobile ? 'mb-8' : 'mb-12'} text-primary`}>
        Bureau Exécutif
      </h2>
      
      {/* Organigramme Structure */}
      <div className="space-y-20 max-w-7xl mx-auto">
        {organigramLevels.map((level, levelIndex) => (
          <div key={levelIndex} className="relative">
            {/* Vertical line coming from above - only for levels after first */}
            {levelIndex > 0 && (
              <div className={`absolute ${isMobile ? '-top-18' : '-top-20'} left-1/2 w-0.5 bg-gray-800 ${isMobile ? 'h-16' : 'h-18'} transform -translate-x-1/2`}></div>
            )}
            
            {/* Connection system for multiple members */}
            {level.length > 1 && !isMobile && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-10">
                {/* Main horizontal distribution line */}
                <div className={`h-0.5 bg-gray-800 ${
                  level.length === 2 ? 'w-80' :
                  level.length === 3 ? 'w-[500px]' :
                  'w-[700px]'
                }`}></div>
                
                {/* Individual vertical connectors to each card */}
                {level.map((_, index) => {
                  let leftPosition;
                  if (level.length === 2) {
                    leftPosition = index === 0 ? '25%' : '75%';
                  } else if (level.length === 3) {
                    leftPosition = index === 0 ? '20%' : index === 1 ? '50%' : '80%';
                  } else {
                    leftPosition = `${12.5 + (index * 25)}%`;
                  }
                  
                  return (
                    <div 
                      key={index}
                      className="absolute top-0 w-0.5 h-10 bg-gray-800"
                      style={{ left: leftPosition, transform: 'translateX(-50%)' }}
                    ></div>
                  );
                })}
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
                  <div key={index} className="relative">
                    <MemberOrganigramCard
                      name={member.name}
                      position={member.position}
                      phone={member.phone}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Regroupement des flèches pour les niveaux suivants avec plusieurs cartes */}
            {levelIndex < organigramLevels.length - 1 && (
              <div className="relative">
                {/* Flèche sortant du niveau actuel */}
                {level.length === 1 ? (
                  // Ligne simple pour niveau à une carte
                  <div className={`absolute ${isMobile ? 'top-4' : 'top-6'} left-1/2 w-0.5 bg-gray-800 ${isMobile ? 'h-16' : 'h-18'} transform -translate-x-1/2`}></div>
                ) : (
                  // Système de regroupement pour niveaux multiples
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                    {/* Lignes verticales remontant de chaque carte */}
                    {level.map((_, index) => {
                      let leftOffset;
                      if (level.length === 2) {
                        leftOffset = index === 0 ? -160 : 160;
                      } else if (level.length === 3) {
                        leftOffset = index === 0 ? -250 : index === 1 ? 0 : 250;
                      } else {
                        leftOffset = -350 + (index * 233);
                      }
                      
                      return (
                        <div 
                          key={index}
                          className="absolute top-0 w-0.5 h-8 bg-gray-800"
                          style={{ left: leftOffset, transform: 'translateX(-50%)' }}
                        ></div>
                      );
                    })}
                    
                    {/* Ligne horizontale de regroupement */}
                    <div className={`absolute top-8 h-0.5 bg-gray-800 ${
                      level.length === 2 ? 'w-80' :
                      level.length === 3 ? 'w-[500px]' :
                      'w-[700px]'
                    } transform -translate-x-1/2`}></div>
                    
                    {/* Ligne verticale centrale vers le niveau suivant */}
                    <div className={`absolute top-8 left-1/2 w-0.5 bg-gray-800 ${isMobile ? 'h-10' : 'h-12'} transform -translate-x-1/2`}></div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BureauExecutifSection;
