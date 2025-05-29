
import React from 'react';
import MemberOrganigramCard from './MemberOrganigramCard';

const BureauExecutifSection = () => {
  const bureauMembers = [
    { name: "MEL Meléï Marcelle", position: "Président", phone: "0707188863" },
    { name: "SANGARE Yacouba", position: "Vice-président", phone: "0708892909" },
    { name: "DEKOULA Ange", position: "Secrétaire Général", phone: "0707127081" },
    { name: "EBROTIE Arnaud Angui", position: "Secrétaire Général Adjoint", phone: "0707261572" },
    { name: "ESSOH Loyou Jeannette", position: "Trésorier Général", phone: "0708037641" },
    { name: "SOMALA Solange", position: "Trésorier Général Adjoint", phone: "0758278832" },
    { name: "IPAUD Michel", position: "Secrétaire chargé de la Coopération Internationale et de la Diaspora", phone: "0748818174" },
    { name: "KONE Mingoro Françoise", position: "Conseiller chargé de l'Organisation", phone: "0707094127" },
    { name: "POKOU Roger", position: "Conseiller chargé de la Communication", phone: "0749209420" },
    { name: "KOUAME Narcisse", position: "Conseiller chargé des Affaires Culturelles", phone: "0748436198" },
    { name: "YANSUEH Ignace", position: "Conseiller chargé des Affaires Sociales", phone: "0707247324" },
    { name: "TIA Singoh Alexis", position: "Conseiller chargé de la Mobilisation des Ressources Financières", phone: "0709956666" },
    { name: "BADOUON Monhessio Marius", position: "Conseiller chargé de la Mobilisation des Ressources Humaines", phone: "0708082464" },
    { name: "FALLE Daya Aymard", position: "Conseiller chargé des Carrières, du Renforcement des Capacités et des Négociations sociales", phone: "0709141060" },
    { name: "SORO Thima", position: "Président de la Commission chargée de l'Organisation", phone: "0758730418" },
    { name: "SILUE Kiyala", position: "Président de la Commission chargée de la Communication", phone: "0708963718" },
    { name: "AHOURE Noël", position: "Président de la Commission chargée des Affaires Culturelles", phone: "0102269396" },
    { name: "KPONE Bérenger", position: "Président de la Commission chargée de la Mobilisation des Ressources Humaines", phone: "0707414607" },
    { name: "ABOUA Sopie IDA épouse KOUADIO", position: "Président de la Commission chargée de la Mobilisation des Ressources Financières", phone: "0707220179" },
    { name: "KROU Allou Luc", position: "Président de la Commission Carrières, Renforcement des Capacités et Promotion et Protection des Droits Professionnels", phone: "0748788169" },
    { name: "ODJE Marie-Clémence", position: "Président de la Commission des Affaires Sociales", phone: "0707616615" }
  ];

  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Bureau Exécutif
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {bureauMembers.map((member, index) => (
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

export default BureauExecutifSection;
