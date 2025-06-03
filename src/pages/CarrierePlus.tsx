
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, Award, TrendingUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const CarrierePlus = () => {
  const isMobile = useIsMobile();

  const opportunities = [
    {
      title: "Formations continues",
      description: "Développez vos compétences avec nos programmes de formation adaptés aux défis actuels de l'administration publique.",
      icon: GraduationCap,
      items: ["Leadership et management", "Digitalisation administrative", "Gestion de projet", "Communication publique"]
    },
    {
      title: "Réseautage professionnel",
      description: "Élargissez votre réseau professionnel au sein de la communauté P49 et au-delà.",
      icon: Users,
      items: ["Événements de networking", "Rencontres sectorielles", "Mentorat", "Échanges d'expériences"]
    },
    {
      title: "Reconnaissance et excellence",
      description: "Participez à nos programmes de reconnaissance de l'excellence dans le service public.",
      icon: Award,
      items: ["Prix d'excellence", "Témoignages de réussite", "Publications", "Conférences"]
    },
    {
      title: "Évolution de carrière",
      description: "Bénéficiez de conseils et d'accompagnement pour votre progression professionnelle.",
      icon: TrendingUp,
      items: ["Coaching de carrière", "Préparation aux concours", "Mobilité professionnelle", "Développement personnel"]
    }
  ];

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <section className={`bg-primary text-white py-20 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Carrière Plus</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Développez votre carrière et excellez dans le service public avec nos programmes dédiés
            </p>
          </div>
        </section>

        {/* Opportunities Section */}
        <section className={`py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">
              Opportunités de développement
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {opportunities.map((opportunity, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <opportunity.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-primary text-xl">{opportunity.title}</CardTitle>
                    </div>
                    <p className="text-gray-600">{opportunity.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {opportunity.items.map((item, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`bg-accent/30 py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Prêt à faire progresser votre carrière ?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Rejoignez notre communauté et bénéficiez de toutes les opportunités de développement professionnel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Nous contacter
              </button>
              <button className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                En savoir plus
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CarrierePlus;
