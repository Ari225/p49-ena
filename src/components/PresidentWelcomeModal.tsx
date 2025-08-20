
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { useCookieManager } from '@/hooks/useCookieManager';
import WelcomeMessageContent from './president-modal/WelcomeMessageContent';
import ModalButtons from './president-modal/ModalButtons';
import ConfirmationDialogs from './president-modal/ConfirmationDialogs';

const PresidentWelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showReadLaterConfirm, setShowReadLaterConfirm] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { setCookie, getCookie } = useCookieManager();

  useEffect(() => {
    // Vérifier si le modal a été définitivement masqué
    const neverShow = getCookie('welcome_modal_never_show');
    if (neverShow === 'true') {
      return;
    }

    // Vérifier si le modal a été reporté
    const postponedUntil = getCookie('welcome_modal_postponed_until');
    const sessionShown = sessionStorage.getItem('welcome_modal_shown');
    const now = new Date().getTime();

    // Si le modal a été reporté et que la date n'est pas encore atteinte
    if (postponedUntil && now < parseInt(postponedUntil)) {
      return;
    }

    // Si pas encore montré dans cette session
    if (!sessionShown) {
      setIsOpen(true);
      sessionStorage.setItem('welcome_modal_shown', 'true');
    }
  }, [getCookie]);

  const handleClose = () => {
    setShowCloseConfirm(true);
  };

  const handleReadLater = () => {
    setShowReadLaterConfirm(true);
  };

  // Gestionnaire pour la confirmation "Lire plus tard"
  const handleConfirmReadLater = () => {
    // Reporter le modal de 1 heure
    const postponeUntil = new Date().getTime() + (60 * 60 * 1000); // 1 heure
    setCookie('welcome_modal_postponed_until', postponeUntil.toString(), 1);
    setIsOpen(false);
    setShowReadLaterConfirm(false);
  };

  const handleCancelReadLater = () => {
    // Fermer seulement le pop-up de confirmation, garder le modal principal ouvert
    setShowReadLaterConfirm(false);
  };

  // Gestionnaire pour la confirmation "Fermer"
  const handleConfirmClose = () => {
    // Reporter le modal de 1 jour
    const postponeUntil = new Date().getTime() + (24 * 60 * 60 * 1000); // 1 jour
    setCookie('welcome_modal_postponed_until', postponeUntil.toString(), 1);
    setIsOpen(false);
    setShowCloseConfirm(false);
  };

  const handleCancelClose = () => {
    // Fermer seulement le pop-up de confirmation, garder le modal principal ouvert
    setShowCloseConfirm(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogContent className={`w-full bg-white p-0 fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg border-2 border-gray-200 ${isMobile ? 'max-w-[calc(100vw-40px)] mx-auto' : isTablet ? 'max-w-[calc(100vw-80px)] max-h-[calc(100vh-80px)]' : 'max-w-[calc(100vw-200px)] max-h-[calc(100vh-100px)]'}`} hideCloseButton>
          <div className={`flex w-full h-full rounded-lg overflow-hidden ${isMobile || isTablet ? 'flex-col' : 'flex-row md:flex-row'}`}>
            {/* President Photo */}
            <div className={`relative overflow-hidden ${isMobile ? 'h-[250px]' : isTablet ? 'h-[400px]' : 'md:w-1/3'}`}>
              <img 
                src="/lovable-uploads/8d7f1d5e-9bec-4321-88cd-0115cd5572e9.png" 
                alt="Mme MEL Méléï Marcelle" 
                className={`w-full object-cover ${isMobile ? 'h-[250px] object-top' : isTablet ? 'h-[400px] object-top' : 'h-full object-center'}`} 
              />
            </div>

            {/* Welcome Message */}
            <div className={`flex flex-col ${isMobile || isTablet ? 'flex-1' : 'md:w-2/3'} ${isMobile ? 'max-h-[calc(100vh-350px)]' : isTablet ? 'max-h-[calc(100vh-480px)]' : 'max-h-[calc(100vh-160px)]'}`}>
              <WelcomeMessageContent />
              
              {/* Fixed buttons at bottom */}
              <ModalButtons 
                onReadLater={handleReadLater}
                onClose={handleClose}
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

export default PresidentWelcomeModal;
