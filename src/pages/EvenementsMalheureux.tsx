
import React from 'react';
import Layout from '@/components/Layout';
import DifficultEventsHeader from '@/components/difficult-events/DifficultEventsHeader';
import DifficultEventsSection from '@/components/difficult-events/DifficultEventsSection';
import SupportResourcesSection from '@/components/difficult-events/SupportResourcesSection';

const EvenementsMalheureux = () => {
  return (
    <Layout>
      <div className="bg-white min-h-screen">
        <DifficultEventsHeader />
        <DifficultEventsSection />
        <SupportResourcesSection />
      </div>
    </Layout>
  );
};

export default EvenementsMalheureux;
