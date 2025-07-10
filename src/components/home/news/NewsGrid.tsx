
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import NewsCard from './NewsCard';
import NewsNavigation from './NewsNavigation';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  image_url: string;
  published_date: string;
}

interface NewsGridProps {
  news: NewsItem[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
  variant: 'mobile' | 'tablet' | 'desktop';
}

const NewsGrid: React.FC<NewsGridProps> = ({
  news,
  currentIndex,
  onPrevious,
  onNext,
  onDotClick,
  variant
}) => {
  if (variant === 'mobile') {
    return (
      <div className="relative">
        <div className="mb-6">
          <div className="transition-all duration-500 ease-out">
            <NewsCard item={news[currentIndex]} variant="mobile" />
          </div>
        </div>

        <NewsNavigation
          currentIndex={currentIndex}
          totalItems={news.length}
          onPrevious={onPrevious}
          onNext={onNext}
          onDotClick={onDotClick}
          variant="mobile"
        />
      </div>
    );
  }

  if (variant === 'tablet') {
    return (
      <div className="relative">
        <div className="grid grid-cols-2 gap-6 mb-6">
          {news.slice(currentIndex, currentIndex + 2).map((item, index) => (
            <div key={item.id} className="transition-all duration-500 ease-out">
              <NewsCard item={item} variant="tablet" />
            </div>
          ))}
        </div>

        <NewsNavigation
          currentIndex={currentIndex}
          totalItems={news.length}
          onPrevious={onPrevious}
          onNext={onNext}
          onDotClick={onDotClick}
          variant="tablet"
        />
      </div>
    );
  }

  // Desktop version
  return (
    <div className="relative">
      {/* Navigation buttons - positioned as overlay */}
      <button
        onClick={onPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
      >
        <ChevronLeft className="h-5 w-5 text-primary" />
      </button>
      
      <button
        onClick={onNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
      >
        <ChevronRight className="h-5 w-5 text-primary" />
      </button>

      {/* Cards container with overflow visible */}
      <div className="mx-12 overflow-visible">
        <div className="grid grid-cols-3 gap-6 transition-all duration-700 ease-out">
          {news.map((item, index) => {
            const isCenter = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + news.length) % news.length;
            const isNext = index === (currentIndex + 1) % news.length;
            
            if (!isCenter && !isPrev && !isNext) return null;

            return (
              <div key={item.id} className={`transition-all duration-700 ease-out ${
                isCenter ? 'scale-105 z-20' : 'scale-95 opacity-75 z-10'
              }`}>
                <NewsCard 
                  item={item} 
                  isCenter={isCenter}
                  showReadButton={isCenter}
                  variant="desktop"
                />
              </div>
            );
          })}
        </div>
      </div>

      <NewsNavigation
        currentIndex={currentIndex}
        totalItems={news.length}
        onPrevious={onPrevious}
        onNext={onNext}
        onDotClick={onDotClick}
        variant="desktop"
      />
    </div>
  );
};

export default NewsGrid;
