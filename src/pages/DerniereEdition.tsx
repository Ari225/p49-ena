import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Eye, FileText } from 'lucide-react';
import PDFViewer from '@/components/PDFViewer';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCurrentEditionData } from '@/hooks/useCurrentEditionData';
const DerniereEdition = () => {
  const isMobile = useIsMobile();
  const {
    currentEdition,
    recentEditions,
    loading,
    error
  } = useCurrentEditionData();
  if (loading) {
    return <Layout>
        <div className="bg-white min-h-screen flex items-center justify-center">
          <p>Chargement des éditions...</p>
        </div>
      </Layout>;
  }
  if (error || !currentEdition) {
    return <Layout>
        <div className="bg-white min-h-screen flex items-center justify-center">
          <p>Aucune édition publiée disponible.</p>
        </div>
      </Layout>;
  }

  // Limiter les éditions récentes selon le device
  const displayedRecentEditions = isMobile ? recentEditions.slice(0, 1) : recentEditions.slice(0, 2);
  return <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <section className={`relative ${isMobile ? 'h-[30vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
          <div className="absolute inset-0">
            <img src="/lovable-uploads/archives.webp" alt="Background dernière édition" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
            <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold mb-2 md:mb-4 animate-fade-in`}>
              Dernière Édition
            </h1>
            <p className={`${isMobile ? 'text-sm' : 'text-lg md:text-xl'} italic mb-4 md:mb-6 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
              Consultez la dernière édition de notre journal Perspectives 49
            </p>
          </div>
        </section>

        {/* Current Journal Section */}
        <section className={`py-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* PDF Viewer/Cover */}
              <div className="space-y-6">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                  <img src={currentEdition.cover_image_url || "/lovable-uploads/ec8d10e9-3108-4b8f-9db7-6734f1399fcc.png"} alt={currentEdition.title} className="w-full h-auto object-contain" />
                </div>
                
                {/* Action Buttons - Mobile Only */}
                {isMobile && <div className="flex space-x-2">
                    <PDFViewer pdfUrl={currentEdition.pdf_url} title={currentEdition.title} triggerButton={<Button size="sm" className="bg-primary hover:bg-primary/90 flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          Lire
                        </Button>} />
                    <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white flex-1" onClick={() => {
                  const link = document.createElement('a');
                  link.href = currentEdition.pdf_url;
                  link.download = `${currentEdition.title}.pdf`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}>
                      <Download className="h-3 w-3 mr-1" />
                      PDF
                    </Button>
                  </div>}
              </div>

              {/* Journal Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-4">{currentEdition.title}</h2>
                  <p className="text-gray-600 mb-2">
                    Publié le {new Date(currentEdition.publish_date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  </p>
                  {currentEdition.page_count > 0 && <p className="text-gray-600">{currentEdition.page_count} pages</p>}
                </div>
                
                <div className="bg-accent/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-primary mb-4">Résumé</h3>
                  <p className="text-gray-700 leading-relaxed text-xs text-left">{currentEdition.summary}</p>
                </div>

                {/* Action Buttons - Desktop Only */}
                {!isMobile && <div className="flex space-x-2">
                    <PDFViewer pdfUrl={currentEdition.pdf_url} title={currentEdition.title} triggerButton={<Button size="sm" className="bg-primary hover:bg-primary/90 flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          Lire
                        </Button>} />
                    <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white flex-1" onClick={() => {
                  const link = document.createElement('a');
                  link.href = currentEdition.pdf_url;
                  link.download = `${currentEdition.title}.pdf`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}>
                      <Download className="h-3 w-3 mr-1" />
                      PDF
                    </Button>
                  </div>}
              </div>
            </div>
          </div>
        </section>

        {/* Recent Journals Section */}
        {displayedRecentEditions.length > 0 && <section className={`py-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'} bg-accent/10`}>
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-primary mb-8">Éditions Récentes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {displayedRecentEditions.map(journal => <Card key={journal.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <img src={journal.cover_image_url || "/lovable-uploads/ec8d10e9-3108-4b8f-9db7-6734f1399fcc.png"} alt={journal.title} className="w-20 h-24 object-cover rounded" />
                        <div className="flex-1">
                          <CardTitle className="text-lg text-primary">{journal.title}</CardTitle>
                          <p className="text-sm text-gray-600">
                            {new Date(journal.publish_date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long'
                      })}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{journal.summary}</p>
                      <div className="flex space-x-2">
                        <PDFViewer pdfUrl={journal.pdf_url} title={journal.title} triggerButton={<Button size="sm" className="bg-primary hover:bg-primary/90 flex-1">
                              <Eye className="h-3 w-3 mr-1" />
                              Lire
                            </Button>} />
                        <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white flex-1" onClick={() => {
                    const link = document.createElement('a');
                    link.href = journal.pdf_url;
                    link.download = `${journal.title}.pdf`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}>
                          <Download className="h-3 w-3 mr-1" />
                          PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </div>
          </section>}

        {/* Archives Section */}
        
      </div>
    </Layout>;
};
export default DerniereEdition;