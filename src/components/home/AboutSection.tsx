
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const AboutSection = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const isTab = useIsTablet();
  
  return (
    <section className={`bg-white py-12 md:py-16 lg:py-[100px] ${
      isMobile ? 'px-[25px]' : 
      isTab ? 'px-[50px]' :
      'px-8 md:px-12 lg:px-[100px]' // Desktop
    }`}>
      <div className={`container mx-auto ${
        isMobile ? 'px-0' : 
        isTab ? 'px-[40px]' :
        'px-4 md:px-[30px] lg:px-[50px]' // Desktop
      }`}>
        <div className={`flex flex-col items-center ${
          isMobile ? 'space-y-6' : 
          isTab ? 'space-y-8' :
          'md:space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12' // Desktop
        }`}>
          <div className={`${
            isMobile ? 'w-full flex justify-center' : 
            isTab ? 'w-full flex justify-center' :
            'w-full md:w-2/3 lg:w-1/3' // Desktop
          }`}>
            <img 
              src="/lovable-uploads/P49Grid.webp" 
              alt="P49" 
              className={`object-contain ${
                isMobile ? 'w-full h-full' : 
                isTab ? 'w-full h-full max-w-md' :
                'w-full h-full' // Desktop
              }`}
            />
          </div>
          <div className={`${
            isMobile ? 'w-full' : 
            isTab ? 'w-full' :
            'w-full lg:w-2/3' // Desktop
          }`}>
            <h2 className={`font-bold text-primary mb-6 md:mb-10 ${
              isMobile ? 'text-xl text-center' : 
              isTab ? 'text-2xl text-center' :
              'text-2xl md:text-3xl text-center lg:text-right' // Desktop
            }`}>
              {t('home.about_title')}
            </h2>
            <p className={`text-gray-700 leading-relaxed mb-6 md:mb-10 text-justify font-normal ${
              isMobile ? 'text-sm' : 
              isTab ? 'text-base' :
              'text-base' // Desktop
            }`}>
              {t('home.about_description')}
            </p>
            <div className={`flex ${
              isMobile ? 'justify-center' : 
              isTab ? 'justify-center' :
              'justify-center lg:justify-end' // Desktop
            }`}>
              <Button 
                asChild 
                className={`bg-primary text-white hover:bg-primary rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
                  isMobile ? 'w-full justify-center py-3 text-sm' : 
                  isTab ? 'px-6 py-3 text-base' :
                  'px-4 py-2 text-sm md:text-base' // Desktop
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
