
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const AboutSection = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  return (
    <section className={`bg-accent/30 py-12 md:py-16 lg:py-[100px] ${
      // Mobile
      isMobile ? 'px-[25px]' : 
      // Tablet
      'px-8 md:px-12 ' +
      // Desktop
      'lg:px-[100px]'
    }`}>
      <div className={`container mx-auto ${
        // Mobile
        isMobile ? 'px-0' : 
        // Tablet
        'px-4 md:px-[30px] ' +
        // Desktop
        'lg:px-[50px]'
      }`}>
        <div className={`flex flex-col items-center ${
          // Mobile
          isMobile ? 'space-y-6' : 
          // Tablet
          'md:space-y-8 ' +
          // Desktop
          'lg:flex-row lg:space-y-0 lg:space-x-12'
        }`}>
          <div className={`${
            // Mobile
            isMobile ? 'w-full flex justify-center' : 
            // Tablet
            'w-full md:w-2/3 ' +
            // Desktop
            'lg:w-1/3'
          }`}>
            <img 
              src="/lovable-uploads/P49Grid.webp" 
              alt="P49" 
              className={`object-contain ${
                // Mobile
                isMobile ? 'w-full h-full' : 
                // Tablet & Desktop
                'w-full h-full'
              }`}
            />
          </div>
          <div className={`${
            // Mobile
            isMobile ? 'w-full' : 
            // Tablet
            'w-full ' +
            // Desktop
            'lg:w-2/3'
          }`}>
            <h2 className={`font-bold text-primary mb-6 md:mb-10 ${
              // Mobile
              isMobile ? 'text-xl text-center' : 
              // Tablet
              'text-2xl md:text-3xl text-center ' +
              // Desktop
              'lg:text-right'
            }`}>
              {t('home.about_title')}
            </h2>
            <p className={`text-gray-700 leading-relaxed mb-6 md:mb-10 text-justify font-normal ${
              // Mobile
              isMobile ? 'text-sm' : 
              // Tablet & Desktop
              'text-base'
            }`}>
              {t('home.about_description')}
            </p>
            <div className={`flex ${
              // Mobile
              isMobile ? 'justify-center' : 
              // Tablet
              'justify-center ' +
              // Desktop
              'lg:justify-end'
            }`}>
              <Button 
                asChild 
                className={`bg-primary text-white hover:bg-primary rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
                  // Mobile
                  isMobile ? 'w-full justify-center py-3 text-sm' : 
                  // Tablet & Desktop
                  'px-4 py-2 text-sm md:text-base'
                }`}
              >
                <Link to="/historique">
                  En savoir plus
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
