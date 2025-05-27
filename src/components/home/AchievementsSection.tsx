
import React from 'react';

const AchievementsSection = () => {
  const achievements = [
    {
      number: "800+",
      title: "Membres",
      description: "appartenant au Réseau"
    },
    {
      number: "15",
      title: "Années",
      description: "d'excellence et d'entraide"
    },
    {
      number: "50+",
      title: "Événements Organisés",
      description: "Régionales, formations et réunions"
    },
    {
      number: "12",
      title: "Régions Représentées",
      description: "sur le territoire ivoirien"
    }
  ];

  return (
    <section className="bg-primary text-white py-[50px] px-[100px]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-3xl font-bold text-secondary mb-2">
                {achievement.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
              <p className="text-white/80">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
