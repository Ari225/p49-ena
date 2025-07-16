
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import AssembleeCard from '@/components/assemblees/AssembleeCard';
import AssembleesInfoSection from '@/components/assemblees/AssembleesInfoSection';
import ProcessusDemocratiqueSection from '@/components/assemblees/ProcessusDemocratiqueSection';
import AssembleesHeader from '@/components/assemblees/AssembleesHeader';
import { assembleesPassees, assembleesFutures } from '@/components/assemblees/assembleesData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AssembleesGenerales = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [selectedTab, setSelectedTab] = useState('prochaines');

  // Mobile Version
  if (isMobile) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <AssembleesHeader />

          {/* Contenu principal Mobile */}
          <section className="py-16 px-[25px]">
            <div className="container mx-auto px-4">
              {/* Onglets Mobile */}
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="prochaines" className="text-sm">Prochaines</TabsTrigger>
                  <TabsTrigger value="passees" className="text-sm">Passées</TabsTrigger>
                </TabsList>

                <TabsContent value="prochaines">
                  <h2 className="text-xl font-bold text-primary mb-6">Prochaines Assemblées</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {assembleesFutures.map((assemblee) => (
                      <AssembleeCard key={assemblee.id} assemblee={assemblee} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="passees">
                  <h2 className="text-xl font-bold text-primary mb-6">Assemblées Passées</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {assembleesPassees.map((assemblee) => (
                      <AssembleeCard key={assemblee.id} assemblee={assemblee} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>

          <AssembleesInfoSection />
          <ProcessusDemocratiqueSection />
        </div>
      </Layout>
    );
  }

  // Tablet Version
  if (isTablet) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <AssembleesHeader />

          {/* Contenu principal Tablet */}
          <section className="py-16 px-[50px]">
            <div className="container mx-auto px-4">
              {/* Onglets Tablet */}
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
                  <TabsTrigger value="prochaines" className="text-base">Prochaines</TabsTrigger>
                  <TabsTrigger value="passees" className="text-base">Passées</TabsTrigger>
                </TabsList>

                <TabsContent value="prochaines">
                  <h2 className="text-2xl font-bold text-primary mb-6">Prochaines Assemblées</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {assembleesFutures.map((assemblee) => (
                      <AssembleeCard key={assemblee.id} assemblee={assemblee} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="passees">
                  <h2 className="text-2xl font-bold text-primary mb-6">Assemblées Passées</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {assembleesPassees.map((assemblee) => (
                      <AssembleeCard key={assemblee.id} assemblee={assemblee} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>

          <AssembleesInfoSection />
          <ProcessusDemocratiqueSection />
        </div>
      </Layout>
    );
  }

  // Desktop Version
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <AssembleesHeader />

        {/* Contenu principal Desktop */}
        <section className="py-16 px-[100px]">
          <div className="container mx-auto px-4">
            {/* Onglets Desktop */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
                <TabsTrigger value="prochaines" className="text-base">Prochaines</TabsTrigger>
                <TabsTrigger value="passees" className="text-base">Passées</TabsTrigger>
              </TabsList>

              <TabsContent value="prochaines">
                <h2 className="text-2xl font-bold text-primary mb-6">Prochaines Assemblées</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {assembleesFutures.map((assemblee) => (
                    <AssembleeCard key={assemblee.id} assemblee={assemblee} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="passees">
                <h2 className="text-2xl font-bold text-primary mb-6">Assemblées Passées</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {assembleesPassees.map((assemblee) => (
                    <AssembleeCard key={assemblee.id} assemblee={assemblee} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <AssembleesInfoSection />
        <ProcessusDemocratiqueSection />
      </div>
    </Layout>
  );
};

export default AssembleesGenerales;
