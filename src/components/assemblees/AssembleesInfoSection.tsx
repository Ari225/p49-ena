
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AssembleesInfoSection = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">AG Ordinaire</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Organisée chaque année pour valider les bilans et 
                définir les orientations de l'association.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">AG Extraordinaire</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Convoquée pour des décisions importantes : 
                modifications statutaires, projets spéciaux.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Participation</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold text-primary">85%</div>
              <p className="text-gray-600">Taux de participation moyen</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AssembleesInfoSection;
