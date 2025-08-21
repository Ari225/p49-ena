import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.2);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfDocRef = useRef<any>(null);

  const defaultTrigger = (
    <Button className="bg-primary hover:bg-primary/90 flex items-center space-x-2">
      <Eye className="h-4 w-4" />
      <span>Lire</span>
    </Button>
  );

  useEffect(() => {
    if (isOpen && !pdfDocRef.current) {
      loadPDF();
    }
  }, [isOpen, pdfUrl]);

  const loadPDF = async () => {
    try {
      setIsLoading(true);
      setHasError(false);
      
      // Load PDF.js dynamically via script tag
      if (!(window as any).pdfjsLib) {
        await loadPDFJSLibrary();
      }
      
      const pdf = await (window as any).pdfjsLib.getDocument(pdfUrl).promise;
      pdfDocRef.current = pdf;
      setTotalPages(pdf.numPages);
      setCurrentPage(1);
      renderPage(1, pdf);
    } catch (error) {
      console.error('Erreur lors du chargement du PDF:', error);
      setHasError(true);
      toast.error('Impossible de charger le document');
    } finally {
      setIsLoading(false);
    }
  };

  const loadPDFJSLibrary = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if ((window as any).pdfjsLib) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.onload = () => {
        (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const renderPage = async (pageNumber: number, pdfDoc?: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const pdf = pdfDoc || pdfDocRef.current;
    if (!pdf) return;
    
    try {
      const page = await pdf.getPage(pageNumber);
      const context = canvas.getContext('2d');
      
      const viewport = page.getViewport({ scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;
    } catch (error) {
      console.error('Erreur lors du rendu de la page:', error);
      setHasError(true);
    }
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      renderPage(pageNumber);
    }
  };

  const zoomIn = () => {
    const newScale = Math.min(scale + 0.2, 3);
    setScale(newScale);
    renderPage(currentPage);
  };

  const zoomOut = () => {
    const newScale = Math.max(scale - 0.2, 0.5);
    setScale(newScale);
    renderPage(currentPage);
  };

  useEffect(() => {
    if (pdfDocRef.current && currentPage) {
      renderPage(currentPage);
    }
  }, [scale]);
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
            {totalPages > 0 && (
              <>
                <Button variant="ghost" size="sm" onClick={zoomOut} disabled={scale <= 0.5}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm">{Math.round(scale * 100)}%</span>
                <Button variant="ghost" size="sm" onClick={zoomIn} disabled={scale >= 3}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">{currentPage} / {totalPages}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="flex-1 w-full overflow-auto flex justify-center">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p>Chargement du document...</p>
              </div>
            </div>
          )}
          
          {hasError ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
              <div className="text-gray-600">
                <p className="text-lg mb-2">Impossible de charger le document</p>
                <p className="text-sm text-gray-500">
                  Une erreur s'est produite lors du chargement du PDF.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center p-4">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto shadow-lg rounded border"
                style={{ display: totalPages > 0 ? 'block' : 'none' }}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>;
};
export default PDFViewer;