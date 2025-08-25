import React from 'react';
import { useAuth } from '@/context/AuthContext';
import DashboardTextesOfficiels from './DashboardTextesOfficiels';
import EditorTextesOfficiels from './EditorTextesOfficiels';

const TextesOfficielsWrapper = () => {
  const { user } = useAuth();

  // Si l'utilisateur est admin (principal ou secondaire), afficher la page admin
  if (user?.role === 'admin_principal' || user?.role === 'admin_secondaire') {
    return <DashboardTextesOfficiels />;
  }

  // Sinon (rédacteur), afficher la page éditeur
  return <EditorTextesOfficiels />;
};

export default TextesOfficielsWrapper;