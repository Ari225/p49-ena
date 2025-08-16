
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';

interface MatriculeVerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: (matricule?: string) => void;
  memberId?: string;
  verificationMode?: 'view' | 'edit'; // 'view' pour aperçu, 'edit' pour modification
}

const MatriculeVerificationDialog: React.FC<MatriculeVerificationDialogProps> = ({
  isOpen,
  onClose,
  onVerified,
  memberId,
  verificationMode = 'view'
}) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [matricule, setMatricule] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!matricule.trim()) {
      setError('Veuillez saisir votre matricule');
      setIsLoading(false);
      return;
    }

    try {
      if (verificationMode === 'edit' && memberId) {
        // Mode modification : vérifier que le matricule correspond exactement au membre à modifier
        const { data: memberDirectory, error: memberError } = await supabase.rpc('get_member_directory');

        if (memberError) {
          console.error('Error fetching member directory:', memberError);
          setError('Erreur lors de la vérification. Veuillez réessayer.');
          setIsLoading(false);
          return;
        }

        // Trouver le membre par son ID
        const targetMember = memberDirectory?.find((member: any) => 
          member.id === parseInt(memberId)
        );

        if (!targetMember) {
          setError('Membre non trouvé.');
          setIsLoading(false);
          return;
        }

        // Vérifier que le matricule entré correspond exactement au matricule du membre
        if (!targetMember.matricule || targetMember.matricule.toUpperCase() !== matricule.toUpperCase()) {
          setError('Ce matricule ne correspond pas à ce membre. Seul le matricule du membre peut être utilisé pour modifier ses informations.');
          setIsLoading(false);
          return;
        }
      } else {
        // Mode aperçu : vérifier que le matricule existe dans la base de données
        const { data: memberDirectory, error: memberError } = await supabase.rpc('get_member_directory');

        if (memberError) {
          console.error('Error fetching member directory:', memberError);
          setError('Erreur lors de la vérification. Veuillez réessayer.');
          setIsLoading(false);
          return;
        }

        // Vérifier si le matricule existe dans la liste des membres
        const memberExists = memberDirectory?.some((member: any) => 
          member.matricule && member.matricule.toUpperCase() === matricule.toUpperCase()
        );

        if (!memberExists) {
          setError('Ce matricule n\'existe pas dans notre base de données. Veuillez vérifier votre saisie.');
          setIsLoading(false);
          return;
        }
      }

      // Matricule valide, autoriser l'accès
      onVerified(matricule.toUpperCase());
      setMatricule('');
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setError('Erreur lors de la vérification. Veuillez réessayer.');
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setMatricule('');
    setError('');
    onClose();
  };

  // ===========================================
  // VERSION MOBILE (useIsMobile = true)
  // ===========================================
  if (isMobile) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="w-[calc(100%-50px)] max-w-sm rounded-lg mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <Shield className="h-4 w-4 text-primary" />
              Vérification d'accès
            </DialogTitle>
            <DialogDescription className="text-xs">
              Pour accéder aux informations complètes du membre, veuillez saisir votre matricule.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label htmlFor="matricule" className="text-sm">Matricule de membre</Label>
              <Input
                id="matricule"
                type="text"
                value={matricule}
                onChange={(e) => setMatricule(e.target.value)}
                placeholder="Saisissez votre matricule"
                className="mt-1 text-xs h-8"
              />
            </div>

            {error && (
              <Alert variant="destructive" className="text-xs py-2">
                <AlertDescription className="text-xs">{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2 pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 text-xs h-8"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 text-xs h-8"
              >
                {isLoading ? 'Vérification...' : 'Vérifier'}
              </Button>
            </div>
          </form>

          <div className="text-xs text-gray-500 mt-3 p-2 bg-gray-50 rounded">
            <strong>Note:</strong> Cette fonctionnalité protège la confidentialité des membres. 
            Seuls ceux appartenant au réseau peuvent accéder aux informations complètes.
            <br />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // ===========================================
  // VERSION TABLETTE (useIsTablet = true)
  // ===========================================
  if (isTablet) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="w-[calc(100%-100px)] max-w-md rounded-lg mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5 text-primary" />
              Vérification d'accès
            </DialogTitle>
            <DialogDescription className="text-sm">
              Pour accéder aux informations complètes du membre, veuillez saisir votre matricule.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="matricule" className="text-base">Matricule de membre</Label>
              <Input
                id="matricule"
                type="text"
                value={matricule}
                onChange={(e) => setMatricule(e.target.value)}
                placeholder="Saisissez votre matricule"
                className="mt-1 text-sm h-9"
              />
            </div>

            {error && (
              <Alert variant="destructive" className="text-sm">
                <AlertDescription className="text-sm">{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 text-sm h-9"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 text-sm h-9"
              >
                {isLoading ? 'Vérification...' : 'Vérifier'}
              </Button>
            </div>
          </form>

          <div className="text-xs text-gray-500 mt-4 p-3 bg-gray-50 rounded">
            <strong>Note:</strong> Cette fonctionnalité protège la confidentialité des membres. 
            Seuls ceux appartenant au réseau peuvent accéder aux informations complètes.
            <br />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // ===========================================
  // VERSION DESKTOP (par défaut)
  // ===========================================
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95%] max-w-md rounded-lg mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Vérification d'accès
          </DialogTitle>
          <DialogDescription className="text-sm">
            Pour accéder aux informations complètes du membre, veuillez saisir votre matricule.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="matricule" className="text-base">Matricule de membre</Label>
            <Input
              id="matricule"
              type="text"
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              placeholder="Saisissez votre matricule"
              className="mt-1 text-sm"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 text-sm"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 text-sm"
            >
              {isLoading ? 'Vérification...' : 'Vérifier'}
            </Button>
          </div>
        </form>

        <div className="text-xs text-gray-500 mt-4 p-3 bg-gray-50 rounded">
          <strong>Note:</strong> Cette fonctionnalité protège la confidentialité des membres. 
            Seuls ceux appartenant au réseau peuvent accéder aux informations complètes.
          <br />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MatriculeVerificationDialog;
