
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Clock, Users, Award } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const Formations = () => {
  const isMobile = useIsMobile();
  const isTab = useIsTablet();

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
        {/* Header Section - Mobile */}
        {isMobile && (
          <section className="relative h-[30vh] flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="/lovable-uploads/actualites_bg.webp" 
                alt="Background formations" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-primary/80"></div>
            </div>
            
            <div className="relative z-10 text-center px-[25px]">
              <h1 className="text-2xl font-bold mb-2 animate-fade-in">
                Formations
              </h1>
              <p className="text-sm italic mb-4 animate-fade-in text-white font-normal max-w-3xl mx-auto">
                Développez vos compétences professionnelles avec nos programmes de formation adaptés
              </p>
            </div>
          </section>
        )}

        {/* Header Section - Tablet */}
        {isTab && (
          <section className="relative h-[45vh] flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="/lovable-uploads/436fe1b1-52ae-4d7a-a153-a06e2b8567ce.png" 
                alt="Background formations" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-primary/80"></div>
            </div>
            
            <div className="relative z-10 text-center px-[50px]">
              <h1 className="text-3xl font-bold mb-3 animate-fade-in">
                Formations
              </h1>
              <p className="text-base italic mb-5 animate-fade-in text-white font-normal max-w-3xl mx-auto">
                Développez vos compétences professionnelles avec nos programmes de formation adaptés
              </p>
            </div>
          </section>
        )}

        {/* Header Section - Desktop */}
        {!isMobile && !isTab && (
          <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="/lovable-uploads/436fe1b1-52ae-4d7a-a153-a06e2b8567ce.png" 
                alt="Background formations" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-primary/80"></div>
            </div>
            
            <div className="relative z-10 text-center px-8 lg:px-[100px]">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-4 animate-fade-in">
                Formations
              </h1>
              <p className="text-lg md:text-xl italic mb-4 md:mb-6 animate-fade-in text-white font-normal max-w-3xl mx-auto">
                Développez vos compétences professionnelles avec nos programmes de formation adaptés
              </p>
            </div>
          </section>
        )}

        {/* Content Section - Mobile */}
        {isMobile && (
          <div className="container mx-auto py-12 px-[25px]">
            <div className="grid grid-cols-1 gap-6">
              {formations.map((formation, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <formation.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-primary text-lg">{formation.title}</CardTitle>
                        <span className="text-sm text-gray-500">{formation.level}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{formation.description}</p>
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
        )}

        {/* Content Section - Tablet */}
        {isTab && (
          <div className="container mx-auto py-16 px-[50px]">
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
        )}

        {/* Content Section - Desktop */}
        {!isMobile && !isTab && (
          <div className="container mx-auto py-16 px-[100px]">
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
        )}
      </div>
    </Layout>
  );
};

export default Formations;
