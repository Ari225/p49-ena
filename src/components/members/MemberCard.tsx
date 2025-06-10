
import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin, MapPin, Briefcase, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import MemberDetailDialog from './MemberDetailDialog';
import MatriculeVerificationDialog from './MatriculeVerificationDialog';

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

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer h-full" onClick={handleCardClick}>
        <CardContent className="p-3 md:p-6 flex flex-col h-full">
          {/* Photo */}
          <div className="flex justify-center mb-3 md:mb-4">
            <Avatar className="h-12 w-12 md:h-20 md:w-20 ring-2 ring-gray-200 group-hover:ring-primary transition-colors">
              <AvatarImage 
                src="/lovable-uploads/05411ed6-4981-4ab2-a67d-bffd14b29202.png"
                alt={`${firstName} ${lastName}`}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary text-white text-xs md:text-lg font-semibold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Name */}
          <div className="text-center mb-2 md:mb-3">
            <h3 className="font-bold text-sm md:text-lg text-gray-900 group-hover:text-primary transition-colors leading-tight">
              {firstName} {lastName}
            </h3>
          </div>

          {/* Position */}
          <div className="flex items-center justify-center mb-1 md:mb-2 text-gray-600 flex-1">
            <Briefcase className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 flex-shrink-0" />
            <span className="text-xs md:text-sm text-center line-clamp-2">{position}</span>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center mb-3 md:mb-4 text-gray-600">
            <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 flex-shrink-0" />
            <span className="text-xs md:text-sm truncate">{locality}</span>
          </div>

          {/* Contact Icons - Non-clickable preview */}
          <div className="flex justify-center space-x-2 md:space-x-3 mt-auto">
            {/* Phone Icon */}
            <div className="p-1 md:p-2 text-gray-600 cursor-default" title="Téléphone">
              <Phone className="h-3 w-3 md:h-4 md:w-4" />
            </div>

            {/* Social Media Icons */}
            {socialMedia.facebook && (
              <div className="p-1 md:p-2 text-gray-600 cursor-default" title="Facebook">
                <Facebook className="h-3 w-3 md:h-4 md:w-4" />
              </div>
            )}
            {socialMedia.instagram && (
              <div className="p-1 md:p-2 text-gray-600 cursor-default" title="Instagram">
                <Instagram className="h-3 w-3 md:h-4 md:w-4" />
              </div>
            )}
            {socialMedia.linkedin && (
              <div className="p-1 md:p-2 text-gray-600 cursor-default" title="LinkedIn">
                <Linkedin className="h-3 w-3 md:h-4 md:w-4" />
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
