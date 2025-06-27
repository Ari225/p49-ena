
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
    default:
      return <Badge variant="secondary">Autre</Badge>;
  }
};

export const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <Badge variant="destructive">Élevée</Badge>;
    case 'medium':
      return <Badge className="bg-yellow-100 text-yellow-800">Moyenne</Badge>;
    case 'low':
      return <Badge variant="secondary">Faible</Badge>;
    default:
      return <Badge variant="secondary">-</Badge>;
  }
};

export const getAudienceBadge = (audience: string) => {
  switch (audience) {
    case 'all':
      return <Badge variant="outline">Tous</Badge>;
    case 'members':
      return <Badge className="bg-purple-100 text-purple-800">Membres</Badge>;
    case 'admins':
      return <Badge className="bg-orange-100 text-orange-800">Admins</Badge>;
    default:
      return <Badge variant="outline">-</Badge>;
  }
};
