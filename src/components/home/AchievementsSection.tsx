
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
    <section className={`bg-primary text-white py-8 md:py-12 lg:py-[50px] ${isMobile ? 'px-[25px]' : 'px-4 md:px-8 lg:px-[100px]'}`}>
      <div className="container mx-auto px-4">
        <div className={`grid ${isMobile ? 'grid-cols-2 gap-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'}`}>
          {achievements.map((achievement, index) => (
            <div key={index} className={`text-center ${isMobile ? 'p-3' : ''}`}>
              <div className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold text-secondary/80 mb-2`}>
                {achievement.number}
              </div>
              <h3 className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} font-semibold mb-2`}>
                {achievement.title}
              </h3>
              <p className={`text-white-700 ${isMobile ? 'text-xs' : 'text-sm md:text-sm'} font-normal`}>
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
