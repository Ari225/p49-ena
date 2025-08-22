
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Dimensions uniformes pour toutes les versions
  const cardHeightClass = isMobile ? '' : isTablet ? 'h-[200px]' : 'h-[280px]';
  const cardWidthClass = isMobile ? '' : isTablet ? 'max-w-[280px] mx-auto' : 'w-[300px] max-w-[300px]';

  return (
    <Card className={`group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-primary/20 hover:border-primary/40 bg-white/95 backdrop-blur-sm ${cardHeightClass} ${cardWidthClass}`}>
      <CardContent className={`${isMobile ? 'p-3' : isTablet ? 'p-3' : 'p-6'} h-full flex flex-col justify-center`}>
        {/* Contenu principal */}
        <div className="text-center space-y-2">
          {/* Nom */}
          <h3 className={`font-bold ${isMobile ? 'text-sm' : isTablet ? 'text-sm' : 'text-lg'} text-gray-900 group-hover:text-primary transition-colors leading-tight`}>
            {name}
          </h3>

          {/* Position */}
          <p className={`${isMobile ? 'text-xs' : isTablet ? 'text-xs' : 'text-sm'} text-gray-600 font-medium leading-snug px-1`}>
            {position}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberOrganigramCard;
