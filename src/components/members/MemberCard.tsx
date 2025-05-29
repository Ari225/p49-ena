
import React from 'react';
import { Facebook, Instagram, Linkedin, MapPin, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

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
  const { firstName, lastName, position, locality, photo, socialMedia } = member;
  
  const getInitials = () => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-6">
        {/* Photo */}
        <div className="flex justify-center mb-4">
          <Avatar className="h-20 w-20 ring-2 ring-gray-200 group-hover:ring-primary transition-colors">
            <AvatarImage 
              src={photo} 
              alt={`${firstName} ${lastName}`}
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
            {firstName} {lastName}
          </h3>
        </div>

        {/* Position */}
        <div className="flex items-center justify-center mb-2 text-gray-600">
          <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="text-sm text-center">{position}</span>
        </div>

        {/* Location */}
        <div className="flex items-center justify-center mb-4 text-gray-600">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="text-sm">{locality}</span>
        </div>

        {/* Social Media */}
        <div className="flex justify-center space-x-3">
          {socialMedia.facebook && (
            <button
              onClick={() => handleSocialClick(socialMedia.facebook!)}
              className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              title="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </button>
          )}
          {socialMedia.instagram && (
            <button
              onClick={() => handleSocialClick(socialMedia.instagram!)}
              className="p-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-colors"
              title="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </button>
          )}
          {socialMedia.linkedin && (
            <button
              onClick={() => handleSocialClick(socialMedia.linkedin!)}
              className="p-2 rounded-full bg-blue-800 text-white hover:bg-blue-900 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberCard;
