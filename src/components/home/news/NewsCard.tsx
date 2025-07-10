
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Eye, ArrowRight } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  image_url: string;
  published_date: string;
}

interface NewsCardProps {
  item: NewsItem;
  isCenter?: boolean;
  showReadButton?: boolean;
  variant?: 'mobile' | 'tablet' | 'desktop';
}

const NewsCard: React.FC<NewsCardProps> = ({
  item,
  isCenter = false,
  showReadButton = true,
  variant = 'mobile'
}) => {
  return (
    <Link to={`/actualite/${item.id}`}>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white border border-gray-200 h-full">
        <div className="aspect-[16/10] overflow-hidden relative">
          <img 
            src={item.image_url} 
            alt={item.title} 
            className={`w-full h-full object-cover transition-transform duration-500 ${
              variant === 'desktop' ? 'group-hover:scale-110' : 'group-hover:scale-105'
            }`} 
          />
          <div className="absolute top-4 left-4">
            <span className="bg-secondary/80 backdrop-blur-sm text-primary px-3 py-1.5 rounded-full font-medium text-sm border shadow-sm">
              {item.category}
            </span>
          </div>
          {isCenter && variant === 'desktop' && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
          )}
        </div>
        <CardContent className="p-6">
          <div className="flex items-center text-sm text-gray-500 gap-4 mb-3">
            <div className={`flex items-center ${variant !== 'mobile' ? 'bg-gray-50 px-2 py-1 rounded-md' : ''}`}>
              <Calendar className={`${variant === 'mobile' ? 'h-4 w-4 mr-2' : 'h-3 w-3 mr-1'}`} />
              {new Date(item.published_date).toLocaleDateString('fr-FR')}
            </div>
            <div className="flex items-center">
              <Clock className={`${variant === 'mobile' ? 'h-4 w-4 mr-1' : 'h-3 w-3 mr-1'}`} />
              <span>3 min</span>
            </div>
          </div>
          <h3 className={`font-bold text-primary leading-tight line-clamp-2 mb-3 ${
            isCenter && variant === 'desktop' ? 'text-xl' : 
            variant === 'mobile' ? 'text-base' : 
            variant === 'tablet' ? 'text-lg' : 'text-lg'
          }`}>
            {item.title}
          </h3>
          <p className="text-gray-700 line-clamp-3 leading-relaxed mb-4 text-sm">
            {item.summary}
          </p>
          {showReadButton && (
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" className="text-primary hover:text-white hover:bg-primary transition-all duration-300">
                <Eye className="h-4 w-4 mr-2" />
                Lire l'article
              </Button>
              {variant !== 'mobile' && (
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors duration-300" />
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default NewsCard;
