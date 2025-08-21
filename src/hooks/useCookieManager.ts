
export const useCookieManager = () => {
  const setCookie = (name: string, value: string, days: number) => {
    try {
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      const cookieString = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
      document.cookie = cookieString;
      console.log(`Cookie set: ${name}=${value}`, cookieString);
      
      // Verify the cookie was set
      const verification = getCookie(name);
      console.log(`Cookie verification for ${name}:`, verification);
    } catch (error) {
      console.error('Error setting cookie:', error);
    }
  };

  const getCookie = (name: string) => {
    try {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    } catch (error) {
      console.error('Error getting cookie:', error);
      return null;
    }
  };

  return { setCookie, getCookie };
};
