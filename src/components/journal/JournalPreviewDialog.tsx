import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, Calendar, FileText } from 'lucide-react';

interface JournalEdition {
  id: string;
  title: string;
  summary: string;
  cover_image_url: string;
  pdf_url: string;
  publish_date: string;
  status: string;
}

interface JournalPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  edition: JournalEdition | null;
}

const JournalPreviewDialog = ({
  open,
  onOpenChange,
  edition
}: JournalPreviewDialogProps) => {
  if (!edition) return null;

  const handleDownload = () => {
    if (edition.pdf_url) {
      window.open(edition.pdf_url, '_blank');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'publie':
        return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Publié</span>;
      case 'brouillon':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Brouillon</span>;
      case 'archive':
        return <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">Archivé</span>;
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">{status}</span>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-4xl max-h-[35vh] overflow-y-auto rounded-2xl mx-auto my-auto">
        <DialogHeader>
          <DialogTitle>Aperçu de l'édition</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with status and date */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600">
                Publié le {new Date(edition.publish_date).toLocaleDateString('fr-FR')}
              </span>
            </div>
            {getStatusBadge(edition.status)}
          </div>

          {/* Cover image and content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cover image */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Image de couverture</h3>
              {edition.cover_image_url ? (
                <img 
                  src={edition.cover_image_url} 
                  alt={edition.title}
                  className="w-full max-w-md mx-auto rounded-lg shadow-md object-cover"
                />
              ) : (
                <div className="w-full max-w-md mx-auto h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Titre</h3>
                <h2 className="text-2xl font-bold text-primary">{edition.title}</h2>
              </div>

              {edition.summary && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Résumé</h3>
                  <p className="text-gray-700 leading-relaxed">{edition.summary}</p>
                </div>
              )}

              {/* PDF info */}
              <div>
                <h3 className="text-lg font-medium mb-2">Document PDF</h3>
                {edition.pdf_url ? (
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <FileText className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-green-800">PDF disponible</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Aucun PDF disponible</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fermer
            </Button>
            {edition.pdf_url && (
              <Button onClick={handleDownload} className="bg-primary hover:bg-primary/90">
                <Download className="h-4 w-4 mr-2" />
                Télécharger le PDF
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JournalPreviewDialog;