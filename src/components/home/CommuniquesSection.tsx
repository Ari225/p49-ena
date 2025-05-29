import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
const CommuniquesSection = () => {
  const {
    t
  } = useLanguage();
  return <section className="px-4 md:px-8 lg:px-[100px] py-12 md:py-16 lg:py-[100px] bg-white">
      <div className="container mx-auto px-0">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">{t('home.communiques_title')}</h2>
          <Link to="/communiques" className="bg-primary text-white hover:bg-primary rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg py-[5px] px-[15px] text-sm  md:text-sm font-semibold">
            Voir tout <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Image container */}
          <div className="w-full lg:w-[500px] bg-white flex items-center justify-center">
            <div className="w-full lg:w-[500px] bg-white shadow-xl p-4 md:p-6 rounded-lg px-0 py-0">
              <img alt="Communiqué" src="/lovable-uploads/cdf92e8b-3396-4192-b8a1-f94647a7b289.jpg" className="w-full h-full object-cover" />
            </div>
          </div>
          
          {/* Communiqués stacked */}
          <div className="flex-1 space-y-3 md:space-y-4">
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4 md:p-6 px-[24px] py-[20px]">
                <h3 className="font-semibold text-red-800 mb-2 text-xl md:text-xl">Communiqué urgent</h3>
                <p className="text-sm md:text-sm text-red-600 font-normal">Report de l'événement prévu le 25 mars 2024.</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 md:p-6 py-[20px]">
                <h3 className="font-semibold text-blue-800 mb-2 text-xl md:text-xl">Nouvelle inscription</h3>
                <p className="text-sm md:text-sm text-blue-600 font-normal">Ouverture des inscriptions pour la formation de mars.</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 md:p-6 py-[20px]">
                <h3 className="font-semibold text-green-800 mb-2 text-xl md:text-xl">Félicitations</h3>
                <p className="text-sm md:text-sm text-green-600 font-normal">Promotion de plusieurs membres à de nouveaux postes.</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 md:p-6 py-[20px]">
                <h3 className="font-semibold text-purple-800 mb-2 text-xl md:text-xl">Communiqué de presse</h3>
                <p className="text-sm text-purple-600 md:text-sm font-normal">Publication des résultats du dernier concours interne.</p>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4 md:p-6 py-[20px]">
                <h3 className="font-semibold text-orange-800 mb-2 text-xl md:text-xl">Communiqué ENA</h3>
                <p className="text-sm md:text-sm text-orange-600 font-normal">Nouvelles directives pour les formations continues.</p>
              </CardContent>
            </Card>
            <Card className="bg-indigo-50 border-indigo-200">
              <CardContent className="p-4 md:p-6 py-[20px]">
                <h3 className="font-semibold text-indigo-800 mb-2 text-xl md:text-xl">Communiqué P49</h3>
                <p className="text-sm md:text-sm text-indigo-600 font-normal">Assemblée générale extraordinaire du réseau P49.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};
export default CommuniquesSection;