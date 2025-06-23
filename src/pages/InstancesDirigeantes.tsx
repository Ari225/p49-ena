
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
      <div className="bg-gray-50 pb-0">
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
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-4' : 'px-8 lg:px-[100px]'}`}>
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold mb-4 md:mb-6 animate-fade-in`}>
              Instances Dirigeantes
            </h1>
            <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
              Découvrez le bureau exécutif et les commissions du Réseau P49 ENA
            </p>
          </div>
        </section>

        <div className={`container mx-auto ${isMobile ? 'px-[25px] py-8 pb-0' : 'px-[100px] py-12 pb-0'}`}>
          <Tabs defaultValue="bureau" className="w-full">
            <TabsList className={`grid w-full grid-cols-2 mb-8 ${isMobile ? 'h-auto' : ''}`}>
              <TabsTrigger value="bureau" className={`${isMobile ? 'text-base' : 'text-lg'} ${isMobile ? 'py-3' : ''}`}>Bureau</TabsTrigger>
              <TabsTrigger value="commissions" className={`${isMobile ? 'text-base' : 'text-lg'} ${isMobile ? 'py-3' : ''}`}>Commissions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bureau" className="space-y-0 pb-0">
              <div className="space-y-8 pb-0">
                <BureauExecutifSection />
                <CommissairesSection />
                <DeleguesRegionauxSection />
              </div>
            </TabsContent>
            
            <TabsContent value="commissions" className="pb-0">
              <CommissionsSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default InstancesDirigeantes;
