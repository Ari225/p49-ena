import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { usePopupDisplay } from '@/hooks/usePopupDisplay';
import ModalButtons from '../president-modal/ModalButtons';
import ConfirmationDialogs from '../president-modal/ConfirmationDialogs';
import { getTypeBadge } from '@/utils/popupUtils';
import { Badge } from '@/components/ui/badge';

const PopupDisplay = () => {
  const [showReadLaterConfirm, setShowReadLaterConfirm] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  const { currentPopup, isOpen, setIsOpen, handleReadLater, handleClose } = usePopupDisplay();

  if (!currentPopup) return null;

  const onReadLater = () => {
    setShowReadLaterConfirm(true);
  };

  const onClose = () => {
    setShowCloseConfirm(true);
  };

  const handleConfirmReadLater = () => {
    handleReadLater(currentPopup.id);
    setShowReadLaterConfirm(false);
  };

  const handleCancelReadLater = () => {
    setShowReadLaterConfirm(false);
  };

  const handleConfirmClose = () => {
    handleClose(currentPopup.id);
    setShowCloseConfirm(false);
  };

  const handleCancelClose = () => {
    setShowCloseConfirm(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogContent className={`w-full bg-white p-0 fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg border-2 border-gray-200 ${isMobile ? 'max-w-[calc(100vw-40px)] mx-auto' : isTablet ? 'max-w-[calc(100vw-80px)] max-h-[calc(100vh-80px)]' : 'max-w-[calc(100vw-200px)] max-h-[calc(100vh-100px)]'}`} hideCloseButton>
          <div className={`flex w-full h-full rounded-lg overflow-hidden ${isMobile || isTablet ? 'flex-col' : 'flex-row md:flex-row'}`}>
            
            {/* Image Section */}
            {currentPopup.image_url && (
              <div className={`relative overflow-hidden ${isMobile ? 'h-auto' : isTablet ? 'h-auto' : 'md:w-1/3'}`}>
                <img 
                  src={currentPopup.image_url} 
                  alt={currentPopup.title} 
                  className={`w-full h-full ${currentPopup.message ? 'object-cover' : 'object-contain'} ${isMobile ? 'max-h-64' : isTablet ? 'max-h-80' : ''}`} 
                />
              </div>
            )}

            {/* Content Section */}
            <div className={`flex flex-col ${currentPopup.image_url ? (isMobile || isTablet ? 'flex-1' : 'md:w-2/3') : 'w-full'} ${isMobile ? 'max-h-[calc(100vh-350px)]' : isTablet ? 'max-h-[calc(100vh-480px)]' : 'max-h-[calc(100vh-160px)]'}`}>
              
              {/* Content Header and Body */}
              <div className={`flex-1 overflow-y-auto p-4 md:p-8 space-y-4 bg-white ${isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-base'}`}>
                
                {/* Type Badge */}
                <div className="mb-4">
                  {getTypeBadge(currentPopup.type)}
                  {currentPopup.other_type && (
                    <Badge variant="outline" className="ml-2">{currentPopup.other_type}</Badge>
                  )}
                </div>

                {/* Title */}
                <h2 className={`font-bold text-primary mb-4 ${isMobile ? 'text-lg leading-tight' : isTablet ? 'text-xl leading-tight' : 'text-2xl leading-tight'}`}>
                  {currentPopup.title}
                </h2>

                {/* Message */}
                {currentPopup.message && (
                  <div className={`space-y-4 text-gray-700 leading-relaxed ${isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-base'}`}>
                    {currentPopup.message.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-3">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                {/* Author and Position */}
                {(currentPopup.author || currentPopup.position) && (
                  <div className={`mt-6 pt-4 border-t border-gray-200 ${isMobile ? 'text-sm' : 'text-base'} text-gray-800`}>
                    {currentPopup.author && <div className="font-semibold text-primary">{currentPopup.author}</div>}
                    {currentPopup.position && <div className="text-gray-600 mt-1">{currentPopup.position}</div>}
                  </div>
                )}

                {/* If no message, show minimal content */}
                {!currentPopup.message && (
                  <div className={`text-gray-600 ${isMobile ? 'text-sm' : 'text-base'}`}>
                    <p>Veuillez consulter les informations disponibles.</p>
                  </div>
                )}
              </div>
              
              {/* Fixed buttons at bottom */}
              <ModalButtons 
                onReadLater={onReadLater}
                onClose={onClose}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmationDialogs 
        showReadLaterConfirm={showReadLaterConfirm}
        showCloseConfirm={showCloseConfirm}
        onConfirmReadLater={handleConfirmReadLater}
        onCancelReadLater={handleCancelReadLater}
        onConfirmClose={handleConfirmClose}
        onCancelClose={handleCancelClose}
        setShowReadLaterConfirm={setShowReadLaterConfirm}
        setShowCloseConfirm={setShowCloseConfirm}
      />
    </>
  );
};

export default PopupDisplay;