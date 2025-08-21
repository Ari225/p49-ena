
export const useCookieManager = () => {
  const setCookie = (name: string, value: string, days: number) => {
    try {
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      // Simplified cookie string without SameSite to avoid compatibility issues
      const cookieString = `${name}=${value};expires=${expires.toUTCString()};path=/`;
      document.cookie = cookieString;
      console.log(`Cookie set: ${name}=${value}`, cookieString);
      
      // Also store in localStorage as backup
      localStorage.setItem(name, value);
      
      // Verify the cookie was set
      setTimeout(() => {
        const verification = getCookie(name);
        console.log(`Cookie verification for ${name}:`, verification);
      }, 10);
    } catch (error) {
      console.error('Error setting cookie:', error);
      // Fallback to localStorage
      localStorage.setItem(name, value);
    }
  };

  const getCookie = (name: string) => {
    try {
      // First try to get from document.cookie
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      
      // Fallback to localStorage if cookie not found
      const localValue = localStorage.getItem(name);
      if (localValue) {
        console.log(`Cookie fallback from localStorage: ${name}=${localValue}`);
        return localValue;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting cookie:', error);
      // Try localStorage as final fallback
      try {
        return localStorage.getItem(name);
      } catch {
        return null;
      }
    }
  };

  return { setCookie, getCookie };
};
