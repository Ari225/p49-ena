import React, { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { useLanguage } from '@/context/LanguageContext';
const TextesOfficiels = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const {
    t
  } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const documents = [{
    id: 1,
    title: "Acte de Constitution de la P49",
    description: "Document officiel de création du réseau des énarques de la 49e promotion",
    date: "2015",
    imageUrl: "/lovable-uploads/de98936e-ecc5-4568-8c53-32bd57058a99.png",
    pdfUrl: "#"
  }, {
    id: 2,
    title: "Statuts de l'Association",
    description: "Statuts officiels régissant le fonctionnement de l'association P49",
    date: "2015",
    imageUrl: "/lovable-uploads/ec8d10e9-3108-4b8f-9db7-6734f1399fcc.png",
    pdfUrl: "#"
  }, {
    id: 3,
    title: "Règlement Intérieur",
    description: "Règlement intérieur définissant les modalités de fonctionnement",
    date: "2016",
    imageUrl: "/lovable-uploads/e85e9bf0-20c7-4672-aac9-e32d078db6e6.png",
    pdfUrl: "#"
  }, {
    id: 4,
    title: "Procès-verbal d'Assemblée Générale Constitutive",
    description: "PV de l'AG constitutive de l'association",
    date: "2015",
    imageUrl: "/lovable-uploads/d0535478-3ab2-4846-a655-f5cd50daa143.png",
    pdfUrl: "#"
  }];
  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || doc.description.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  // Mobile Version
  if (isMobile) {
    return <Layout>
        <div className="bg-white min-h-screen">
          {/* Mobile Hero Section */}
          <section className="relative h-[30vh] flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0">
              <img src="/lovable-uploads/text_off_bg.webp" alt="Background textes officiels" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-primary/80"></div>
            </div>
            
            <div className="relative z-10 text-center px-[25px]">
              <h1 className="text-2xl font-bold mb-2 animate-fade-in">
                {t('official_documents_title') || 'Textes officiels'}
              </h1>
              <p className="text-sm italic mb-4 animate-fade-in text-white font-normal max-w-3xl mx-auto">
                {t('official_documents_subtitle') || 'Documents relatifs à la P49 et à l\'Administration ivoirienne'}
              </p>
            </div>
          </section>

          {/* Mobile Introduction with Search */}
          <section className="py-[25px] px-[25px] bg-accent/10">
            <div className="container mx-auto text-center px-0">
              <div className="max-w-3xl mx-auto">
                
                
                
                {/* Mobile Search Bar */}
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 text-xs" />
                  <Input placeholder="Rechercher par titre..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-full text-xs" />
                </div>
              </div>
            </div>
          </section>

          {/* Mobile Documents Grid */}
          <section className="py-16 px-[25px]">
            <div className="container max-w-md mx-0 px-0">
              <div className="grid grid-cols-1 gap-8">
                {filteredDocuments.map(document => <Card key={document.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-4 border-l-primary bg-white">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base text-primary mb-2 group-hover:text-primary/80 transition-colors">
                            {document.title}
                          </CardTitle>
                          <div className="flex items-center text-xs text-primary/70 mb-2">
                            <Calendar className="h-4 w-4 mr-2" />
                            {document.date}
                          </div>
                          <p className="text-gray-600 text-xs w-full">
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
                        <div className="relative group/image cursor-pointer overflow-hidden rounded-lg">
                          <img src={document.imageUrl} alt={document.title} className="w-full h-48 object-cover border shadow-sm group-hover/image:scale-110 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover/image:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                            <div className="opacity-0 group-hover/image:opacity-100 transition-opacity">
                              <FileText className="h-12 w-12 text-white" />
                            </div>
                          </div>
                        </div>
                        
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white text-xs">
                          <Download className="h-4 w-4 mr-2" />
                          {t('download_document') || 'Télécharger'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>)}
                {filteredDocuments.length === 0 && <div className="text-center py-8">
                    <p className="text-gray-500">Aucun document trouvé pour "{searchTerm}"</p>
                  </div>}
              </div>
            </div>
          </section>

          {/* Mobile Additional Info */}
          <section className="py-12 px-[25px] bg-accent/30">
            <div className="container mx-auto">
              <div className="text-center">
                <h3 className="text-lg font-bold text-primary mb-4">
                  {t('need_help') || 'Besoin d\'aide ?'}
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-sm">
                  {t('documents_help_text') || 'Pour toute question concernant ces documents ou pour obtenir des copies certifiées, n\'hésitez pas à nous contacter.'}
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  {t('contact_us') || 'Nous contacter'}
                </Button>
              </div>
            </div>
          </section>
        </div>
      </Layout>;
  }

  // Tablet Version
  if (isTablet) {
    return <Layout>
        <div className="bg-white min-h-screen">
          {/* Tablet Hero Section */}
          <section className="relative h-[45vh] flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0">
              <img src="/lovable-uploads/text_off_bg.webp" alt="Background textes officiels" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-primary/80"></div>
            </div>
            
            <div className="relative z-10 text-center px-[50px]">
              <h1 className="text-4xl md:text-4xl font-bold mb-3 animate-fade-in">
                {t('official_documents_title') || 'Textes officiels'}
              </h1>
              <p className="text-base md:text-lg italic mb-5 animate-fade-in text-white font-normal max-w-3xl mx-auto">
                {t('official_documents_subtitle') || 'Documents relatifs à la P49 et à l\'Administration ivoirienne'}
              </p>
            </div>
          </section>

          {/* Tablet Introduction with Search */}
          <section className="py-14 px-[50px] bg-accent/10">
            <div className="container mx-auto text-center px-0">
              <div className="max-w-4xl mx-auto">
                
                
                
                {/* Tablet Search Bar */}
                <div className="relative max-w-lg mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 text-sm" />
                  <Input placeholder="Rechercher par titre..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-12 w-full h-12 text-sm" />
                </div>
              </div>
            </div>
          </section>

          {/* Tablet Documents Grid */}
          <section className="py-16 px-[50px]">
            <div className="container mx-auto">
              <div className="grid grid-cols-2 gap-6">
                {filteredDocuments.map(document => <Card key={document.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-4 border-l-primary bg-white">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-primary mb-2 group-hover:text-primary/80 transition-colors">
                            {document.title}
                          </CardTitle>
                          <div className="flex items-center text-sm text-primary/70 mb-2">
                            <Calendar className="h-4 w-4 mr-2" />
                            {document.date}
                          </div>
                          <p className="text-gray-600 text-sm w-full">
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
                        <div className="relative group/image cursor-pointer overflow-hidden rounded-lg">
                          <img src={document.imageUrl} alt={document.title} className="w-full h-56 object-cover border shadow-sm group-hover/image:scale-110 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover/image:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                            <div className="opacity-0 group-hover/image:opacity-100 transition-opacity">
                              <FileText className="h-12 w-12 text-white" />
                            </div>
                          </div>
                        </div>
                        
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white text-sm">
                          <Download className="h-4 w-4 mr-2" />
                          {t('download_document') || 'Télécharger'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>)}
                {filteredDocuments.length === 0 && <div className="col-span-2 text-center py-8">
                    <p className="text-gray-500">Aucun document trouvé pour "{searchTerm}"</p>
                  </div>}
              </div>
            </div>
          </section>

          {/* Tablet Additional Info */}
          <section className="py-14 px-[50px] bg-accent/30">
            <div className="container mx-auto">
              <div className="text-center">
                <h3 className="text-xl font-bold text-primary mb-5">
                  {t('need_help') || 'Besoin d\'aide ?'}
                </h3>
                <p className="text-gray-600 mb-6 max-w-3xl mx-auto text-base">
                  {t('documents_help_text') || 'Pour toute question concernant ces documents ou pour obtenir des copies certifiées, n\'hésitez pas à nous contacter.'}
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  {t('contact_us') || 'Nous contacter'}
                </Button>
              </div>
            </div>
          </section>
        </div>
      </Layout>;
  }

  // Desktop Version
  return <Layout>
      <div className="bg-white min-h-screen">
        {/* Desktop Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0">
            <img src="/lovable-uploads/text_off_bg.webp" alt="Background textes officiels" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className="relative z-10 text-center px-8 lg:px-[100px]">
            <h1 className="text-6xl md:text-6xl lg:text-6xl font-bold mb-2 md:mb-4 animate-fade-in">
              {t('official_documents_title') || 'Textes officiels'}
            </h1>
            <p className="text-lg md:text-xl italic mb-4 md:mb-6 animate-fade-in text-white font-normal max-w-3xl mx-auto">
              {t('official_documents_subtitle') || 'Documents relatifs à la P49 et à l\'Administration ivoirienne'}
            </p>
          </div>
        </section>

        {/* Desktop Introduction with Search */}
        <section className="py-12 px-8 md:px-[100px] bg-accent/10">
          <div className="container mx-auto text-center px-0">
            <div className="max-w-3xl mx-auto">
              
              
              
              {/* Desktop Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 text-sm" />
                <Input placeholder="Rechercher par titre..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-12 w-full h-12 text-sm" />
              </div>
            </div>
          </div>
        </section>

        {/* Desktop Documents Grid */}        
        <section className="py-16 px-8 md:px-[100px]">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredDocuments.map(document => <Card key={document.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-4 border-l-primary bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-primary mb-2 group-hover:text-primary/80 transition-colors">
                          {document.title}
                        </CardTitle>
                        <div className="flex items-center text-sm text-primary/70 mb-2">
                          <Calendar className="h-4 w-4 mr-2" />
                          {document.date}
                        </div>
                        <p className="text-gray-600 text-sm w-full">
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
                      <div className="relative group/image cursor-pointer overflow-hidden rounded-lg">
                        <img src={document.imageUrl} alt={document.title} className="w-full h-64 object-cover border shadow-sm group-hover/image:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover/image:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                          <div className="opacity-0 group-hover/image:opacity-100 transition-opacity">
                            <FileText className="h-12 w-12 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white text-sm">
                        <Download className="h-4 w-4 mr-2" />
                        {t('download_document') || 'Télécharger'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>)}
              {filteredDocuments.length === 0 && <div className="col-span-2 text-center py-8">
                  <p className="text-gray-500">Aucun document trouvé pour "{searchTerm}"</p>
                </div>}
            </div>
          </div>
        </section>

        {/* Desktop Additional Info */}
        <section className="py-12 px-8 md:px-[100px] bg-accent/30">
          <div className="container mx-auto">
            <div className="text-center">
              <h3 className="text-xl font-bold text-primary mb-4">
                {t('need_help') || 'Besoin d\'aide ?'}
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-base">
                {t('documents_help_text') || 'Pour toute question concernant ces documents ou pour obtenir des copies certifiées, n\'hésitez pas à nous contacter.'}
              </p>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                {t('contact_us') || 'Nous contacter'}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>;
};
export default TextesOfficiels;