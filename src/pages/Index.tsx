
import React from 'react';
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

const Index = () => {
  const backgroundImages = [
    '/lovable-uploads/b85cd7b2-67e0-481b-9dec-dd22369d51c0.png',
    '/lovable-uploads/d0535478-3ab2-4846-a655-f5cd50daa143.png',
    '/lovable-uploads/de98936e-ecc5-4568-8c53-32bd57058a99.png'
  ];

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
    </Layout>
  );
};

export default Index;
