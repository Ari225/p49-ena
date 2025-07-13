
import React from 'react';
import Layout from '@/components/Layout';
import HistoriqueHero from '@/components/historique/HistoriqueHero';
import P49ExcellenceSection from '@/components/historique/P49ExcellenceSection';
import TimelineSection from '@/components/historique/TimelineSection';
import ObjectifsSection from '@/components/historique/ObjectifsSection';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const Historique = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Mobile Version
  if (isMobile) {
    return (
      <Layout>
        <div className="bg-accent/30">
          <HistoriqueHero />
          <P49ExcellenceSection />
          <TimelineSection />
          <ObjectifsSection />
        </div>
      </Layout>
    );
  }

  // Tablet Version
  if (isTablet) {
    return (
      <Layout>
        <div className="bg-accent/30">
          <HistoriqueHero />
          <P49ExcellenceSection />
          <TimelineSection />
          <ObjectifsSection />
        </div>
      </Layout>
    );
  }

  // Desktop Version
  return (
    <Layout>
      <div className="bg-accent/30">
        <HistoriqueHero />
        <P49ExcellenceSection />
        <TimelineSection />
        <ObjectifsSection />
      </div>
    </Layout>
  );
};

export default Historique;
