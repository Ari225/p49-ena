
import React from 'react';
import MemberOrganigramCard from './MemberOrganigramCard';

const CommissairesSection = () => {
  const commissaires = [
    { name: "CISSE Almamy", position: "Commissaire aux Comptes", phone: "0708535270" },
    { name: "AMOA Brou Etienne", position: "Commissaire aux Comptes Adjoint", phone: "0708878381" }
  ];

  return (
    <section className="bg-white p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Commissaires aux Comptes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {commissaires.map((member, index) => (
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

export default CommissairesSection;
