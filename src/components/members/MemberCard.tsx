
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

  // ===========================================
  // VERSION MOBILE (useIsMobile = true)
  // ===========================================
  if (isMobile) {
    return (
      <>
        <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer h-full" onClick={handleCardClick}>
          <CardContent className="p-3 flex flex-col h-full">
            {/* Photo Mobile */}
            <div className="flex justify-center mb-3">
              <Avatar className="h-12 w-12 ring-2 ring-gray-200 group-hover:ring-primary transition-colors">
                <AvatarImage 
                  src="/lovable-uploads/05411ed6-4981-4ab2-a67d-bffd14b29202.png"
                  alt={`${firstName} ${lastName}`}
                  className="object-cover"
                />
                <AvatarFallback className="bg-primary text-white text-xs font-semibold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Name Mobile */}
            <div className="text-center mb-2">
              <h3 className="font-bold text-sm text-primary group-hover:text-primary transition-colors leading-tight">
                {firstName} {lastName}
              </h3>
            </div>

            {/* Position Mobile */}
            <div className="flex items-center justify-center mb-1 text-gray-700 flex-1">
              <Briefcase className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-xs text-center line-clamp-2">{position}</span>
            </div>

            {/* Location Mobile */}
            <div className="flex items-center justify-center mb-3 text-gray-700">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-xs truncate">{locality}</span>
            </div>

            {/* Contact Icons Mobile */}
            <div className="flex justify-center space-x-2 mt-auto">
              <div className="p-1 text-gray-700 cursor-default" title="Téléphone">
                <Phone className="h-4 w-4" />
              </div>
              {socialMedia.facebook && (
                <div className="p-1 text-gray-700 cursor-default" title="Facebook">
                  <Facebook className="h-4 w-4" />
                </div>
              )}
              {socialMedia.instagram && (
                <div className="p-1 text-gray-700 cursor-default" title="Instagram">
                  <Instagram className="h-4 w-4" />
                </div>
              )}
              {socialMedia.linkedin && (
                <div className="p-1 text-gray-700 cursor-default" title="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </div>
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
  }

  // ===========================================
  // VERSION TABLETTE (useIsTablet = true)
  // ===========================================
  if (isTablet) {
    return (
      <>
        <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer h-full" onClick={handleCardClick}>
          <CardContent className="p-4 flex flex-col h-full">
            {/* Photo Tablette */}
            <div className="flex justify-center mb-4">
              <Avatar className="h-16 w-16 ring-2 ring-gray-200 group-hover:ring-primary transition-colors">
                <AvatarImage 
                  src="/lovable-uploads/05411ed6-4981-4ab2-a67d-bffd14b29202.png"
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
              <h3 className="font-bold text-base text-primary group-hover:text-primary transition-colors leading-tight">
                {firstName} {lastName}
              </h3>
            </div>

            {/* Position Tablette */}
            <div className="flex items-center justify-center mb-2 text-gray-700 flex-1">
              <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="text-sm text-center line-clamp-2">{position}</span>
            </div>

            {/* Location Tablette */}
            <div className="flex items-center justify-center mb-4 text-gray-700">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="text-sm truncate">{locality}</span>
            </div>

            {/* Contact Icons Tablette */}
            <div className="flex justify-center space-x-2 mt-auto">
              <div className="p-2 text-gray-700 cursor-default" title="Téléphone">
                <Phone className="h-4 w-4" />
              </div>
              {socialMedia.facebook && (
                <div className="p-2 text-gray-700 cursor-default" title="Facebook">
                  <Facebook className="h-4 w-4" />
                </div>
              )}
              {socialMedia.instagram && (
                <div className="p-2 text-gray-700 cursor-default" title="Instagram">
                  <Instagram className="h-4 w-4" />
                </div>
              )}
              {socialMedia.linkedin && (
                <div className="p-2 text-gray-700 cursor-default" title="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </div>
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
  }

  // ===========================================
  // VERSION DESKTOP (par défaut)
  // ===========================================
  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer h-full" onClick={handleCardClick}>
        <CardContent className="p-6 flex flex-col h-full">
          {/* Photo Desktop */}
          <div className="flex justify-center mb-4">
            <Avatar className="h-20 w-20 ring-2 ring-gray-200 group-hover:ring-primary transition-colors">
              <AvatarImage 
                src="/lovable-uploads/05411ed6-4981-4ab2-a67d-bffd14b29202.png"
                alt={`${firstName} ${lastName}`}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary text-white text-lg font-semibold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Name Desktop */}
          <div className="text-center mb-4">
            <h3 className="font-bold text-lg text-primary group-hover:text-primary transition-colors leading-tight">
              {firstName} {lastName}
            </h3>
          </div>

          {/* Position Desktop */}
          <div className="flex items-center justify-center mb-2 text-gray-700 flex-1">
            <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm text-center line-clamp-2">{position}</span>
          </div>

          {/* Location Desktop */}
          <div className="flex items-center justify-center mb-4 text-gray-700">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm truncate">{locality}</span>
          </div>

          {/* Contact Icons Desktop */}
          <div className="flex justify-center space-x-3 mt-auto">
            <div className="p-2 text-gray-700 cursor-default" title="Téléphone">
              <Phone className="h-4 w-4" />
            </div>
            {socialMedia.facebook && (
              <div className="p-2 text-gray-700 cursor-default" title="Facebook">
                <Facebook className="h-4 w-4" />
              </div>
            )}
            {socialMedia.instagram && (
              <div className="p-2 text-gray-700 cursor-default" title="Instagram">
                <Instagram className="h-4 w-4" />
              </div>
            )}
            {socialMedia.linkedin && (
              <div className="p-2 text-gray-700 cursor-default" title="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </div>
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
