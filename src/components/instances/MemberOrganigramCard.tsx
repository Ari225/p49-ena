
import React, { useState } from 'react';
import { Phone, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import MemberDetailDialog from '../members/MemberDetailDialog';
import MatriculeVerificationDialog from '../members/MatriculeVerificationDialog';
import { useIsMobile } from '@/hooks/use-mobile';

interface MemberOrganigramCardProps {
  name: string;
  position: string;
  phone: string;
}

const MemberOrganigramCard: React.FC<MemberOrganigramCardProps> = ({
  name,
  position,
  phone
}) => {
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isMatriculeDialogOpen, setIsMatriculeDialogOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const isMobile = useIsMobile();

  const getInitials = () => {
    const names = name.split(' ');
    return names.length >= 2 
      ? `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase()
      : name.charAt(0).toUpperCase();
  };

  const handlePhoneCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isVerified) {
      window.open(`tel:${phone}`, '_self');
    } else {
      setIsMatriculeDialogOpen(true);
    }
  };

  const handleCardClick = () => {
    if (isVerified) {
      setIsDetailDialogOpen(true);
    } else {
      setIsMatriculeDialogOpen(true);
    }
  };

  const handleMatriculeVerified = () => {
    setIsVerified(true);
    setIsMatriculeDialogOpen(false);
    setIsDetailDialogOpen(true);
  };

  // Convert name to firstName and lastName for dialog
  const nameParts = name.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const memberData = {
    id: Math.random(),
    firstName,
    lastName,
    position,
    locality: 'Abidjan', // Default locality
    phone,
    socialMedia: {
      facebook: null,
      instagram: null,
      linkedin: null
    }
  };

  return (
    <>
      <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border-2 border-primary/20 hover:border-primary/40 bg-white" onClick={handleCardClick}>
        <CardContent className={isMobile ? 'p-4' : 'p-6'}>
          {/* Photo with professional styling inspired by the reference image */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full border-2 border-dashed border-primary/30 animate-pulse"></div>
              <Avatar className={`${isMobile ? 'h-16 w-16' : 'h-20 w-20'} ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300 relative z-10`}>
                <AvatarImage 
                  src="/lovable-uploads/0eb571bc-9634-49ab-9502-ce03a1464da6.png"
                  alt={name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-primary text-white text-lg font-semibold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              {/* Decorative dots */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full opacity-70"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-secondary rounded-full opacity-70"></div>
            </div>
          </div>

          {/* Name */}
          <div className="text-center mb-3">
            <h3 className={`font-bold ${isMobile ? 'text-base' : 'text-lg'} text-gray-900 group-hover:text-primary transition-colors`}>
              {name}
            </h3>
          </div>

          {/* Position */}
          <div className="text-center mb-4">
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 font-medium leading-tight`}>
              {position}
            </p>
          </div>

          {/* Phone - Hidden until verified */}
          <div className="flex items-center justify-center">
            {isVerified ? (
              <button
                onClick={handlePhoneCall}
                className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors bg-primary/10 hover:bg-primary/20 rounded-full px-3 py-2"
                title={`Appeler ${name}`}
              >
                <Phone className="h-3 w-3" />
                <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>{phone}</span>
              </button>
            ) : (
              <button
                onClick={handlePhoneCall}
                className="flex items-center space-x-2 text-gray-500 bg-gray-100 rounded-full px-3 py-2 cursor-pointer hover:bg-gray-200 transition-colors"
                title="Matricule requis pour voir les coordonnées"
              >
                <Lock className="h-3 w-3" />
                <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Matricule requis</span>
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      <MemberDetailDialog 
        member={memberData}
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

export default MemberOrganigramCard;
