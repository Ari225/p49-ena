
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';

const Historique = () => {
  const timeline = [
    {
      year: 'À ce jour',
      title: 'Suite de la procédure',
      description: "La procédure pour l'obtention de l'arrêté est en cours."
    },
    {
      year: '20 mars 2024',
      title: 'Récépissé de dépôt de dossier d\'association',
      description: 'N°0412/PA/SG/D1, il a été délivré par la Préfecture d\'Abidjan, après une déclaration faite.'
    },
    {
      year: '25 novembre 2023',
      title: 'Adoption des statuts et règlements intérieurs',
      description: "À l'occasion d'une assemblée générale qui s'est tenue lors des Régionales de Yamoussoukro, en vue d'officialiser l'existence de l'association."
    },
    {
      year: '24 juin 2023',
      title: 'Assemblée générale élective',
      description: "À l'ENA, après des réunions tenues par les membres fondateurs en 2017 et en 2019, ainsi que plusieurs cadres d'échanges."
    }
  ];

  return (
    <Layout>
      <div className="bg-accent/30">
        {/* Hero Section with Background Image */}
        <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/01e1d6d1-f868-4738-9ee3-2feed399f243.png" 
              alt="Background historique" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 md:px-8 lg:px-[100px]">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fade-in">
              Historique du Réseau
            </h1>
            <p className="text-lg md:text-xl italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto">
              Historique, création et situation administrative de l'association
            </p>
          </div>
        </section>

        {/* Section La P49 */}
        <section className="py-[100px] px-4 md:px-[100px]">
          <div className="container mx-auto">
            <h2 className="font-bold text-primary mb-12 text-4xl text-center">La P49 : une promotion d'excellence</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                  L'association P49 ENA a été créée dans le but de préserver et renforcer les liens entre les anciens élèves de la 49e promotion de l'École Nationale d'Administration. Cette initiative est le fruit de plusieurs rencontres entre membres fondateurs et de cadres d'échanges ayant conduit à une assemblée générale élective. Pour officialiser l'existence de l'association, les statuts et le règlement intérieur ont été adoptés lors d'une assemblée générale. Une déclaration a ensuite été faite à la Préfecture d'Abidjan, suivie de la délivrance d'un récépissé de dépôt de dossier. Cette déclaration a été publiée au Journal Officiel de la République de Côte d'Ivoire. La procédure pour l'obtention de l'arrêté est actuellement en cours.
                </p>
              </div>
              <div>
                <img 
                  alt="Logo P49" 
                  src="/lovable-uploads/8cbb0164-0529-47c1-9caa-8244c17623b3.jpg" 
                  className="w-full max-w-md mx-auto rounded-lg" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-[100px] px-4 md:px-[100px] bg-gradient-to-b from-accent/30 to-white">
          <div className="container mx-auto px-0">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center text-primary mb-16">Chronologie</h2>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary"></div>
                
                {timeline.map((event, index) => (
                  <div key={index} className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full border-4 border-white shadow-xl z-10 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    
                    {/* Content Card */}
                    <Card className={`w-5/12 ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'} shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border-l-4 border-l-primary`}>
                      <CardContent className="p-8">
                        <div className="flex items-center mb-4">
                          <div className="bg-primary text-white font-bold text-lg px-4 py-2 rounded-lg shadow-md">
                            {event.year}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-primary">
                          {event.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-justify">
                          {event.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Objets de la P49 Section */}
        <section className="py-[100px] px-4 md:px-[100px] bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary mb-6">Objet de l'association P49 ENA</h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto">
                De manière globale, la P49ENA a pour objectif de fédérer les forces et les énergies de chacun de ses membres dans un réseau fort.
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="mb-12">
                <p className="text-lg text-gray-700 mb-8">
                  De manière particulière, elle a pour <strong>objets :</strong>
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Objectifs généraux */}
                  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="space-y-4 text-gray-700">
                        <div className="flex items-start">
                          <span className="text-secondary mr-3 text-xl">•</span>
                          <span><strong>développer</strong> entre ses membres des relations amicales, d'entraide, de solidarité et de convivialité ;</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-secondary mr-3 text-xl">•</span>
                          <span><strong>d'établir</strong> une cartographie professionnelle actualisée de ses membres ;</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-secondary mr-3 text-xl">•</span>
                          <span><strong>d'œuvrer</strong> au renforcement des capacités de ses membres ;</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-secondary mr-3 text-xl">•</span>
                          <span><strong>d'œuvrer</strong> à la promotion de ses membres à tous les niveaux de l'Administration ;</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-secondary mr-3 text-xl">•</span>
                          <span><strong>de créer</strong> des cadres de partage d'expériences professionnelles ;</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-secondary mr-3 text-xl">•</span>
                          <span><strong>de positionner</strong> le réseau comme un partenaire technique et social de l'ENA et de l'Administration ivoirienne.</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Actions spécifiques */}
                  <div className="space-y-8">
                    {/* Actions sociales */}
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="bg-secondary text-primary font-bold text-lg px-4 py-2 rounded-lg mb-4">
                          Au titre des actions sociales
                        </div>
                        <div className="space-y-3 text-gray-700">
                          <div className="flex items-start">
                            <span className="text-primary mr-2">☐</span>
                            <span><strong>Renouer et renforcer</strong> le contact avec les condisciples de la P49;</span>
                          </div>
                          <div className="flex items-start">
                            <span className="text-primary mr-2">☐</span>
                            <span><strong>Organiser</strong> des activités récréatives;</span>
                          </div>
                          <div className="flex items-start">
                            <span className="text-primary mr-2">☐</span>
                            <span><strong>Apporter</strong> un soutien moral et financier éventuellement en cas d'événements heureux ou malheureux.</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Activités professionnelles */}
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="bg-secondary text-primary font-bold text-lg px-4 py-2 rounded-lg mb-4">
                          Au titre des activités relatives au domaine professionnel
                        </div>
                        <div className="space-y-3 text-gray-700">
                          <div className="flex items-start">
                            <span className="text-primary mr-2">☐</span>
                            <span><strong>Établir</strong> une cartographie professionnelle des condisciples de la P49 dans l'Administration;</span>
                          </div>
                          <div className="flex items-start">
                            <span className="text-primary mr-2">☐</span>
                            <span><strong>Élaborer</strong> un compendium des compétences des condisciples de la P49;</span>
                          </div>
                          <div className="flex items-start">
                            <span className="text-primary mr-2">☐</span>
                            <span><strong>Œuvrer</strong> au renforcement des capacités des condisciples de la P49;</span>
                          </div>
                          <div className="flex items-start">
                            <span className="text-primary mr-2">☐</span>
                            <span><strong>Créer</strong> un cadre de Partage des expériences professionnelles;</span>
                          </div>
                          <div className="flex items-start">
                            <span className="text-primary mr-2">☐</span>
                            <span><strong>Positionner</strong> la P49 comme un partenaire social de l'ENA et des services de l'Administration publique ivoirienne.</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Historique;
