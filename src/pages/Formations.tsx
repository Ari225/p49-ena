
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Clock, Users, Award } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { useCareerAnnouncements } from '@/hooks/useCareerAnnouncements';

const Formations = () => {
  const isMobile = useIsMobile();
  const isTab = useIsTablet();
  const navigate = useNavigate();
  const { announcements, loading } = useCareerAnnouncements();

  // Filtrer seulement les annonces de formations
  const formations = announcements.filter(announcement => announcement.category === 'Formations');

  const handleInscription = () => {
    navigate('/contact');
  };

  const getDefaultIcon = () => GraduationCap;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section - Mobile */}
        {isMobile && (
          <section className="relative h-[30vh] flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="/lovable-uploads/actualites_bg.webp" 
                alt="Background formations" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-primary/80"></div>
            </div>
            
            <div className="relative z-10 text-center px-[25px]">
              <h1 className="text-2xl font-bold mb-2 animate-fade-in">
                Formations
              </h1>
              <p className="text-sm italic mb-4 animate-fade-in text-white font-normal max-w-3xl mx-auto">
                Développez vos compétences professionnelles avec nos programmes de formation adaptés
              </p>
            </div>
          </section>
        )}

        {/* Header Section - Tablet */}
        {isTab && (
          <section className="relative h-[45vh] flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="/lovable-uploads/actualites_bg.webp" 
                alt="Background formations" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-primary/80"></div>
            </div>
            
            <div className="relative z-10 text-center px-[50px]">
              <h1 className="text-3xl font-bold mb-3 animate-fade-in">
                Formations
              </h1>
              <p className="text-base italic mb-5 animate-fade-in text-white font-normal max-w-3xl mx-auto">
                Développez vos compétences professionnelles avec nos programmes de formation adaptés
              </p>
            </div>
          </section>
        )}

        {/* Header Section - Desktop */}
        {!isMobile && !isTab && (
          <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="/lovable-uploads/actualites_bg.webp" 
                alt="Background formations" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-primary/80"></div>
            </div>
            
            <div className="relative z-10 text-center px-8 lg:px-[100px]">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-4 animate-fade-in">
                Formations
              </h1>
              <p className="text-lg md:text-xl italic mb-4 md:mb-6 animate-fade-in text-white font-normal max-w-3xl mx-auto">
                Développez vos compétences professionnelles avec nos programmes de formation adaptés
              </p>
            </div>
          </section>
        )}

        {/* Content Section - Mobile */}
        {isMobile && (
          <div className="container mx-auto py-12 px-[25px]">
            {loading ? (
              <div className="text-center">Chargement des formations...</div>
            ) : formations.length === 0 ? (
              <div className="text-center text-gray-500">Aucune formation disponible pour le moment.</div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {formations.map((formation, index) => {
                  const IconComponent = getDefaultIcon();
                  return (
                    <Card key={formation.id || index} className="hover:shadow-xl transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-primary text-lg">{formation.title}</CardTitle>
                            {formation.niveau && <span className="text-sm text-gray-500">{formation.niveau}</span>}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{formation.description}</p>
                        
                        {/* Informations supplémentaires */}
                        <div className="mt-4 space-y-2 text-sm">
                          {formation.niveau && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Niveau:</span>
                              <span className="ml-2">{formation.niveau}</span>
                            </div>
                          )}
                          {formation.date_debut && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Date de début:</span>
                              <span className="ml-2">{new Date(formation.date_debut).toLocaleDateString('fr-FR')}</span>
                            </div>
                          )}
                          {formation.type_formation && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Type:</span>
                              <span className="ml-2">{formation.type_formation}</span>
                            </div>
                          )}
                          {formation.lieu && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Lieu:</span>
                              <span className="ml-2">{formation.lieu}</span>
                            </div>
                          )}
                          {formation.format && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Format:</span>
                              <span className="ml-2">{formation.format}</span>
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                          {formation.duree_formation && (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {formation.duree_formation.includes('jour') ? formation.duree_formation : `${formation.duree_formation} jours`}
                            </div>
                          )}
                          {formation.nombre_places && (
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {formation.nombre_places}
                            </div>
                          )}
                        </div>
                        <Button 
                          onClick={handleInscription} 
                          className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                          S'inscrire
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Content Section - Tablet */}
        {isTab && (
          <div className="container mx-auto py-16 px-[50px]">
            {loading ? (
              <div className="text-center">Chargement des formations...</div>
            ) : formations.length === 0 ? (
              <div className="text-center text-gray-500">Aucune formation disponible pour le moment.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {formations.map((formation, index) => {
                  const IconComponent = getDefaultIcon();
                  return (
                    <Card key={formation.id || index} className="hover:shadow-xl transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-primary text-xl">{formation.title}</CardTitle>
                            {formation.niveau && <span className="text-sm text-gray-500">{formation.niveau}</span>}
                          </div>
                        </div>
                        <p className="text-gray-600">{formation.description}</p>
                        
                        {/* Informations supplémentaires */}
                        <div className="mt-4 space-y-2 text-sm">
                          {formation.niveau && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Niveau:</span>
                              <span className="ml-2">{formation.niveau}</span>
                            </div>
                          )}
                          {formation.date_debut && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Date de début:</span>
                              <span className="ml-2">{new Date(formation.date_debut).toLocaleDateString('fr-FR')}</span>
                            </div>
                          )}
                          {formation.type_formation && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Type:</span>
                              <span className="ml-2">{formation.type_formation}</span>
                            </div>
                          )}
                          {formation.lieu && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Lieu:</span>
                              <span className="ml-2">{formation.lieu}</span>
                            </div>
                          )}
                          {formation.format && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Format:</span>
                              <span className="ml-2">{formation.format}</span>
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                          {formation.duree_formation && (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {formation.duree_formation.includes('jour') ? formation.duree_formation : `${formation.duree_formation} jours`}
                            </div>
                          )}
                          {formation.nombre_places && (
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {formation.nombre_places}
                            </div>
                          )}
                        </div>
                        <Button 
                          onClick={handleInscription} 
                          className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                          S'inscrire
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Content Section - Desktop */}
        {!isMobile && !isTab && (
          <div className="container mx-auto py-16 px-[100px]">
            {loading ? (
              <div className="text-center">Chargement des formations...</div>
            ) : formations.length === 0 ? (
              <div className="text-center text-gray-500">Aucune formation disponible pour le moment.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {formations.map((formation, index) => {
                  const IconComponent = getDefaultIcon();
                  return (
                    <Card key={formation.id || index} className="hover:shadow-xl transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-primary text-xl">{formation.title}</CardTitle>
                            {formation.niveau && <span className="text-sm text-gray-500">{formation.niveau}</span>}
                          </div>
                        </div>
                        <p className="text-gray-600">{formation.description}</p>
                        
                        {/* Informations supplémentaires */}
                        <div className="mt-4 space-y-2 text-sm">
                          {formation.niveau && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Niveau:</span>
                              <span className="ml-2">{formation.niveau}</span>
                            </div>
                          )}
                          {formation.date_debut && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Date de début:</span>
                              <span className="ml-2">{new Date(formation.date_debut).toLocaleDateString('fr-FR')}</span>
                            </div>
                          )}
                          {formation.type_formation && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Type:</span>
                              <span className="ml-2">{formation.type_formation}</span>
                            </div>
                          )}
                          {formation.lieu && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Lieu:</span>
                              <span className="ml-2">{formation.lieu}</span>
                            </div>
                          )}
                          {formation.format && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Format:</span>
                              <span className="ml-2">{formation.format}</span>
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                          {formation.duree_formation && (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {formation.duree_formation.includes('jour') ? formation.duree_formation : `${formation.duree_formation} jours`}
                            </div>
                          )}
                          {formation.nombre_places && (
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {formation.nombre_places}
                            </div>
                          )}
                        </div>
                        <Button 
                          onClick={handleInscription} 
                          className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                          S'inscrire
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Formations;
