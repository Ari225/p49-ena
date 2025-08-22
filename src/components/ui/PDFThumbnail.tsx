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
    const canvas = canvasRef.current;
    if (!canvas || !pdfUrl) return;

    try {
      setIsLoading(true);
      setHasError(false);

      // Load PDF.js if not already loaded
      if (!(window as any).pdfjsLib) {
        await loadPDFJSLibrary();
      }

      const pdf = await (window as any).pdfjsLib.getDocument(pdfUrl).promise;
      const page = await pdf.getPage(1); // Get first page
      const context = canvas.getContext('2d');
      if (!context) return;

      // Calculate scale to fit desired thumbnail size
      const viewport = page.getViewport({ scale: 1 });
      const scaleX = width / viewport.width;
      const scaleY = height / viewport.height;
      const scale = Math.min(scaleX, scaleY);

      const scaledViewport = page.getViewport({ scale });
      
      canvas.width = width;
      canvas.height = height;

      // Fill background with white
      context.fillStyle = 'white';
      context.fillRect(0, 0, width, height);

      // Center the PDF page in the canvas
      const offsetX = (width - scaledViewport.width) / 2;
      const offsetY = (height - scaledViewport.height) / 2;

      context.translate(offsetX, offsetY);

      await page.render({
        canvasContext: context,
        viewport: scaledViewport,
      }).promise;

      // Convert canvas to data URL for use as img src
      setThumbnailDataUrl(canvas.toDataURL('image/jpeg', 0.8));
    } catch (error) {
      console.error('Erreur lors de la génération de la miniature:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`} style={{ width, height }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  if (hasError || !thumbnailDataUrl) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`} style={{ width, height }}>
        <div className="text-center text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-2" />
          <p className="text-sm">Document PDF</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <img 
        src={thumbnailDataUrl}
        alt={alt}
        className={className}
        style={{ width, height, objectFit: 'cover' }}
      />
    </>
  );
};

export default PDFThumbnail;