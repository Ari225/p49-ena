
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import FooterLogo from './footer/FooterLogo';
import FooterLinks from './footer/FooterLinks';
import FooterContact from './footer/FooterContact';
import FooterNewsletter from './footer/FooterNewsletter';
import FooterSocial from './footer/FooterSocial';

const Footer = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  if (isMobile) {
    return (
      <footer className="bg-primary text-white px-[25px] py-[25px]">
        <div className="container mx-auto px-0">
          <FooterLogo variant="mobile" />
          
          <div className="mb-6">
            <FooterLinks variant="mobile" />
            <FooterContact variant="mobile" />
            <FooterNewsletter variant="mobile" />
          </div>

          <div className="flex flex-col items-center space-y-4">
            <FooterSocial variant="mobile" />
            <div className="text-xs text-gray-400 text-center">
              © 2024 P49 ENA. {t('footer.rights')}.
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (isTablet) {
    return (
      <footer className="bg-primary text-white px-[50px] py-[40px]">
        <div className="container mx-auto px-0">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center">
              <FooterLogo variant="tablet" />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <FooterLinks variant="tablet" />
                <FooterContact variant="tablet" />
              </div>
              <div>
                <FooterNewsletter variant="tablet" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-400 mt-8 pt-4 border-t border-gray-600">
            <div>
              © 2024 P49 ENA. {t('footer.rights')}.
            </div>
            <FooterSocial variant="tablet" />
          </div>
        </div>
      </footer>
    );
  }

  // Desktop version
  return (
    <footer className="bg-primary text-white px-[100px] py-[50px]">
      <div className="container mx-auto px-0">
        <div className="flex grid-cols-1 lg:grid-cols-2 gap-[10px] w-full">
          <div className="flex flex-col w-[35%]">
            <FooterLogo variant="desktop" />
          </div>

          <div className="flex grid-cols-1 md:grid-cols-3 gap-12 w-[65%] mt-8 justify-between">
            <div className="flex-1">
              <FooterLinks variant="desktop" />
            </div>
            <div className="flex-1">
              <FooterContact variant="desktop" />
            </div>
            <div className="flex-1">
              <FooterNewsletter variant="desktop" />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-400 mt-8 pt-4 border-t border-gray-600">
          <div>
            © 2024 P49 ENA. {t('footer.rights')}.
          </div>
          <FooterSocial variant="desktop" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
