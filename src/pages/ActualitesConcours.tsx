import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Users, Clock, ExternalLink } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
const ActualitesConcours = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [filter, setFilter] = useState('all');
  const concours = [{
    title: "Concours d'entrée à l'ENA 2024",
    type: "admission",
    date: "15 Mars 2024",
    lieu: "Abidjan",
    places: "50 places",
    deadline: "28 Février 2024",
    status: "ouvert",
    description: "Concours d'admission pour la 51ème promotion de l'École Nationale d'Administration"
  }, {
    title: "Concours de la Fonction Publique - Catégorie A",
    type: "fonction-publique",
    date: "22 Avril 2024",
    lieu: "Yamoussoukro",
    places: "200 places",
    deadline: "30 Mars 2024",
    status: "ouvert",
    description: "Recrutement d'attachés d'administration pour les ministères"
  }, {
    title: "Concours Inspecteur des Finances",
    type: "specialise",
    date: "10 Mai 2024",
    lieu: "Abidjan",
    places: "25 places",
    deadline: "15 Avril 2024",
    status: "bientot",
    description: "Concours pour le corps des Inspecteurs du Trésor et de la Comptabilité Publique"
  }, {
    title: "Concours Magistrature 2024",
    type: "specialise",
    date: "18 Juin 2024",
    lieu: "Abidjan",
    places: "30 places",
    deadline: "20 Mai 2024",
    status: "bientot",
    description: "Concours d'accès à l'École Nationale de la Magistrature"
  }];
  const filteredConcours = filter === 'all' ? concours : concours.filter(c => c.type === filter);
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ouvert':
        return 'bg-green-100 text-green-800';
      case 'bientot':
        return 'bg-yellow-100 text-yellow-800';
      case 'ferme':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getStatusText = (status: string) => {
    switch (status) {
      case 'ouvert':
        return 'Inscriptions ouvertes';
      case 'bientot':
        return 'Bientôt ouvert';
      case 'ferme':
        return 'Inscriptions fermées';
      default:
        return status;
    }
  };
  return <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section with Background Image */}
        <section className={`relative ${isMobile ? 'h-[30vh]' : isTablet ? 'h-[45vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
          <div className="absolute inset-0">
            <img src="/lovable-uploads/renforcement-capacites-bg.jpg" alt="Background actualités concours" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : isTablet ? 'px-[50px]' : 'px-8 lg:px-[100px]'}`}>
            <h1 className={`font-bold mb-[10px] md:mb-[10px] animate-fade-in ${isMobile ? 'text-2xl' : isTablet ? 'text-4xl' : 'text-6xl md:text-6xl lg:text-6xl'}`}>Actualités des concours</h1>
            <p className={`italic mb-6 md:mb-8 animate-fade-in text-white font-normal ${isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-lg md:text-lg'}`}>
              Restez informés des derniers concours et opportunités dans la fonction publique
            </p>
          </div>
        </section>

        <div className={`container mx-auto py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          {/* Filters */}
          

          {/* Concours Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredConcours.map((concour, index) => <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-primary text-xl">{concour.title}</CardTitle>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(concour.status)}`}>
                      {getStatusText(concour.status)}
                    </span>
                  </div>
                  <p className="text-gray-600">{concour.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      <span>Date du concours: {concour.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      <span>Date limite: {concour.deadline}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      <span>{concour.lieu}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      <span>{concour.places} disponibles</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                      Plus d'infos
                    </button>
                    <button className="px-4 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>
    </Layout>;
};
export default ActualitesConcours;