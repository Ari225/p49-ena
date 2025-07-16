
import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin, MapPin, Briefcase, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import MemberDetailDialog from './MemberDetailDialog';
import MatriculeVerificationDialog from './MatriculeVerificationDialog';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

interface Member {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  locality: string;
  photo: string;
  socialMedia: {
    facebook?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
  };
}

interface MemberCardProps {
  member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isMatriculeDialogOpen, setIsMatriculeDialogOpen] = useState(false);
  const { firstName, lastName, position, locality, socialMedia } = member;
  
  const getInitials = () => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleCardClick = () => {
    setIsMatriculeDialogOpen(true);
  };

  const handleMatriculeVerified = () => {
    setIsMatriculeDialogOpen(false);
    setIsDetailDialogOpen(true);
  };

  // Configuration responsive pour les dimensions
  const getCardConfig = () => {
    if (isMobile) {
      return {
        cardClass: 'h-full',
        contentPadding: 'p-3',
        avatarSize: 'h-12 w-12',
        titleSize: 'text-sm',
        iconSize: 'h-3 w-3',
        textSize: 'text-xs',
        spacing: 'mb-3',
        iconSpacing: 'space-x-2',
        iconPadding: 'p-1'
      };
    } else if (isTablet) {
      return {
        cardClass: 'h-full',
        contentPadding: 'p-4',
        avatarSize: 'h-16 w-16',
        titleSize: 'text-base',
        iconSize: 'h-4 w-4',
        textSize: 'text-sm',
        spacing: 'mb-4',
        iconSpacing: 'space-x-2',
        iconPadding: 'p-2'
      };
    } else {
      return {
        cardClass: 'h-full',
        contentPadding: 'p-6',
        avatarSize: 'h-20 w-20',
        titleSize: 'text-lg',
        iconSize: 'h-4 w-4',
        textSize: 'text-sm',
        spacing: 'mb-4',
        iconSpacing: 'space-x-3',
        iconPadding: 'p-2'
      };
    }
  };

  const config = getCardConfig();

  return (
    <>
      <Card className={`group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer ${config.cardClass}`} onClick={handleCardClick}>
        <CardContent className={`${config.contentPadding} flex flex-col h-full`}>
          {/* Photo */}
          <div className={`flex justify-center ${config.spacing}`}>
            <Avatar className={`${config.avatarSize} ring-2 ring-gray-200 group-hover:ring-primary transition-colors`}>
              <AvatarImage 
                src="/lovable-uploads/05411ed6-4981-4ab2-a67d-bffd14b29202.png"
                alt={`${firstName} ${lastName}`}
                className="object-cover"
              />
              <AvatarFallback className={`bg-primary text-white ${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-lg'} font-semibold`}>
                {getInitials()}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Name */}
          <div className={`text-center ${isMobile ? 'mb-2' : config.spacing}`}>
            <h3 className={`font-bold ${config.titleSize} text-gray-900 group-hover:text-primary transition-colors leading-tight`}>
              {firstName} {lastName}
            </h3>
          </div>

          {/* Position */}
          <div className={`flex items-center justify-center ${isMobile ? 'mb-1' : 'mb-2'} text-gray-600 flex-1`}>
            <Briefcase className={`${config.iconSize} ${isMobile ? 'mr-1' : 'mr-2'} flex-shrink-0`} />
            <span className={`${config.textSize} text-center line-clamp-2`}>{position}</span>
          </div>

          {/* Location */}
          <div className={`flex items-center justify-center ${config.spacing} text-gray-600`}>
            <MapPin className={`${config.iconSize} ${isMobile ? 'mr-1' : 'mr-2'} flex-shrink-0`} />
            <span className={`${config.textSize} truncate`}>{locality}</span>
          </div>

          {/* Contact Icons - Version spécifique */}
          <div className={`flex justify-center ${config.iconSpacing} mt-auto`}>
            {/* MOBILE VERSION - Icons compacts */}
            {isMobile && (
              <>
                <div className={`${config.iconPadding} text-gray-600 cursor-default`} title="Téléphone">
                  <Phone className={config.iconSize} />
                </div>
                {socialMedia.facebook && (
                  <div className={`${config.iconPadding} text-gray-600 cursor-default`} title="Facebook">
                    <Facebook className={config.iconSize} />
                  </div>
                )}
                {socialMedia.instagram && (
                  <div className={`${config.iconPadding} text-gray-600 cursor-default`} title="Instagram">
                    <Instagram className={config.iconSize} />
                  </div>
                )}
                {socialMedia.linkedin && (
                  <div className={`${config.iconPadding} text-gray-600 cursor-default`} title="LinkedIn">
                    <Linkedin className={config.iconSize} />
                  </div>
                )}
              </>
            )}

            {/* TABLET VERSION - Icons moyens */}
            {isTablet && (
              <>
                <div className={`${config.iconPadding} text-gray-600 cursor-default`} title="Téléphone">
                  <Phone className={config.iconSize} />
                </div>
                {socialMedia.facebook && (
                  <div className={`${config.iconPadding} text-gray-600 cursor-default`} title="Facebook">
                    <Facebook className={config.iconSize} />
                  </div>
                )}
                {socialMedia.instagram && (
                  <div className={`${config.iconPadding} text-gray-600 cursor-default`} title="Instagram">
                    <Instagram className={config.iconSize} />
                  </div>
                )}
                {socialMedia.linkedin && (
                  <div className={`${config.iconPadding} text-gray-600 cursor-default`} title="LinkedIn">
                    <Linkedin className={config.iconSize} />
                  </div>
                )}
              </>
            )}

            {/* DESKTOP VERSION - Icons normaux */}
            {!isMobile && !isTablet && (
              <>
                <div className={`${config.iconPadding} text-gray-600 cursor-default`} title="Téléphone">
                  <Phone className={config.iconSize} />
                </div>
                {socialMedia.facebook && (
                  <div className={`${config.iconPadding} text-gray-600 cursor-default`} title="Facebook">
                    <Facebook className={config.iconSize} />
                  </div>
                )}
                {socialMedia.instagram && (
                  <div className={`${config.iconPadding} text-gray-600 cursor-default`} title="Instagram">
                    <Instagram className={config.iconSize} />
                  </div>
                )}
                {socialMedia.linkedin && (
                  <div className={`${config.iconPadding} text-gray-600 cursor-default`} title="LinkedIn">
                    <Linkedin className={config.iconSize} />
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <MemberDetailDialog 
        member={member}
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
      />

      <MatriculeVerificationDialog
        isOpen={isMatriculeDialogOpen}
        onClose={() => setIsMatriculeDialogOpen(false)}
        onVerified={handleMatriculeVerified}
      />
    </>
  );
};

export default MemberCard;
