
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Clock, Users, Award } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Formations = () => {
  const isMobile = useIsMobile();

  const formations = [
    {
      title: "Leadership et Management",
      duration: "3 jours",
      participants: "25 max",
      description: "Développez vos compétences en leadership pour mieux diriger vos équipes.",
      icon: Users,
      level: "Intermédiaire"
    },
    {
      title: "Gestion de Projet",
      duration: "5 jours",
      participants: "20 max",
      description: "Maîtrisez les outils et méthodes de gestion de projet modernes.",
      icon: Award,
      level: "Débutant"
    },
    {
      title: "Communication Publique",
      duration: "2 jours",
      participants: "30 max",
      description: "Améliorez vos techniques de communication dans le secteur public.",
      icon: GraduationCap,
      level: "Tous niveaux"
    },
    {
      title: "Digitalisation Administrative",
      duration: "4 jours",
      participants: "15 max",
      description: "Adoptez les outils numériques pour moderniser l'administration.",
      icon: Clock,
      level: "Avancé"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className={`bg-primary text-white py-20 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Formations
            </h1>
            <p className="text-xl text-center text-gray-200 max-w-3xl mx-auto">
              Développez vos compétences professionnelles avec nos programmes de formation adaptés
            </p>
          </div>
        </div>

        <div className={`container mx-auto py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {formations.map((formation, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <formation.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-primary text-xl">{formation.title}</CardTitle>
                      <span className="text-sm text-gray-500">{formation.level}</span>
                    </div>
                  </div>
                  <p className="text-gray-600">{formation.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {formation.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {formation.participants}
                    </div>
                  </div>
                  <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                    S'inscrire
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

export default Formations;
