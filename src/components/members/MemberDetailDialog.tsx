
import React from 'react';
import { Facebook, Instagram, Linkedin, MapPin, Briefcase } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

interface Member {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  locality: string;
  photo?: string;
  whatsapp?: string | null;
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
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  if (!member) return null;

  const { firstName, lastName, position, locality, socialMedia, photo, whatsapp } = member;
  
  const getInitials = () => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppClick = () => {
    if (whatsapp) {
      const whatsappUrl = `https://wa.me/${whatsapp}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // ===========================================
  // VERSION MOBILE (useIsMobile = true)
  // ===========================================
  if (isMobile) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-[calc(100%-50px)] max-w-sm mx-auto rounded-lg">
          <div className="p-4">
            {/* Photo Mobile */}
            <div className="flex justify-center mb-4">
              <Avatar className="h-16 w-16 ring-4 ring-primary/20">
                <AvatarImage 
                  src={photo || "/lovable-uploads/05411ed6-4981-4ab2-a67d-bffd14b29202.png"}
                  alt={`${firstName} ${lastName}`}
                  className="object-cover"
                />
                <AvatarFallback className="bg-primary text-white text-xs font-semibold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Name Mobile */}
            <div className="text-center mb-3">
              <h2 className="text-base font-bold text-gray-900 text-primary">
                {firstName} {lastName}
              </h2>
            </div>

            {/* Position Mobile */}
            <div className="flex items-center justify-center mb-2 text-gray-600">
              <Briefcase className="h-4 w-4 mr-2 flex-shrink-0 text-gray-600" />
              <span className="text-xs font-medium text-center">{position}</span>
            </div>

            {/* Location Mobile */}
            <div className="flex items-center justify-center mb-4 text-gray-600">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-gray-600" />
              <span className="text-xs">{locality}</span>
            </div>

            {/* Contact Icons Mobile */}
            <div className="flex justify-center space-x-3 mb-4">
              {/* WhatsApp Icon */}
              {whatsapp && (
                <button
                  onClick={handleWhatsAppClick}
                  className="p-2 text-gray-600 hover:text-primary transition-colors border border-gray-300 rounded-lg hover:border-primary"
                  title="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </button>
              )}

              {/* Social Media Icons */}
              {socialMedia.facebook && (
                <button
                  onClick={() => handleSocialClick(socialMedia.facebook!)}
                  className="p-2 text-gray-600 hover:text-primary transition-colors border border-gray-300 rounded-lg hover:border-primary"
                  title="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </button>
              )}
              {socialMedia.instagram && (
                <button
                  onClick={() => handleSocialClick(socialMedia.instagram!)}
                  className="p-2 text-gray-600 hover:text-primary transition-colors border border-gray-300 rounded-lg hover:border-primary"
                  title="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </button>
              )}
              {socialMedia.linkedin && (
                <button
                  onClick={() => handleSocialClick(socialMedia.linkedin!)}
                  className="p-2 text-gray-600 hover:text-primary transition-colors border border-gray-300 rounded-lg hover:border-primary"
                  title="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Edit Button Mobile */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  onClose();
                  window.location.href = `/membre/modifier?id=${member.id}`;
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
              >
                Modifier mes informations
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // ===========================================
  // VERSION TABLETTE (useIsTablet = true)
  // ===========================================
  if (isTablet) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-[calc(100%-100px)] max-w-md mx-auto">
          <div className="p-5">
            {/* Photo Tablette */}
            <div className="flex justify-center mb-5">
              <Avatar className="h-20 w-20 ring-4 ring-primary/20">
                <AvatarImage 
                  src={photo || "/lovable-uploads/05411ed6-4981-4ab2-a67d-bffd14b29202.png"}
                  alt={`${firstName} ${lastName}`}
                  className="object-cover"
                />
                <AvatarFallback className="bg-primary text-white text-sm font-semibold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Name Tablette */}
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-gray-900 text-primary">
                {firstName} {lastName}
              </h2>
            </div>

            {/* Position Tablette */}
            <div className="flex items-center justify-center mb-3 text-gray-600">
              <Briefcase className="h-5 w-5 mr-3 flex-shrink-0 text-gray-600" />
              <span className="text-sm font-medium text-center">{position}</span>
            </div>

            {/* Location Tablette */}
            <div className="flex items-center justify-center mb-5 text-gray-600">
              <MapPin className="h-5 w-5 mr-3 flex-shrink-0 text-gray-600" />
              <span className="text-sm">{locality}</span>
            </div>

            {/* Contact Icons Tablette */}
            <div className="flex justify-center space-x-4 mb-5">
              {/* WhatsApp Icon */}
              {whatsapp && (
                <button
                  onClick={handleWhatsAppClick}
                  className="p-3 text-gray-600 hover:text-primary transition-colors border border-gray-300 rounded-lg hover:border-primary"
                  title="WhatsApp"
                >
                  <MessageCircle className="h-5 w-5" />
                </button>
              )}

              {/* Social Media Icons */}
              {socialMedia.facebook && (
                <button
                  onClick={() => handleSocialClick(socialMedia.facebook!)}
                  className="p-3 text-gray-600 hover:text-primary transition-colors border border-gray-300 rounded-lg hover:border-primary"
                  title="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </button>
              )}
              {socialMedia.instagram && (
                <button
                  onClick={() => handleSocialClick(socialMedia.instagram!)}
                  className="p-3 text-gray-600 hover:text-primary transition-colors border border-gray-300 rounded-lg hover:border-primary"
                  title="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </button>
              )}
              {socialMedia.linkedin && (
                <button
                  onClick={() => handleSocialClick(socialMedia.linkedin!)}
                  className="p-3 text-gray-600 hover:text-primary transition-colors border border-gray-300 rounded-lg hover:border-primary"
                  title="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Edit Button Tablette */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  onClose();
                  window.location.href = `/membre/modifier?id=${member.id}`;
                }}
                className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
              >
                Modifier mes informations
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // ===========================================
  // VERSION DESKTOP (par défaut)
  // ===========================================
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <div className="p-6">
          {/* Photo Desktop */}
          <div className="flex justify-center mb-6">
            <Avatar className="h-24 w-24 ring-4 ring-primary/20">
              <AvatarImage 
                src={photo || "/lovable-uploads/05411ed6-4981-4ab2-a67d-bffd14b29202.png"}
                alt={`${firstName} ${lastName}`}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary text-white text-sm font-semibold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Name Desktop */}
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold text-gray-900 text-primary">
              {firstName} {lastName}
            </h2>
          </div>

          {/* Position Desktop */}
          <div className="flex items-center justify-center mb-3 text-gray-600">
            <Briefcase className="h-5 w-5 mr-3 flex-shrink-0 text-gray-600" />
            <span className="text-sm font-medium text-center">{position}</span>
          </div>

          {/* Location Desktop */}
          <div className="flex items-center justify-center mb-6 text-gray-600">
            <MapPin className="h-5 w-5 mr-3 flex-shrink-0 text-gray-600" />
            <span className="text-sm">{locality}</span>
          </div>

          {/* Contact Icons Desktop */}
          <div className="flex justify-center space-x-4 mb-6">
            {/* WhatsApp Icon */}
            {whatsapp && (
              <button
                onClick={handleWhatsAppClick}
                className="p-3 text-gray-600 hover:text-primary transition-colors border border-gray-300 rounded-lg hover:border-primary"
                title="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </button>
            )}

            {/* Social Media Icons */}
            {socialMedia.facebook && (
              <button
                onClick={() => handleSocialClick(socialMedia.facebook!)}
                className="p-3 text-gray-600 hover:text-primary transition-colors border border-gray-300 rounded-lg hover:border-primary"
                title="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </button>
            )}
            {socialMedia.instagram && (
              <button
                onClick={() => handleSocialClick(socialMedia.instagram!)}
                className="p-3 text-gray-600 hover:text-primary transition-colors border border-gray-300 rounded-lg hover:border-primary"
                title="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </button>
            )}
            {socialMedia.linkedin && (
              <button
                onClick={() => handleSocialClick(socialMedia.linkedin!)}
                className="p-3 text-gray-600 hover:text-primary transition-colors border border-gray-300 rounded-lg hover:border-primary"
                title="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Edit Button Desktop */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                onClose();
                window.location.href = `/membre/modifier?id=${member.id}`;
              }}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Modifier mes informations
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemberDetailDialog;
