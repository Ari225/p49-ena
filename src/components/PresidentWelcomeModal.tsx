
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const PresidentWelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  // Tailles de texte configurables
  const textSizes = {
    title: isMobile ? 'text-xl' : 'text-5xl', // Réduit de text-2xl à text-xl
    body: isMobile ? 'text-xs' : 'text-base',
    signature: isMobile ? 'text-xs' : 'text-sm',
    button: isMobile ? 'text-xs' : 'text-sm'
  };

  useEffect(() => {
    // Check if modal has been dismissed and when
    const dismissedUntil = localStorage.getItem('welcome_modal_dismissed_until');
    const sessionShown = sessionStorage.getItem('welcome_modal_shown');
    const now = new Date().getTime();

    // If there's a dismissal time and it hasn't expired, don't show
    if (dismissedUntil && now < parseInt(dismissedUntil)) {
      return;
    }

    // If not shown in this session and dismissal time has expired (or doesn't exist)
    if (!sessionShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('welcome_modal_shown', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Set to reappear in 24 hours
    const in24Hours = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem('welcome_modal_dismissed_until', in24Hours.toString());
  };

  const handleNeverShowAgain = () => {
    setIsOpen(false);
    // Set to reappear in 1 week
    const inOneWeek = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem('welcome_modal_dismissed_until', inOneWeek.toString());
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={`w-full bg-white p-0 fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg border-2 border-gray-200 ${isMobile ? 'max-w-[calc(100vw-40px)] mx-auto' : 'max-w-[calc(100vw-200px)] max-h-[calc(100vh-100px)]'}`} hideCloseButton>
        <div className={`flex flex-col md:flex-row w-full h-full rounded-lg overflow-hidden`}>
          {/* President Photo - Hauteur augmentée sur mobile */}
          <div className={`relative overflow-hidden ${isMobile ? 'h-[200px]' : 'md:w-1/3'}`}>
            <img 
              src="/lovable-uploads/8d7f1d5e-9bec-4321-88cd-0115cd5572e9.png" 
              alt="Mme MEL Méléï Marcelle" 
              className={`w-full object-cover ${isMobile ? 'h-[200px] object-top' : 'h-full object-center'}`} 
            />
          </div>

          {/* Welcome Message - Hauteur réduite pour le texte et les boutons */}
          <div className={`flex flex-col ${isMobile ? 'flex-1' : 'md:w-2/3'} ${isMobile ? 'max-h-[calc(100vh-300px)]' : 'max-h-[calc(100vh-160px)]'}`}>
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
              <h2 className={`${textSizes.title} font-bold text-primary mb-4 md:mb-10`}>
                Message de bienvenue
              </h2>
              <div className={`text-gray-700 leading-relaxed mb-4 ${textSizes.body}`}>
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
                <p className={`font-medium text-primary mb-4 md:mb-10 ${textSizes.signature}`}>
                  Avec toute ma considération,
                </p>
                <p className={`font-semibold text-primary ${textSizes.signature}`}>
                  Madame MEL Méléï Marcelle
                </p>
                <p className={`font-semibold text-primary ${textSizes.signature}`}>
                  Présidente du Réseau P49
                </p>
              </div>
            </div>
            
            {/* Fixed buttons at bottom - Hauteur réduite */}
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
  );
};

export default PresidentWelcomeModal;
