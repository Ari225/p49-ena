import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import PDFViewer from '@/components/PDFViewer';
import PDFThumbnail from '@/components/ui/PDFThumbnail';
import SimplePDFThumbnail from '@/components/ui/SimplePDFThumbnail';

const TextesOfficiels = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      console.log('TextesOfficiels: Récupération des documents...');
      const { data, error } = await supabase
        .from('official_documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      console.log('TextesOfficiels: Documents récupérés:', data?.length || 0);
      console.log('TextesOfficiels: Premier document:', data?.[0]);
      setDocuments(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des documents:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleDownload = (documentUrl, title) => {
    const link = document.createElement('a');
    link.href = documentUrl;
    link.download = `${title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [documents, searchTerm]);

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
              <h1 className="text-2xl font-bold mb-[10px] md:mb-[10px] animate-fade-in">
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
          <section className="py-[25px] px-[25px]">
            <div className="container max-w-md mx-0 px-0">
              <div className="grid grid-cols-1 gap-8">
                {filteredDocuments.map(document => <Card key={document.id} className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-100">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">{document.year}</span>
                      </div>
                      <CardTitle className="text-base text-gray-900 leading-tight mb-2">
                        {document.title}
                      </CardTitle>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        {document.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <PDFViewer
                          pdfUrl={document.document_url}
                          title={document.title}
                          triggerButton={
                            <div className="relative group/image cursor-pointer overflow-hidden rounded-lg">
                              <SimplePDFThumbnail
                                pdfUrl={document.document_url}
                                alt={document.title}
                                className="w-full h-48 border shadow-sm group-hover/image:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover/image:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                                <div className="opacity-0 group-hover/image:opacity-100 transition-opacity">
                                  <FileText className="h-12 w-12 text-white" />
                                </div>
                              </div>
                            </div>
                          }
                        />
                        
                        <Button 
                          variant="ghost"
                          className="w-full text-gray-600 hover:text-primary hover:bg-gray-50 border border-gray-200 hover:border-primary/30 text-xs"
                          onClick={() => handleDownload(document.document_url, document.title)}
                        >
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
          <section className="py-12 px-[25px] bg-white">
            <div className="container mx-auto px-0">
              <div className="text-center">
                <h3 className="text-base font-bold text-primary mb-4">
                  {t('need_help') || 'Besoin d\'aide ?'}
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-xs">
                  {t('documents_help_text') || 'Pour toute question concernant ces documents ou pour obtenir des copies certifiées, n\'hésitez pas à nous contacter.'}
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white text-xs" asChild>
                  <Link to="/contact">
                    {t('contact_us') || 'Nous contacter'}
                  </Link>
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
              <h1 className="text-4xl md:text-4xl font-bold mb-[10px] md:mb-[10px] animate-fade-in">
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
          <section className="py-[50px] px-[50px]">
            <div className="container mx-auto px-0">
              <div className="grid grid-cols-2 gap-6">
                {filteredDocuments.map(document => <Card key={document.id} className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-100">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">{document.year}</span>
                      </div>
                      <CardTitle className="text-lg text-gray-900 leading-tight mb-2">
                        {document.title}
                      </CardTitle>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {document.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <PDFViewer
                          pdfUrl={document.document_url}
                          title={document.title}
                          triggerButton={
                            <div className="relative group/image cursor-pointer overflow-hidden rounded-lg">
                              <SimplePDFThumbnail
                                pdfUrl={document.document_url}
                                alt={document.title}
                                className="w-full h-56 border shadow-sm group-hover/image:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover/image:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                                <div className="opacity-0 group-hover/image:opacity-100 transition-opacity">
                                  <FileText className="h-12 w-12 text-white" />
                                </div>
                              </div>
                            </div>
                          }
                        />
                        
                        <Button 
                          variant="ghost"
                          className="w-full text-gray-600 hover:text-primary hover:bg-gray-50 border border-gray-200 hover:border-primary/30 text-sm"
                          onClick={() => handleDownload(document.document_url, document.title)}
                        >
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
          <section className="py-14 px-[50px] bg-white">
            <div className="container mx-auto">
              <div className="text-center">
                <h3 className="text-lg font-bold text-primary mb-5">
                  {t('need_help') || 'Besoin d\'aide ?'}
                </h3>
                <p className="text-gray-600 mb-6 max-w-3xl mx-auto text-sm">
                  {t('documents_help_text') || 'Pour toute question concernant ces documents ou pour obtenir des copies certifiées, n\'hésitez pas à nous contacter.'}
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white text-sm" asChild>
                  <Link to="/contact">
                    {t('contact_us') || 'Nous contacter'}
                  </Link>
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
            <h1 className="text-6xl md:text-6xl lg:text-6xl font-bold mb-[10px] md:mb-[10px] animate-fade-in">
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
        <section className="py-[100px] px-[100px] md:px-[100px]">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredDocuments.map(document => <Card key={document.id} className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-100">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <FileText className="h-6 w-6 text-primary" />
                      <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">{document.year}</span>
                    </div>
                    <CardTitle className="text-xl text-gray-900 leading-tight mb-3">
                      {document.title}
                    </CardTitle>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {document.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <PDFViewer
                        pdfUrl={document.document_url}
                        title={document.title}
                        triggerButton={
                          <div className="relative group/image cursor-pointer overflow-hidden rounded-lg">
                            <SimplePDFThumbnail
                              pdfUrl={document.document_url}
                              alt={document.title}
                              className="w-full h-64 border shadow-sm group-hover/image:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover/image:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                              <div className="opacity-0 group-hover/image:opacity-100 transition-opacity">
                                <FileText className="h-12 w-12 text-white" />
                              </div>
                            </div>
                          </div>
                        }
                      />
                      
                      <Button 
                        variant="ghost"
                        className="w-full text-gray-600 hover:text-primary hover:bg-gray-50 border border-gray-200 hover:border-primary/30 text-sm"
                        onClick={() => handleDownload(document.document_url, document.title)}
                      >
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
        <section className="py-12 px-8 md:px-[100px] bg-white">
          <div className="container mx-auto">
            <div className="text-center">
              <h3 className="text-xl font-bold text-primary mb-4">
                {t('need_help') || 'Besoin d\'aide ?'}
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-base">
                {t('documents_help_text') || 'Pour toute question concernant ces documents ou pour obtenir des copies certifiées, n\'hésitez pas à nous contacter.'}
              </p>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white text-sm" asChild>
                <Link to="/contact">
                  {t('contact_us') || 'Nous contacter'}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>;
};
export default TextesOfficiels;