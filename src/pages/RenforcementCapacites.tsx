import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Clock, Users, Award } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { useCareerAnnouncements } from '@/hooks/useCareerAnnouncements';
const RenforcementCapacites = () => {
  const isMobile = useIsMobile();
  const isTab = useIsTablet();
  const navigate = useNavigate();
  const { announcements, loading } = useCareerAnnouncements();

  // Filtrer seulement les annonces de renforcement des capacités
  const renforcementCapacites = announcements.filter(announcement => announcement.category === 'Renforcement des capacités');

  const handleLaisserMessage = () => {
    navigate('/contact');
  };

  const getDefaultIcon = () => Target;
  return <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section with Background Image */}
        <section className={`relative ${isMobile ? 'h-[30vh]' : isTab ? 'h-[45vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
          <div className="absolute inset-0">
            <img src="/lovable-uploads/archives.webp" alt="Background renforcement capacités" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : isTab ? 'px-[50px]' : 'px-8 lg:px-[100px]'}`}>
            <h1 className={`font-bold mb-[10px] md:mb-[10px] animate-fade-in ${isMobile ? 'text-2xl' : isTab ? 'text-4xl' : 'text-6xl md:text-6xl lg:text-6xl'}`}>Renforcement des capacités</h1>
            <p className={`italic mb-6 md:mb-8 animate-fade-in text-white font-normal ${isMobile ? 'text-sm' : isTab ? 'text-base' : 'text-lg md:text-lg'}`}>
              Programmes personnalisés pour développer vos compétences et améliorer vos performances
            </p>
          </div>
        </section>

        {/* Content Section - Mobile */}
        {isMobile && (
          <div className="container mx-auto py-12 px-[25px]">
            {loading ? (
              <div className="text-center">Chargement des programmes...</div>
            ) : renforcementCapacites.length === 0 ? (
              <div className="text-center text-gray-500">Aucun programme de renforcement des capacités disponible pour le moment.</div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {renforcementCapacites.map((programme, index) => {
                  const IconComponent = getDefaultIcon();
                  return (
                    <Card key={programme.id || index} className="hover:shadow-xl transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-primary text-lg">{programme.title}</CardTitle>
                            {programme.niveau && <span className="text-sm text-gray-500">{programme.niveau}</span>}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{programme.description}</p>
                        
                        {/* Informations supplémentaires */}
                        <div className="mt-4 space-y-2 text-sm">
                          {programme.niveau && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Niveau:</span>
                              <span className="ml-2">{programme.niveau}</span>
                            </div>
                          )}
                          {programme.date_debut && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Date de début:</span>
                              <span className="ml-2">{new Date(programme.date_debut).toLocaleDateString('fr-FR')}</span>
                            </div>
                          )}
                          {programme.type_formation && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Type:</span>
                              <span className="ml-2">{programme.type_formation}</span>
                            </div>
                          )}
                          {programme.lieu && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Lieu:</span>
                              <span className="ml-2">{programme.lieu}</span>
                            </div>
                          )}
                          {programme.format && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Format:</span>
                              <span className="ml-2">{programme.format}</span>
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        {/* Points de renforcement */}
                        {programme.points_renforcement && programme.points_renforcement.length > 0 && (
                          <ul className="space-y-2 mb-4">
                            {programme.points_renforcement.map((point, idx) => (
                              <li key={idx} className="flex items-center text-sm text-gray-700">
                                <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        )}
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                          {programme.duree_formation && (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {programme.duree_formation.includes('jour') ? programme.duree_formation : `${programme.duree_formation} jours`}
                            </div>
                          )}
                          {programme.nombre_places && (
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {programme.nombre_places}
                            </div>
                          )}
                        </div>
                        <Button 
                          onClick={handleLaisserMessage} 
                          className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                          Laisser un message
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
              <div className="text-center">Chargement des programmes...</div>
            ) : renforcementCapacites.length === 0 ? (
              <div className="text-center text-gray-500">Aucun programme de renforcement des capacités disponible pour le moment.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {renforcementCapacites.map((programme, index) => {
                  const IconComponent = getDefaultIcon();
                  return (
                    <Card key={programme.id || index} className="hover:shadow-xl transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-primary text-xl">{programme.title}</CardTitle>
                            {programme.niveau && <span className="text-sm text-gray-500">{programme.niveau}</span>}
                          </div>
                        </div>
                        <p className="text-gray-600">{programme.description}</p>
                        
                        {/* Informations supplémentaires */}
                        <div className="mt-4 space-y-2 text-sm">
                          {programme.niveau && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Niveau:</span>
                              <span className="ml-2">{programme.niveau}</span>
                            </div>
                          )}
                          {programme.date_debut && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Date de début:</span>
                              <span className="ml-2">{new Date(programme.date_debut).toLocaleDateString('fr-FR')}</span>
                            </div>
                          )}
                          {programme.type_formation && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Type:</span>
                              <span className="ml-2">{programme.type_formation}</span>
                            </div>
                          )}
                          {programme.lieu && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Lieu:</span>
                              <span className="ml-2">{programme.lieu}</span>
                            </div>
                          )}
                          {programme.format && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Format:</span>
                              <span className="ml-2">{programme.format}</span>
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        {/* Points de renforcement */}
                        {programme.points_renforcement && programme.points_renforcement.length > 0 && (
                          <ul className="space-y-2 mb-4">
                            {programme.points_renforcement.map((point, idx) => (
                              <li key={idx} className="flex items-center text-sm text-gray-700">
                                <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        )}
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                          {programme.duree_formation && (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {programme.duree_formation.includes('jour') ? programme.duree_formation : `${programme.duree_formation} jours`}
                            </div>
                          )}
                          {programme.nombre_places && (
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {programme.nombre_places}
                            </div>
                          )}
                        </div>
                        <Button 
                          onClick={handleLaisserMessage} 
                          className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                          Laisser un message
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
              <div className="text-center">Chargement des programmes...</div>
            ) : renforcementCapacites.length === 0 ? (
              <div className="text-center text-gray-500">Aucun programme de renforcement des capacités disponible pour le moment.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {renforcementCapacites.map((programme, index) => {
                  const IconComponent = getDefaultIcon();
                  return (
                    <Card key={programme.id || index} className="hover:shadow-xl transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-primary text-xl">{programme.title}</CardTitle>
                            {programme.niveau && <span className="text-sm text-gray-500">{programme.niveau}</span>}
                          </div>
                        </div>
                        <p className="text-gray-600">{programme.description}</p>
                        
                        {/* Informations supplémentaires */}
                        <div className="mt-4 space-y-2 text-sm">
                          {programme.niveau && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Niveau:</span>
                              <span className="ml-2">{programme.niveau}</span>
                            </div>
                          )}
                          {programme.date_debut && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Date de début:</span>
                              <span className="ml-2">{new Date(programme.date_debut).toLocaleDateString('fr-FR')}</span>
                            </div>
                          )}
                          {programme.type_formation && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Type:</span>
                              <span className="ml-2">{programme.type_formation}</span>
                            </div>
                          )}
                          {programme.lieu && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Lieu:</span>
                              <span className="ml-2">{programme.lieu}</span>
                            </div>
                          )}
                          {programme.format && (
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">Format:</span>
                              <span className="ml-2">{programme.format}</span>
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        {/* Points de renforcement */}
                        {programme.points_renforcement && programme.points_renforcement.length > 0 && (
                          <ul className="space-y-2 mb-4">
                            {programme.points_renforcement.map((point, idx) => (
                              <li key={idx} className="flex items-center text-sm text-gray-700">
                                <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        )}
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                          {programme.duree_formation && (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {programme.duree_formation.includes('jour') ? programme.duree_formation : `${programme.duree_formation} jours`}
                            </div>
                          )}
                          {programme.nombre_places && (
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {programme.nombre_places}
                            </div>
                          )}
                        </div>
                        <Button 
                          onClick={handleLaisserMessage} 
                          className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                          Laisser un message
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
    </Layout>;
};
export default RenforcementCapacites;