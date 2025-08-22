
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
    <Card className="group overflow-hidden border border-border/60 shadow-sm hover:shadow-lg transition-all duration-300 bg-background/90 backdrop-blur-sm">
      {/* Image en haut si présente */}
      {popup.image_url && (
        <div className="relative h-40 overflow-hidden">
          <img 
            src={popup.image_url} 
            alt={popup.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <Badge 
            variant={popup.isActive ? "default" : "secondary"}
            className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm border-0"
          >
            {popup.isActive ? "Actif" : "Inactif"}
          </Badge>
        </div>
      )}
      
      <CardContent className="p-4 space-y-4">
        {/* Header sans image */}
        {!popup.image_url && (
          <div className="flex items-center justify-between">
            <Badge 
              variant={popup.isActive ? "default" : "secondary"}
              className="text-xs"
            >
              {popup.isActive ? "Actif" : "Inactif"}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {new Date(popup.created_date).toLocaleDateString('fr-FR')}
            </span>
          </div>
        )}
        
        {/* Titre */}
        <div>
          <h3 className="font-semibold text-foreground line-clamp-2 leading-tight mb-2">
            {popup.title}
          </h3>
          
          {/* Badges de type et audience */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {getTypeBadge(popup.type)}
            {popup.other_type && (
              <Badge variant="outline" className="text-xs">
                {popup.other_type}
              </Badge>
            )}
          </div>
        </div>

        {/* Message */}
        {popup.message && (
          <p className={`text-muted-foreground text-sm line-clamp-2 leading-relaxed`}>
            {popup.message}
          </p>
        )}

        {/* Métadonnées */}
        <div className="flex flex-wrap gap-2">
          {getAudienceBadge(popup.target_audience)}
          {popup.author && (
            <Badge variant="outline" className="text-xs">
              {popup.author}
            </Badge>
          )}
          {popup.position && (
            <Badge variant="outline" className="text-xs">
              {popup.position}
            </Badge>
          )}
          {popup.image_url && (
            <span className="text-xs text-muted-foreground ml-auto">
              {new Date(popup.created_date).toLocaleDateString('fr-FR')}
            </span>
          )}
        </div>
        
        {/* Boutons d'action */}
        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          {isMobile ? (
            <div className="flex gap-2 w-full">
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => onToggleStatus(popup.id)}
                className="flex-1 text-muted-foreground hover:text-primary h-8"
              >
                {popup.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => onEdit(popup)}
                className="flex-1 text-muted-foreground hover:text-primary h-8"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="flex-1 text-muted-foreground hover:text-destructive h-8"
                onClick={() => onDelete(popup.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex gap-1">
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => onToggleStatus(popup.id)}
                className="h-8 px-2 text-muted-foreground hover:text-primary"
                title={popup.isActive ? 'Désactiver' : 'Activer'}
              >
                {popup.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => onEdit(popup)}
                className="h-8 px-2 text-muted-foreground hover:text-primary"
                title="Modifier"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 px-2 text-muted-foreground hover:text-destructive"
                onClick={() => onDelete(popup.id)}
                title="Supprimer"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopupCard;
