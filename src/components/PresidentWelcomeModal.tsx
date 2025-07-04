
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCookieManager } from '@/hooks/useCookieManager';
import WelcomeMessageContent from './president-modal/WelcomeMessageContent';
import ModalButtons from './president-modal/ModalButtons';
import ConfirmationDialogs from './president-modal/ConfirmationDialogs';

const PresidentWelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNeverShowConfirm, setShowNeverShowConfirm] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const isMobile = useIsMobile();
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

  const handleNeverShowAgain = () => {
    setShowNeverShowConfirm(true);
  };

  // Gestionnaire pour la confirmation "Ne plus revoir"
  const handleConfirmNeverShow = () => {
    setCookie('welcome_modal_never_show', 'true', 365); // 1 an
    setIsOpen(false);
    setShowNeverShowConfirm(false);
  };

  const handleCancelNeverShow = () => {
    // Fermer seulement le pop-up de confirmation, garder le modal principal ouvert
    setShowNeverShowConfirm(false);
  };

  // Gestionnaire pour la confirmation "Fermer"
  const handleConfirmClose = () => {
    // Reporter le modal de 1-2 jours (générer aléatoirement entre 1 et 2 jours)
    const randomDays = Math.random() < 0.5 ? 1 : 2;
    const postponeUntil = new Date().getTime() + (randomDays * 24 * 60 * 60 * 1000);
    setCookie('welcome_modal_postponed_until', postponeUntil.toString(), randomDays);
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
        <DialogContent className={`w-full bg-white p-0 fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg border-2 border-gray-200 ${isMobile ? 'max-w-[calc(100vw-40px)] mx-auto' : 'max-w-[calc(100vw-200px)] max-h-[calc(100vh-100px)]'}`} hideCloseButton>
          <div className={`flex flex-col md:flex-row w-full h-full rounded-lg overflow-hidden`}>
            {/* President Photo */}
            <div className={`relative overflow-hidden ${isMobile ? 'h-[200px]' : 'md:w-1/3'}`}>
              <img 
                src="/lovable-uploads/8d7f1d5e-9bec-4321-88cd-0115cd5572e9.png" 
                alt="Mme MEL Méléï Marcelle" 
                className={`w-full object-cover ${isMobile ? 'h-[200px] object-top' : 'h-full object-center'}`} 
              />
            </div>

            {/* Welcome Message */}
            <div className={`flex flex-col ${isMobile ? 'flex-1' : 'md:w-2/3'} ${isMobile ? 'max-h-[calc(100vh-300px)]' : 'max-h-[calc(100vh-160px)]'}`}>
              <WelcomeMessageContent />
              
              {/* Fixed buttons at bottom */}
              <ModalButtons 
                onNeverShowAgain={handleNeverShowAgain}
                onClose={handleClose}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmationDialogs 
        showNeverShowConfirm={showNeverShowConfirm}
        showCloseConfirm={showCloseConfirm}
        onConfirmNeverShow={handleConfirmNeverShow}
        onCancelNeverShow={handleCancelNeverShow}
        onConfirmClose={handleConfirmClose}
        onCancelClose={handleCancelClose}
        setShowNeverShowConfirm={setShowNeverShowConfirm}
        setShowCloseConfirm={setShowCloseConfirm}
      />
    </>
  );
};

export default PresidentWelcomeModal;
