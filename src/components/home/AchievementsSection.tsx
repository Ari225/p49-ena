
import React from 'react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const AchievementsSection = () => {
  const isMobile = useIsMobile();
  const isTab = useIsTablet();
  
  const achievements = [{
    number: "+800",
    title: "Membres",
    description: "appartenant au réseau"
  }, {
    number: "+13",
    title: "Années",
    description: "d'excellence et d'action"
  }, {
    number: "+50",
    title: "Activités",
    description: "tenues depuis la création"
  }, {
    number: "5",
    title: "Délégations",
    description: "régionales"
  }];
  
  return (
    <section className={`bg-primary text-white py-8 md:py-12 lg:py-[50px] ${
      isMobile ? 'px-[25px]' : 
      isTab ? 'px-[50px]' :
      'px-8 md:px-12 lg:px-[100px]' // Desktop
    }`}>
      <div className="container mx-auto px-4">
        <div className={`grid gap-6 md:gap-8 ${
          isMobile ? 'grid-cols-2 gap-4' : 
          isTab ? 'grid-cols-2 gap-6' :
          'grid-cols-2 md:grid-cols-4 lg:grid-cols-4' // Desktop
        }`}>
          {achievements.map((achievement, index) => (
            <div key={index} className={`text-center ${
              isMobile ? 'p-3' : 
              isTab ? 'p-5' :
              'p-4' // Desktop
            }`}>
              <div className={`font-bold text-secondary/80 mb-2 ${
                isMobile ? 'text-xl' : 
                isTab ? 'text-2xl' :
                'text-3xl md:text-3xl lg:text-3xl' // Desktop
              }`}>
                {achievement.number}
              </div>
              <h3 className={`font-semibold mb-2 ${
                isMobile ? 'text-sm' : 
                isTab ? 'text-base' :
                'text-lg md:text-xl lg:text-xl' // Desktop
              }`}>
                {achievement.title}
              </h3>
              <p className={`text-white-700 font-normal ${
                isMobile ? 'text-xs' : 
                isTab ? 'text-sm' :
                'text-sm' // Desktop
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
