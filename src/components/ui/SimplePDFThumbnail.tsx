import React from 'react';
import { FileText } from 'lucide-react';

interface SimplePDFThumbnailProps {
  pdfUrl: string;
  alt: string;
  className?: string;
}

const SimplePDFThumbnail = ({ pdfUrl, alt, className }: SimplePDFThumbnailProps) => {
  console.log('SimplePDFThumbnail: Rendu avec URL:', pdfUrl);
  
  return (
    <div className={`${className} bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 flex flex-col items-center justify-center p-6 rounded-lg`}>
      <div className="text-red-600 mb-3">
        <FileText className="h-16 w-16" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-red-800 mb-1">Document PDF</p>
        <p className="text-xs text-red-600">Cliquez pour visualiser</p>
      </div>
      {/* Badge PDF */}
      <div className="mt-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
        PDF
      </div>
    </div>
  );
};

export default SimplePDFThumbnail;