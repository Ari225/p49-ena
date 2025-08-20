
import React from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

interface ModalButtonsProps {
  onReadLater: () => void;
  onClose: () => void;
}

const ModalButtons = ({ onReadLater, onClose }: ModalButtonsProps) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  const textSizes = {
    button: isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm'
  };

  return (
    <div className={`flex ${isMobile || isTablet ? 'flex-row' : 'flex-col sm:flex-row'} gap-3 justify-end p-4 md:px-8 md:py-4 pt-2 border-t border-gray-300 bg-white`}>
      <Button 
        onClick={onReadLater} 
        className={`bg-white border-primary text-primary hover:bg-primary hover:text-white font-medium py-[5px] px-[15px] rounded transition-colors duration-200 ${textSizes.button} ${isMobile || isTablet ? 'flex-1' : ''}`}
      >
        Lire plus tard
      </Button>
      <Button 
        onClick={onClose} 
        className={`bg-primary text-white hover:bg-primary py-[5px] px-[15px] rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold ${textSizes.button} ${isMobile || isTablet ? 'flex-1' : ''}`}
      >
        Fermer
      </Button>
    </div>
  );
};

export default ModalButtons;
