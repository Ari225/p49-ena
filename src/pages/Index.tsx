
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import PresidentWelcomeModal from '@/components/PresidentWelcomeModal';
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
    '/lovable-uploads/b85cd7b2-67e0-481b-9dec-dd22369d51c0.png',
    '/lovable-uploads/d0535478-3ab2-4846-a655-f5cd50daa143.png',
    '/lovable-uploads/Equipe1.jpg',
    '/lovable-uploads/Equipe.jpg'
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
      <PresidentWelcomeModal />
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
