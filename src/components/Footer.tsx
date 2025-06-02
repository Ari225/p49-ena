
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import FooterLogo from './footer/FooterLogo';
import FooterLinks from './footer/FooterLinks';
import FooterContact from './footer/FooterContact';
import FooterNewsletter from './footer/FooterNewsletter';
import FooterSocial from './footer/FooterSocial';

const Footer = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <footer className="bg-primary text-white px-[25px] py-[25px]">
        <div className="container mx-auto px-0">
          <FooterLogo />
          
          <div className="mb-6">
            <FooterLinks />
            <FooterContact />
            <FooterNewsletter />
          </div>

          <div className="flex flex-col items-center space-y-4">
            <FooterSocial />
            <div className="text-xs text-gray-400 text-center">
              © 2024 P49 ENA. {t('footer.rights')}.
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-primary text-white px-[100px] py-[50px]">
      <div className="container mx-auto px-0">
        <div className="flex grid-cols-1 lg:grid-cols-2 gap-[10px] w-full">
          <div className="flex flex-col w-[50%]">
            <FooterLogo />
          </div>

          <div className="flex grid-cols-1 md:grid-cols-3 gap-10 w-[1200px] mt-8">
            <div className="w-full">
              <FooterLinks />
            </div>
            <div className="w-full min-w-[50px]">
              <FooterContact />
            </div>
            <div className="w-full">
              <FooterNewsletter />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-400 mt-8 pt-4 border-t border-gray-600">
          <div>
            © 2024 P49 ENA. {t('footer.rights')}.
          </div>
          <FooterSocial />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
