
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useIsMobile } from '@/hooks/use-mobile';

const PresidentWelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNeverShowConfirm, setShowNeverShowConfirm] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const isMobile = useIsMobile();

  // Tailles de texte configurables
  const textSizes = {
    title: isMobile ? 'text-xl' : 'text-5xl',
    body: isMobile ? 'text-xs' : 'text-base',
    signature: isMobile ? 'text-base' : 'text-lg',
    button: isMobile ? 'text-xs' : 'text-sm'
  };

  // Fonction pour gérer les cookies
  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const getCookie = (name: string) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  useEffect(() => {
    // Vérifier si le modal a été définitivement masqué
    const neverShow = getCookie('welcome_modal_never_show');
    if (neverShow === 'true') {
      return;
    }

    // Vérifier si le modal a été reporté
    const postponedUntil = getCookie('welcome_modal_postponed_until');
    const sessionShown = sessionStorage.getItem('welcome_modal_shown');
    const now = new Date().getTime();

    // Si le modal a été reporté et que la date n'est pas encore atteinte
    if (postponedUntil && now < parseInt(postponedUntil)) {
      return;
    }

    // Si pas encore montré dans cette session
    if (!sessionShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('welcome_modal_shown', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowCloseConfirm(true);
  };

  const handleNeverShowAgain = () => {
    setShowNeverShowConfirm(true);
  };

  // Gestionnaire pour la confirmation "Ne plus revoir"
  const handleConfirmNeverShow = () => {
    setCookie('welcome_modal_never_show', 'true', 365); // 1 an
    setIsOpen(false);
    setShowNeverShowConfirm(false);
  };

  const handleCancelNeverShow = () => {
    // Reporter le modal de 1-2 jours (générer aléatoirement entre 1 et 2 jours)
    const randomDays = Math.random() < 0.5 ? 1 : 2;
    const postponeUntil = new Date().getTime() + (randomDays * 24 * 60 * 60 * 1000);
    setCookie('welcome_modal_postponed_until', postponeUntil.toString(), randomDays);
    setIsOpen(false);
    setShowNeverShowConfirm(false);
  };

  // Gestionnaire pour la confirmation "Fermer"
  const handleConfirmClose = () => {
    // Reporter le modal de 1-2 jours (générer aléatoirement entre 1 et 2 jours)
    const randomDays = Math.random() < 0.5 ? 1 : 2;
    const postponeUntil = new Date().getTime() + (randomDays * 24 * 60 * 60 * 1000);
    setCookie('welcome_modal_postponed_until', postponeUntil.toString(), randomDays);
    setIsOpen(false);
    setShowCloseConfirm(false);
  };

  const handleNeverShowFromClose = () => {
    setCookie('welcome_modal_never_show', 'true', 365); // 1 an
    setIsOpen(false);
    setShowCloseConfirm(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogContent className={`w-full bg-white p-0 fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg border-2 border-gray-200 ${isMobile ? 'max-w-[calc(100vw-40px)] mx-auto' : 'max-w-[calc(100vw-200px)] max-h-[calc(100vh-100px)]'}`} hideCloseButton>
          <div className={`flex flex-col md:flex-row w-full h-full rounded-lg overflow-hidden`}>
            {/* President Photo */}
            <div className={`relative overflow-hidden ${isMobile ? 'h-[200px]' : 'md:w-1/3'}`}>
              <img 
                src="/lovable-uploads/8d7f1d5e-9bec-4321-88cd-0115cd5572e9.png" 
                alt="Mme MEL Méléï Marcelle" 
                className={`w-full object-cover ${isMobile ? 'h-[200px] object-top' : 'h-full object-center'}`} 
              />
            </div>

            {/* Welcome Message */}
            <div className={`flex flex-col ${isMobile ? 'flex-1' : 'md:w-2/3'} ${isMobile ? 'max-h-[calc(100vh-300px)]' : 'max-h-[calc(100vh-160px)]'}`}>
              <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <h2 className={`${textSizes.title} font-bold text-primary mb-4 md:mb-15`}>
                  Message de bienvenue
                </h2>
                <div className={`text-gray-700 leading-relaxed mb-15 ${textSizes.body}`}>
                  <p className="mb-4">
                    Chères visiteuses, chers visiteurs,
                  </p>
                  <p className="mb-4 text-justify">
                    C'est avec une grande joie et un profond sentiment de fierté que je vous souhaite 
                    la bienvenue sur le site officiel du Réseau de la P49.
                  </p>
                  <p className="mb-4 text-justify">
                    Notre réseau est bien plus qu'un regroupement d'anciens élèves : c'est une communauté solidaire, guidée par les valeurs d'excellence, de responsabilité et d'engagement citoyen. Issus de la promotion 2009-2010 de l'École Nationale d'Administration, nous avons choisi de rester unis et actifs au service de notre pays.
                  </p>
                  <p className="mb-4 text-justify">
                    Ce site reflète notre identité, notre organisation, nos actions et notre vision. Vous y trouverez notre histoire, nos textes de référence et un répertoire interactif de nos membres. C'est aussi un espace de dialogue, de partage et de collaboration, fidèle à l'esprit qui nous unit depuis l'ENA.
                  </p>
                  <p className="mb-4 text-justify">
                    Le Réseau de la P49 est un levier de transformation, un lieu d'échanges interprofessionnels et un acteur de l'innovation sociale. Ensemble, nous croyons en la force du collectif pour construire un avenir meilleur.
                  </p>
                  <p className="mb-4 text-justify">
                    Je vous invite à parcourir nos différentes rubriques et à vous imprégner de l'âme de notre réseau. Que vous soyez membre, partenaire, ami ou simplement curieux, soyez les bienvenus chez nous. Ensemble, continuons de bâtir, d'innover et de faire rayonner les valeurs de la P49.
                  </p>
                  <p className={`text-primary mb-4 md:mb-15`}>
                    Avec toute ma considération,
                  </p>
                </div>
                <p className={`font-semibold text-primary mb-5 ${textSizes.signature}`}>
                  Madame MEL Méléï Marcelle
                </p>
                <p className={`font-medium text-primary`}>
                  Présidente du Réseau P49
                </p>
              </div>
              
              {/* Fixed buttons at bottom */}
              <div className={`flex ${isMobile ? 'flex-row' : 'flex-col sm:flex-row'} gap-3 justify-end p-4 md:p-8 pt-2 border-t border-gray-300 bg-white`}>
                <Button 
                  onClick={handleNeverShowAgain} 
                  className={`bg-white border-primary text-primary hover:bg-primary hover:text-white font-medium py-[5px] px-[15px] rounded transition-colors duration-200 ${textSizes.button} ${isMobile ? 'flex-1' : ''}`}
                >
                  Ne plus revoir
                </Button>
                <Button 
                  onClick={handleClose} 
                  className={`bg-primary text-white hover:bg-primary py-[5px] px-[15px] rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold ${textSizes.button} ${isMobile ? 'flex-1' : ''}`}
                >
                  Fermer
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pop-up de confirmation pour "Ne plus revoir" */}
      <AlertDialog open={showNeverShowConfirm} onOpenChange={setShowNeverShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              Vous ne verrez plus jamais ce message. Voulez-vous continuer ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelNeverShow}>
              Revoir à nouveau
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmNeverShow}>
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Pop-up de confirmation pour "Fermer" */}
      <AlertDialog open={showCloseConfirm} onOpenChange={setShowCloseConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Information</AlertDialogTitle>
            <AlertDialogDescription>
              Vous pourrez voir ce message à nouveau
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleNeverShowFromClose}>
              Ne plus revoir
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmClose}>
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PresidentWelcomeModal;
