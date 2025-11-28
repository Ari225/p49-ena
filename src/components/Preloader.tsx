
import React, { useEffect, useState } from 'react';

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-primary/90 z-50 flex items-center justify-center">
      <div className="relative">
        {/* Logo */}
        <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
          <img 
            src="/lovable-uploads/logo.webp" 
            alt="P49 ENA Logo" 
            className="w-full h-full object-contain"
            width={128}
            height={128}
          />
        </div>
        
        {/* Animated Circle with increased padding */}
        <div className="absolute inset-0 scale-150">
          <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#DFBE36"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="70 200"
              strokeDashoffset="0"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
