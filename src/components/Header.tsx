
import React from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import LanguageToggle from './header/LanguageToggle';
import UserMenu from './header/UserMenu';
import DesktopNavigation from './header/DesktopNavigation';
import MobileMenu from './header/MobileMenu';

const Header = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      {/* Desktop Header */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-[100px] py-[15px]">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Left Section */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/logo.webp" 
                  alt="P49 ENA Logo" 
                  className="h-20 w-auto object-contain" 
                />
              </Link>
            </div>

            {/* Desktop Navigation - Center Section */}
            <DesktopNavigation />

            {/* Right Section - Language & Auth */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              <LanguageToggle />
              <UserMenu />
            </div>
          </div>
        </div>
      </div>

      {/* Tablet Header */}
      {isTablet && (
        <div className="hidden md:block lg:hidden">
          <div className="container mx-auto px-[50px] py-[15px]">
            <div className="flex items-center justify-between h-16">
              {/* Logo - Left Section */}
              <div className="flex-shrink-0">
                <Link to="/" className="flex items-center space-x-2">
                  <img 
                    src="/lovable-uploads/logo.webp" 
                    alt="P49 ENA Logo" 
                    className="h-16 w-auto object-contain" 
                  />
                </Link>
              </div>

              {/* Center Section - Language Switchers */}
              <div className="flex items-center justify-center flex-1">
                <LanguageToggle variant="tablet" />
              </div>

              {/* Right Section - Menu */}
              <div className="flex items-center flex-shrink-0">
                <MobileMenu variant="tablet" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <div className="md:block lg:hidden">
        {!isTablet && (
          <div className="flex items-center justify-between px-[25px] py-[15px]">
            {/* Logo on the left */}
            <div className="flex items-center space-x-2 flex-1">
              <Link to="/" className="flex items-center space-x-2">
                <img 
                  src="/lovable-uploads/logo.webp" 
                  alt="P49 ENA Logo" 
                  className="h-10 w-10" 
                />
              </Link>
            </div>
            
            {/* Language switchers in the center */}
            <div className="flex items-center justify-center flex-1">
              <LanguageToggle mobile />
            </div>
            
            {/* Hamburger menu on the right */}
            <MobileMenu />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
