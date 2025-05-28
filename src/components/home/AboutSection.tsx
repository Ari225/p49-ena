import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
const AboutSection = () => {
  const {
    t
  } = useLanguage();
  return <section className="bg-accent/30 py-12 md:py-16 lg:py-[100px] px-4 md:px-8 lg:px-[100px]">
      <div className="container mx-auto px-[50px]">
        <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-12">
          <div className="lg:w-1/3 w-full">
            <img src="/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png" alt="P49 ENA Logo" className="w-40 h-40 md:w-60 md:h-60 mx-auto object-contain" />
          </div>
          <div className="lg:w-2/3 w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 md:mb-6 text-center lg:text-right">
              {t('home.about_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base text-justify">
              {t('home.about_description')}
            </p>
            <div className="flex justify-center lg:justify-end">
              <Button asChild className="bg-primary hover:bg-primary/90 border border-primary/20 text-sm md:text-base px-4 md:px-6 py-2 md:py-3">
                <Link to="/historique">En savoir plus</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;