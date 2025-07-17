
import React from 'react';
import Layout from '@/components/Layout';
import ReunionsConstitutionHero from '@/components/reunions/ReunionsConstitutionHero';
import ReunionsConstitutionContent from '@/components/reunions/ReunionsConstitutionContent';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const ReunionsConstitution = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Version Mobile
  if (isMobile) {
    return (
      <Layout>
        <div className="min-h-screen bg-white">
          <ReunionsConstitutionHero />
          <ReunionsConstitutionContent />
        </div>
      </Layout>
    );
  }

  // Version Tablette
  if (isTablet) {
    return (
      <Layout>
        <div className="min-h-screen bg-white">
          <ReunionsConstitutionHero />
          <ReunionsConstitutionContent />
        </div>
      </Layout>
    );
  }

  // Version Desktop
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <ReunionsConstitutionHero />
        <ReunionsConstitutionContent />
      </div>
    </Layout>
  );
};

export default ReunionsConstitution;
