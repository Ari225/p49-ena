import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Users, Heart, Award, Star } from 'lucide-react';

interface HappyEvent {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  location?: string;
  category: string;
  member_name: string;
  message?: string;
  image_url?: string;
}

interface HappyEventDetailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  event: HappyEvent | null;
}

const HappyEventDetailPopup: React.FC<HappyEventDetailPopupProps> = ({
  isOpen,
  onClose,
  event
}) => {
  if (!event) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mariage':
        return Heart;
      case 'Promotion':
        return Star;
      case 'Distinction':
        return Award;
      default:
        return Heart;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Mariage':
        return 'text-pink-600';
      case 'Promotion':
        return 'text-yellow-600';
      case 'Distinction':
        return 'text-purple-600';
      default:
        return 'text-green-600';
    }
  };

  const formatEventDate = (dateStr: string) => {
    // If it's just a year (4 digits), return as is
    if (/^\d{4}$/.test(dateStr)) {
      return dateStr;
    }
    
    // If it's a full date, format it
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const IconComponent = getCategoryIcon(event.category);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconComponent className={`w-6 h-6 ${getCategoryColor(event.category)}`} />
            {event.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Image */}
          {event.image_url && (
            <div className="aspect-video overflow-hidden rounded-lg">
              <img 
                src={event.image_url} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Event Details */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Date:</strong> {formatEventDate(event.event_date)}
                  </span>
                </div>
                
                {event.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Lieu:</strong> {event.location}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Membre:</strong> {event.member_name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <IconComponent className={`w-5 h-5 ${getCategoryColor(event.category)}`} />
                  <span className="text-sm">
                    <strong>Catégorie:</strong> {event.category}
                  </span>
                </div>
              </div>

              {/* Description */}
              {event.description && (
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              )}

              {/* Message */}
              {event.message && (
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-200">
                  <div className="flex items-start gap-2">
                    <Heart className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-green-800 italic text-sm">
                      {event.message}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HappyEventDetailPopup;