
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const ObjectifsSection = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Mobile Version
  if (isMobile) {
    return (
      <section className="py-16 px-[25px] bg-white">
        <div className="container mx-auto px-0">
          <div className="text-center mb-[25px] md:mb-[25px]">
            <h2 className="text-xl font-bold text-primary mb-[50px] md:mb-[50px]">
              Objets de l'association P49-ENA
            </h2>
            <p className="text-xs text-gray-700 max-w-4xl mx-auto">
              De manière globale, la P49-ENA a pour objectif de fédérer les forces et les énergies de chacun de ses membres dans un réseau fort.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <p className="text-xs text-center text-gray-700 mb-[10px] md:mb-[10px]">
                De manière particulière, elle a pour <strong>objets :</strong>
              </p>
              
              <div className="grid grid-cols-1 gap-6">
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-4">
                    <div className="space-y-4 text-gray-700 text-xs">
                      <div className="flex items-start">
                        <span className="text-secondary mr-3 text-xl">•</span>
                        <span><strong>développer</strong> entre ses membres des relations amicales, d'entraide, de solidarité et de convivialité.</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-secondary mr-3 text-xl">•</span>
                        <span><strong>d'établir</strong> une cartographie professionnelle actualisée de ses membres.</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-secondary mr-3 text-xl">•</span>
                        <span><strong>d'œuvrer</strong> au renforcement des capacités de ses membres.</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-secondary mr-3 text-xl">•</span>
                        <span><strong>d'œuvrer</strong> à la promotion de ses membres à tous les niveaux de l'Administration.</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-secondary mr-3 text-xl">•</span>
                        <span><strong>de créer</strong> des cadres de partage d'expériences professionnelles.</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-secondary mr-3 text-xl">•</span>
                        <span><strong>de positionner</strong> le réseau comme un partenaire technique et social de l'ENA et de l'Administration ivoirienne.</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-8">
                  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-4">
                      <div className="bg-secondary text-primary font-bold text-sm px-4 py-2 rounded-lg mb-4">
                        Au titre des actions sociales
                      </div>
                      <div className="space-y-3 text-gray-700 text-xs">
                        <div className="flex items-start">
                          <span className="text-primary mr-2">☐</span>
                          <span><strong>Renouer et renforcer</strong> le contact avec les condisciples de la P49.</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-primary mr-2">☐</span>
                          <span><strong>Organiser</strong> des activités récréatives.</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-primary mr-2">☐</span>
                          <span><strong>Apporter</strong> un soutien moral et financier éventuellement en cas d'événements heureux ou malheureux.</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-4">
                      <div className="bg-secondary text-primary font-bold text-sm px-4 py-2 rounded-lg mb-4">
                        Au titre des activités relatives au domaine professionnel
                      </div>
                      <div className="space-y-3 text-gray-700 text-xs">
                        <div className="flex items-start">
                          <span className="text-primary mr-2">☐</span>
                          <span><strong>Établir</strong> une cartographie professionnelle des condisciples de la P49 dans l'Administration.</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-primary mr-2">☐</span>
                          <span><strong>Élaborer</strong> un compendium des compétences des condisciples de la P49.</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-primary mr-2">☐</span>
                          <span><strong>Œuvrer</strong> au renforcement des capacités des condisciples de la P49.</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-primary mr-2">☐</span>
                          <span><strong>Créer</strong> un cadre de Partage des expériences professionnelles.</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-primary mr-2">☐</span>
                          <span><strong>Positionner</strong> la P49 comme un partenaire social de l'ENA et des services de l'Administration publique ivoirienne.</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Tablet Version
  if (isTablet) {
    return (
      <section className="py-20 px-[50px] bg-white">
        <div className="container mx-auto px-0">
          <div className="text-center mb-[25px] md:mb-[25px]">
            <h2 className="text-2xl font-bold text-primary mb-[50px] md:mb-[50px]">
              Objets de l'association P49-ENA
            </h2>
            <p className="text-sm text-gray-700 max-w-4xl mx-auto">
              De manière globale, la P49-ENA a pour objectif de fédérer les forces et les énergies de chacun de ses membres dans un réseau fort.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <p className="text-sm text-gray-700 mb-[10px] md:mb-[10px]">
                De manière particulière, elle a pour <strong>objets :</strong>
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4 text-gray-700 text-sm">
                      <div className="flex items-start">
                        <span className="text-secondary mr-3 text-xl">•</span>
                        <span><strong>développer</strong> entre ses membres des relations amicales, d'entraide, de solidarité et de convivialité.</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-secondary mr-3 text-xl">•</span>
                        <span><strong>d'établir</strong> une cartographie professionnelle actualisée de ses membres.</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-secondary mr-3 text-xl">•</span>
                        <span><strong>d'œuvrer</strong> au renforcement des capacités de ses membres.</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-secondary mr-3 text-xl">•</span>
                        <span><strong>d'œuvrer</strong> à la promotion de ses membres à tous les niveaux de l'Administration.</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-secondary mr-3 text-xl">•</span>
                        <span><strong>de créer</strong> des cadres de partage d'expériences professionnelles.</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-secondary mr-3 text-xl">•</span>
                        <span><strong>de positionner</strong> le réseau comme un partenaire technique et social de l'ENA et de l'Administration ivoirienne.</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-8">
                  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="bg-secondary text-primary font-bold text-base px-4 py-2 rounded-lg mb-4">
                        Au titre des actions sociales
                      </div>
                      <div className="space-y-3 text-gray-700 text-sm">
                        <div className="flex items-start">
                          <span className="text-primary mr-2">☐</span>
                          <span><strong>Renouer et renforcer</strong> le contact avec les condisciples de la P49.</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-primary mr-2">☐</span>
                          <span><strong>Organiser</strong> des activités récréatives.</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-primary mr-2">☐</span>
                          <span><strong>Apporter</strong> un soutien moral et financier éventuellement en cas d'événements heureux ou malheureux.</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="bg-secondary text-primary font-bold text-base px-4 py-2 rounded-lg mb-4">
                        Au titre des activités relatives au domaine professionnel
                      </div>
                      <div className="space-y-3 text-gray-700 text-sm">
                        <div className="flex items-start">
                          <span className="text-primary mr-2">☐</span>
                          <span><strong>Établir</strong> une cartographie professionnelle des condisciples de la P49 dans l'Administration.</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-primary mr-2">☐</span>
                          <span><strong>Élaborer</strong> un compendium des compétences des condisciples de la P49.</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-primary mr-2">☐</span>
                          <span><strong>Œuvrer</strong> au renforcement des capacités des condisciples de la P49.</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-primary mr-2">☐</span>
                          <span><strong>Créer</strong> un cadre de Partage des expériences professionnelles.</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-primary mr-2">☐</span>
                          <span><strong>Positionner</strong> la P49 comme un partenaire social de l'ENA et des services de l'Administration publique ivoirienne.</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop Version
  return (
    <section className="py-[100px] px-8 md:px-[100px] bg-white">
      <div className="container mx-auto px-0">
        <div className="text-center mb-[25px] md:mb-[25px]">
          <h2 className="text-3xl font-bold text-primary mb-[50px] md:mb-[50px]">
            Objet de l'association P49-ENA
          </h2>
          <p className="text-base text-gray-700 max-w-4xl mx-auto">
            De manière globale, la P49-ENA a pour objectif de fédérer les forces et les énergies de chacun de ses membres dans un réseau fort.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-base text-gray-700 mb-[10px] md:mb-[10px]">
              De manière particulière, elle a pour <strong>objets :</strong>
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="space-y-4 text-gray-700 text-base">
                    <div className="flex items-start">
                      <span className="text-secondary mr-3 text-xl">•</span>
                      <span><strong>développer</strong> entre ses membres des relations amicales, d'entraide, de solidarité et de convivialité.</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-secondary mr-3 text-xl">•</span>
                      <span><strong>d'établir</strong> une cartographie professionnelle actualisée de ses membres.</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-secondary mr-3 text-xl">•</span>
                      <span><strong>d'œuvrer</strong> au renforcement des capacités de ses membres.</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-secondary mr-3 text-xl">•</span>
                      <span><strong>d'œuvrer</strong> à la promotion de ses membres à tous les niveaux de l'Administration.</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-secondary mr-3 text-xl">•</span>
                      <span><strong>de créer</strong> des cadres de partage d'expériences professionnelles.</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-secondary mr-3 text-xl">•</span>
                      <span><strong>de positionner</strong> le réseau comme un partenaire technique et social de l'ENA et de l'Administration ivoirienne.</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="bg-secondary text-primary font-bold text-base px-4 py-2 rounded-lg mb-4">
                      Au titre des actions sociales
                    </div>
                    <div className="space-y-3 text-gray-700 text-base">
                      <div className="flex items-start">
                        <span className="text-primary mr-2">☐</span>
                        <span><strong>Renouer et renforcer</strong> le contact avec les condisciples de la P49.</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-primary mr-2">☐</span>
                        <span><strong>Organiser</strong> des activités récréatives.</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-primary mr-2">☐</span>
                        <span><strong>Apporter</strong> un soutien moral et financier éventuellement en cas d'événements heureux ou malheureux.</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="bg-secondary text-primary font-bold text-base px-4 py-2 rounded-lg mb-4">
                      Au titre des activités relatives au domaine professionnel
                    </div>
                    <div className="space-y-3 text-gray-700 text-base">
                      <div className="flex items-start">
                        <span className="text-primary mr-2">☐</span>
                        <span><strong>Établir</strong> une cartographie professionnelle des condisciples de la P49 dans l'Administration.</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-primary mr-2">☐</span>
                        <span><strong>Élaborer</strong> un compendium des compétences des condisciples de la P49.</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-primary mr-2">☐</span>
                        <span><strong>Œuvrer</strong> au renforcement des capacités des condisciples de la P49.</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-primary mr-2">☐</span>
                        <span><strong>Créer</strong> un cadre de Partage des expériences professionnelles.</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-primary mr-2">☐</span>
                        <span><strong>Positionner</strong> la P49 comme un partenaire social de l'ENA et des services de l'Administration publique ivoirienne.</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ObjectifsSection;
