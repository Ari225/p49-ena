
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const AboutSection = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  return (
    <section className={`bg-accent/30 py-12 md:py-16 lg:py-[100px] ${isMobile ? 'px-[25px]' : 'px-4 md:px-8 lg:px-[100px]'}`}>
      <div className={`container mx-auto ${isMobile ? 'px-0' : 'px-[50px]'}`}>
        <div className={`flex flex-col ${isMobile ? 'space-y-6' : 'lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-12'}`}>
          <div className={`${isMobile ? 'w-full flex justify-center' : 'lg:w-1/3 w-full'}`}>
            <img 
              src="/lovable-uploads/A propos.webp" 
              alt="à propos" 
              className={`${isMobile ? 'w-32 h-32' : 'w-70 h-auto md:w-60 md:h-60'} object-contain`}
            />
          </div>
          <div className={`${isMobile ? 'w-full' : 'lg:w-2/3 w-full'}`}>
            <h2 className={`text-2xl md:text-3xl font-bold text-primary mb-6 md:mb-10 text-center ${isMobile ? '' : 'lg:text-right'}`}>
              {t('home.about_title')}
            </h2>
            <p className={`text-gray-700 leading-relaxed mb-6 md:mb-10 ${isMobile ? 'text-sm' : 'text-base md:text-base'} text-justify font-normal`}>
              {t('home.about_description')}
            </p>
            <div className={`flex ${isMobile ? 'justify-center' : 'justify-center lg:justify-end'}`}>
              <Button 
                asChild 
                className={`bg-primary text-white hover:bg-primary rounded flex items-center text-sm md:text-base transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${isMobile ? 'w-full justify-center py-3' : 'px-4 py-2'}`}
              >
                <Link to="/historique">En savoir plus</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
