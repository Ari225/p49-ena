
import React from 'react';

interface MobileGridProps {
  children: React.ReactNode;
  columns?: 1 | 2;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

const MobileGrid: React.FC<MobileGridProps> = ({ 
  children, 
  columns = 1, 
  gap = 'md', 
  className = '' 
}) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2'
  };

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6'
  };

  return (
    <div className={`grid ${gridClasses[columns]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
};

export default MobileGrid;
