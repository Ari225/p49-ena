
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
        {/* Header Section */}
       <section className={`bg-primary text-white py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">
              {t('official_documents_title') || 'Textes Officiels'}
            </h1>
            <p className="text-xl opacity-90">
              {t('official_documents_subtitle') || 'Documents de création et de fonctionnement de la P49'}
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className={`py-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'} bg-accent/10`}>
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-primary mb-4">
                {t('founding_documents') || 'Documents Fondateurs'}
              </h2>
              <p className="text-gray-700 mb-6">
                {t('founding_documents_description') || 'Découvrez les documents officiels qui ont marqué la création et l\'organisation du Réseau des Énarques de la 49e Promotion. Ces textes fondamentaux définissent notre mission, nos valeurs et notre mode de fonctionnement.'}
              </p>
            </div>
          </div>
        </section>

        {/* Documents Grid */}
        <section className={`py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {documents.map((document) => (
                <Card key={document.id} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-primary">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-primary mb-2">{document.title}</CardTitle>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Calendar className="h-4 w-4 mr-2" />
                          {document.date}
                        </div>
                        <p className="text-gray-600 text-sm">{document.description}</p>
                      </div>
                      <div className="bg-primary/10 text-primary p-2 rounded-full ml-4">
                        <FileText className="h-5 w-5" />
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {/* Document Preview */}
                      <div className="relative group cursor-pointer">
                        <img 
                          src={document.imageUrl} 
                          alt={document.title}
                          className="w-full h-64 object-cover rounded-lg border shadow-sm group-hover:shadow-md transition-shadow"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <FileText className="h-12 w-12 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Download Button */}
                      <Button className="w-full" variant="outline">
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
        <section className={`py-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'} bg-accent/10`}>
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-primary mb-4">
                {t('need_help') || 'Besoin d\'aide ?'}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('documents_help_text') || 'Pour toute question concernant ces documents ou pour obtenir des copies certifiées, n\'hésitez pas à nous contacter.'}
              </p>
              <Button variant="outline">
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
