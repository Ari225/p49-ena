import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye, X, ExternalLink } from 'lucide-react';
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
  const [iframeError, setIframeError] = useState(false);
  const defaultTrigger = <Button className="bg-primary hover:bg-primary/90 flex items-center space-x-2">
      <Eye className="h-4 w-4" />
      <span>Lire en ligne</span>
    </Button>;
  const handleOpenInNewTab = () => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    toast.success('Document ouvert dans un nouvel onglet');
    setIsOpen(false);
  };
  const handleIframeError = () => {
    setIframeError(true);
  };
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
            
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="flex-1 w-full">
          {iframeError ? <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
              <div className="text-gray-600">
                <p className="text-lg mb-2">Impossible d'afficher le PDF dans ce navigateur</p>
                <p className="text-sm text-gray-500">
                  Chrome bloque parfois l'affichage des PDFs pour des raisons de sécurité.
                </p>
              </div>
              <Button onClick={handleOpenInNewTab} className="bg-primary hover:bg-primary/90">
                <ExternalLink className="h-4 w-4 mr-2" />
                Ouvrir dans un nouvel onglet
              </Button>
            </div> : <iframe src={pdfUrl} className="w-full h-full border-0 rounded" title={title} onError={handleIframeError} />}
        </div>
      </DialogContent>
    </Dialog>;
};
export default PDFViewer;