import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Heart, PartyPopper, Star, Award, Trophy, Edit, Trash2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SocialEvent {
  id: string;
  title: string;
  member_name: string;
  event_date: string;
  category: string;
  description?: string;
  image_url?: string;
}

interface SocialEventCardProps {
  event: SocialEvent;
  onEdit: (event: SocialEvent) => void;
  onDelete: (id: string) => void;
}

export const SocialEventCard: React.FC<SocialEventCardProps> = ({ event, onEdit, onDelete }) => {
  const isMobile = useIsMobile();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mariage': return Heart;
      case 'promotion': return Star;
      case 'distinction': return Award;
      case 'retraite': return Trophy;
      case 'bapteme': 
      case 'naissance':
      case 'anniversaire':
        return PartyPopper;
      default: return PartyPopper;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'mariage': return 'Mariage';
      case 'promotion': return 'Promotion';
      case 'distinction': return 'Distinction';
      case 'retraite': return 'Retraite';
      case 'bapteme': return 'Baptême';
      case 'naissance': return 'Naissance';
      case 'anniversaire': return 'Anniversaire';
      case 'autre_heureux': return 'Autre';
      case 'deces': return 'Décès';
      case 'maladie': return 'Maladie';
      case 'accident': return 'Accident';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mariage': return 'bg-pink-100 text-pink-700';
      case 'promotion': return 'bg-yellow-100 text-yellow-700';
      case 'distinction': return 'bg-purple-100 text-purple-700';
      case 'retraite': return 'bg-blue-100 text-blue-700';
      case 'bapteme':
      case 'naissance':
      case 'anniversaire':
      case 'autre_heureux':
        return 'bg-green-100 text-green-700';
      case 'deces':
      case 'maladie':
      case 'accident':
        return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const IconComponent = getCategoryIcon(event.category);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-800 mb-2`}>
              {event.title}
            </CardTitle>
            <p className="text-gray-600 font-medium">{event.member_name}</p>
          </div>
          <div className="bg-primary/10 text-primary p-2 rounded-full">
            <IconComponent className="h-4 w-4" />
          </div>
        </div>
        <div className={`flex items-center ${isMobile ? 'text-xs' : 'text-sm'} text-gray-500 mt-2`}>
          <Calendar className="h-4 w-4 mr-2" />
          {new Date(event.event_date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {event.image_url && (
          <img 
            src={event.image_url} 
            alt={event.title}
            className="w-full h-32 object-cover rounded mb-3"
          />
        )}
        
        {event.description && (
          <p className={`text-gray-700 ${isMobile ? 'text-xs' : 'text-sm'} mb-3`}>
            {event.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <Badge className={getCategoryColor(event.category)}>
            {getCategoryLabel(event.category)}
          </Badge>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(event)}
              className="h-8 px-2"
            >
              <Edit className="h-3 w-3" />
              {!isMobile && <span className="ml-1">Modifier</span>}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(event.id)}
              className="h-8 px-2 hover:bg-red-50 hover:border-red-200"
            >
              <Trash2 className="h-3 w-3" />
              {!isMobile && <span className="ml-1">Supprimer</span>}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};