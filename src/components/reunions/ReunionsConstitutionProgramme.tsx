
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const ReunionsConstitutionProgramme = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Version Mobile
  if (isMobile) {
    return (
      <section className="py-8 bg-accent/10 px-[25px]">
        <div className="container mx-auto px-4">
          <h2 className="text-lg font-bold text-primary text-center mb-6">
            Programme Type d'une Réunion
          </h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Première Partie (1h30)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start">
                    <Clock className="h-3 w-3 mr-2 mt-0.5 text-primary" />
                    <div>
                      <strong>Accueil et présentation</strong>
                      <p className="text-gray-600">Tour de table</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-3 w-3 mr-2 mt-0.5 text-primary" />
                    <div>
                      <strong>Histoire de la P49</strong>
                      <p className="text-gray-600">Origines et évolution</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Deuxième Partie (1h30)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start">
                    <Clock className="h-3 w-3 mr-2 mt-0.5 text-primary" />
                    <div>
                      <strong>Organisation</strong>
                      <p className="text-gray-600">Structure et fonctionnement</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-3 w-3 mr-2 mt-0.5 text-primary" />
                    <div>
                      <strong>Échanges</strong>
                      <p className="text-gray-600">Networking</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  // Version Tablette
  if (isTablet) {
    return (
      <section className="py-12 bg-accent/10 px-[50px]">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-primary text-center mb-8">
            Programme Type d'une Réunion de Constitution
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Première Partie (1h30)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      <div>
                        <strong>Accueil et présentation</strong>
                        <p className="text-gray-600">Tour de table et présentation des participants</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      <div>
                        <strong>Histoire de la P49</strong>
                        <p className="text-gray-600">Présentation des origines et évolution</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      <div>
                        <strong>Valeurs et mission</strong>
                        <p className="text-gray-600">Exposé des principes fondamentaux</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Deuxième Partie (1h30)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      <div>
                        <strong>Organisation et statuts</strong>
                        <p className="text-gray-600">Structure et fonctionnement de l'association</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      <div>
                        <strong>Activités et services</strong>
                        <p className="text-gray-600">Présentation du programme d'activités</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      <div>
                        <strong>Échanges et networking</strong>
                        <p className="text-gray-600">Moment convivial et partage d'expériences</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Version Desktop
  return (
    <section className="py-16 bg-accent/10 px-[100px]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-primary text-center mb-8">
          Programme Type d'une Réunion de Constitution
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Première Partie (1h30)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                    <div>
                      <strong>Accueil et présentation</strong>
                      <p className="text-gray-600">Tour de table et présentation des participants</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                    <div>
                      <strong>Histoire de la P49</strong>
                      <p className="text-gray-600">Présentation des origines et évolution</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                    <div>
                      <strong>Valeurs et mission</strong>
                      <p className="text-gray-600">Exposé des principes fondamentaux</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deuxième Partie (1h30)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                    <div>
                      <strong>Organisation et statuts</strong>
                      <p className="text-gray-600">Structure et fonctionnement de l'association</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                    <div>
                      <strong>Activités et services</strong>
                      <p className="text-gray-600">Présentation du programme d'activités</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                    <div>
                      <strong>Échanges et networking</strong>
                      <p className="text-gray-600">Moment convivial et partage d'expériences</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReunionsConstitutionProgramme;
