
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin } from 'lucide-react';
import ContactMap from './ContactMap';

interface MapPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const MapPopup: React.FC<MapPopupProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-primary">
            <MapPin className="h-5 w-5 mr-2" />
            Localisation - Siège de la P49 ENA
          </DialogTitle>
        </DialogHeader>
        <div className="w-full h-[400px] md:h-[500px]">
          <ContactMap />
        </div>
        <div className="text-center text-sm text-gray-600 mt-4">
          <p className="font-medium">Siège de la P49 ENA</p>
          <p>Abidjan, Côte d'Ivoire</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapPopup;
