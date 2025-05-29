
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
        <div className="bg-primary text-white px-[100px] py-[100px]">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Instances Dirigeantes
            </h1>
            <p className="text-xl text-center text-gray-200 max-w-3xl mx-auto">
              Découvrez le bureau exécutif et les commissions du Réseau P49 ENA
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="container mx-auto px-[100px] py-[100px]">
            <Tabs defaultValue="bureau" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="bureau" className="text-lg">Bureau</TabsTrigger>
                <TabsTrigger value="commissions" className="text-lg">Commissions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="bureau" className="w-full">
                <div className="w-full space-y-0 -mx-[100px]">
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
      </div>
    </Layout>
  );
};

export default InstancesDirigeantes;
