
import React from 'react';
import MemberOrganigramCard from './MemberOrganigramCard';

const DeleguesRegionauxSection = () => {
  const delegues = [
    { name: "GNEPA Samuel", position: "Délégué Régional Est", phone: "0707879789" },
    { name: "NENE Salimatou", position: "Déléguée Régionale Centre", phone: "0758156531" },
    { name: "TAPE Alain", position: "Délégué Régional Nord", phone: "0707240414" },
    { name: "KOFFI Konan Ernest", position: "Délégué Zone Sud Ouest", phone: "0101127191" }
  ];

  return (
    <section className="p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Délégués Régionaux
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {delegues.map((member, index) => (
          <MemberOrganigramCard
            key={index}
            name={member.name}
            position={member.position}
            phone={member.phone}
          />
        ))}
      </div>
    </section>
  );
};

export default DeleguesRegionauxSection;
