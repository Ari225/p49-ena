
import React from 'react';
import { Badge } from '@/components/ui/badge';

export const getTypeBadge = (type: string) => {
  switch (type) {
    case 'welcome':
      return <Badge className="bg-blue-100 text-blue-800">Bienvenue</Badge>;
    case 'announcement':
      return <Badge className="bg-green-100 text-green-800">Annonce</Badge>;
    case 'alert':
      return <Badge className="bg-red-100 text-red-800">Alerte</Badge>;
    case 'information':
      return <Badge className="bg-purple-100 text-purple-800">Information</Badge>;
    case 'other':
      return <Badge className="bg-gray-100 text-gray-800">Autre</Badge>;
    default:
      return <Badge variant="secondary">Non défini</Badge>;
  }
};

export const getAudienceBadge = (audience: string) => {
  switch (audience) {
    case 'all_visitors':
      return <Badge variant="outline">Tous les visiteurs</Badge>;
    case 'all_users':
      return <Badge className="bg-purple-100 text-purple-800">Tous les utilisateurs</Badge>;
    case 'admins_only':
      return <Badge className="bg-orange-100 text-orange-800">Admins uniquement</Badge>;
    case 'editors_only':
      return <Badge className="bg-blue-100 text-blue-800">Rédacteurs uniquement</Badge>;
    default:
      return <Badge variant="outline">Non défini</Badge>;
  }
};
