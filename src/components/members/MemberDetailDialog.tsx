
import React from 'react';
import { Facebook, Instagram, Linkedin, MapPin, Briefcase, Phone, X } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Member {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  locality: string;
  photo?: string;
  phone?: string;
  socialMedia: {
    facebook?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
  };
}

interface MemberDetailDialogProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
}

const MemberDetailDialog: React.FC<MemberDetailDialogProps> = ({ member, isOpen, onClose }) => {
  if (!member) return null;

  const { firstName, lastName, position, locality, phone, socialMedia } = member;
  
  const getInitials = () => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePhoneCall = () => {
    if (phone) {
      window.open(`tel:${phone}`, '_self');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <div className="p-6">
          {/* Photo */}
          <div className="flex justify-center mb-6">
            <Avatar className="h-24 w-24 ring-4 ring-primary/20">
              <AvatarImage 
                src="/lovable-uploads/05411ed6-4981-4ab2-a67d-bffd14b29202.png"
                alt={`${firstName} ${lastName}`}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary text-white text-xl font-semibold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Name */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 text-primary">
              {firstName} {lastName}
            </h2>
          </div>

          {/* Position */}
          <div className="flex items-center justify-center mb-3 text-gray-600">
            <Briefcase className="h-5 w-5 mr-3 flex-shrink-0 text-primary" />
            <span className="text-base font-medium text-center">{position}</span>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center mb-4 text-gray-600">
            <MapPin className="h-5 w-5 mr-3 flex-shrink-0 text-primary" />
            <span className="text-base">{locality}</span>
          </div>

          {/* Phone */}
          {phone && (
            <div className="flex items-center justify-center mb-6">
              <button
                onClick={handlePhoneCall}
                className="flex items-center space-x-3 text-primary hover:text-primary/80 transition-colors bg-primary/10 px-4 py-2 rounded-lg"
                title={`Appeler ${firstName} ${lastName}`}
              >
                <Phone className="h-5 w-5" />
                <span className="text-base font-medium">{phone}</span>
              </button>
            </div>
          )}

          {/* Social Media */}
          <div className="flex justify-center space-x-4">
            {socialMedia.facebook && (
              <button
                onClick={() => handleSocialClick(socialMedia.facebook!)}
                className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                title="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </button>
            )}
            {socialMedia.instagram && (
              <button
                onClick={() => handleSocialClick(socialMedia.instagram!)}
                className="p-3 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-colors shadow-lg hover:shadow-xl"
                title="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </button>
            )}
            {socialMedia.linkedin && (
              <button
                onClick={() => handleSocialClick(socialMedia.linkedin!)}
                className="p-3 rounded-full bg-blue-800 text-white hover:bg-blue-900 transition-colors shadow-lg hover:shadow-xl"
                title="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemberDetailDialog;
