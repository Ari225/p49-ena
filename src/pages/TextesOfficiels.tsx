
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/context/LanguageContext';

const TextesOfficiels = () => {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  
  const documents = [
    {
      id: 1,
      title: "Acte de Constitution de la P49",
      description: "Document officiel de création du réseau des énarques de la 49e promotion",
      date: "2015",
      imageUrl: "/lovable-uploads/de98936e-ecc5-4568-8c53-32bd57058a99.png",
      pdfUrl: "#"
    },
    {
      id: 2,
      title: "Statuts de l'Association",
      description: "Statuts officiels régissant le fonctionnement de l'association P49",
      date: "2015",
      imageUrl: "/lovable-uploads/ec8d10e9-3108-4b8f-9db7-6734f1399fcc.png",
      pdfUrl: "#"
    },
    {
      id: 3,
      title: "Règlement Intérieur",
      description: "Règlement intérieur définissant les modalités de fonctionnement",
      date: "2016",
      imageUrl: "/lovable-uploads/e85e9bf0-20c7-4672-aac9-e32d078db6e6.png",
      pdfUrl: "#"
    },
    {
      id: 4,
      title: "Procès-verbal d'Assemblée Générale Constitutive",
      description: "PV de l'AG constitutive de l'association",
      date: "2015",
      imageUrl: "/lovable-uploads/d0535478-3ab2-4846-a655-f5cd50daa143.png",
      pdfUrl: "#"
    }
  ];

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Hero Section with Background Image */}
        <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0">
            <img src="/lovable-uploads/4a30ba3d-842d-4c38-a7d8-1c559a4da49f.png" alt="Background textes officiels" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-4' : 'px-8 lg:px-[100px]'}`}>
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold mb-4 md:mb-6 animate-fade-in`}>
              {t('official_documents_title') || 'Textes Officiels'}
            </h1>
            <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
              {t('official_documents_subtitle') || 'Documents de création et de fonctionnement de la P49'}
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className={`py-12 ${isMobile ? 'px-4' : 'px-8 md:px-[100px]'} bg-accent/10`}>
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-primary mb-4`}>
                {t('founding_documents') || 'Documents Fondateurs'}
              </h2>
              <p className={`text-gray-700 mb-6 ${isMobile ? 'text-sm' : 'text-base'}`}>
                {t('founding_documents_description') || 'Découvrez les documents officiels qui ont marqué la création et l\'organisation du Réseau des Énarques de la 49e Promotion. Ces textes fondamentaux définissent notre mission, nos valeurs et notre mode de fonctionnement.'}
              </p>
            </div>
          </div>
        </section>

        {/* Documents Grid */}
        <section className={`py-16 ${isMobile ? 'px-4' : 'px-8 md:px-[100px]'}`}>
          <div className="container mx-auto">
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-8`}>
              {documents.map((document) => (
                <Card key={document.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-4 border-l-primary bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} text-primary mb-2 group-hover:text-primary/80 transition-colors`}>
                          {document.title}
                        </CardTitle>
                        <div className="flex items-center text-sm text-primary/70 mb-2">
                          <Calendar className="h-4 w-4 mr-2" />
                          {document.date}
                        </div>
                        <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          {document.description}
                        </p>
                      </div>
                      <div className="bg-primary/10 text-primary p-3 rounded-full ml-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <FileText className="h-5 w-5" />
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {/* Document Preview */}
                      <div className="relative group/image cursor-pointer overflow-hidden rounded-lg">
                        <img 
                          src={document.imageUrl} 
                          alt={document.title}
                          className={`w-full ${isMobile ? 'h-48' : 'h-64'} object-cover border shadow-sm group-hover/image:scale-110 transition-transform duration-300`}
                        />
                        <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover/image:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                          <div className="opacity-0 group-hover/image:opacity-100 transition-opacity">
                            <FileText className="h-12 w-12 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Download Button */}
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                        <Download className="h-4 w-4 mr-2" />
                        {t('download_document') || 'Télécharger le document'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className={`py-12 ${isMobile ? 'px-4' : 'px-8 md:px-[100px]'} bg-primary/5`}>
          <div className="container mx-auto">
            <div className="text-center">
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-primary mb-4`}>
                {t('need_help') || 'Besoin d\'aide ?'}
              </h3>
              <p className={`text-gray-600 mb-6 max-w-2xl mx-auto ${isMobile ? 'text-sm' : 'text-base'}`}>
                {t('documents_help_text') || 'Pour toute question concernant ces documents ou pour obtenir des copies certifiées, n\'hésitez pas à nous contacter.'}
              </p>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                {t('contact_us') || 'Nous contacter'}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default TextesOfficiels;
