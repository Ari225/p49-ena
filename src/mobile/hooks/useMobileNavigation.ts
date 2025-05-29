
import { useState, useCallback } from 'react';

export const useMobileNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const setActive = useCallback((section: string) => {
    setActiveSection(section);
  }, []);

  return {
    isMenuOpen,
    activeSection,
    toggleMenu,
    closeMenu,
    openMenu,
    setActive
  };
};
