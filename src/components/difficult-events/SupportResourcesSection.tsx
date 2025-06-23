
import React from 'react';
import { Card } from '@/components/ui/card';
import { Heart, AlertCircle, Stethoscope, Car } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const SupportResourcesSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className={`bg-gray-50 py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          Ressources de soutien
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center p-6 bg-white">
            <Heart className="w-12 h-12 mx-auto mb-4 text-gray-600" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Condoléances</h3>
            <p className="text-gray-700 text-sm">Soutien aux familles endeuillées</p>
          </Card>
          <Card className="text-center p-6 bg-white">
            <Stethoscope className="w-12 h-12 mx-auto mb-4 text-red-600" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Santé</h3>
            <p className="text-gray-700 text-sm">Accompagnement médical</p>
          </Card>
          <Card className="text-center p-6 bg-white">
            <Car className="w-12 h-12 mx-auto mb-4 text-orange-600" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Accidents</h3>
            <p className="text-gray-700 text-sm">Aide d'urgence</p>
          </Card>
          <Card className="text-center p-6 bg-white">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-600" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Autres</h3>
            <p className="text-gray-700 text-sm">Soutien général</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SupportResourcesSection;
