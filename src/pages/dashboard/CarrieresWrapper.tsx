import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { isAdmin } from '@/utils/roleUtils';
import DashboardCarrieres from './DashboardCarrieres';
import EditorCarrieres from './EditorCarrieres';

const CarrieresWrapper = () => {
  const { user } = useAuth();

  // Si c'est un administrateur, afficher le dashboard administrateur (lecture seule avec suppression)
  if (isAdmin(user)) {
    return <DashboardCarrieres />;
  }

  // Sinon, afficher le dashboard éditeur (avec création et modification)
  return <EditorCarrieres />;
};

export default CarrieresWrapper;