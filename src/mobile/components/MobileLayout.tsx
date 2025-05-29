
import React from 'react';
import MobileHeader from './MobileHeader';
import MobileFooter from './MobileFooter';
import { useMobileDetection } from '../hooks/useMobileDetection';

interface MobileLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  showHeader = true, 
  showFooter = true 
}) => {
  const { isMobile } = useMobileDetection();

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && <MobileHeader />}
      
      <main className={`flex-1 ${showHeader ? 'pt-16' : ''}`}>
        {children}
      </main>
      
      {showFooter && <MobileFooter />}
    </div>
  );
};

export default MobileLayout;
