
import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenu } from './NavigationMenu';
import { LanguageToggle } from './LanguageToggle';
import { AuthButtons } from './AuthButtons';

export const DesktopHeader = () => {
  return (
    <div className="hidden lg:block">
      <div className="container mx-auto px-[100px] py-[15px]">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png" 
                alt="P49 ENA Logo" 
                className="h-20 w-auto object-contain" 
              />
            </Link>
          </div>

          {/* Desktop Navigation - Center Section */}
          <NavigationMenu />

          {/* Right Section - Language & Auth */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <LanguageToggle />
            <AuthButtons />
          </div>
        </div>
      </div>
    </div>
  );
};
