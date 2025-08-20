
import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

interface ConfirmationDialogsProps {
  showReadLaterConfirm: boolean;
  showCloseConfirm: boolean;
  onConfirmReadLater: () => void;
  onCancelReadLater: () => void;
  onConfirmClose: () => void;
  onCancelClose: () => void;
  setShowReadLaterConfirm: (show: boolean) => void;
  setShowCloseConfirm: (show: boolean) => void;
}

const ConfirmationDialogs = ({
  showReadLaterConfirm,
  showCloseConfirm,
  onConfirmReadLater,
  onCancelReadLater,
  onConfirmClose,
  onCancelClose,
  setShowReadLaterConfirm,
  setShowCloseConfirm
}: ConfirmationDialogsProps) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <>
      {/* Pop-up de confirmation pour "Lire plus tard" */}
      <AlertDialog open={showReadLaterConfirm} onOpenChange={setShowReadLaterConfirm}>
        <AlertDialogContent className={`rounded-lg ${isMobile || isTablet ? 'max-w-[calc(100vw-40px)] mx-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' : ''}`}>
          <AlertDialogHeader>
            <AlertDialogTitle className={isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-xl'}>Lire plus tard</AlertDialogTitle>
            <AlertDialogDescription className={isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-lg'}>
              Ce message sera affiché plus tard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={isMobile || isTablet ? 'flex-row justify-center gap-3 space-y-0' : ''}>
            <AlertDialogCancel onClick={onCancelReadLater} className={`${isMobile || isTablet ? 'flex-1 m-0' : ''} ${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm'}`}>
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmReadLater} className={`${isMobile || isTablet ? 'flex-1 m-0' : ''} ${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm'}`}>
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Pop-up de confirmation pour "Fermer" */}
      <AlertDialog open={showCloseConfirm} onOpenChange={setShowCloseConfirm}>
        <AlertDialogContent className={`rounded-lg ${isMobile || isTablet ? 'max-w-[calc(100vw-40px)] mx-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' : ''}`}>
          <AlertDialogHeader>
            <AlertDialogTitle className={isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-xl'}>Fermer le message</AlertDialogTitle>
            <AlertDialogDescription className={isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-lg'}>
              Voulez-vous fermer ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={isMobile || isTablet ? 'flex-row justify-center gap-3 space-y-0' : ''}>
            <AlertDialogCancel onClick={onCancelClose} className={`${isMobile || isTablet ? 'flex-1 m-0' : ''} ${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm'}`}>
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmClose} className={`${isMobile || isTablet ? 'flex-1 m-0' : ''} ${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm'}`}>
              Fermer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ConfirmationDialogs;
