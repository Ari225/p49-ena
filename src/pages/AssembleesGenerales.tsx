
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import AssembleeCard from '@/components/assemblees/AssembleeCard';
import AssembleesInfoSection from '@/components/assemblees/AssembleesInfoSection';
import ProcessusDemocratiqueSection from '@/components/assemblees/ProcessusDemocratiqueSection';
import AssembleesHeader from '@/components/assemblees/AssembleesHeader';
import { assembleesPassees, assembleesFutures } from '@/components/assemblees/assembleesData';

const AssembleesGenerales = () => {
  const isMobile = useIsMobile();
  const isTab = useIsTablet();
  const [selectedTab, setSelectedTab] = useState('prochaines');

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <AssembleesHeader />
        
        <AssembleesInfoSection />

        {/* Contenu principal */}
        <section className={`py-16 ${
          isMobile ? 'px-[25px]' : 
          isTab ? 'px-[50px]' :
          'px-[100px]' // Desktop
        }`}>
          <div className="container mx-auto px-4">
            {/* Onglets */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 max-w-md">
              <Button
                variant={selectedTab === 'prochaines' ? 'default' : 'ghost'}
                onClick={() => setSelectedTab('prochaines')}
                className="flex-1"
              >
                Prochaines
              </Button>
              <Button
                variant={selectedTab === 'passees' ? 'default' : 'ghost'}
                onClick={() => setSelectedTab('passees')}
                className="flex-1"
              >
                Passées
              </Button>
            </div>

            {/* Contenu des onglets */}
            {selectedTab === 'prochaines' && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">Prochaines Assemblées</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {assembleesFutures.map((assemblee) => (
                    <AssembleeCard key={assemblee.id} assemblee={assemblee} />
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'passees' && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">Assemblées Passées</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {assembleesPassees.map((assemblee) => (
                    <AssembleeCard key={assemblee.id} assemblee={assemblee} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <ProcessusDemocratiqueSection />
      </div>
    </Layout>
  );
};

export default AssembleesGenerales;
