
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import PopupDisplay from '@/components/popups/PopupDisplay';
import HeroSection from '@/components/home/HeroSection';
import ValuesSection from '@/components/home/ValuesSection';
import ActualitesSection from '@/components/home/ActualitesSection';
import AboutSection from '@/components/home/AboutSection';
import CommuniquesSection from '@/components/home/CommuniquesSection';
import AchievementsSection from '@/components/home/AchievementsSection';
import SiteSectionsGrid from '@/components/home/SiteSectionsGrid';
import JournalSection from '@/components/home/JournalSection';
import EchoRegionsSection from '@/components/home/EchoRegionsSection';
import CarrierePlusSection from '@/components/home/CarrierePlusSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import EvenementsSociauxSection from '@/components/home/EvenementsSociauxSection';
import ActivitesSection from '@/components/home/ActivitesSection';
import BlogSection from '@/components/home/BlogSection';
import GallerySection from '@/components/home/GallerySection';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const backgroundImages = [
    '/lovable-uploads/bg1.webp',
    '/lovable-uploads/bg2.webp',
    '/lovable-uploads/bg3.webp',
    '/lovable-uploads/bg4.webp'
  ];

  // Effet pour ajuster le scroll pour les appareils mobiles et tablettes
  useEffect(() => {
    if (isMobile || isTablet) {
      // Réinitialiser le scroll quand on revient sur la page d'accueil
      window.scrollTo(0, 0);
      
      // Améliorer le comportement de défilement sur mobile et tablette
      document.body.style.scrollBehavior = 'smooth';
      
      return () => {
        document.body.style.scrollBehavior = '';
      };
    }
  }, [isMobile, isTablet]);

  return (
    <Layout>
      <PopupDisplay />
      <HeroSection backgroundImages={backgroundImages} />
      <ValuesSection />
      <ActualitesSection />
      <AboutSection />
      <CommuniquesSection />
      <AchievementsSection />
      <SiteSectionsGrid />
      <JournalSection />
      <EchoRegionsSection />
      <CarrierePlusSection />
      <TestimonialsSection />
      <EvenementsSociauxSection />
      <ActivitesSection />
      <BlogSection />
      <GallerySection />
    </Layout>
  );
};

export default Index;
