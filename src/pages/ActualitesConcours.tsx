import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Users, Clock, ExternalLink } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { useCareerAnnouncements } from '@/hooks/useCareerAnnouncements';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
const ActualitesConcours = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const navigate = useNavigate();
  const { announcements, loading } = useCareerAnnouncements();

  // Filtrer les annonces de concours
  const concours = announcements.filter(announcement => announcement.category === 'Concours');

  // Fonction pour calculer le statut basé sur les dates
  const getAnnouncementStatus = (dateDebut: string, dateLimite: string) => {
    const now = new Date();
    const startDate = new Date(dateDebut);
    const endDate = new Date(dateLimite);

    if (now < startDate) {
      return 'bientot';
    } else if (now >= startDate && now <= endDate) {
      return 'ouvert';
    } else {
      return 'ferme';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ouvert':
        return 'bg-green-100 text-green-800';
      case 'bientot':
        return 'bg-yellow-100 text-yellow-800';
      case 'ferme':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ouvert':
        return 'Inscriptions ouvertes';
      case 'bientot':
        return 'Bientôt ouvert';
      case 'ferme':
        return 'Fermé';
      default:
        return status;
    }
  };
  return <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section with Background Image */}
        <section className={`relative ${isMobile ? 'h-[30vh]' : isTablet ? 'h-[45vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
          <div className="absolute inset-0">
            <img src="/lovable-uploads/2b7ea072-aed2-4cb0-9d55-f1286499dc01.png" alt="Background actualités concours" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : isTablet ? 'px-[50px]' : 'px-8 lg:px-[100px]'}`}>
            <h1 className={`font-bold mb-[10px] md:mb-[10px] animate-fade-in ${isMobile ? 'text-2xl' : isTablet ? 'text-4xl' : 'text-6xl md:text-6xl lg:text-6xl'}`}>Actualités des concours</h1>
            <p className={`italic mb-6 md:mb-8 animate-fade-in text-white font-normal ${isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-lg md:text-lg'}`}>
              Restez informés des derniers concours et opportunités dans la fonction publique
            </p>
          </div>
        </section>

        <div className={`container mx-auto py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          {/* Concours Grid */}
          {loading ? (
            <div className="text-center py-8">Chargement des concours...</div>
          ) : concours.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Aucun concours disponible pour le moment.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {concours.map((concour, index) => {
                const status = getAnnouncementStatus(concour.date_ouverture || '', concour.date_limite || '');
                
                return (
                  <Card key={concour.id || index} className="hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-primary text-xl">{concour.title}</CardTitle>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                          {getStatusText(status)}
                        </span>
                      </div>
                      <p className="text-gray-600">{concour.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-6">
                        {concour.date_ouverture && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 text-primary" />
                            <span>Date d'ouverture: {format(new Date(concour.date_ouverture), 'd MMMM yyyy', { locale: fr })}</span>
                          </div>
                        )}
                        {concour.date_limite && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2 text-primary" />
                            <span>Date limite: {format(new Date(concour.date_limite), 'd MMMM yyyy', { locale: fr })}</span>
                          </div>
                        )}
                        {concour.lieu && (
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-primary" />
                            <span>{concour.lieu}</span>
                          </div>
                        )}
                        {concour.nombre_places && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="h-4 w-4 mr-2 text-primary" />
                            <span>{concour.nombre_places} disponibles</span>
                          </div>
                        )}
                        {concour.niveau && (
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="font-medium">Niveau: {concour.niveau}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => navigate('/contact')}
                          className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                          Plus d'infos
                        </button>
                        {concour.lien_concours && (
                          <button 
                            onClick={() => window.location.href = concour.lien_concours}
                            className="px-4 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>;
};
export default ActualitesConcours;