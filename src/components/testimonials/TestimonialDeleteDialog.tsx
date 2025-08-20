import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Testimonial } from '@/hooks/useTestimonials';

interface TestimonialDeleteDialogProps {
  testimonial: Testimonial | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (id: string) => Promise<boolean>;
}

const TestimonialDeleteDialog = ({ testimonial, open, onOpenChange, onConfirm }: TestimonialDeleteDialogProps) => {
  const [deleting, setDeleting] = React.useState(false);

  const handleConfirm = async () => {
    if (!testimonial) return;

    setDeleting(true);
    const success = await onConfirm(testimonial.id);
    setDeleting(false);

    if (success) {
      onOpenChange(false);
    }
  };

  if (!testimonial) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer le témoignage</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir supprimer le témoignage de <strong>{testimonial.member_name}</strong> ?
            Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleting}>Annuler</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            disabled={deleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleting ? 'Suppression...' : 'Supprimer'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TestimonialDeleteDialog;