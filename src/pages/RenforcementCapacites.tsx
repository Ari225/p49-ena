
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, TrendingUp, Lightbulb, Users2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const RenforcementCapacites = () => {
  const isMobile = useIsMobile();

  const programs = [
    {
      title: "Développement des Compétences Techniques",
      description: "Renforcez vos expertises dans votre domaine d'activité",
      icon: Target,
      features: ["Analyse approfondie", "Outils spécialisés", "Certification", "Suivi personnalisé"]
    },
    {
      title: "Amélioration des Performances",
      description: "Optimisez votre efficacité et votre productivité",
      icon: TrendingUp,
      features: ["Évaluation 360°", "Plan d'action", "Indicateurs de performance", "Coaching individuel"]
    },
    {
      title: "Innovation et Créativité",
      description: "Développez votre capacité d'innovation et de résolution de problèmes",
      icon: Lightbulb,
      features: ["Méthodes créatives", "Design thinking", "Gestion de l'innovation", "Projets pilotes"]
    },
    {
      title: "Travail en Équipe",
      description: "Renforcez la collaboration et la cohésion d'équipe",
      icon: Users2,
      features: ["Team building", "Communication interpersonnelle", "Gestion des conflits", "Leadership collaboratif"]
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
              alt="Background renforcement capacités" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold mb-4 md:mb-6 animate-fade-in`}>
              Renforcement des Capacités
            </h1>
            <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
              Programmes personnalisés pour développer vos compétences et améliorer vos performances
            </p>
          </div>
        </section>

        <div className={`container mx-auto py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <program.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-primary text-xl">{program.title}</CardTitle>
                  </div>
                  <p className="text-gray-600">{program.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                    En savoir plus
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RenforcementCapacites;
