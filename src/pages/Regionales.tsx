import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock, Camera, Euro } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { useActivities } from '@/hooks/useActivities';
import { Activity } from '@/types/activity';
const Regionales = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [selectedTab, setSelectedTab] = useState('futures');
  const { activities } = useActivities();
  
  // Récupérer la dernière activité "Les Régionales"
  const latestRegionale = activities.find(activity => activity.category === 'Les Régionales') || null;
  
  // Récupérer toutes les activités "Les Régionales"
  const allRegionales = activities.filter(activity => activity.category === 'Les Régionales');
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terminé':
        return 'bg-gray-100 text-gray-800';
      case 'À venir':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  // ======================
  // MOBILE VERSION - ActivityRegionaleCard
  // ======================
  const ActivityRegionaleCardMobile = ({ activity }: { activity: Activity }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={activity.image_url || "/lovable-uploads/3f8b5859-db9c-410f-857e-bad0765e7411.png"} 
          alt={activity.title} 
          className="w-full h-32 object-cover" 
        />
        <Badge className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
          activity.status === 'À venir' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {activity.status}
        </Badge>
      </div>
      <CardContent className="p-3">
        <h3 className="text-lg font-semibold text-primary mb-2">{activity.title}</h3>
        <p className="text-gray-600 text-xs mb-3">{activity.brief_description}</p>
        
        <div className="space-y-1 mb-3">
          <div className="flex items-center text-xs text-gray-600">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date(activity.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
            {activity.end_date && (
              <span> - {new Date(activity.end_date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}</span>
            )}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <Clock className="h-3 w-3 mr-1" />
            {activity.start_time}
            {activity.end_time && ` - ${activity.end_time}`}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <MapPin className="h-3 w-3 mr-1" />
            {activity.location}
          </div>
        </div>

        {activity.participation_fees && activity.participation_fees.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-medium text-gray-700 mb-1">
              Tarifs de participation :
            </p>
            <div className="space-y-0.5 text-xs text-gray-600">
              {activity.participation_fees.map((fee, index) => (
                <div key={index} className="flex justify-between">
                  <span>{fee.name}</span>
                  <span className="font-medium">{parseInt(fee.amount).toLocaleString('fr-FR')} FCFA</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  // ======================
  // TABLET VERSION - ActivityRegionaleCard
  // ======================
  const ActivityRegionaleCardTablet = ({ activity }: { activity: Activity }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={activity.image_url || "/lovable-uploads/3f8b5859-db9c-410f-857e-bad0765e7411.png"} 
          alt={activity.title} 
          className="w-full h-40 object-cover" 
        />
        <Badge className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
          activity.status === 'À venir' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {activity.status}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold text-primary mb-2">{activity.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{activity.brief_description}</p>
        
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            {new Date(activity.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
            {activity.end_date && (
              <span> - {new Date(activity.end_date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}</span>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            {activity.start_time}
            {activity.end_time && ` - ${activity.end_time}`}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-3.5 w-3.5 mr-1.5" />
            {activity.location}
          </div>
        </div>

        {activity.participation_fees && activity.participation_fees.length > 0 && (
          <div className="mb-3">
            <p className="text-sm font-medium text-gray-700 mb-1.5">
              Tarifs de participation :
            </p>
            <div className="space-y-1 text-sm text-gray-600">
              {activity.participation_fees.map((fee, index) => (
                <div key={index} className="flex justify-between">
                  <span>{fee.name}</span>
                  <span className="font-medium">{parseInt(fee.amount).toLocaleString('fr-FR')} FCFA</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  // ======================
  // DESKTOP VERSION - ActivityRegionaleCard
  // ======================
  const ActivityRegionaleCardDesktop = ({ activity }: { activity: Activity }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={activity.image_url || "/lovable-uploads/3f8b5859-db9c-410f-857e-bad0765e7411.png"} 
          alt={activity.title} 
          className="w-full h-48 object-cover" 
        />
        <Badge className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
          activity.status === 'À venir' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {activity.status}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-primary mb-2">{activity.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{activity.brief_description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(activity.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
            {activity.end_date && (
              <span> - {new Date(activity.end_date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}</span>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            {activity.start_time}
            {activity.end_time && ` - ${activity.end_time}`}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {activity.location}
          </div>
        </div>

        {activity.participation_fees && activity.participation_fees.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Tarifs de participation :
            </p>
            <div className="space-y-1 text-sm text-gray-600">
              {activity.participation_fees.map((fee, index) => (
                <div key={index} className="flex justify-between">
                  <span>{fee.name}</span>
                  <span className="font-medium">{parseInt(fee.amount).toLocaleString('fr-FR')} FCFA</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  // ======================
  // MOBILE VERSION - RegionaleFutureCard
  // ======================
  const RegionaleFutureCardMobile = () => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow w-full">
      <div className="relative">
        <img 
          src={latestRegionale?.image_url || "/lovable-uploads/3f8b5859-db9c-410f-857e-bad0765e7411.png"} 
          alt={latestRegionale?.title || "Les Régionales"} 
          className="w-full h-32 object-cover" 
        />
        <Badge className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
          À venir
        </Badge>
      </div>
      <CardContent className="p-3">
        {latestRegionale ? (
          <>
            <h3 className="text-lg font-semibold text-primary mb-2">{latestRegionale.title}</h3>
            <p className="text-gray-600 text-xs mb-3">{latestRegionale.brief_description}</p>
            
            <div className="space-y-1 mb-3">
              <div className="flex items-center text-xs text-gray-600">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(latestRegionale.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
                {latestRegionale.end_date && (
                  <span> - {new Date(latestRegionale.end_date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                )}
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <Clock className="h-3 w-3 mr-1" />
                {latestRegionale.start_time}
                {latestRegionale.end_time && ` - ${latestRegionale.end_time}`}
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <MapPin className="h-3 w-3 mr-1" />
                {latestRegionale.location}
              </div>
            </div>

            {latestRegionale.participation_fees && latestRegionale.participation_fees.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-medium text-gray-700 mb-1 flex items-center">
                  Tarifs de participation :
                </p>
                <div className="space-y-0.5 text-xs text-gray-600">
                  {latestRegionale.participation_fees.map((fee, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{fee.name}</span>
                      <span className="font-medium">{parseInt(fee.amount).toLocaleString('fr-FR')} FCFA</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-3">
              <p className="text-xs text-gray-700">{latestRegionale.description}</p>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 text-xs">Aucune activité "Les Régionales" programmée pour le moment.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  // ======================
  // TABLET VERSION - RegionaleFutureCard
  // ======================
  const RegionaleFutureCardTablet = () => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow max-w-sm mx-auto">
      <div className="relative">
        <img 
          src={latestRegionale?.image_url || "/lovable-uploads/3f8b5859-db9c-410f-857e-bad0765e7411.png"} 
          alt={latestRegionale?.title || "Les Régionales"} 
          className="w-full h-40 object-cover" 
        />
        <Badge className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
          À venir
        </Badge>
      </div>
      <CardContent className="p-4">
        {latestRegionale ? (
          <>
            <h3 className="text-xl font-semibold text-primary mb-2">{latestRegionale.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{latestRegionale.brief_description}</p>
            
            <div className="space-y-1.5 mb-3">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                {new Date(latestRegionale.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
                {latestRegionale.end_date && (
                  <span> - {new Date(latestRegionale.end_date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                )}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-3.5 w-3.5 mr-1.5" />
                {latestRegionale.start_time}
                {latestRegionale.end_time && ` - ${latestRegionale.end_time}`}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-3.5 w-3.5 mr-1.5" />
                {latestRegionale.location}
              </div>
            </div>

            {latestRegionale.participation_fees && latestRegionale.participation_fees.length > 0 && (
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-700 mb-1.5">
                  Tarifs de participation :
                </p>
                <div className="space-y-1 text-sm text-gray-600">
                  {latestRegionale.participation_fees.map((fee, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{fee.name}</span>
                      <span className="font-medium">{parseInt(fee.amount).toLocaleString('fr-FR')} FCFA</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 text-sm">Aucune activité "Les Régionales" programmée pour le moment.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  // ======================
  // DESKTOP VERSION - RegionaleFutureCard
  // ======================
  const RegionaleFutureCardDesktop = () => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow max-w-lg w-full">
      <div className="relative">
        <img 
          src={latestRegionale?.image_url || "/lovable-uploads/3f8b5859-db9c-410f-857e-bad0765e7411.png"} 
          alt={latestRegionale?.title || "Les Régionales"} 
          className="w-full h-48 object-cover" 
        />
        <Badge className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
          À venir
        </Badge>
      </div>
      <CardContent className="p-6">
        {latestRegionale ? (
          <>
            <h3 className="text-xl font-semibold text-primary mb-2">{latestRegionale.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{latestRegionale.brief_description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(latestRegionale.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
                {latestRegionale.end_date && (
                  <span> - {new Date(latestRegionale.end_date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                )}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                {latestRegionale.start_time}
                {latestRegionale.end_time && ` - ${latestRegionale.end_time}`}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {latestRegionale.location}
              </div>
            </div>

            {latestRegionale.participation_fees && latestRegionale.participation_fees.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  Tarifs de participation :
                </p>
                <div className="space-y-1 text-sm text-gray-600">
                  {latestRegionale.participation_fees.map((fee, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{fee.name}</span>
                      <span className="font-medium">{parseInt(fee.amount).toLocaleString('fr-FR')} FCFA</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-4">
              <p className="text-sm text-gray-700">{latestRegionale.description}</p>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucune activité "Les Régionales" programmée pour le moment.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  // Sélection du composant selon l'appareil
  const RegionaleFutureCard = isMobile ? RegionaleFutureCardMobile : isTablet ? RegionaleFutureCardTablet : RegionaleFutureCardDesktop;
  return <Layout>
      <div className="min-h-screen bg-white">
        {/* ======================
            MOBILE VERSION - Header
            ====================== */}
        {isMobile && <section className="relative h-[30vh] flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0">
              <img src="/lovable-uploads/3f8b5859-db9c-410f-857e-bad0765e7411.png" alt="Background régionales" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-primary/80"></div>
            </div>
            
            <div className="relative z-10 text-center px-[25px]">
              <h1 className="text-2xl font-bold mb-[10px] md:mb-[10px] animate-fade-in">
                Les Régionales de la P49
              </h1>
              <p className="text-sm italic mb-6 animate-fade-in text-white font-normal max-w-3xl mx-auto">
                L'activité principale qui permet d'étendre le réseau au plan national
              </p>
            </div>
          </section>}

        {/* ======================
            TABLET VERSION - Header
            ====================== */}
        {isTablet && <section className="relative h-[45vh] flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0">
              <img src="/lovable-uploads/3f8b5859-db9c-410f-857e-bad0765e7411.png" alt="Background régionales" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-primary/80"></div>
            </div>
            
            <div className="relative z-10 text-center px-[50px]">
              <h1 className="text-4xl md:text-4xl font-bold mb-[10px] md:mb-[10px] animate-fade-in">
                Les Régionales de la P49
              </h1>
              <p className="text-base italic mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto">
                L'activité principale qui permet d'étendre le réseau au plan national
              </p>
            </div>
          </section>}

        {/* ======================
            DESKTOP VERSION - Header
            ====================== */}
        {!isMobile && !isTablet && <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0">
              <img src="/lovable-uploads/3f8b5859-db9c-410f-857e-bad0765e7411.png" alt="Background régionales" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-primary/80"></div>
            </div>
            
            <div className="relative z-10 text-center px-8 lg:px-[100px]">
              <h1 className="text-6xl md:text-6xl lg:text-6xl font-bold mb-[10px] md:mb-[10px] animate-fade-in">
                Les Régionales de la P49
              </h1>
              <p className="text-lg md:text-lg italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto">
                L'activité principale qui permet d'étendre le réseau au plan national
              </p>
            </div>
          </section>}

        {/* ======================
            MOBILE VERSION - Contenu principal
            ====================== */}
        {isMobile && <section className="py-[50px] px-[25px] bg-white">
            <div className="container mx-auto px-0">
              {/* Onglets centrés */}
              <div className="flex justify-center mb-[50px] md:mb-[50px]">
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md">
                  <Button variant={selectedTab === 'futures' ? 'default' : 'ghost'} onClick={() => setSelectedTab('futures')} className="flex-1 text-xs">
                    À venir
                  </Button>
                  <Button variant={selectedTab === 'passees' ? 'default' : 'ghost'} onClick={() => setSelectedTab('passees')} className="flex-1 text-xs">
                    Passées
                  </Button>
                </div>
              </div>

              {/* Contenu des onglets */}
              {selectedTab === 'futures' && <div>
                  <h2 className="text-lg font-bold text-primary mb-4 text-center">Prochaines régionales</h2>
                  {latestRegionale ? (
                    <div className="flex justify-center">
                      <RegionaleFutureCard />
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 text-sm">Aucune activité "Les Régionales" programmée pour le moment.</p>
                    </div>
                  )}
                </div>}

              {selectedTab === 'passees' && (
                <div>
                  <h2 className="text-xl font-bold text-primary mb-[10px] text-center">Régionales Passées</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {allRegionales.filter(activity => activity.status === 'Terminé').map(activity => (
                      <ActivityRegionaleCardMobile key={activity.id} activity={activity} />
                    ))}
                    {allRegionales.filter(activity => activity.status === 'Terminé').length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-gray-500 text-sm">Aucune activité "Les Régionales" terminée pour le moment.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>}

        {/* ======================
            TABLET VERSION - Contenu principal
            ====================== */}
        {isTablet && <section className="py-[50px] px-[50px] bg-white">
            <div className="container mx-auto px-4">
              {/* Onglets centrés */}
              <div className="flex justify-center mb-[50px] md:mb-[50px]">
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md">
                  <Button variant={selectedTab === 'futures' ? 'default' : 'ghost'} onClick={() => setSelectedTab('futures')} className="flex-1 text-sm">
                    À venir
                  </Button>
                  <Button variant={selectedTab === 'passees' ? 'default' : 'ghost'} onClick={() => setSelectedTab('passees')} className="flex-1 text-sm">
                    Passées
                  </Button>
                </div>
              </div>

              {/* Contenu des onglets */}
              {selectedTab === 'futures' && <div>
                  <h2 className="text-2xl font-bold text-primary mb-6 text-center">Prochaines régionales</h2>
                  {latestRegionale ? (
                    <div className="flex justify-center">
                      <RegionaleFutureCard />
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 text-sm">Aucune activité "Les Régionales" programmée pour le moment.</p>
                    </div>
                  )}
                </div>}

              {selectedTab === 'passees' && (
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-[10px] text-center">Régionales Passées</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {allRegionales.filter(activity => activity.status === 'Terminé').map(activity => (
                      <ActivityRegionaleCardTablet key={activity.id} activity={activity} />
                    ))}
                    {allRegionales.filter(activity => activity.status === 'Terminé').length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-gray-500 text-sm">Aucune activité "Les Régionales" terminée pour le moment.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>}

        {/* ======================
            DESKTOP VERSION - Contenu principal
            ====================== */}
        {!isMobile && !isTablet && <section className="py-[50px] px-[100px] bg-white">
            <div className="container mx-auto px-4">
              {/* Onglets centrés */}
              <div className="flex justify-center mb-[50px] md:mb-[50px]">
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md">
                  <Button variant={selectedTab === 'futures' ? 'default' : 'ghost'} onClick={() => setSelectedTab('futures')} className="flex-1 text-sm">
                    À venir
                  </Button>
                  <Button variant={selectedTab === 'passees' ? 'default' : 'ghost'} onClick={() => setSelectedTab('passees')} className="flex-1 text-sm">
                    Passées
                  </Button>
                </div>
              </div>

              {/* Contenu des onglets */}
              {selectedTab === 'futures' && <div>
                  <h2 className="text-2xl font-bold text-primary mb-6 text-center">Prochaines régionales</h2>
                  {latestRegionale ? (
                    <div className="flex justify-center">
                      <RegionaleFutureCard />
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Aucune activité "Les Régionales" programmée pour le moment.</p>
                    </div>
                  )}
                </div>}

              {selectedTab === 'passees' && (
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-[10px] text-center">Régionales Passées</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allRegionales.filter(activity => activity.status === 'Terminé').map(activity => (
                      <ActivityRegionaleCardDesktop key={activity.id} activity={activity} />
                    ))}
                    {allRegionales.filter(activity => activity.status === 'Terminé').length === 0 && (
                       <div className="text-center py-8 lg:py-16 lg:col-span-3">
                         <p className="text-gray-500">Aucune activité "Les Régionales" terminée pour le moment.</p>
                       </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>}



      </div>
    </Layout>;
};
export default Regionales;