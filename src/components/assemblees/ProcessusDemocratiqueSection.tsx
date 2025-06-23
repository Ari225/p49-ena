
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProcessusDemocratiqueSection = () => {
  return (
    <section className="py-16 bg-accent/10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-primary text-center mb-8">
          Le Processus Démocratique P49
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-lg">1. Convocation</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Envoi officiel 15 jours avant avec ordre du jour détaillé
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-lg">2. Quorum</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Minimum 50% des membres présents ou représentés
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-lg">3. Débats</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Discussion ouverte et démocratique sur tous les points
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-lg">4. Décisions</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Vote à la majorité simple ou qualifiée selon les statuts
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProcessusDemocratiqueSection;
