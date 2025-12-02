import React from 'react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
const P49ExcellenceSection = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Mobile Version
  if (isMobile) {
    return <section className="py-16 px-[25px] bg-white">
        <div className="container mx-auto px-0">
          <h2 className="text-xl font-bold text-primary mb-[50px] md:mb-[50px] text-center">La P49, une promotion d'excellence</h2>
          <div className="grid grid-cols-1 gap-6 items-center">
            <div>
              <img alt="Logo P49" src="/lovable-uploads/excellence.webp" className="w-full h-full rounded-lg shadow-lg" />
            </div>
            <div>
              <p className="text-xs text-gray-700 leading-relaxed mb-4 text-left text-justify">
                L'association P49 ENA a été créée dans le but de préserver et renforcer les liens entre les anciens élèves de la 49e promotion de l'École Nationale d'Administration. Cette initiative est le fruit de plusieurs rencontres entre membres fondateurs et de cadres d'échanges ayant conduit à une assemblée générale élective. Pour officialiser l'existence de l'association, les statuts et le règlement intérieur ont été adoptés lors d'une assemblée générale. Une déclaration a ensuite été faite à la Préfecture d'Abidjan, suivie de la délivrance d'un récépissé de dépôt de dossier. Cette déclaration a été publiée au Journal Officiel de la République de Côte d'Ivoire. La procédure pour l'obtention de l'arrêté est actuellement en cours. <strong>« La P49, plus qu'une promotion, une famille unie et solidaire »</strong>, tel est le slogan de notre association. La stratégie de mobilisation qui permettra de concrétiser cet objectif repose sur l’organisation des Régionales de la P49 ainsi que sur l’enregistrement électronique des condisciples.
              </p>
            </div>
          </div>
        </div>
      </section>;
  }

  // Tablet Version
  if (isTablet) {
    return <section className="py-20 px-[50px] bg-white">
        <div className="container mx-auto px-0">
          <h2 className="text-2xl font-bold text-primary mb-[50px] md:mb-[50px] text-center">La P49, une promotion d'excellence</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm text-gray-700 leading-relaxed mb-4 text-left text-justify">
                L'association P49 ENA a été créée dans le but de préserver et renforcer les liens entre les anciens élèves de la 49e promotion de l'École Nationale d'Administration. Cette initiative est le fruit de plusieurs rencontres entre membres fondateurs et de cadres d'échanges ayant conduit à une assemblée générale élective. Pour officialiser l'existence de l'association, les statuts et le règlement intérieur ont été adoptés lors d'une assemblée générale. Une déclaration a ensuite été faite à la Préfecture d'Abidjan, suivie de la délivrance d'un récépissé de dépôt de dossier. Cette déclaration a été publiée au Journal Officiel de la République de Côte d'Ivoire. La procédure pour l'obtention de l'arrêté est actuellement en cours. <strong>« La P49, plus qu'une promotion, une famille unie et solidaire »</strong>, tel est le slogan de notre association. La stratégie de mobilisation qui permettra de concrétiser cet objectif repose sur l’organisation des Régionales de la P49 ainsi que sur l’enregistrement électronique des condisciples.
              </p>
            </div>
            <div>
              <img alt="Logo P49" src="/lovable-uploads/excellence.webp" className="w-full h-full rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>;
  }

  // Desktop Version
  return <section className="py-[100px] px-8 md:px-[100px] bg-white">
      <div className="container mx-auto px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-[50px] md:mb-[50px] text-left">La P49, une promotion d'excellence</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4 text-justify">L'association P49-ENA a été créée dans le but de préserver et renforcer les liens entre les anciens élèves de la 49e promotion de l'École Nationale d'Administration. Cette initiative est le fruit de plusieurs rencontres entre membres fondateurs et de cadres d'échanges ayant conduit à une assemblée générale élective. Pour officialiser l'existence de l'association, les statuts et le règlement intérieur ont été adoptés lors d'une assemblée générale. Une déclaration a ensuite été faite à la Préfecture d'Abidjan, suivie de la délivrance d'un récépissé de dépôt de dossier. Cette déclaration a été publiée au Journal Officiel de la République de Côte d'Ivoire. La procédure pour l'obtention de l'arrêté est actuellement en cours. « La P49, plus qu'une promotion, une famille unie et solidaire », tel est le slogan de notre association. La stratégie de mobilisation qui permettra de concrétiser cet objectif repose sur l’organisation des Régionales de la P49 ainsi que sur l’enregistrement électronique des condisciples.<strong>« La P49, plus qu'une promotion, une famille unie et solidaire »</strong>, tel est le slogan de notre association. La stratégie de mobilisation qui permettra de concrétiser cet objectif repose sur l’organisation des Régionales de la P49 ainsi que sur l’enregistrement électronique des condisciples.
            </p>
          </div>
          <div>
            <img alt="Logo P49" src="/lovable-uploads/excellence.webp" className="w-full h-full rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </section>;
};
export default P49ExcellenceSection;