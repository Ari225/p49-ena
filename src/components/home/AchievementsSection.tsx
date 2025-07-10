
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const AchievementsSection = () => {
  const isMobile = useIsMobile();
  
  const achievements = [{
    number: "+800",
    title: "Membres",
    description: "appartenant au réseau"
  }, {
    number: "15",
    title: "Années",
    description: "d'excellence et d'action"
  }, {
    number: "+50",
    title: "Événements tenus",
    description: "Régionales, formations, réunions"
  }, {
    number: "12",
    title: "Sections régionales",
    description: "sur le territoire ivoirien"
  }];
  
  return (
    <section className={`bg-primary text-white py-8 md:py-12 lg:py-[50px] ${
      // Mobile
      isMobile ? 'px-[25px]' : 
      // Tablet
      'px-8 md:px-12 ' +
      // Desktop
      'lg:px-[100px]'
    }`}>
      <div className="container mx-auto px-4">
        <div className={`grid gap-6 md:gap-8 ${
          // Mobile
          isMobile ? 'grid-cols-2 gap-4' : 
          // Tablet
          'grid-cols-2 md:grid-cols-4 ' +
          // Desktop
          'lg:grid-cols-4'
        }`}>
          {achievements.map((achievement, index) => (
            <div key={index} className={`text-center ${
              // Mobile
              isMobile ? 'p-3' : 
              // Tablet & Desktop
              'p-4'
            }`}>
              <div className={`font-bold text-secondary/80 mb-2 ${
                // Mobile
                isMobile ? 'text-xl' : 
                // Tablet
                'text-2xl md:text-3xl ' +
                // Desktop
                'lg:text-3xl'
              }`}>
                {achievement.number}
              </div>
              <h3 className={`font-semibold mb-2 ${
                // Mobile
                isMobile ? 'text-base' : 
                // Tablet
                'text-lg md:text-xl ' +
                // Desktop
                'lg:text-xl'
              }`}>
                {achievement.title}
              </h3>
              <p className={`text-white-700 font-normal ${
                // Mobile
                isMobile ? 'text-xs' : 
                // Tablet & Desktop
                'text-sm'
              }`}>
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
