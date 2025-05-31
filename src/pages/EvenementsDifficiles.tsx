
import React from 'react';
import Layout from '@/components/Layout';
import { useIsMobile } from '@/hooks/use-mobile';
import { useDifficultEvents } from '@/hooks/useDifficultEvents';
import { EventCategoryTabs } from '@/components/difficult-events/EventCategoryTabs';

const EvenementsDifficiles = () => {
  const isMobile = useIsMobile();
  const { events, loading } = useDifficultEvents();

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Chargement...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <section className={`bg-gray-800 text-white py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">
              Évènements Malheureux
            </h1>
            <p className="text-xl opacity-90">
              Soutenons-nous mutuellement dans les moments difficiles
            </p>
          </div>
        </section>

        {/* Events Section */}
        <section className={`py-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <EventCategoryTabs events={events} />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default EvenementsDifficiles;
