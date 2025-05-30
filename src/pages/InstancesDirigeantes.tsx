
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import BureauExecutifSection from '@/components/instances/BureauExecutifSection';
import CommissairesSection from '@/components/instances/CommissairesSection';
import DeleguesRegionauxSection from '@/components/instances/DeleguesRegionauxSection';
import CommissionsSection from '@/components/instances/CommissionsSection';

const InstancesDirigeantes = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-primary text-white px-4 lg:px-[100px] py-12 lg:py-[100px]">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl lg:text-4xl md:text-5xl font-bold text-center mb-4">
              Instances Dirigeantes
            </h1>
            <p className="text-lg lg:text-xl text-center text-gray-200 max-w-3xl mx-auto">
              Découvrez le bureau exécutif et les commissions du Réseau P49 ENA
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-[100px] py-8 lg:py-[50px]">
          <Tabs defaultValue="bureau" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="bureau" className="text-base lg:text-lg">Bureau</TabsTrigger>
              <TabsTrigger value="commissions" className="text-base lg:text-lg">Commissions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bureau" className="space-y-0">
              <div className="lg:mx-[-100px]">
                <BureauExecutifSection />
                <CommissairesSection />
                <DeleguesRegionauxSection />
              </div>
            </TabsContent>
            
            <TabsContent value="commissions">
              <CommissionsSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default InstancesDirigeantes;
