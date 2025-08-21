import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye, X, ExternalLink, Download } from 'lucide-react';
import { toast } from 'sonner';
interface PDFViewerProps {
  pdfUrl: string;
  title: string;
  triggerButton?: React.ReactNode;
}
const PDFViewer = ({
  pdfUrl,
  title,
  triggerButton
}: PDFViewerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const defaultTrigger = (
    <Button className="bg-primary hover:bg-primary/90 flex items-center space-x-2">
      <Eye className="h-4 w-4" />
      <span>Lire</span>
    </Button>
  );

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    toast.success('Document ouvert dans un nouvel onglet');
    setIsOpen(false);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Téléchargement du document commencé');
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Créer une URL avec des paramètres pour forcer l'affichage en ligne
  const viewerUrl = `${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH`;
  return <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="w-[95%] max-w-4xl h-[80vh] flex flex-col rounded-lg mx-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold text-primary">
            {title}
          </DialogTitle>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleDownload}
              className="flex items-center space-x-1"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Télécharger</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleOpenInNewTab}
              className="flex items-center space-x-1"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Nouvel onglet</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="flex-1 w-full relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p>Chargement du document...</p>
              </div>
            </div>
          )}
          
          {hasError ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
              <div className="text-gray-600">
                <p className="text-lg mb-2">Impossible d'afficher le PDF dans cette fenêtre</p>
                <p className="text-sm text-gray-500 mb-4">
                  Votre navigateur bloque l'affichage des PDFs intégrés.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleOpenInNewTab} className="bg-primary hover:bg-primary/90">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ouvrir dans un nouvel onglet
                </Button>
                <Button variant="outline" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger le PDF
                </Button>
              </div>
            </div>
          ) : (
            <>
              <iframe
                src={viewerUrl}
                className="w-full h-full border-0 rounded"
                title={title}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                style={{ minHeight: '60vh' }}
              />
              {/* Fallback avec embed si iframe échoue */}
              <embed
                src={viewerUrl}
                type="application/pdf"
                className="w-full h-full border-0 rounded hidden"
                style={{ minHeight: '60vh' }}
              />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>;
};
export default PDFViewer;