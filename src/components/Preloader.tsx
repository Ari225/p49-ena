
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
        <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
          <img 
            src="/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png" 
            alt="P49 ENA Logo" 
            className="w-full h-full object-contain"
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
