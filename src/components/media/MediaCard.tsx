
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Image, Video, Calendar } from 'lucide-react';

interface MediaItem {
  id: string;
  title: string;
  category: string;
  description: string;
  media_urls: string[];
  date: string;
  created_at: string;
}

interface MediaCardProps {
  media: MediaItem;
  onEdit?: (media: MediaItem) => void;
  onDelete?: (id: string) => void;
}

const MediaCard = ({ media, onEdit, onDelete }: MediaCardProps) => {
  const getMediaIcon = () => {
    // Check if there are any video URLs (simple check for common video extensions)
    const hasVideo = media.media_urls.some(url => 
      url.includes('.mp4') || url.includes('.mov') || url.includes('.avi') || url.includes('video')
    );
    
    if (hasVideo) {
      return <Video className="w-4 h-4 text-red-500 flex-shrink-0" />;
    }
    return <Image className="w-4 h-4 text-blue-500 flex-shrink-0" />;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Événements':
        return 'bg-blue-100 text-blue-800';
      case 'Formation':
        return 'bg-green-100 text-green-800';
      case 'Archives':
        return 'bg-purple-100 text-purple-800';
      case 'Assemblées Générales':
        return 'bg-orange-100 text-orange-800';
      case 'Régionales':
        return 'bg-teal-100 text-teal-800';
      case 'Cérémonies':
        return 'bg-pink-100 text-pink-800';
      case 'Partenariats':
        return 'bg-indigo-100 text-indigo-800';
      case 'Événements Sociaux':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('fr-FR');
    } catch {
      return dateString;
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
      <CardHeader className="pb-2 p-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            {getMediaIcon()}
            <Badge className={`text-xs flex-shrink-0`}>
              {media.media_urls.length} média{media.media_urls.length > 1 ? 's' : ''}
            </Badge>
          </div>
          <Badge variant="outline" className={`text-xs flex-shrink-0 ${getCategoryColor(media.category)}`}>
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
              {formatDate(media.date)}
            </span>
          </div>
          
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
