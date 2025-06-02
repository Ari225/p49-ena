
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const PresidentWelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    const in24Hours = new Date().getTime() + (24 * 60 * 60 * 1000);
    localStorage.setItem('welcome_modal_dismissed_until', in24Hours.toString());
  };

  const handleNeverShowAgain = () => {
    setIsOpen(false);
    // Set to reappear in 1 week
    const inOneWeek = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
    localStorage.setItem('welcome_modal_dismissed_until', inOneWeek.toString());
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl p-0 bg-white mx-[25px] my-[50px] lg:mx-auto lg:my-auto">
        <div className="flex flex-col md:flex-row">
          {/* President Photo */}
          <div className="md:w-1/3 bg-gradient-to-br from-primary to-primary/80 p-8 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src="/lovable-uploads/f1d1dd5c-a951-422c-b2bc-e5db8549f70f.png" 
                  alt="Mme MEL Méléï Marcelle" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Mme MEL Méléï Marcelle</h3>
              <p className="text-sm opacity-90">Présidente du Réseau P49</p>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="md:w-2/3 p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Message de Bienvenue
            </h2>
            <div className="text-gray-700 leading-relaxed mb-6 text-sm">
              <p className="mb-4">
                Chères visiteuses, chers visiteurs,
              </p>
              <p className="mb-4">
                C'est avec une grande joie et un profond sentiment de fierté que je vous souhaite 
                la bienvenue sur le site officiel du Réseau de la P49.
              </p>
              <p className="mb-4">
                Notre réseau est bien plus qu'un simple regroupement d'anciens élèves ; il incarne 
                une communauté soudée, animée par des valeurs de solidarité, d'excellence, de 
                responsabilité et d'engagement citoyen. Issus de la promotion 2009-2010 de l'École 
                Nationale d'Administration, nous avons choisi de rester unis et actifs, au service 
                de nos communautés et de notre pays.
              </p>
              <p className="mb-4">
                Ce site a été conçu comme une vitrine de notre identité, de nos actions et de notre 
                vision. Vous y découvrirez notre histoire, notre organisation, nos textes fondateurs, 
                ainsi qu'un répertoire dynamique de nos membres. C'est aussi un espace de dialogue, 
                de partage d'initiatives et de mise en réseau, à l'image de l'esprit collaboratif qui 
                nous anime depuis nos premiers pas ensemble à l'ENA.
              </p>
              <p className="mb-4">
                Le Réseau de la P49 est un levier de transformation, une plateforme d'échanges 
                interprofessionnels et un acteur de l'innovation sociale. Ensemble, nous croyons 
                en la force du collectif et en la capacité de chacun à contribuer, à sa manière, 
                à un avenir meilleur.
              </p>
              <p className="mb-4">
                Je vous invite à parcourir nos différentes rubriques et à vous imprégner de l'âme 
                de notre réseau. Que vous soyez membre, partenaire, ami ou simplement curieux, 
                soyez les bienvenus chez nous.
              </p>
              <p className="mb-4">
                Ensemble, continuons de bâtir, d'innover et de faire rayonner les valeurs de la P49.
              </p>
              <p className="font-medium text-primary mb-4">
                Avec toute ma considération,
              </p>
              <p className="font-semibold text-primary">
                Mme MEL Méléï Marcelle<br/>
                Présidente du Réseau P49
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <Button 
                onClick={handleNeverShowAgain}
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Je ne souhaite plus revoir ce message
              </Button>
              <Button 
                onClick={handleClose}
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
