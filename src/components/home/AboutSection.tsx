
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-accent/30 py-[100px] px-[100px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
          <div className="lg:w-1/3">
            <img src="/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png" alt="P49 ENA Logo" className="w-60 h-60 mx-auto object-contain" />
          </div>
          <div className="lg:w-2/3">
            <h2 className="text-3xl font-bold text-primary mb-6 text-right">{t('home.about_title')}</h2>
            <p className="text-gray-700 leading-relaxed mb-6 text-base text-justify">
              {t('home.about_description')}
            </p>
            <div className="flex justify-end">
              <Button asChild className="bg-primary hover:bg-primary/90 border border-primary/20">
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
