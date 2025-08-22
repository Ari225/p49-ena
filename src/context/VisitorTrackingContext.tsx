import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { useCookieManager } from '@/hooks/useCookieManager';

interface VisitorTrackingContextType {
  monthlyVisitors: number;
  isTracking: boolean;
  totalVisitors: number;
  refreshStats: () => void;
}

const VisitorTrackingContext = createContext<VisitorTrackingContextType | undefined>(undefined);

export const VisitorTrackingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { canUseAnalytics } = useCookieConsent();
  const { getCookie, setCookie } = useCookieManager();
  const [monthlyVisitors, setMonthlyVisitors] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);

  const trackVisitor = () => {
    if (!canUseAnalytics()) {
      return;
    }

    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const visitorId = getCookie('visitor_id');
    const lastVisitMonth = getCookie('last_visit_month');
    const lastVisitDate = getCookie('last_visit_date');
    const today = now.toDateString();

    // Générer un ID visiteur unique s'il n'existe pas
    if (!visitorId) {
      const newVisitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setCookie('visitor_id', newVisitorId, 365);
    }

    // Tracking mensuel
    if (lastVisitMonth !== currentMonth) {
      setCookie('last_visit_month', currentMonth, 365);
      
      const monthlyKey = `visitors_${currentMonth}`;
      const existingCount = parseInt(localStorage.getItem(monthlyKey) || '0');
      const monthlyVisitors = JSON.parse(localStorage.getItem(`${monthlyKey}_ids`) || '[]');
      const currentVisitorId = getCookie('visitor_id');
      
      if (!monthlyVisitors.includes(currentVisitorId)) {
        const newCount = existingCount + 1;
        localStorage.setItem(monthlyKey, newCount.toString());
        monthlyVisitors.push(currentVisitorId);
        localStorage.setItem(`${monthlyKey}_ids`, JSON.stringify(monthlyVisitors));
      }
    }

    // Tracking total (visiteurs uniques tous mois confondus)
    if (lastVisitDate !== today) {
      setCookie('last_visit_date', today, 365);
      
      const totalKey = 'total_visitors';
      const existingTotalCount = parseInt(localStorage.getItem(totalKey) || '0');
      const totalVisitors = JSON.parse(localStorage.getItem(`${totalKey}_ids`) || '[]');
      const currentVisitorId = getCookie('visitor_id');
      
      if (!totalVisitors.includes(currentVisitorId)) {
        const newTotalCount = existingTotalCount + 1;
        localStorage.setItem(totalKey, newTotalCount.toString());
        totalVisitors.push(currentVisitorId);
        localStorage.setItem(`${totalKey}_ids`, JSON.stringify(totalVisitors));
      }
    }
  };

  const getStats = () => {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const monthlyKey = `visitors_${currentMonth}`;
    const totalKey = 'total_visitors';
    
    const monthly = parseInt(localStorage.getItem(monthlyKey) || '0');
    const total = parseInt(localStorage.getItem(totalKey) || '0');
    
    setMonthlyVisitors(monthly);
    setTotalVisitors(total);
  };

  const refreshStats = () => {
    trackVisitor();
    getStats();
  };

  useEffect(() => {
    refreshStats();
    
    // Refresh stats every minute
    const interval = setInterval(getStats, 60000);
    
    return () => clearInterval(interval);
  }, [canUseAnalytics]);

  return (
    <VisitorTrackingContext.Provider 
      value={{
        monthlyVisitors,
        isTracking: canUseAnalytics(),
        totalVisitors,
        refreshStats
      }}
    >
      {children}
    </VisitorTrackingContext.Provider>
  );
};

export const useVisitorTrackingContext = () => {
  const context = useContext(VisitorTrackingContext);
  if (context === undefined) {
    throw new Error('useVisitorTrackingContext must be used within a VisitorTrackingProvider');
  }
  return context;
};