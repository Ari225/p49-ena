
export const isMobileDevice = (): boolean => {
  return window.innerWidth < 768;
};

export const isTabletDevice = (): boolean => {
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

export const isDesktopDevice = (): boolean => {
  return window.innerWidth >= 1024;
};

export const getMobileBreakpoint = (): 'mobile' | 'tablet' | 'desktop' => {
  const width = window.innerWidth;
  
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

export const formatMobileText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getMobilePadding = (size: 'sm' | 'md' | 'lg' = 'md'): string => {
  const paddings = {
    sm: 'px-4 py-2',
    md: 'px-6 py-4',
    lg: 'px-8 py-6'
  };
  
  return paddings[size];
};

export const getMobileTextSize = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md'): string => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  return sizes[size];
};

export const optimizeImageForMobile = (imageUrl: string, width: number = 400): string => {
  // Pour les images Unsplash, on peut ajouter des paramètres de redimensionnement
  if (imageUrl.includes('unsplash.com')) {
    return `${imageUrl}?w=${width}&q=80`;
  }
  
  // Pour d'autres sources, retourner l'URL originale
  return imageUrl;
};

export const handleMobileSwipe = (
  element: HTMLElement,
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void
) => {
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;

  const handleTouchStart = (e: TouchEvent) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;
    
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    
    // Vérifier si c'est un swipe horizontal
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (deltaX < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
    }
  };

  element.addEventListener('touchstart', handleTouchStart);
  element.addEventListener('touchend', handleTouchEnd);

  return () => {
    element.removeEventListener('touchstart', handleTouchStart);
    element.removeEventListener('touchend', handleTouchEnd);
  };
};
