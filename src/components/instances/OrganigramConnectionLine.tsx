
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
  // Ne pas afficher les flèches de connexion
  return null;
};

export default OrganigramConnectionLine;
