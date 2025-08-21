import { useCookieManager } from './useCookieManager';

export const useCookieConsent = () => {
  const { getCookie } = useCookieManager();

  const hasConsent = () => {
    const consent = getCookie('cookie_consent');
    return consent !== null;
  };

  const canUseFunctionalCookies = () => {
    const functional = getCookie('cookies_functional');
    return functional === 'true';
  };

  const canUseAnalytics = () => {
    const analytics = getCookie('cookies_analytics');
    return analytics === 'true';
  };

  const canUseMarketing = () => {
    const marketing = getCookie('cookies_marketing');
    return marketing === 'true';
  };

  const getConsentType = () => {
    return getCookie('cookie_consent');
  };

  return {
    hasConsent,
    canUseFunctionalCookies,
    canUseAnalytics,
    canUseMarketing,
    getConsentType,
  };
};