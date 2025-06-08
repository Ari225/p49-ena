
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Quote, TrendingUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const CarrierePlusSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className={`bg-accent/30 py-[100px] ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
      <div className="container mx-auto px-0 font-normal text-base text-gray-700">
        <div className="text-center mb-12">
          <h2 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-primary mb-4`}>Carrières+</h2>
          <p className="text-gray-700 mx-auto font-normal">
            Développez votre potentiel avec nos opportunités de formation et nos programmes d'accompagnement
          </p>
        </div>
        
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'} gap-8 mb-12`}>
          {/* Concours/Formation en vedette */}
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-primary">Formation en cours</h3>
                  <p className="text-sm text-gray-700 font-normal">Jusqu'au 30 avril 2024</p>
                </div>
              </div>
              <h4 className="font-bold mb-3 text-primary text-lg">Programme de Leadership Avancé</h4>
              <p className="text-sm mb-4 text-gray-700 font-normal">
                Formation intensive de 6 semaines sur le leadership transformationnel dans l'administration publique.
              </p>
              <div className="bg-accent/30 p-3 rounded-lg">
                <p className="text-primary text-sm font-medium">Inscriptions ouvertes</p>
                <p className="text-gray-700 text-xs font-normal">Places limitées - 20 participants</p>
              </div>
            </CardContent>
          </Card>

          {/* Citation inspirante */}
          <Card className="overflow-hidden bg-primary text-white">
            <CardContent className="p-6 bg-primary">
              <div className="flex items-center justify-center mb-4">
                <Quote className="w-5 h-5 text-secondary" />
              </div>
              <blockquote className="text-lg font-bold mb-4">
                "La formation continue est la clé de l'excellence dans le service public. 
                Chaque jour est une opportunité d'apprendre et de grandir."
              </blockquote>
              <div className="border-t border-white/20 pt-4">
                <p className="font-semibold">Dr. Kouakou Marie-Claire</p>
                <p className="text-sm opacity-80">Directrice Générale, Promotion 49</p>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques */}
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary/80 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-primary">Nos réussites</h3>
                  <p className="text-sm text-gray-700 font-normal">Année 2024</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-normal text-gray-700">Formations dispensées</span>
                    <span className="font-bold text-primary">12</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-primary h-2 rounded-full" style={{
                    width: '80%'
                  }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-normal">Membres formés</span>
                    <span className="font-bold text-primary">150+</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-secondary h-2 rounded-full" style={{
                    width: '90%'
                  }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <Button asChild className="bg-primary hover:bg-primary text-base md:text-base text-white py-[5px] px-[15px] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold">
            <Link to="/formations">Découvrir nos opportunités</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CarrierePlusSection;
