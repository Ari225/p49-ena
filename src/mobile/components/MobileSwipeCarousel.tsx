
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileSwipeCarouselProps {
  children: React.ReactNode[];
  showControls?: boolean;
  autoPlay?: boolean;
  autoPlayDelay?: number;
  className?: string;
}

const MobileSwipeCarousel: React.FC<MobileSwipeCarouselProps> = ({
  children,
  showControls = true,
  autoPlay = false,
  autoPlayDelay = 3000,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const totalItems = children.length;

  useEffect(() => {
    if (autoPlay && totalItems > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalItems);
      }, autoPlayDelay);

      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayDelay, totalItems]);

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, totalItems - 1)));
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    
    const endX = e.changedTouches[0].clientX;
    const deltaX = startX.current - endX;
    const threshold = 50;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    isDragging.current = false;
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>

      {showControls && totalItems > 1 && (
        <>
          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="sm"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {children.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-white/50'
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MobileSwipeCarousel;
