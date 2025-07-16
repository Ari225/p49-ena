
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { Vote, MessageSquare, Users2, CheckCircle } from 'lucide-react';

const ProcessusDemocratiqueSection = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const processSteps = [
    {
      icon: MessageSquare,
      title: "Débats et Discussions",
      description: "Échanges constructifs sur les sujets à l'ordre du jour"
    },
    {
      icon: Users2,
      title: "Participation Active",
      description: "Chaque membre peut s'exprimer et proposer des amendements"
    },
    {
      icon: Vote,
      title: "Votes Démocratiques",
      description: "Prises de décision selon les règles statutaires"
    },
    {
      icon: CheckCircle,
      title: "Validation Collective",
      description: "Adoption des résolutions par consensus ou majorité"
    }
  ];

  return (
    <section className={`py-16 bg-gray-50 ${
      isMobile ? 'px-[25px]' : 
      isTablet ? 'px-[50px]' :
      'px-[100px]' // Desktop
    }`}>
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl lg:text-4xl'} font-bold text-primary mb-4`}>
            Processus Démocratique
          </h2>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600 max-w-3xl mx-auto`}>
            Notre démarche démocratique garantit la transparence et la participation 
            de tous les membres dans les prises de décision importantes.
          </p>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-4'} gap-6`}>
          {processSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="relative">
                    <IconComponent className="h-12 w-12 text-primary mx-auto mb-4" />
                    <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <CardTitle className="text-primary">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-primary">Nos Principes Démocratiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`grid ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'} gap-6 text-left`}>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Transparence</h4>
                  <p className="text-gray-600 text-sm">
                    Tous les documents et décisions sont accessibles aux membres
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Égalité</h4>
                  <p className="text-gray-600 text-sm">
                    Chaque membre dispose d'une voix égale dans les décisions
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Consensus</h4>
                  <p className="text-gray-600 text-sm">
                    Recherche systématique du consensus avant tout vote
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProcessusDemocratiqueSection;
