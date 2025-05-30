import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Eye, FileText } from 'lucide-react';

const DerniereEdition = () => {
  const currentJournal = {
    title: "Perspectives 49 - Bulletin n°1",
    summary: "Ce premier numéro de Perspectives 49 inaugure un journal d'information engagé, ancré dans les réalités locales et soucieux de valoriser les initiatives citoyennes. Le bulletin s'organise autour de quatre rubriques principales : Actualités citoyennes, Dossier spécial sur l'entrepreneuriat des jeunes, Vie associative et Culture & expressions.",
    coverImage: "/lovable-uploads/ec8d10e9-3108-4b8f-9db7-6734f1399fcc.png",
    pdfUrl: "#", // Will be updated when admin uploads PDF
    publishDate: "Mars 2024"
  };

  const recentJournals = [
    {
      title: "Perspectives 49 - Numéro Spécial Assemblée Générale",
      date: "Février 2024",
      summary: "Compte-rendu complet de l'assemblée générale 2024 et perspectives d'avenir.",
      coverImage: "/lovable-uploads/ec8d10e9-3108-4b8f-9db7-6734f1399fcc.png"
    },
    {
      title: "Perspectives 49 - Bilan Annuel 2023",
      date: "Décembre 2023",
      summary: "Retour sur les réalisations de l'année 2023 et projets pour 2024.",
      coverImage: "/lovable-uploads/ec8d10e9-3108-4b8f-9db7-6734f1399fcc.png"
    }
  ];

  const archivedJournals = [
    {
      title: "Perspectives 49 - Numéro Inaugural",
      date: "Janvier 2023",
      summary: "Premier numéro du journal du réseau P49.",
      coverImage: "/lovable-uploads/ec8d10e9-3108-4b8f-9db7-6734f1399fcc.png"
    },
    {
      title: "Perspectives 49 - Édition Spéciale Formation",
      date: "Juin 2023",
      summary: "Focus sur les programmes de formation continue.",
      coverImage: "/lovable-uploads/ec8d10e9-3108-4b8f-9db7-6734f1399fcc.png"
    }
  ];

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <section className="bg-primary text-white py-12 lg:py-16 px-4 lg:px-[100px]">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">Dernière Édition</h1>
            <p className="text-lg lg:text-xl opacity-90">
              Consultez la dernière édition de notre journal Perspectives 49
            </p>
          </div>
        </section>

        {/* Current Journal Section */}
        <section className="py-8 lg:py-12 px-4 lg:px-[100px]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* PDF Viewer/Cover */}
              <div className="space-y-4 lg:space-y-6">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                  <img 
                    src={currentJournal.coverImage} 
                    alt={currentJournal.title}
                    className="w-full h-auto object-contain"
                  />
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 justify-center">
                  <Button className="bg-primary hover:bg-primary/90 flex items-center justify-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>Lire en ligne</span>
                  </Button>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white flex items-center justify-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Télécharger PDF</span>
                  </Button>
                </div>
              </div>

              {/* Journal Info */}
              <div className="space-y-4 lg:space-y-6">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">{currentJournal.title}</h2>
                  <p className="text-gray-600 mb-2 text-sm lg:text-base">Publié en {currentJournal.publishDate}</p>
                </div>
                
                <div className="bg-accent/20 p-4 lg:p-6 rounded-lg">
                  <h3 className="text-lg lg:text-xl font-semibold text-primary mb-4">Résumé</h3>
                  <p className="text-gray-700 leading-relaxed text-sm lg:text-base">{currentJournal.summary}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Journals Section */}
        <section className="py-8 lg:py-12 px-4 lg:px-[100px] bg-accent/10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 lg:mb-8">Éditions Récentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {recentJournals.map((journal, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <img 
                        src={journal.coverImage} 
                        alt={journal.title}
                        className="w-16 lg:w-20 h-20 lg:h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <CardTitle className="text-base lg:text-lg text-primary">{journal.title}</CardTitle>
                        <p className="text-xs lg:text-sm text-gray-600">{journal.date}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4 text-sm lg:text-base">{journal.summary}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        Lire
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Télécharger
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Archives Section */}
        <section className="py-8 lg:py-12 px-4 lg:px-[100px]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 lg:mb-8">Archives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {archivedJournals.map((journal, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3 mb-3">
                      <img 
                        src={journal.coverImage} 
                        alt={journal.title}
                        className="w-10 lg:w-12 h-12 lg:h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-primary text-xs lg:text-sm">{journal.title}</h3>
                        <p className="text-xs text-gray-600">{journal.date}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs lg:text-sm mb-3">{journal.summary}</p>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" className="text-xs">
                        <FileText className="h-3 w-3 mr-1" />
                        Consulter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default DerniereEdition;
