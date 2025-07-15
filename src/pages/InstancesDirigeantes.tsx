
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
  const [activeTab, setActiveTab] = useState('bureau');

  return (
    <Layout>
      <div className="bg-white min-h-screen">
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
          <div className="container mx-auto px-[25px] py-16">
            <div className="flex gap-2 mb-4 p-1 bg-gray-100 rounded-lg">
              <Button
                variant={activeTab === 'bureau' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('bureau')}
                className="flex-1 text-xs py-2 px-3"
              >
                Bureau
              </Button>
              <Button
                variant={activeTab === 'commissions' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('commissions')}
                className="flex-1 text-xs py-2 px-3"
              >
                Commissions
              </Button>
            </div>
            
            {activeTab === 'bureau' && (
              <div className="space-y-4 pb-4">
                <BureauExecutifSection />
                <CommissairesSection />
                <DeleguesRegionauxSection />
              </div>
            )}
            
            {activeTab === 'commissions' && (
              <div className="pb-4">
                <CommissionsSection />
              </div>
            )}
          </div>
        )}

        {/* Content Section - Tablet */}
        {isTab && (
          <div className="container mx-auto px-[50px] py-20">
            <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg max-w-md mx-auto">
              <Button
                variant={activeTab === 'bureau' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('bureau')}
                className="flex-1 text-sm py-3 px-4"
              >
                Bureau Exécutif
              </Button>
              <Button
                variant={activeTab === 'commissions' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('commissions')}
                className="flex-1 text-sm py-3 px-4"
              >
                Commissions
              </Button>
            </div>
            
            {activeTab === 'bureau' && (
              <div className="space-y-6 pb-6">
                <BureauExecutifSection />
                <CommissairesSection />
                <DeleguesRegionauxSection />
              </div>
            )}
            
            {activeTab === 'commissions' && (
              <div className="pb-6">
                <CommissionsSection />
              </div>
            )}
          </div>
        )}

        {/* Content Section - Desktop */}
        {!isMobile && !isTab && (
          <div className="container mx-auto px-[100px] py-[100px]">
            <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg max-w-lg mx-auto">
              <Button
                variant={activeTab === 'bureau' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('bureau')}
                className="flex-1 text-sm py-3 px-6"
              >
                Bureau Exécutif
              </Button>
              <Button
                variant={activeTab === 'commissions' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('commissions')}
                className="flex-1 text-sm py-3 px-6"
              >
                Commissions
              </Button>
            </div>
            
            {activeTab === 'bureau' && (
              <div className="space-y-6 pb-8">
                <BureauExecutifSection />
                <CommissairesSection />
                <DeleguesRegionauxSection />
              </div>
            )}
            
            {activeTab === 'commissions' && (
              <div className="pb-8">
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
