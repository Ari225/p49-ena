
import React, { useState } from 'react';
import { Phone, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import MemberDetailDialog from '../members/MemberDetailDialog';
import MatriculeVerificationDialog from '../members/MatriculeVerificationDialog';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

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
  const isTablet = useIsTablet();

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

  // Ajustement spécifique pour certaines cartes en version tablette
  const isSpecialCard = name === 'MEL Meléï Marcelle' || name === 'SANGARE Yacouba' || name === 'IPAUD Michel';
  const cardWidthClass = isTablet && isSpecialCard ? 'max-w-[280px] mx-auto' : '';

  return (
    <>
      <Card className={`group hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border-2 border-primary/20 hover:border-primary/40 bg-white/95 backdrop-blur-sm h-full ${cardWidthClass}`} onClick={handleCardClick}>
        <CardContent className={`${isMobile ? 'p-3' : isTablet ? 'p-3' : 'p-6'} h-full flex flex-col justify-between`}>
          {/* Photo avec styling professionnel amélioré */}
          <div className="flex justify-center mb-3">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full border border-primary/20 animate-pulse opacity-50"></div>
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10"></div>
              <Avatar className={`${isMobile ? 'h-14 w-14' : isTablet ? 'h-12 w-12' : 'h-20 w-20'} ring-2 ring-primary/30 group-hover:ring-primary/50 transition-all duration-300 relative z-10 shadow-lg`}>
                <AvatarImage 
                  src="/lovable-uploads/narcissek.jpeg"
                  alt={name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white text-sm font-bold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              {/* Éléments décoratifs améliorés */}
              <div className={`absolute -top-1 -right-1 ${isTablet ? 'w-2 h-2' : 'w-3 h-3'} bg-primary rounded-full shadow-sm`}></div>
              <div className={`absolute -bottom-1 -left-1 ${isTablet ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-secondary rounded-full shadow-sm`}></div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="flex-grow flex flex-col justify-center text-center space-y-2">
            {/* Nom */}
            <h3 className={`font-bold ${isMobile ? 'text-sm' : isTablet ? 'text-sm' : 'text-xl'} text-gray-900 group-hover:text-primary transition-colors leading-tight`}>
              {name}
            </h3>

            {/* Position */}
            <p className={`${isMobile ? 'text-xs' : isTablet ? 'text-xs' : 'text-base'} text-gray-600 font-medium leading-snug px-1`}>
              {position}
            </p>
          </div>

          {/* Section contact */}
          <div className="flex items-center justify-center mt-3">
            {isVerified ? (
              <button
                onClick={handlePhoneCall}
                className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors bg-primary/10 hover:bg-primary/20 rounded-full px-2 py-1 text-xs font-medium shadow-sm"
                title={`Appeler ${name}`}
              >
                <Phone className="h-3 w-3" />
                <span className={isMobile ? 'text-xs' : isTablet ? 'text-xs' : 'text-sm'}>{phone}</span>
              </button>
            ) : (
              <button
                onClick={handlePhoneCall}
                className="flex items-center space-x-1 text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full px-2 py-1 cursor-pointer transition-colors text-xs font-medium shadow-sm"
                title="Matricule requis pour voir les coordonnées"
              >
                <Lock className="h-3 w-3" />
                <span className={isMobile ? 'text-xs' : isTablet ? 'text-xs' : 'text-sm'}>Matricule requis</span>
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
