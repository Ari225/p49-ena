
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import BureauExecutifSection from '@/components/instances/BureauExecutifSection';
import CommissairesSection from '@/components/instances/CommissairesSection';
import DeleguesRegionauxSection from '@/components/instances/DeleguesRegionauxSection';
import CommissionsSection from '@/components/instances/CommissionsSection';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const InstancesDirigeantes = () => {
  const isMobile = useIsMobile();
  const isTab = useIsTablet();

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
            <Tabs defaultValue="bureau" className="w-full">
              <TabsList className="flex w-full mb-8 bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm border border-primary/20 p-1 rounded-2xl h-auto gap-1">
                <TabsTrigger 
                  value="bureau" 
                  className="flex-1 text-xs py-2 px-1 font-medium rounded-xl transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-primary/15 text-gray-700 border-0 min-w-0 text-center"
                >
                  Bureau
                </TabsTrigger>
                <TabsTrigger 
                  value="commissions" 
                  className="flex-1 text-xs py-2 px-1 font-medium rounded-xl transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-primary/15 text-gray-700 border-0 min-w-0 text-center"
                >
                  Commissions
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="bureau" className="space-y-0">
                <div className="space-y-8 pb-8">
                  <BureauExecutifSection />
                  <CommissairesSection />
                  <DeleguesRegionauxSection />
                </div>
              </TabsContent>
              
              <TabsContent value="commissions" className="pb-8">
                <CommissionsSection />
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Content Section - Tablet */}
        {isTab && (
          <div className="container mx-auto px-[50px] py-10">
            <Tabs defaultValue="bureau" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-10 bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm border border-primary/20 p-1 rounded-2xl h-18 justify-center items-center">
                <TabsTrigger 
                  value="bureau" 
                  className="text-lg py-4 px-6 font-semibold rounded-xl transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 hover:bg-primary/15 hover:scale-102 text-gray-700 border-0"
                >
                  Bureau Exécutif
                </TabsTrigger>
                <TabsTrigger 
                  value="commissions" 
                  className="text-lg py-4 px-6 font-semibold rounded-xl transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 hover:bg-primary/15 hover:scale-102 text-gray-700 border-0"
                >
                  Commissions
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="bureau" className="space-y-0">
                <div className="space-y-10 pb-10">
                  <BureauExecutifSection />
                  <CommissairesSection />
                  <DeleguesRegionauxSection />
                </div>
              </TabsContent>
              
              <TabsContent value="commissions" className="pb-10">
                <CommissionsSection />
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Content Section - Desktop */}
        {!isMobile && !isTab && (
          <div className="container mx-auto px-[100px] py-12">
            <Tabs defaultValue="bureau" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm border border-primary/20 p-1 rounded-2xl h-16 justify-center items-center">
                <TabsTrigger 
                  value="bureau" 
                  className="text-lg py-4 px-6 font-semibold rounded-xl transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 hover:bg-primary/15 hover:scale-102 text-gray-700 border-0"
                >
                  Bureau Exécutif
                </TabsTrigger>
                <TabsTrigger 
                  value="commissions" 
                  className="text-lg py-4 px-6 font-semibold rounded-xl transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 hover:bg-primary/15 hover:scale-102 text-gray-700 border-0"
                >
                  Commissions
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="bureau" className="space-y-0">
                <div className="space-y-8 pb-12">
                  <BureauExecutifSection />
                  <CommissairesSection />
                  <DeleguesRegionauxSection />
                </div>
              </TabsContent>
              
              <TabsContent value="commissions" className="pb-12">
                <CommissionsSection />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InstancesDirigeantes;
