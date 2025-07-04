
import React from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface ModalButtonsProps {
  onNeverShowAgain: () => void;
  onClose: () => void;
}

const ModalButtons = ({ onNeverShowAgain, onClose }: ModalButtonsProps) => {
  const isMobile = useIsMobile();
  
  const textSizes = {
    button: isMobile ? 'text-xs' : 'text-sm'
  };

  return (
    <div className={`flex ${isMobile ? 'flex-row' : 'flex-col sm:flex-row'} gap-3 justify-end p-4 md:p-8 pt-2 border-t border-gray-300 bg-white`}>
      <Button 
        onClick={onNeverShowAgain} 
        className={`bg-white border-primary text-primary hover:bg-primary hover:text-white font-medium py-[5px] px-[15px] rounded transition-colors duration-200 ${textSizes.button} ${isMobile ? 'flex-1' : ''}`}
      >
        Ne plus revoir
      </Button>
      <Button 
        onClick={onClose} 
        className={`bg-primary text-white hover:bg-primary py-[5px] px-[15px] rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold ${textSizes.button} ${isMobile ? 'flex-1' : ''}`}
      >
        Fermer
      </Button>
    </div>
  );
};

export default ModalButtons;
