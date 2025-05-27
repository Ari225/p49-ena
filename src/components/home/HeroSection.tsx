
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  backgroundImages: string[];
}

const HeroSection = ({ backgroundImages }: HeroSectionProps) => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Images Carousel */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}>
            <img src={image} alt={`Background ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center w-full px-[100px] my-0 py-0">
        <h1 className="text-4xl font-bold mb-6 animate-fade-in md:text-6xl">
          {t('home.hero_title')}
        </h1>
        <p className="text-xl italic mb-8 animate-fade-in text-white md:text-xl font-normal">
          {t('home.hero_subtitle')}
        </p>
        <Button asChild className="bg-primary text-white hover:bg-primary/80 border-1.5 border-white font-semibold px-8 py-3 text-lg">
          <Link to="/historique" className="text-white">Notre histoire</Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
