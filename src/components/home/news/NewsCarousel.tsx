
import React from 'react';
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

interface NewsCarouselProps {
  news: NewsItem[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}

const NewsCarousel: React.FC<NewsCarouselProps> = ({
  news,
  currentIndex,
  onPrevious,
  onNext,
  onDotClick
}) => {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl">
        <div 
          className="flex transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {news.map((item) => (
            <div key={item.id} className="w-full flex-shrink-0">
              <NewsCard item={item} variant="mobile" />
            </div>
          ))}
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
};

export default NewsCarousel;
