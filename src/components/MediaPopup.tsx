
import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

interface MediaItem {
  id: number;
  src: string;
  alt: string;
  category: string;
  type: 'image' | 'video';
  thumbnail?: string;
}

interface MediaPopupProps {
  isOpen: boolean;
  onClose: () => void;
  mediaItem: MediaItem | null;
  allMediaItems?: MediaItem[];
  currentIndex?: number;
  onNavigate?: (index: number) => void;
}

const MediaPopup: React.FC<MediaPopupProps> = ({ 
  isOpen, 
  onClose, 
  mediaItem, 
  allMediaItems = [], 
  currentIndex = 0, 
  onNavigate 
}) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const contentRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const canNavigate = allMediaItems.length > 1 && onNavigate;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === allMediaItems.length - 1;

  // Navigation handlers
  const handlePrevious = () => {
    if (canNavigate && !isFirst) {
      onNavigate(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (canNavigate && !isLast) {
      onNavigate(currentIndex + 1);
    }
  };

  // Keyboard navigation for desktop
  useEffect(() => {
    if (!isOpen || !canNavigate || isMobile || isTablet) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, canNavigate, currentIndex, isMobile, isTablet]);

  // Touch navigation for mobile and tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!canNavigate) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!canNavigate) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!canNavigate || !touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && !isLast) {
      handleNext();
    }
    if (isRightSwipe && !isFirst) {
      handlePrevious();
    }
  };

  if (!mediaItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="w-[95%] max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg mx-auto p-0" 
        hideCloseButton
      >
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-primary text-lg">
              {mediaItem.alt}
              {canNavigate && (
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({currentIndex + 1}/{allMediaItems.length})
                </span>
              )}
            </DialogTitle>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>
        
        <div className="p-6 pt-0">
          <div 
            className="relative w-full rounded-lg overflow-hidden bg-black"
            ref={contentRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Navigation buttons for all devices */}
            {canNavigate && (
              <>
                <button
                  onClick={handlePrevious}
                  disabled={isFirst}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 disabled:bg-black/20 disabled:cursor-not-allowed rounded-full transition-colors"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={isLast}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 disabled:bg-black/20 disabled:cursor-not-allowed rounded-full transition-colors"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              </>
            )}

            {mediaItem.type === 'video' ? (
              <video 
                controls 
                className="w-full h-auto max-h-[70vh]"
                poster={mediaItem.thumbnail}
              >
                <source src={mediaItem.src} type="video/mp4" />
                Votre navigateur ne supporte pas la vidéo.
              </video>
            ) : (
              <img 
                src={mediaItem.src} 
                alt={mediaItem.alt}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            )}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-muted-foreground text-sm">{mediaItem.alt}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
              {mediaItem.category}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaPopup;
