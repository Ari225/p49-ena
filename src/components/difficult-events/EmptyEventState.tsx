
import React from 'react';
import { Heart } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

export const EmptyEventState: React.FC = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <div className={`text-center ${
      isMobile ? 'py-8' : 
      isTablet ? 'py-10' : 
      'py-12'
    }`}>
      <Heart className={`text-gray-400 mx-auto mb-4 ${
        isMobile ? 'h-10 w-10' : 
        isTablet ? 'h-11 w-11' : 
        'h-12 w-12'
      }`} />
      <p className={`text-gray-500 ${
        isMobile ? 'text-sm' : 
        isTablet ? 'text-base' : 
        'text-base'
      }`}>
        Aucun événement dans cette catégorie pour le moment.
      </p>
    </div>
  );
};
