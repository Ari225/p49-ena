
import { useState, useEffect, useCallback } from 'react';

export const useMobileScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollData = () => {
      const currentScrollY = window.pageYOffset;
      
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', updateScrollData);
    return () => window.removeEventListener('scroll', updateScrollData);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return {
    isScrolled,
    scrollY,
    scrollDirection,
    scrollToTop,
    scrollToSection
  };
};
