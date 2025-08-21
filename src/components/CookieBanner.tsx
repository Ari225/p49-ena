import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Cookie, Settings } from 'lucide-react';
import { useCookieManager } from '@/hooks/useCookieManager';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { setCookie, getCookie } = useCookieManager();

  useEffect(() => {
    const consent = getCookie('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, [getCookie]);

  const handleAcceptAll = () => {
    setCookie('cookie_consent', 'all', 365);
    setCookie('cookies_functional', 'true', 365);
    setCookie('cookies_analytics', 'true', 365);
    setCookie('cookies_marketing', 'true', 365);
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    setCookie('cookie_consent', 'essential', 365);
    setCookie('cookies_functional', 'false', 365);
    setCookie('cookies_analytics', 'false', 365);
    setCookie('cookies_marketing', 'false', 365);
    setIsVisible(false);
  };

  const handleCustomize = () => {
    setShowDetails(!showDetails);
  };

  const handleSavePreferences = () => {
    const functional = (document.getElementById('functional') as HTMLInputElement)?.checked;
    const analytics = (document.getElementById('analytics') as HTMLInputElement)?.checked;
    const marketing = (document.getElementById('marketing') as HTMLInputElement)?.checked;

    setCookie('cookie_consent', 'custom', 365);
    setCookie('cookies_functional', functional ? 'true' : 'false', 365);
    setCookie('cookies_analytics', analytics ? 'true' : 'false', 365);
    setCookie('cookies_marketing', marketing ? 'true' : 'false', 365);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="mx-auto max-w-4xl bg-background/95 backdrop-blur-sm border shadow-lg">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <Cookie className="h-6 w-6 text-primary mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Gestion des cookies</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Nous utilisons des cookies pour améliorer votre expérience de navigation, 
                analyser le trafic de notre site et personnaliser le contenu. En cliquant sur 
                "Tout accepter", vous consentez à l'utilisation de tous les cookies.
              </p>
              
              {showDetails && (
                <div className="space-y-4 mb-4 p-4 bg-muted/50 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Cookies essentiels</h4>
                        <p className="text-sm text-muted-foreground">
                          Nécessaires au fonctionnement du site
                        </p>
                      </div>
                      <input type="checkbox" checked disabled className="rounded" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Cookies fonctionnels</h4>
                        <p className="text-sm text-muted-foreground">
                          Mémorisation de vos préférences
                        </p>
                      </div>
                      <input id="functional" type="checkbox" defaultChecked className="rounded" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Cookies analytiques</h4>
                        <p className="text-sm text-muted-foreground">
                          Statistiques d'utilisation anonymes
                        </p>
                      </div>
                      <input id="analytics" type="checkbox" defaultChecked className="rounded" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Cookies marketing</h4>
                        <p className="text-sm text-muted-foreground">
                          Publicités personnalisées
                        </p>
                      </div>
                      <input id="marketing" type="checkbox" className="rounded" />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <Button onClick={handleAcceptAll} className="bg-primary hover:bg-primary/90">
                  Tout accepter
                </Button>
                <Button onClick={handleAcceptEssential} variant="outline">
                  Essentiels seulement
                </Button>
                <Button onClick={handleCustomize} variant="ghost" size="sm">
                  <Settings className="h-4 w-4 mr-1" />
                  {showDetails ? 'Masquer' : 'Personnaliser'}
                </Button>
                {showDetails && (
                  <Button onClick={handleSavePreferences} variant="secondary">
                    Sauvegarder
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};