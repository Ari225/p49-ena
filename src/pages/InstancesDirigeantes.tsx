
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import BureauExecutifSection from '@/components/instances/BureauExecutifSection';
import CommissairesSection from '@/components/instances/CommissairesSection';
import DeleguesRegionauxSection from '@/components/instances/DeleguesRegionauxSection';
import CommissionsSection from '@/components/instances/CommissionsSection';
import { useIsMobile } from '@/hooks/use-mobile';

const InstancesDirigeantes = () => {
  const isMobile = useIsMobile();

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section with Background Image */}
        <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/92f8a2dc-a96b-43e9-93dd-b8dec8af0527.png" 
              alt="Background instances dirigeantes" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold mb-4 md:mb-6 animate-fade-in`}>
              Instances Dirigeantes
            </h1>
            <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
              Découvrez le bureau exécutif et les commissions du Réseau P49 ENA
            </p>
          </div>
        </section>

        <div className={`container mx-auto ${isMobile ? 'px-[25px] py-8' : 'px-[100px] py-12'}`}>
          <Tabs defaultValue="bureau" className="w-full">
            <TabsList className={`grid w-full grid-cols-2 mb-8 bg-white shadow-lg border-0 p-2 rounded-xl ${isMobile ? 'h-auto' : 'h-14'}`}>
              <TabsTrigger 
                value="bureau" 
                className={`${isMobile ? 'text-base py-3' : 'text-lg py-4'} font-semibold rounded-lg transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-primary/10 text-gray-600`}
              >
                Bureau Exécutif
              </TabsTrigger>
              <TabsTrigger 
                value="commissions" 
                className={`${isMobile ? 'text-base py-3' : 'text-lg py-4'} font-semibold rounded-lg transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-primary/10 text-gray-600`}
              >
                Commissions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="bureau" className="space-y-0">
              <div className={`space-y-8 ${isMobile ? 'pb-8' : 'pb-12'}`}>
                <BureauExecutifSection />
                <CommissairesSection />
                <DeleguesRegionauxSection />
              </div>
            </TabsContent>
            
            <TabsContent value="commissions" className={isMobile ? 'pb-8' : 'pb-12'}>
              <CommissionsSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default InstancesDirigeantes;
