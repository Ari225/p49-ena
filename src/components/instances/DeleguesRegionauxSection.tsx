
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const DeleguesRegionauxSection = () => {
  const isMobile = useIsMobile();
  
  const delegues = [
    {
      region: "Région du Gbêkê",
      name: "KOUAME Kouakou Désiré",
      phone: "0707461956"
    },
    {
      region: "Région du Moronou", 
      name: "KONAN Yao Sylvain",
      phone: "0758824407"
    },
    {
      region: "Région de l'Indénié-Djuablin",
      name: "AHOUSSI Ahoussi Pierre",
      phone: "0707070871"
    }
  ];

  return (
    <section className={`${isMobile ? 'p-4' : 'p-8'} relative`}>
      <div className="relative z-10">
        <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center ${isMobile ? 'mb-6' : 'mb-8'} text-primary`}>
          Délégués Régionaux
        </h2>
        
        <div className="max-w-6xl mx-auto">
          <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
            {delegues.map((delegue, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-secondary">
                <CardHeader>
                  <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} text-primary mb-2`}>
                    {delegue.name}
                  </CardTitle>
                  <div className="bg-secondary/20 rounded-lg p-3">
                    <p className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold text-primary`}>
                      {delegue.region}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <span className={`${isMobile ? 'text-sm' : 'text-base'}`}>📞</span>
                    <span className={`${isMobile ? 'text-sm' : 'text-base'}`}>{delegue.phone}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleguesRegionauxSection;
