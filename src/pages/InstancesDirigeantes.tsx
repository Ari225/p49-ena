
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import BureauExecutifSection from '@/components/instances/BureauExecutifSection';
import CommissairesSection from '@/components/instances/CommissairesSection';
import DeleguesRegionauxSection from '@/components/instances/DeleguesRegionauxSection';
import CommissionsSection from '@/components/instances/CommissionsSection';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const InstancesDirigeantes = () => {
  const isMobile = useIsMobile();
  const isTab = useIsTablet();
  const [selectedTab, setSelectedTab] = useState('bureau');

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section with Background Image - Mobile */}
        {isMobile && (
          <section className="relative h-[30vh] flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="/lovable-uploads/inst_dir_bg.webp" 
                alt="Background instances dirigeantes" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-primary/80"></div>
            </div>
            
            <div className="relative z-10 text-center px-[25px]">
              <h1 className="text-2xl font-bold mb-[10px] md:mb-[10px] animate-fade-in">
                Instances dirigeantes
              </h1>
              <p className="text-sm italic mb-4 animate-fade-in text-white font-normal max-w-3xl mx-auto">
                Découvrez le bureau exécutif et les commissions du réseau
              </p>
            </div>
          </section>
        )}

        {/* Hero Section with Background Image - Tablet */}
        {isTab && (
          <section className="relative h-[45vh] flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="/lovable-uploads/inst_dir_bg.webp" 
                alt="Background instances dirigeantes" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-primary/80"></div>
            </div>
            
            <div className="relative z-10 text-center px-[50px]">
              <h1 className="text-4xl font-bold mb-[10px] md:mb-[10px] animate-fade-in">
                Instances dirigeantes
              </h1>
              <p className="text-base italic mb-5 animate-fade-in text-white font-normal max-w-3xl mx-auto">
                Découvrez le bureau exécutif et les commissions du réseau
              </p>
            </div>
          </section>
        )}

        {/* Hero Section with Background Image - Desktop */}
        {!isMobile && !isTab && (
          <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="/lovable-uploads/inst_dir_bg.webp" 
                alt="Background instances dirigeantes" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-primary/80"></div>
            </div>
            
            <div className="relative z-10 text-center px-8 lg:px-[100px]">
              <h1 className="text-6xl md:text-6xl lg:text-6xl font-bold mb-[10px] md:mb-[10px] animate-fade-in">
                Instances dirigeantes
              </h1>
              <p className="text-lg md:text-lg italic mb-4 md:mb-6 animate-fade-in text-white font-normal max-w-3xl mx-auto">
                Découvrez le bureau exécutif et les commissions du réseau
              </p>
            </div>
          </section>
        )}

        {/* Content Section - Mobile */}
        {isMobile && (
          <div className="container mx-auto px-[25px] py-8">
            {/* Onglets centrés */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md">
                <Button
                  variant={selectedTab === 'bureau' ? 'default' : 'ghost'}
                  onClick={() => setSelectedTab('bureau')}
                  className="flex-1"
                >
                  Bureau
                </Button>
                <Button
                  variant={selectedTab === 'commissions' ? 'default' : 'ghost'}
                  onClick={() => setSelectedTab('commissions')}
                  className="flex-1"
                >
                  Commissions
                </Button>
              </div>
            </div>

            {/* Contenu des onglets */}
            {selectedTab === 'bureau' && (
              <div className="space-y-8 pb-8">
                <BureauExecutifSection />
                <CommissairesSection />
                <DeleguesRegionauxSection />
              </div>
            )}

            {selectedTab === 'commissions' && (
              <div className="pb-8">
                <CommissionsSection />
              </div>
            )}
          </div>
        )}

        {/* Content Section - Tablet */}
        {isTab && (
          <div className="container mx-auto px-[50px] py-10">
            {/* Onglets centrés */}
            <div className="flex justify-center mb-10">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md">
                <Button
                  variant={selectedTab === 'bureau' ? 'default' : 'ghost'}
                  onClick={() => setSelectedTab('bureau')}
                  className="flex-1 text-lg py-4 px-6"
                >
                  Bureau Exécutif
                </Button>
                <Button
                  variant={selectedTab === 'commissions' ? 'default' : 'ghost'}
                  onClick={() => setSelectedTab('commissions')}
                  className="flex-1 text-lg py-4 px-6"
                >
                  Commissions
                </Button>
              </div>
            </div>

            {/* Contenu des onglets */}
            {selectedTab === 'bureau' && (
              <div className="space-y-10 pb-10">
                <BureauExecutifSection />
                <CommissairesSection />
                <DeleguesRegionauxSection />
              </div>
            )}

            {selectedTab === 'commissions' && (
              <div className="pb-10">
                <CommissionsSection />
              </div>
            )}
          </div>
        )}

        {/* Content Section - Desktop */}
        {!isMobile && !isTab && (
          <div className="container mx-auto px-[100px] py-12">
            {/* Onglets centrés */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md">
                <Button
                  variant={selectedTab === 'bureau' ? 'default' : 'ghost'}
                  onClick={() => setSelectedTab('bureau')}
                  className="flex-1 text-lg py-4 px-6"
                >
                  Bureau Exécutif
                </Button>
                <Button
                  variant={selectedTab === 'commissions' ? 'default' : 'ghost'}
                  onClick={() => setSelectedTab('commissions')}
                  className="flex-1 text-lg py-4 px-6"
                >
                  Commissions
                </Button>
              </div>
            </div>

            {/* Contenu des onglets */}
            {selectedTab === 'bureau' && (
              <div className="space-y-8 pb-12">
                <BureauExecutifSection />
                <CommissairesSection />
                <DeleguesRegionauxSection />
              </div>
            )}

            {selectedTab === 'commissions' && (
              <div className="pb-12">
                <CommissionsSection />
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InstancesDirigeantes;
