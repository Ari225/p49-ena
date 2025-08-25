
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Preloader from './Preloader';
import ScrollToTopButton from './ScrollToTopButton';
import ConnectionStatus from './ConnectionStatus';
import { useLocation } from 'react-router-dom';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen flex flex-col">
      <Preloader />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      {!isDashboard && <Footer />}
      <ScrollToTopButton />
      <ConnectionStatus />
    </div>
  );
};

export default Layout;
