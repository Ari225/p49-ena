
import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useIsMobile } from '@/hooks/use-mobile';

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

  return (
    <>
      {/* Pop-up de confirmation pour "Ne plus revoir" */}
      <AlertDialog open={showNeverShowConfirm} onOpenChange={setShowNeverShowConfirm}>
        <AlertDialogContent className={isMobile ? 'mx-4 max-w-[calc(100vw-32px)] left-4 right-4 translate-x-0' : ''}>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              Vous ne verrez plus jamais ce message. Voulez-vous continuer ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={isMobile ? 'flex-row space-x-2 space-y-0' : ''}>
            <AlertDialogCancel onClick={onCancelNeverShow}>
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmNeverShow}>
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Pop-up de confirmation pour "Fermer" */}
      <AlertDialog open={showCloseConfirm} onOpenChange={setShowCloseConfirm}>
        <AlertDialogContent className={isMobile ? 'mx-4 max-w-[calc(100vw-32px)] left-4 right-4 translate-x-0' : ''}>
          <AlertDialogHeader>
            <AlertDialogTitle>Information</AlertDialogTitle>
            <AlertDialogDescription>
              Vous pourrez voir ce message à nouveau
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={isMobile ? 'flex-row space-x-2 space-y-0' : ''}>
            <AlertDialogCancel onClick={onCancelClose}>
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmClose}>
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ConfirmationDialogs;
