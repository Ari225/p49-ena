
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Image, Video, Calendar } from 'lucide-react';
import LazyImage from '@/components/ui/LazyImage';

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

  // Première image pour l'aperçu
  const previewImage = media.media_urls.find(url => 
    url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png') || url.includes('.webp')
  );

  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-500 bg-background/50 backdrop-blur-sm">
      {/* Aperçu Image */}
      {previewImage && (
        <div className="relative h-48 overflow-hidden">
          <LazyImage 
            src={previewImage} 
            alt={media.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            width={400}
            height={192}
            quality={80}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            {getMediaIcon()}
            <Badge variant="secondary" className="bg-background/90 text-foreground text-xs backdrop-blur-sm">
              {media.media_urls.length} fichier{media.media_urls.length > 1 ? 's' : ''}
            </Badge>
          </div>
          <Badge 
            variant="outline" 
            className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm border-0 text-xs"
          >
            {media.category}
          </Badge>
        </div>
      )}
      
      {/* Si pas d'image, affichage simple */}
      {!previewImage && (
        <div className="h-32 bg-muted/30 flex items-center justify-center relative">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            {getMediaIcon()}
            <span className="text-sm font-medium">{media.media_urls.length} fichier{media.media_urls.length > 1 ? 's' : ''}</span>
          </div>
          <Badge 
            variant="outline" 
            className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm border-0 text-xs"
          >
            {media.category}
          </Badge>
        </div>
      )}
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-foreground line-clamp-2 leading-tight mb-1">
              {media.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
              {media.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{formatDate(media.date)}</span>
            </div>
            
            <div className="flex gap-1">
              {onEdit && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onEdit(media)}
                  className="h-8 px-2 text-muted-foreground hover:text-primary"
                >
                  <Edit className="h-3 w-3" />
                </Button>
              )}
              {onDelete && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-2 text-muted-foreground hover:text-destructive"
                  onClick={() => onDelete(media.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaCard;
