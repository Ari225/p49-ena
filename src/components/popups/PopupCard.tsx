
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { PopupItem } from '@/types/popup';

interface PopupCardProps {
  popup: PopupItem;
  onToggleStatus: (id: string) => void;
  onEdit: (popup: PopupItem) => void;
  onDelete: (id: string) => void;
  isMobile: boolean;
  getTypeBadge: (type: string) => React.ReactNode;
  getAudienceBadge: (audience: string) => React.ReactNode;
}

const PopupCard: React.FC<PopupCardProps> = ({
  popup,
  onToggleStatus,
  onEdit,
  onDelete,
  isMobile,
  getTypeBadge,
  getAudienceBadge
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-wrap items-center gap-2">
            {getTypeBadge(popup.type)}
            {popup.other_type && <Badge variant="outline">{popup.other_type}</Badge>}
            <Badge variant={popup.isActive ? "default" : "secondary"}>
              {popup.isActive ? "Actif" : "Inactif"}
            </Badge>
          </div>
          <div className="text-sm text-gray-500">
            {new Date(popup.created_date).toLocaleDateString('fr-FR')}
          </div>
        </div>
        <CardTitle className="text-lg">{popup.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {popup.image_url && (
          <img 
            src={popup.image_url} 
            alt={popup.title}
            className="w-full h-32 object-cover rounded-lg mb-3"
          />
        )}
        {popup.message && (
          <p className={`text-gray-600 mb-3 text-sm ${isMobile ? 'line-clamp-2' : 'line-clamp-3'}`}>
            {popup.message}
          </p>
        )}
        <div className={`flex flex-wrap gap-2 mb-4 ${isMobile ? 'text-xs' : ''}`}>
          {getAudienceBadge(popup.target_audience)}
          {popup.author && <Badge variant="outline">Par: {popup.author}</Badge>}
          {popup.position && <Badge variant="outline">{popup.position}</Badge>}
        </div>
        
        {isMobile ? (
          <div className="grid grid-cols-2 gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onToggleStatus(popup.id)}
            >
              {popup.isActive ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
              {popup.isActive ? 'Désactiver' : 'Activer'}
            </Button>
            <Button size="sm" variant="outline" onClick={() => onEdit(popup)}>
              <Edit className="h-4 w-4 mr-1" />
              Modifier
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="text-red-600 col-span-2"
              onClick={() => onDelete(popup.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Supprimer
            </Button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onToggleStatus(popup.id)}
            >
              {popup.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button size="sm" variant="outline" onClick={() => onEdit(popup)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="text-red-600 hover:text-red-700"
              onClick={() => onDelete(popup.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PopupCard;
