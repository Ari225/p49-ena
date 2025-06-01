
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useIsMobile } from '@/hooks/use-mobile';
import { EventCategoryTabs } from '@/components/difficult-events/EventCategoryTabs';
import { DifficultEvent } from '@/types/difficultEvents';

const EvenementsDifficiles = () => {
  const isMobile = useIsMobile();
  const [loading] = useState(false);

  // Données d'exemple pour les événements difficiles
  const events: DifficultEvent[] = [
    {
      id: '1',
      title: 'Décès de M. Jean Kouassi',
      description: 'Nous avons la tristesse de vous annoncer le décès de notre collègue Jean Kouassi.',
      event_date: '2024-01-15',
      category: 'deces',
      member_name: 'Jean Kouassi',
      family_support_message: 'Nos pensées accompagnent sa famille en ces moments difficiles.',
      image_url: null
    },
    {
      id: '2',
      title: 'Hospitalisation de Mme Marie Diabaté',
      description: 'Notre collègue Marie Diabaté est actuellement hospitalisée.',
      event_date: '2024-01-10',
      category: 'maladie',
      member_name: 'Marie Diabaté',
      family_support_message: 'Nous lui souhaitons un prompt rétablissement.',
      image_url: null
    }
  ];

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
