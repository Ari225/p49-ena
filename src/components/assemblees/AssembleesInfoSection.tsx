
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const AssembleesInfoSection = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <section className={`py-16 bg-white ${
      isMobile ? 'px-[25px]' : 
      isTablet ? 'px-[50px]' :
      'px-[100px]' // Desktop
    }`}>
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Transparence et Participation
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Les Assemblées Générales de la P49 sont les moments privilégiés de la démocratie participative, 
            où chaque membre peut s'exprimer et contribuer aux décisions importantes de notre organisation.
          </p>
        </div>

        <div className={`grid gap-6 ${
          isMobile ? 'grid-cols-1' :
          isTablet ? 'grid-cols-2' :
          'grid-cols-3' // Desktop
        }`}>
          <Card>
            <CardHeader>
              <CardTitle className="text-primary text-center">Participation Active</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Chaque membre a le droit de participer aux débats et de proposer des amendements
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary text-center">Transparence Totale</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Tous les documents sont mis à disposition et les procès-verbaux publiés
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary text-center">Décisions Collectives</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Les orientations stratégiques sont votées démocratiquement par l'ensemble des membres
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AssembleesInfoSection;
