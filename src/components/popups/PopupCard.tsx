
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface PopupItem {
  id: string;
  title: string;
  message: string;
  type: 'welcome' | 'announcement' | 'alert';
  isActive: boolean;
  created_date: string;
  image_url?: string;
  display_duration: number;
  priority: 'low' | 'medium' | 'high';
  target_audience: 'all' | 'members' | 'admins';
  auto_close: boolean;
}

interface PopupCardProps {
  popup: PopupItem;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  isMobile: boolean;
  getTypeBadge: (type: string) => React.ReactNode;
  getPriorityBadge: (priority: string) => React.ReactNode;
  getAudienceBadge: (audience: string) => React.ReactNode;
}

const PopupCard: React.FC<PopupCardProps> = ({
  popup,
  onToggleStatus,
  onDelete,
  isMobile,
  getTypeBadge,
  getPriorityBadge,
  getAudienceBadge
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-wrap items-center gap-2">
            {getTypeBadge(popup.type)}
            {getPriorityBadge(popup.priority)}
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
        <p className={`text-gray-600 mb-3 text-sm ${isMobile ? 'line-clamp-2' : 'line-clamp-3'}`}>
          {popup.message}
        </p>
        <div className={`flex flex-wrap gap-2 mb-4 ${isMobile ? 'text-xs' : ''}`}>
          {getAudienceBadge(popup.target_audience)}
          <Badge variant="outline">{popup.display_duration}s</Badge>
          {popup.auto_close && <Badge variant="outline">Auto-fermeture</Badge>}
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
            <Button size="sm" variant="outline">
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
            <Button size="sm" variant="outline">
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
