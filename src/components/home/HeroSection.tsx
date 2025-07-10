
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeroSectionProps {
  backgroundImages: string[];
}

const HeroSection = ({ backgroundImages }: HeroSectionProps) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section className={`relative flex items-center justify-center text-white overflow-hidden ${
      // Mobile
      isMobile ? 'h-[60vh]' : 
      // Tablet & Desktop
      'h-screen'
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
        // Mobile
        isMobile ? 'px-[25px] py-[50px]' : 
        // Tablet
        'md:px-[50px] md:py-[60px] ' +
        // Desktop
        'lg:px-[100px]'
      }`}>
        <h1 className={`font-bold mb-4 md:mb-6 animate-fade-in mt-10 ${
          // Mobile
          isMobile ? 'text-3xl' : 
          // Tablet
          'text-4xl md:text-5xl ' +
          // Desktop
          'lg:text-6xl'
        }`}>
          {t('home.hero_title')}
        </h1>
        <p className={`italic mb-6 md:mb-8 animate-fade-in text-white font-normal ${
          // Mobile
          isMobile ? 'text-sm px-2' : 
          // Tablet
          'text-base md:text-lg px-4 ' +
          // Desktop
          'lg:text-lg'
        }`}>
          {t('home.hero_subtitle')}
        </p>
        <Button asChild className={`bg-secondary text-primary hover:bg-secondary/80 font-semibold ${
          // Mobile
          isMobile ? 'px-6 py-2 text-sm' : 
          // Tablet
          'px-6 md:px-8 py-2 md:py-3 text-base ' +
          // Desktop
          'lg:text-lg'
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
