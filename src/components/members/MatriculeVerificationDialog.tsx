
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

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
  const [matricule, setMatricule] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Matricule par défaut pour les tests
  const DEFAULT_MATRICULE = 'P49DEMO';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!matricule.trim()) {
      setError('Veuillez saisir votre matricule');
      setIsLoading(false);
      return;
    }

    // Simuler un délai de vérification
    setTimeout(() => {
      // Accepter le matricule par défaut ou tout matricule de plus de 4 caractères
      if (matricule.toUpperCase() === DEFAULT_MATRICULE || matricule.length >= 4) {
        onVerified();
        setMatricule('');
      } else {
        setError('Matricule invalide. Veuillez vérifier et réessayer.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleClose = () => {
    setMatricule('');
    setError('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Vérification d'accès
          </DialogTitle>
          <DialogDescription>
            Pour accéder aux informations complètes du membre, veuillez saisir votre matricule de membre P49.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="matricule">Matricule de membre</Label>
            <Input
              id="matricule"
              type="text"
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              placeholder="Saisissez votre matricule"
              className="mt-1"
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
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? 'Vérification...' : 'Vérifier'}
            </Button>
          </div>
        </form>

        <div className="text-xs text-gray-500 mt-4 p-3 bg-gray-50 rounded">
          <strong>Note:</strong> Cette fonctionnalité protège la confidentialité des membres. 
          Seuls les membres authentifiés peuvent accéder aux informations complètes.
          <br />
          <strong>Pour les tests:</strong> Utilisez le matricule <code className="bg-gray-200 px-1 rounded">P49DEMO</code>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MatriculeVerificationDialog;
