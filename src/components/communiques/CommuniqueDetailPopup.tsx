
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            {getUrgencyBadge(communique.urgency)}
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(communique.published_date).toLocaleDateString('fr-FR')}
            </div>
          </div>
          <DialogTitle className="text-xl font-semibold text-left">
            {communique.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {communique.image && (
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <img 
                src={communique.image} 
                alt={communique.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {communique.description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommuniqueDetailPopup;
