
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { AppUser } from '@/types/user';

interface UserDeleteDialogProps {
  user: AppUser | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (userId: string) => void;
}

const UserDeleteDialog: React.FC<UserDeleteDialogProps> = ({
  user,
  isOpen,
  onClose,
  onConfirm
}) => {
  const [loading, setLoading] = useState(false);
  const handleConfirm = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('app_users')
        .delete()
        .eq('id', user.id);

      if (error) throw error;
      
      onConfirm(user.id);
      toast.success(`${user.first_name} ${user.last_name} a été supprimé`);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur lors de la suppression de l\'utilisateur');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[95vw] max-w-md mx-auto rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir supprimer l'utilisateur "{user.first_name} {user.last_name}" ? 
            Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose} disabled={loading}>Annuler</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700"
            disabled={loading}
          >
            {loading ? 'Suppression...' : 'Supprimer'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserDeleteDialog;
