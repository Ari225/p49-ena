
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
  onVerified: () => void;
}

const MatriculeVerificationDialog: React.FC<MatriculeVerificationDialogProps> = ({
  isOpen,
  onClose,
  onVerified
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
      // Vérifier le matricule dans la base de données
      const { data, error } = await (supabase as any)
        .from('members')
        .select('Matricule')
        .eq('Matricule', matricule.toUpperCase())
        .maybeSingle();

      if (error) {
        console.error('Error checking matricule:', error);
        setError('Erreur lors de la vérification. Veuillez réessayer.');
        setIsLoading(false);
        return;
      }

      if (data) {
        // Matricule trouvé dans la base
        onVerified();
        setMatricule('');
      } else {
        setError('Matricule invalide. Veuillez vérifier et réessayer.');
      }
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
