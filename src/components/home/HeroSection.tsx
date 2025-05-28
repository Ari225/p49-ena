import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
interface HeroSectionProps {
  backgroundImages: string[];
}
const HeroSection = ({
  backgroundImages
}: HeroSectionProps) => {
  const {
    t
  } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);
  return <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Images Carousel */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}>
            <img src={image} alt={`Background ${index + 1}`} className="w-full h-full object-cover" />
          </div>)}
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center w-full px-4 md:px-8 lg:px-[100px] my-0 py-0">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fade-in mt-10">
          {t('home.hero_title')}
        </h1>
        <p className="text-sm md:text-lg italic mb-6 md:mb-8 animate-fade-in text-white font-normal px-4 lg:text-lg">
          {t('home.hero_subtitle')}
        </p>
        <Button asChild className="bg-secondary text-white hover:bg-secondary/80 font-semibold px-4 md:px-8 py-2 md:py-3 text-sm md:text-lg">
          <Link to="/historique" className="text-white bg-secondary">Notre histoire</Link>
        </Button>
      </div>
    </section>;
};
export default HeroSection;