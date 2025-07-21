
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Eye, Edit, User } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  published_date: string;
  image_url?: string;
  reading_time?: number;
  published_by?: string;
  details?: string;
}

interface NewsCardDashboardProps {
  item: NewsItem;
  variant?: 'mobile' | 'tablet' | 'desktop';
  onEdit?: () => void;
}

const NewsCardDashboard: React.FC<NewsCardDashboardProps> = ({
  item,
  variant = 'mobile',
  onEdit
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
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
            Publié
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
          {item.published_by && (
            <div className="flex items-center">
              <User className={`${variant === 'mobile' ? 'h-4 w-4 mr-1' : 'h-3 w-3 mr-1'}`} />
              <span className="truncate max-w-20">{item.published_by}</span>
            </div>
          )}
        </div>
        <h3 className={`font-semibold text-primary leading-tight line-clamp-2 mb-3 ${
          variant === 'mobile' ? 'text-base' : 
          variant === 'tablet' ? 'text-lg' : 'text-lg'
        }`}>
          {item.title}
        </h3>
        <p className={`text-gray-700 line-clamp-3 leading-relaxed mb-4 ${
          variant === 'mobile' ? 'text-xs' : 
          variant === 'tablet' ? 'text-sm' : 'text-sm'
        }`}>
          {item.summary}
        </p>
        <div className={`flex ${variant === 'mobile' ? 'flex-col space-y-2' : 'items-center justify-between'}`}>
          <div className={`flex ${variant === 'mobile' ? 'space-x-2' : 'space-x-2'}`}>
            <Button variant="outline" size="sm" className={`${variant === 'mobile' ? 'flex-1' : ''} text-primary hover:text-white hover:bg-primary transition-all duration-300`}>
              <Eye className="h-4 w-4 mr-2" />
              Voir
            </Button>
            {onEdit && (
              <Button 
                variant="outline" 
                size="sm" 
                className={`${variant === 'mobile' ? 'flex-1' : ''} text-blue-600 hover:text-white hover:bg-blue-600 transition-all duration-300`}
                onClick={onEdit}
              >
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCardDashboard;
