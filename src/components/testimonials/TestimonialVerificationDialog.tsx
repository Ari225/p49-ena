import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface TestimonialVerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: (matricule: string) => void;
}

const TestimonialVerificationDialog = ({ isOpen, onClose, onVerified }: TestimonialVerificationDialogProps) => {
  const [matricule, setMatricule] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!matricule.trim()) {
      setError('Veuillez saisir votre matricule');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Vérifier si le matricule existe en appelant la fonction de vérification
      const { data, error: supabaseError } = await import('@/integrations/supabase/client')
        .then(({ supabase }) => 
          supabase.rpc('get_member_details', {
            member_matricule: matricule.trim(),
            verification_matricule: matricule.trim()
          })
        );

      if (supabaseError || !data || data.length === 0) {
        setError('Matricule non trouvé. Veuillez vérifier et réessayer.');
        return;
      }

      onVerified(matricule.trim());
      handleClose();
    } catch (err) {
      console.error('Erreur lors de la vérification:', err);
      setError('Erreur lors de la vérification. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setMatricule('');
    setError('');
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className={`${isMobile ? 'max-w-[calc(100vw-40px)] mx-auto' : 'max-w-md'} rounded-lg`}>
        <DialogHeader>
          <DialogTitle className="text-center">Vérification d'accès</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Pour ajouter un témoignage, veuillez saisir votre matricule pour vérification.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="matricule">Matricule *</Label>
              <Input
                id="matricule"
                value={matricule}
                onChange={(e) => setMatricule(e.target.value)}
                placeholder="Saisissez votre matricule"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'justify-end space-x-2'}`}>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
                className={isMobile ? 'w-full' : ''}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className={`bg-primary hover:bg-primary/90 ${isMobile ? 'w-full' : ''}`}
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Vérification...
                  </>
                ) : (
                  'Vérifier'
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialVerificationDialog;