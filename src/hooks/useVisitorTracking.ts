import { useState, useEffect } from 'react';
import { useCookieConsent } from './useCookieConsent';
import { useCookieManager } from './useCookieManager';

interface VisitorStats {
  monthlyVisitors: number;
  isTracking: boolean;
}

export const useVisitorTracking = (): VisitorStats => {
  const { canUseAnalytics } = useCookieConsent();
  const { getCookie, setCookie } = useCookieManager();
  const [monthlyVisitors, setMonthlyVisitors] = useState(0);

  useEffect(() => {
    const trackVisitor = () => {
      if (!canUseAnalytics()) {
        // Si pas de consentement analytics, on ne track pas
        return;
      }

      const now = new Date();
      const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      const visitorId = getCookie('visitor_id');
      const lastVisitMonth = getCookie('last_visit_month');

      // Générer un ID visiteur unique s'il n'existe pas
      if (!visitorId) {
        const newVisitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        setCookie('visitor_id', newVisitorId, 365); // Cookie valide 1 an
      }

      // Si c'est un nouveau mois pour ce visiteur, l'enregistrer
      if (lastVisitMonth !== currentMonth) {
        setCookie('last_visit_month', currentMonth, 365);
        
        // Incrémenter le compteur dans localStorage
        const monthlyKey = `visitors_${currentMonth}`;
        const existingCount = parseInt(localStorage.getItem(monthlyKey) || '0');
        
        // Vérifier si ce visiteur a déjà été compté ce mois-ci
        const monthlyVisitors = JSON.parse(localStorage.getItem(`${monthlyKey}_ids`) || '[]');
        const currentVisitorId = getCookie('visitor_id');
        
        if (!monthlyVisitors.includes(currentVisitorId)) {
          const newCount = existingCount + 1;
          localStorage.setItem(monthlyKey, newCount.toString());
          monthlyVisitors.push(currentVisitorId);
          localStorage.setItem(`${monthlyKey}_ids`, JSON.stringify(monthlyVisitors));
        }
      }
    };

    const getMonthlyVisitorCount = () => {
      const now = new Date();
      const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      const monthlyKey = `visitors_${currentMonth}`;
      return parseInt(localStorage.getItem(monthlyKey) || '0');
    };

    // Tracker le visiteur actuel
    trackVisitor();
    
    // Récupérer le compte des visiteurs du mois
    setMonthlyVisitors(getMonthlyVisitorCount());
  }, [canUseAnalytics, getCookie, setCookie]);

  return {
    monthlyVisitors,
    isTracking: canUseAnalytics()
  };
};