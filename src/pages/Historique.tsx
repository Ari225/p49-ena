import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
const Historique = () => {
  const timeline = [{
    year: '2009',
    title: 'Création de la Promotion',
    description: 'Entrée de la 49ème promotion à l\'École Nationale d\'Administration de Côte d\'Ivoire.'
  }, {
    year: '2010',
    title: 'Fin de Formation',
    description: 'Sortie officielle de la promotion avec l\'obtention du diplôme d\'Énarque.'
  }, {
    year: '2012',
    title: 'Premier Rassemblement',
    description: 'Organisation de la première rencontre post-formation des membres de la P49.'
  }, {
    year: '2015',
    title: 'Création du Réseau',
    description: 'Formalisation du réseau P49 avec l\'adoption des statuts et règlements.'
  }, {
    year: '2018',
    title: 'Lancement du Journal',
    description: 'Publication du premier numéro de "Perspectives 49", le journal officiel du réseau.'
  }, {
    year: '2020',
    title: 'Plateforme Numérique',
    description: 'Lancement de la plateforme digitale pour renforcer les échanges entre membres.'
  }, {
    year: '2024',
    title: 'Nouveau Site Web',
    description: 'Mise en ligne du nouveau site web officiel du réseau P49 ENA.'
  }];
  return <Layout>
      <div className="bg-accent/30 py-[100px] px-[100px]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Historique du Réseau</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez l'histoire de notre réseau, depuis la formation de la 49ème promotion 
              jusqu'à nos réalisations actuelles.
            </p>
          </div>

          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12 px-[35px] py-[35px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-bold text-primary mb-6 text-2xl">La P49 : une promotion d'excellence</h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-justify">L’association P49 ENA a été créée dans le but de préserver et renforcer les liens entre les anciens élèves de la 49e promotion de l’École Nationale d’Administration. Cette initiative est le fruit de plusieurs rencontres entre membres fondateurs et de cadres d’échanges ayant conduit à une assemblée générale élective. Pour officialiser l’existence de l’association, les statuts et le règlement intérieur ont été adoptés lors d’une assemblée générale. Une déclaration a ensuite été faite à la Préfecture d’Abidjan, suivie de la délivrance d’un récépissé de dépôt de dossier. Cette déclaration a été publiée au Journal Officiel de la République de Côte d’Ivoire. La procédure pour l’obtention de l’arrêté est actuellement en cours.</p>
                
                
              </div>
              <div>
                <img alt="Logo P49" src="/lovable-uploads/8cbb0164-0529-47c1-9caa-8244c17623b3.jpg" className="w-full max-w-md mx-auto rounded-lg" />
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">Chronologie</h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-secondary"></div>
              
              {timeline.map((event, index) => <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  {/* Content Card */}
                  <Card className={`w-5/12 ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'} shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-3">
                        <div className="bg-secondary text-primary font-bold text-lg px-3 py-1 rounded-full">
                          {event.year}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-3">{event.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>)}
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-6">Notre Mission</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    Maintenir et renforcer les liens de fraternité entre les membres
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    Promouvoir l'excellence dans l'administration publique
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    Contribuer au développement socio-économique de la Côte d'Ivoire
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    Favoriser l'entraide et la solidarité entre les membres
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-6">Notre Vision</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Être un réseau de référence dans l'administration publique ivoirienne, 
                  reconnu pour l'excellence de ses membres et leur contribution au 
                  développement national.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Nous aspirons à être un modèle de cohésion, d'intégrité et de service 
                  public, inspirant les futures générations d'énarques.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>;
};
export default Historique;