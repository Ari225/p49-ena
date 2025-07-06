
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, PlayCircle, Image, FileText, Calendar } from 'lucide-react';

interface MediaItem {
  id: string;
  title: string;
  type: string;
  category: string;
  description: string;
  url: string;
  date: string;
  tags: string[];
}

interface MediaCardProps {
  media: MediaItem;
  onEdit?: (media: MediaItem) => void;
  onDelete?: (id: string) => void;
}

const MediaCard = ({ media, onEdit, onDelete }: MediaCardProps) => {
  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'Vidéo':
        return <PlayCircle className="w-4 h-4 text-red-500 flex-shrink-0" />;
      case 'Images':
        return <Image className="w-4 h-4 text-blue-500 flex-shrink-0" />;
      case 'Document':
        return <FileText className="w-4 h-4 text-green-500 flex-shrink-0" />;
      default:
        return <PlayCircle className="w-4 h-4 flex-shrink-0" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Vidéo':
        return 'bg-red-100 text-red-800';
      case 'Images':
        return 'bg-blue-100 text-blue-800';
      case 'Document':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
      <CardHeader className="pb-2 p-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            {getMediaIcon(media.type)}
            <Badge className={`text-xs ${getTypeColor(media.type)} flex-shrink-0`}>
              {media.type}
            </Badge>
          </div>
          <Badge variant="outline" className="text-xs flex-shrink-0">
            {media.category}
          </Badge>
        </div>
        <CardTitle className="text-sm text-primary line-clamp-2 leading-tight">
          {media.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0 p-3 flex flex-col h-full">
        <p className="text-gray-600 text-xs mb-3 flex-1 line-clamp-2 leading-relaxed">
          {media.description}
        </p>
        
        <div className="space-y-2 mt-auto">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
            <span className="truncate">
              {new Date(media.date).toLocaleDateString('fr-FR')}
            </span>
          </div>
          
          {media.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {media.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="bg-accent/20 text-primary px-1.5 py-0.5 rounded-full text-xs truncate max-w-[70px]">
                  {tag}
                </span>
              ))}
              {media.tags.length > 2 && (
                <span className="text-gray-500 text-xs flex-shrink-0">+{media.tags.length - 2}</span>
              )}
            </div>
          )}
          
          <div className="flex gap-1 pt-2 border-t">
            {onEdit && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(media)}
                className="flex-1 text-xs h-7 px-2"
              >
                <Edit className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Modifier</span>
                <span className="sm:hidden">Mod.</span>
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-red-600 hover:text-red-700 text-xs h-7 px-2"
                onClick={() => onDelete(media.id)}
              >
                <Trash2 className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Supprimer</span>
                <span className="sm:hidden">Sup.</span>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaCard;
