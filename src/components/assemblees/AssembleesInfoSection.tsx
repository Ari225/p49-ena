
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { Users, Calendar, FileText, Target } from 'lucide-react';

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
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl lg:text-4xl'} font-bold text-primary mb-4`}>
            Nos Assemblées Générales
          </h2>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600 max-w-3xl mx-auto`}>
            Découvrez les moments forts de la démocratie participative au sein de la P49. 
            Chaque assemblée est une opportunité de participer activement à la vie de notre organisation.
          </p>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-4'} gap-6`}>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-primary">Participation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Tous les membres sont invités à participer activement aux débats et décisions
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-primary">Programmation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Assemblées ordinaires et extraordinaires programmées selon les besoins
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-primary">Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Accès aux rapports, procès-verbaux et documents officiels
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-primary">Objectifs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Définir les orientations stratégiques et valider les projets importants
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AssembleesInfoSection;
