
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import PresidentWelcomeModal from '@/components/PresidentWelcomeModal';
import HeroSection from '@/components/home/HeroSection';
import ValuesSection from '@/components/home/ValuesSection';
import NewsCarousel from '@/components/home/NewsCarousel';
import AchievementsSection from '@/components/home/AchievementsSection';
import ActualitesSection from '@/components/home/ActualitesSection';
import CommuniquesSection from '@/components/home/CommuniquesSection';
import AboutSection from '@/components/home/AboutSection';
import SiteSectionsGrid from '@/components/home/SiteSectionsGrid';
import JournalSection from '@/components/home/JournalSection';
import EchoRegionsSection from '@/components/home/EchoRegionsSection';
import CarrierePlusSection from '@/components/home/CarrierePlusSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import EvenementsSociauxSection from '@/components/home/EvenementsSociauxSection';
import ActivitesSection from '@/components/home/ActivitesSection';
import BlogSection from '@/components/home/BlogSection';
import GallerySection from '@/components/home/GallerySection';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  const backgroundImages = [
    '/lovable-uploads/b85cd7b2-67e0-481b-9dec-dd22369d51c0.png',
    '/lovable-uploads/d0535478-3ab2-4846-a655-f5cd50daa143.png',
    '/lovable-uploads/de98936e-ecc5-4568-8c53-32bd57058a99.png'
  ];

  // Effet pour ajuster le scroll pour les appareils mobiles
  useEffect(() => {
    if (isMobile) {
      // Réinitialiser le scroll quand on revient sur la page d'accueil
      window.scrollTo(0, 0);
      
      // Améliorer le comportement de défilement sur mobile
      document.body.style.scrollBehavior = 'smooth';
      
      return () => {
        document.body.style.scrollBehavior = '';
      };
    }
  }, [isMobile]);

  return (
    <Layout>
      <PresidentWelcomeModal />
      <HeroSection backgroundImages={backgroundImages} />
      <ValuesSection />
      <NewsCarousel />
      <AchievementsSection />
      <ActualitesSection />
      <CommuniquesSection />
      <AboutSection />
      <SiteSectionsGrid />
      <JournalSection />
      <EchoRegionsSection />
      <CarrierePlusSection />
      <TestimonialsSection />
      <EvenementsSociauxSection />
      <ActivitesSection />
      <BlogSection />
      <GallerySection />
      
      {/* Bouton de retour en haut pour mobile */}
      {isMobile && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-primary text-white rounded-full p-3 shadow-lg z-50"
          aria-label="Retour en haut"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      )}
    </Layout>
  );
};

export default Index;
