
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye, X } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
  triggerButton?: React.ReactNode;
}

const PDFViewer = ({ pdfUrl, title, triggerButton }: PDFViewerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const defaultTrigger = (
    <Button className="bg-primary hover:bg-primary/90 flex items-center space-x-2">
      <Eye className="h-4 w-4" />
      <span>Lire en ligne</span>
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="w-[95%] max-w-4xl h-[80vh] flex flex-col rounded-lg mx-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold text-primary">
            {title}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="flex-1 w-full">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
            className="w-full h-full border-0 rounded"
            title={title}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFViewer;
