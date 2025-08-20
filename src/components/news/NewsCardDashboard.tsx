
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Eye, EyeOff, Edit, Trash2 } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  published_date: string;
  image_url?: string;
  reading_time?: number;
  details?: string;
  is_visible?: boolean;
}

interface NewsCardDashboardProps {
  item: NewsItem;
  variant?: 'mobile' | 'tablet' | 'desktop';
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleVisibility?: () => void;
}

const NewsCardDashboard: React.FC<NewsCardDashboardProps> = ({
  item,
  variant = 'mobile',
  onEdit,
  onDelete,
  onToggleVisibility
}) => {
  const getImageUrl = () => {
    return item.image_url || '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg';
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white border border-transparent h-full">
      <div className="aspect-[16/10] overflow-hidden relative">
        <img 
          src={getImageUrl()} 
          alt={item.title} 
          className={`w-full h-full object-cover transition-transform duration-500 ${
            variant === 'desktop' ? 'group-hover:scale-110' : 'group-hover:scale-105'
          }`} 
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-white px-2 py-1 rounded text-xs font-medium">
            {item.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            item.is_visible 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {item.is_visible ? 'Publié' : 'Masqué'}
          </span>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center text-sm text-gray-500 gap-4 mb-3">
          <div className={`flex items-center ${variant !== 'mobile' ? 'bg-gray-50 px-2 py-1 rounded-md' : ''}`}>
            <Calendar className={`${variant === 'mobile' ? 'h-4 w-4 mr-2' : 'h-3 w-3 mr-1'}`} />
            {new Date(item.published_date).toLocaleDateString('fr-FR')}
          </div>
          <div className="flex items-center">
            <Clock className={`${variant === 'mobile' ? 'h-4 w-4 mr-1' : 'h-3 w-3 mr-1'}`} />
            <span>{item.reading_time || 3} min</span>
          </div>
        </div>
        <h3 className={`font-semibold text-primary leading-tight line-clamp-2 mb-3 ${
          variant === 'mobile' ? 'text-base' : 
          variant === 'tablet' ? 'text-lg' : 'text-lg'
        }`}>
          {item.title}
        </h3>
        <p className={`text-gray-600 mb-2 font-medium ${
          variant === 'mobile' ? 'text-xs' : 'text-sm'
        }`}>
          Résumé de l'actualité
        </p>
        <p className={`text-gray-700 line-clamp-3 leading-relaxed mb-4 ${
          variant === 'mobile' ? 'text-xs' : 
          variant === 'tablet' ? 'text-sm' : 'text-sm'
        }`}>
          {item.summary}
        </p>
        <div className="flex flex-wrap gap-2">
          {onToggleVisibility && (
            <Button 
              variant="outline" 
              size="sm" 
               className={`${
                item.is_visible 
                  ? 'text-orange-600 hover:text-white hover:bg-orange-600' 
                  : 'text-green-600 hover:text-white hover:bg-green-600'
              } transition-all duration-300`}
              onClick={onToggleVisibility}
            >
              {item.is_visible ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Masquer
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Publier
                </>
              )}
            </Button>
          )}
          {onEdit && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-blue-600 hover:text-white hover:bg-blue-600 transition-all duration-300"
              onClick={onEdit}
            >
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          )}
          {onDelete && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-600 hover:text-white hover:bg-red-600 transition-all duration-300"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCardDashboard;
