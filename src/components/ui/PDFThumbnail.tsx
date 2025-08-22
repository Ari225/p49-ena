import React, { useEffect, useRef, useState } from 'react';
import { FileText } from 'lucide-react';

interface PDFThumbnailProps {
  pdfUrl: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const PDFThumbnail = ({ pdfUrl, alt, className, width = 300, height = 200 }: PDFThumbnailProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [thumbnailDataUrl, setThumbnailDataUrl] = useState<string>('');

  useEffect(() => {
    generateThumbnail();
  }, [pdfUrl]);

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

  const generateThumbnail = async () => {
    console.log('PDFThumbnail: Début génération miniature pour:', pdfUrl);
    const canvas = canvasRef.current;
    if (!canvas || !pdfUrl) {
      console.log('PDFThumbnail: Canvas ou pdfUrl manquant', { canvas: !!canvas, pdfUrl });
      return;
    }

    try {
      setIsLoading(true);
      setHasError(false);
      console.log('PDFThumbnail: Chargement PDF.js...');

      // Load PDF.js if not already loaded
      if (!(window as any).pdfjsLib) {
        console.log('PDFThumbnail: Chargement de la librairie PDF.js...');
        await loadPDFJSLibrary();
        console.log('PDFThumbnail: PDF.js chargé avec succès');
      } else {
        console.log('PDFThumbnail: PDF.js déjà disponible');
      }

      console.log('PDFThumbnail: Chargement du document PDF...');
      const pdf = await (window as any).pdfjsLib.getDocument(pdfUrl).promise;
      console.log('PDFThumbnail: Document PDF chargé, pages:', pdf.numPages);
      
      const page = await pdf.getPage(1); // Get first page
      console.log('PDFThumbnail: Première page récupérée');
      
      const context = canvas.getContext('2d');
      if (!context) {
        console.error('PDFThumbnail: Impossible d\'obtenir le contexte 2D');
        return;
      }

      // Calculate scale to fit desired thumbnail size
      const viewport = page.getViewport({ scale: 1 });
      console.log('PDFThumbnail: Viewport original:', viewport.width, 'x', viewport.height);
      
      const scaleX = width / viewport.width;
      const scaleY = height / viewport.height;
      const scale = Math.min(scaleX, scaleY);
      console.log('PDFThumbnail: Échelle calculée:', scale);

      const scaledViewport = page.getViewport({ scale });
      console.log('PDFThumbnail: Viewport redimensionné:', scaledViewport.width, 'x', scaledViewport.height);
      
      canvas.width = width;
      canvas.height = height;

      // Fill background with white
      context.fillStyle = 'white';
      context.fillRect(0, 0, width, height);

      // Center the PDF page in the canvas
      const offsetX = (width - scaledViewport.width) / 2;
      const offsetY = (height - scaledViewport.height) / 2;
      console.log('PDFThumbnail: Offsets:', offsetX, offsetY);

      context.save(); // Save current state
      context.translate(offsetX, offsetY);

      console.log('PDFThumbnail: Début du rendu...');
      await page.render({
        canvasContext: context,
        viewport: scaledViewport,
      }).promise;
      
      context.restore(); // Restore state

      // Convert canvas to data URL for use as img src
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      console.log('PDFThumbnail: Miniature générée, taille data URL:', dataUrl.length);
      setThumbnailDataUrl(dataUrl);
      console.log('PDFThumbnail: Miniature définie avec succès');
    } catch (error) {
      console.error('PDFThumbnail: Erreur lors de la génération de la miniature:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
      console.log('PDFThumbnail: Fin du processus de génération');
    }
  };

  if (isLoading) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  if (hasError || !thumbnailDataUrl) {
    console.log('PDFThumbnail: Affichage fallback', { hasError, hasThumbnailDataUrl: !!thumbnailDataUrl });
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <div className="text-center text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-2" />
          <p className="text-sm">Document PDF</p>
          {hasError && <p className="text-xs text-red-500">Erreur de chargement</p>}
        </div>
      </div>
    );
  }

  console.log('PDFThumbnail: Rendu final de l\'image', { thumbnailDataUrl: thumbnailDataUrl.substring(0, 50) + '...' });
  return (
    <>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <img 
        src={thumbnailDataUrl}
        alt={alt}
        className={className}
        style={{ objectFit: 'cover' }}
        onLoad={() => console.log('PDFThumbnail: Image chargée avec succès')}
        onError={(e) => console.error('PDFThumbnail: Erreur de chargement image:', e)}
      />
    </>
  );
};

export default PDFThumbnail;