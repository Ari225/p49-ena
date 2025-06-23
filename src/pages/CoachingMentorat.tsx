
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCheck, MessageCircle, Target, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const CoachingMentorat = () => {
  const isMobile = useIsMobile();

  const services = [
    {
      title: "Coaching Individuel",
      description: "Accompagnement personnalisé pour atteindre vos objectifs professionnels",
      icon: UserCheck,
      duration: "3-6 mois",
      format: "Sessions 1h/semaine"
    },
    {
      title: "Mentorat Carrière",
      description: "Bénéficiez de l'expérience d'un mentor expérimenté",
      icon: MessageCircle,
      duration: "6-12 mois",
      format: "Rencontres mensuelles"
    },
    {
      title: "Coaching d'Équipe",
      description: "Développez la performance collective de votre équipe",
      icon: Target,
      duration: "3-9 mois",
      format: "Ateliers bimensuels"
    },
    {
      title: "Programme Structuré",
      description: "Parcours de développement avec objectifs définis",
      icon: Calendar,
      duration: "12 mois",
      format: "Planning personnalisé"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section with Background Image */}
        <section className={`relative ${isMobile ? 'h-[30vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/renforcement-capacites-bg.jpg" 
              alt="Background coaching mentorat" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold mb-4 md:mb-6 animate-fade-in`}>
              Coaching & Mentorat
            </h1>
            <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
              Accompagnement personnalisé pour développer votre potentiel et accélérer votre carrière
            </p>
          </div>
        </section>

        <div className={`container mx-auto py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-primary text-xl">{service.title}</CardTitle>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Durée:</span>
                      <span className="font-medium">{service.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Format:</span>
                      <span className="font-medium">{service.format}</span>
                    </div>
                  </div>
                  <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                    Demander un accompagnement
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-primary mb-8">
              Pourquoi choisir notre accompagnement ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-primary mb-3">Expertise Reconnue</h3>
                <p className="text-gray-600">Nos coachs et mentors sont des professionnels expérimentés du secteur public</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-primary mb-3">Approche Personnalisée</h3>
                <p className="text-gray-600">Chaque programme est adapté à vos besoins et objectifs spécifiques</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-primary mb-3">Résultats Mesurables</h3>
                <p className="text-gray-600">Suivi régulier et évaluation des progrès pour garantir l'efficacité</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoachingMentorat;
