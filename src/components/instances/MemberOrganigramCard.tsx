
import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import MemberDetailDialog from '../members/MemberDetailDialog';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getInitials = () => {
    const names = name.split(' ');
    return names.length >= 2 
      ? `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase()
      : name.charAt(0).toUpperCase();
  };

  const handlePhoneCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`tel:${phone}`, '_self');
  };

  const handleCardClick = () => {
    setIsDialogOpen(true);
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
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer" onClick={handleCardClick}>
        <CardContent className="p-6">
          {/* Photo */}
          <div className="flex justify-center mb-4">
            <Avatar className="h-20 w-20 ring-2 ring-gray-200 group-hover:ring-primary transition-colors">
              <AvatarImage 
                src="/lovable-uploads/05411ed6-4981-4ab2-a67d-bffd14b29202.png"
                alt={name}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary text-white text-lg font-semibold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Name */}
          <div className="text-center mb-3">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">
              {name}
            </h3>
          </div>

          {/* Position */}
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 font-medium">{position}</p>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-center">
            <button
              onClick={handlePhoneCall}
              className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
              title={`Appeler ${name}`}
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">{phone}</span>
            </button>
          </div>
        </CardContent>
      </Card>

      <MemberDetailDialog 
        member={memberData}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default MemberOrganigramCard;
