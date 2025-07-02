
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, Play } from 'lucide-react';

interface MediaItem {
  id: number;
  src: string;
  alt: string;
  category: string;
  type: 'image' | 'video';
  thumbnail?: string;
}

interface MediaPopupProps {
  isOpen: boolean;
  onClose: () => void;
  mediaItem: MediaItem | null;
}

const MediaPopup: React.FC<MediaPopupProps> = ({ isOpen, onClose, mediaItem }) => {
  if (!mediaItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full mx-4 sm:mx-auto p-0" hideCloseButton>
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-primary text-lg">
              {mediaItem.category} - {mediaItem.alt}
            </DialogTitle>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>
        <div className="p-6 pt-0">
          <div className="w-full rounded-lg overflow-hidden bg-black">
            {mediaItem.type === 'video' ? (
              <video 
                controls 
                className="w-full h-auto max-h-[70vh]"
                poster={mediaItem.thumbnail}
              >
                <source src={mediaItem.src} type="video/mp4" />
                Votre navigateur ne supporte pas la vidéo.
              </video>
            ) : (
              <img 
                src={mediaItem.src} 
                alt={mediaItem.alt}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            )}
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">{mediaItem.alt}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
              {mediaItem.category}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaPopup;
