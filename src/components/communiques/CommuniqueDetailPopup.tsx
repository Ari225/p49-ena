
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

interface CommuniqueItem {
  id: string;
  title: string;
  description: string;
  type: string;
  color: string;
  image: string;
  published_date: string;
  urgency: 'normal' | 'urgent' | 'important';
}

interface CommuniqueDetailPopupProps {
  communique: CommuniqueItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const CommuniqueDetailPopup: React.FC<CommuniqueDetailPopupProps> = ({
  communique,
  isOpen,
  onClose
}) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  if (!communique) return null;

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
      case 'important':
        return <Badge className="bg-orange-100 text-orange-800">Important</Badge>;
      default:
        return <Badge className="bg-green-100 text-green-800">Non urgent</Badge>;
    }
  };

  const getDialogStyles = () => {
    if (isMobile) {
      return "max-w-[95vw] max-h-[90vh] mx-auto my-auto overflow-y-auto p-0";
    } else if (isTablet) {
      return "max-w-[85vw] max-h-[85vh] mx-8 overflow-y-auto p-0";
    } else {
      return "max-w-4xl max-h-[90vh] overflow-y-auto p-0";
    }
  };

  const getPaddingStyles = () => {
    if (isMobile) {
      return "px-4 pb-4";
    } else if (isTablet) {
      return "px-6 pb-6";
    } else {
      return "px-6 pb-6";
    }
  };

  const getHeaderPaddingStyles = () => {
    if (isMobile) {
      return "px-4 pt-4 pb-0";
    } else if (isTablet) {
      return "px-6 pt-6 pb-0";
    } else {
      return "px-6 pt-6 pb-0";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={getDialogStyles()}>
        <DialogHeader className={getHeaderPaddingStyles()}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              {getUrgencyBadge(communique.urgency)}
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(communique.published_date).toLocaleDateString('fr-FR')}
              </div>
            </div>
          </div>
          <DialogTitle className={`font-semibold text-left pr-8 ${
            isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-xl'
          }`}>
            {communique.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className={`space-y-4 ${getPaddingStyles()}`}>
          {communique.image && (
            <div className="w-full">
              <img 
                src={communique.image} 
                alt={communique.title}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          )}
          
          <div className="prose max-w-none">
            <p className={`text-gray-700 leading-relaxed ${
              isMobile ? 'text-sm' : 'text-base'
            }`}>
              {communique.description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommuniqueDetailPopup;
