
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const P49ExcellenceSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className={`py-16 md:py-[100px] ${isMobile ? 'px-[25px]' : 'px-8 md:px-[100px]'}`}>
      <div className="container mx-auto px-0">
        <h2 className={`font-bold text-primary mb-12 ${isMobile ? 'text-xl' : 'text-4xl'} text-center`}>La P49, une promotion d'excellence</h2>
        <div className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'lg:grid-cols-2 gap-8'} items-center`}>
          <div>
            <p className={`text-gray-700 leading-relaxed mb-4 text-left ${isMobile ? 'text-sm' : 'text-base'}`}>
              L'association P49 ENA a été créée dans le but de préserver et renforcer les liens entre les anciens élèves de la 49e promotion de l'École Nationale d'Administration. Cette initiative est le fruit de plusieurs rencontres entre membres fondateurs et de cadres d'échanges ayant conduit à une assemblée générale élective. Pour officialiser l'existence de l'association, les statuts et le règlement intérieur ont été adoptés lors d'une assemblée générale. Une déclaration a ensuite été faite à la Préfecture d'Abidjan, suivie de la délivrance d'un récépissé de dépôt de dossier. Cette déclaration a été publiée au Journal Officiel de la République de Côte d'Ivoire. La procédure pour l'obtention de l'arrêté est actuellement en cours.
            </p>
          </div>
          <div className={`${isMobile ? 'order-first' : ''}`}>
            <img 
              alt="Logo P49" 
              src="/lovable-uploads/8cbb0164-0529-47c1-9caa-8244c17623b3.jpg" 
              className={`w-full ${isMobile ? 'max-w-xs' : 'max-w-md'} mx-auto rounded-lg shadow-lg`} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default P49ExcellenceSection;
