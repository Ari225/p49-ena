
import React, { useState } from 'react';
import { optimizeImageForMobile } from '../utils/mobileHelpers';

interface MobileOptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  lazy?: boolean;
}

const MobileOptimizedImage: React.FC<MobileOptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  lazy = true
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const optimizedSrc = optimizeImageForMobile(src, width);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
      
      {!hasError ? (
        <img
          src={optimizedSrc}
          alt={alt}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={lazy ? 'lazy' : 'eager'}
          width={width}
          height={height}
        />
      ) : (
        <div 
          className="flex items-center justify-center bg-gray-100 text-gray-400 text-sm"
          style={{ width, height }}
        >
          Image non disponible
        </div>
      )}
    </div>
  );
};

export default MobileOptimizedImage;
