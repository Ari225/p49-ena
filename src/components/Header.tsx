
import React from 'react';
import { DesktopHeader } from './header/DesktopHeader';
import { MobileHeader } from './header/MobileHeader';

const Header = () => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <DesktopHeader />
      <MobileHeader />
    </header>
  );
};

export default Header;
