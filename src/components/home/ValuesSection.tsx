import React from 'react';
import { Handshake, Zap, Heart, Shield } from 'lucide-react';
const ValuesSection = () => {
  const values = [{
    title: "Connexion",
    description: "Maintenir des liens solides entre tous les membres du réseau",
    icon: Handshake
  }, {
    title: "Action",
    description: "Agir ensemble pour le développement et l'excellence",
    icon: Zap
  }, {
    title: "Solidarité",
    description: "Soutenir et accompagner chaque membre dans sa carrière",
    icon: Heart
  }, {
    title: "Dévouement",
    description: "Servir avec engagement au profit de la nation",
    icon: Shield
  }];
  return <section className="bg-white px-4 md:px-8 lg:px-[100px] py-12 md:py-16 lg:py-[100px]">
      <div className="container mx-auto px-0">
        <h2 className="text-2xl md:text-3xl text-center text-primary mb-8 md:mb-12 font-bold">
          Valeurs de la P49
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {values.map((value, index) => <div key={index} className="text-center grid place-items-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 bg-[#dfbe36]/[0.43]">
                <value.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-primary mb-2 md:mb-3 text-lg md:text-xl font-semibold">
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-700 max-w-[220px] text-center px-2 font-normal">
                {value.description}
              </p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default ValuesSection;