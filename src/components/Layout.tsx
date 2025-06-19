
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Preloader from './Preloader';
import ScrollToTopButton from './ScrollToTopButton';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="flex flex-col">
      <Preloader />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      {!isDashboard && <Footer />}
      <ScrollToTopButton />
    </div>
  );
};

export default Layout;
