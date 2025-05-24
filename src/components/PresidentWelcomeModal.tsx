
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const PresidentWelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if modal has been shown in this session
    const hasShown = sessionStorage.getItem('welcome_modal_shown');
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('welcome_modal_shown', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl p-0 bg-white">
        <div className="flex flex-col md:flex-row">
          {/* President Photo */}
          <div className="md:w-1/3 bg-gradient-to-br from-primary to-primary/80 p-8 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="text-4xl">👩‍💼</div>
              </div>
              <h3 className="text-xl font-semibold">Mme la Présidente</h3>
              <p className="text-sm opacity-90">Réseau P49 ENA</p>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="md:w-2/3 p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Message de Bienvenue
            </h2>
            <div className="text-gray-700 leading-relaxed mb-6">
              <p className="mb-4">
                Chers membres de la P49, chers visiteurs,
              </p>
              <p className="mb-4">
                C'est avec un immense plaisir que je vous souhaite la bienvenue sur le site officiel 
                de notre réseau. La P49 représente plus qu'une simple promotion : nous sommes une 
                famille unie par des valeurs communes d'excellence, de solidarité et de service public.
              </p>
              <p className="mb-4">
                Ce site est votre espace de rencontre, d'échange et d'information. J'espère qu'il 
                contribuera à renforcer nos liens et à promouvoir nos actions communes.
              </p>
              <p className="font-medium text-primary">
                Ensemble, continuons à honorer les valeurs de l'ENA !
              </p>
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={() => setIsOpen(false)}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Fermer
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PresidentWelcomeModal;
