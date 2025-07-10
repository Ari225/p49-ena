
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

interface HeroSectionProps {
  backgroundImages: string[];
}

const HeroSection = ({ backgroundImages }: HeroSectionProps) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const isTab = useIsTablet();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section className={`relative flex items-center justify-center text-white overflow-hidden ${
      isMobile ? 'h-[60vh]' : 
      isTab ? 'h-[70vh]' :
      'h-screen' // Desktop
    }`}>
      {/* Background Images Carousel */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={image} alt={`Background ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>
      
      {/* Content */}
      <div className={`relative z-10 text-center w-full my-0 ${
        isMobile ? 'px-[25px] py-[50px]' : 
        isTab ? 'px-[50px] py-[60px]' :
        'lg:px-[100px]' // Desktop
      }`}>
        <h1 className={`font-bold mb-4 md:mb-6 animate-fade-in mt-10 ${
          isMobile ? 'text-3xl' : 
          isTab ? 'text-4xl' :
          'text-6xl md:text-6xl lg:text-6xl' // Desktop
        }`}>
          {t('home.hero_title')}
        </h1>
        <p className={`italic mb-6 md:mb-8 animate-fade-in text-white font-normal ${
          isMobile ? 'text-sm px-2' : 
          isTab ? 'text-base px-4' :
          'text-base md:text-lg px-4 lg:text-lg' // Desktop
        }`}>
          {t('home.hero_subtitle')}
        </p>
        <Button asChild className={`bg-secondary text-primary hover:bg-secondary/80 font-semibold ${
          isMobile ? 'px-6 py-2 text-sm' : 
          isTab ? 'px-7 py-2 text-base' :
          'px-6 md:px-8 py-2 md:py-3 text-base lg:text-lg' // Desktop
        }`}>
          <Link to="/historique">
            Notre histoire
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
