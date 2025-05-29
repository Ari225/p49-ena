
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MobileCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
}

const MobileCard: React.FC<MobileCardProps> = ({ 
  title, 
  children, 
  className = '', 
  compact = false 
}) => {
  return (
    <Card className={`w-full ${compact ? 'p-3' : 'p-4'} ${className}`}>
      {title && (
        <CardHeader className={compact ? 'pb-2' : 'pb-4'}>
          <CardTitle className={`text-primary ${compact ? 'text-lg' : 'text-xl'}`}>
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={compact ? 'p-0' : 'p-4'}>
        {children}
      </CardContent>
    </Card>
  );
};

export default MobileCard;
