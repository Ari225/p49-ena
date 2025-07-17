
import React from 'react';
import Layout from '@/components/Layout';
import ReunionsConstitutionHero from '@/components/reunions/ReunionsConstitutionHero';
import ReunionsConstitutionPresentation from '@/components/reunions/ReunionsConstitutionPresentation';
import ReunionsConstitutionContent from '@/components/reunions/ReunionsConstitutionContent';
import ReunionsConstitutionProgramme from '@/components/reunions/ReunionsConstitutionProgramme';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const ReunionsConstitution = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Version Mobile
  if (isMobile) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <ReunionsConstitutionHero />
          <ReunionsConstitutionPresentation />
          <ReunionsConstitutionContent />
          <ReunionsConstitutionProgramme />
        </div>
      </Layout>
    );
  }

  // Version Tablette
  if (isTablet) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <ReunionsConstitutionHero />
          <ReunionsConstitutionPresentation />
          <ReunionsConstitutionContent />
          <ReunionsConstitutionProgramme />
        </div>
      </Layout>
    );
  }

  // Version Desktop
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <ReunionsConstitutionHero />
        <ReunionsConstitutionPresentation />
        <ReunionsConstitutionContent />
        <ReunionsConstitutionProgramme />
      </div>
    </Layout>
  );
};

export default ReunionsConstitution;
