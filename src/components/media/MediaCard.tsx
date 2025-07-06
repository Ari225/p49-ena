
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
        return <PlayCircle className="w-5 h-5 text-red-500" />;
      case 'Images':
        return <Image className="w-5 h-5 text-blue-500" />;
      case 'Document':
        return <FileText className="w-5 h-5 text-green-500" />;
      default:
        return <PlayCircle className="w-5 h-5" />;
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
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {getMediaIcon(media.type)}
            <Badge className={`text-xs ${getTypeColor(media.type)}`}>
              {media.type}
            </Badge>
          </div>
          <Badge variant="outline" className="text-xs">
            {media.category}
          </Badge>
        </div>
        <CardTitle className="text-lg text-primary line-clamp-2">
          {media.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0 flex flex-col h-full">
        <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
          {media.description}
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(media.date).toLocaleDateString('fr-FR')}
          </div>
          
          {media.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {media.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="bg-accent/20 text-primary px-2 py-1 rounded-full text-xs">
                  {tag}
                </span>
              ))}
              {media.tags.length > 3 && (
                <span className="text-gray-500 text-xs">+{media.tags.length - 3}</span>
              )}
            </div>
          )}
          
          <div className="flex space-x-2 pt-2 border-t">
            {onEdit && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(media)}
                className="flex-1 text-xs"
              >
                <Edit className="h-3 w-3 mr-1" />
                Modifier
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-red-600 hover:text-red-700 text-xs"
                onClick={() => onDelete(media.id)}
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Supprimer
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaCard;
