
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

              {/* Contenu des onglets Mobile */}
              {selectedTab === 'prochaines' && (
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-6">Prochaines Assemblées</h2>
                  <div className="grid grid-cols-1 gap-6">
                    {assembleesFutures.map((assemblee) => (
                      <AssembleeCard key={assemblee.id} assemblee={assemblee} />
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === 'passees' && (
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-6">Assemblées Passées</h2>
                  <div className="grid grid-cols-1 gap-6">
                    {assembleesPassees.map((assemblee) => (
                      <AssembleeCard key={assemblee.id} assemblee={assemblee} />
                    ))}
                  </div>
                </div>
              )}
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

          {/* Contenu principal Tablette */}
          <section className="py-16 px-[50px]">
            <div className="container mx-auto px-4">
              {/* Onglets Tablette */}
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

              {/* Contenu des onglets Tablette */}
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

            {/* Contenu des onglets Desktop */}
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

        <AssembleesInfoSection />
        <ProcessusDemocratiqueSection />
      </div>
    </Layout>
  );
};

export default AssembleesGenerales;
