
import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

interface ConfirmationDialogsProps {
  showNeverShowConfirm: boolean;
  showCloseConfirm: boolean;
  onConfirmNeverShow: () => void;
  onCancelNeverShow: () => void;
  onConfirmClose: () => void;
  onCancelClose: () => void;
  setShowNeverShowConfirm: (show: boolean) => void;
  setShowCloseConfirm: (show: boolean) => void;
}

const ConfirmationDialogs = ({
  showNeverShowConfirm,
  showCloseConfirm,
  onConfirmNeverShow,
  onCancelNeverShow,
  onConfirmClose,
  onCancelClose,
  setShowNeverShowConfirm,
  setShowCloseConfirm
}: ConfirmationDialogsProps) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <>
      {/* Pop-up de confirmation pour "Ne plus revoir" */}
      <AlertDialog open={showNeverShowConfirm} onOpenChange={setShowNeverShowConfirm}>
        <AlertDialogContent className={`rounded-lg ${isMobile || isTablet ? 'max-w-[calc(100vw-40px)] mx-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' : ''}`}>
          <AlertDialogHeader>
            <AlertDialogTitle className={isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-xl'}>Confirmation</AlertDialogTitle>
            <AlertDialogDescription className={isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-lg'}>
              Vous ne verrez plus jamais ce message. Voulez-vous continuer ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={isMobile || isTablet ? 'flex-row justify-center gap-3 space-y-0' : ''}>
            <AlertDialogCancel onClick={onCancelNeverShow} className={`${isMobile || isTablet ? 'flex-1 m-0' : ''} ${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm'}`}>
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmNeverShow} className={`${isMobile || isTablet ? 'flex-1 m-0' : ''} ${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm'}`}>
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Pop-up de confirmation pour "Fermer" */}
      <AlertDialog open={showCloseConfirm} onOpenChange={setShowCloseConfirm}>
        <AlertDialogContent className={`rounded-lg ${isMobile || isTablet ? 'max-w-[calc(100vw-40px)] mx-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' : ''}`}>
          <AlertDialogHeader>
            <AlertDialogTitle className={isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-xl'}>Information</AlertDialogTitle>
            <AlertDialogDescription className={isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-lg'}>
              Vous pourrez voir ce message à nouveau.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={isMobile || isTablet ? 'flex-row justify-center gap-3 space-y-0' : ''}>
            <AlertDialogCancel onClick={onCancelClose} className={isMobile || isTablet ? 'flex-1 m-0' : ''}>
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmClose} className={isMobile || isTablet ? 'flex-1 m-0' : ''}>
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ConfirmationDialogs;
