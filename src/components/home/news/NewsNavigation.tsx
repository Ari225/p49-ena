
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NewsNavigationProps {
  currentIndex: number;
  totalItems: number;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
  variant?: 'mobile' | 'tablet' | 'desktop';
}

const NewsNavigation: React.FC<NewsNavigationProps> = ({
  currentIndex,
  totalItems,
  onPrevious,
  onNext,
  onDotClick,
  variant = 'mobile'
}) => {
  const buttonClass = variant === 'mobile' 
    ? "p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300"
    : "p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100";

  const dotSpacing = variant === 'mobile' ? 'space-x-2' : 'space-x-3';
  const dotSize = variant === 'mobile' ? 'w-2 h-2' : 'w-3 h-3';

  if (variant === 'desktop') {
    return (
      <div className="flex justify-center mt-8 space-x-3">
        {Array.from({ length: totalItems }, (_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
              index === currentIndex 
                ? 'bg-primary border-primary scale-110' 
                : 'bg-transparent border-gray-300 hover:border-primary'
            }`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex justify-center items-center ${variant === 'mobile' ? 'mt-6 space-x-4' : 'mt-8 space-x-6'}`}>
      <button onClick={onPrevious} className={buttonClass}>
        <ChevronLeft className="h-5 w-5 text-primary" />
      </button>
      
      <div className={`flex ${dotSpacing}`}>
        {Array.from({ length: totalItems }, (_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className={`${dotSize} rounded-full transition-all duration-300 ${
              variant === 'mobile'
                ? index === currentIndex ? 'bg-primary w-6' : 'bg-gray-300'
                : `border-2 ${index === currentIndex 
                    ? 'bg-primary border-primary scale-110' 
                    : 'bg-transparent border-gray-300 hover:border-primary'
                  }`
            }`}
          />
        ))}
      </div>
      
      <button onClick={onNext} className={buttonClass}>
        <ChevronRight className="h-5 w-5 text-primary" />
      </button>
    </div>
  );
};

export default NewsNavigation;
