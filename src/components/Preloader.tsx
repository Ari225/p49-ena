
import React, { useEffect, useState } from 'react';

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-primary/90 z-50 flex items-center justify-center">
      <div className="relative">
        {/* Logo */}
        <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
          <img 
            src="/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png" 
            alt="P49 ENA Logo" 
            className="w-12 h-12 md:w-16 md:h-16 object-contain"
          />
        </div>
        
        {/* Animated Circle */}
        <div className="absolute inset-0">
          <svg className="w-200 h-200 animate-spin" viewBox="0 0 100 100">
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
