
import React from 'react';

interface ConnectionMember {
  name: string;
  position: string;
  phone?: string;
  id?: number;
}

interface ConnectionLineProps {
  fromLevel: number;
  toLevel: number;
  fromIndex?: number;
  toIndex?: number;
  organigramLevels: ConnectionMember[][];
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
  // Ne pas afficher les lignes en mobile
  if (isMobile) {
    return null;
  }

  // Calcul des positions pour les lignes de connexion
  const fromLevelMembers = organigramLevels[fromLevel] || [];
  const toLevelMembers = organigramLevels[toLevel] || [];
  
  // Si pas de membres dans les niveaux, ne rien afficher
  if (fromLevelMembers.length === 0 || toLevelMembers.length === 0) {
    return null;
  }

  // Ligne verticale simple reliant les centres des niveaux
  return (
    <div className="absolute left-1/2 top-0 w-0.5 h-full bg-primary/20 transform -translate-x-0.5 z-0">
      {/* Point de connexion en haut */}
      <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary/40 rounded-full transform -translate-x-1/2 -translate-y-1"></div>
      {/* Point de connexion en bas */}
      <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-primary/40 rounded-full transform -translate-x-1/2 translate-y-1"></div>
    </div>
  );
};

export default OrganigramConnectionLine;
