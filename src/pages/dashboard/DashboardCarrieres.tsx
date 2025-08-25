
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Trash2, MapPin, Calendar, List, Clock, Users, Link, GraduationCap } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { isAdmin } from '@/utils/roleUtils';
import { useCareerAnnouncements, CareerAnnouncement } from '@/hooks/useCareerAnnouncements';

const DashboardCarrieres = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { announcements, loading, deleteAnnouncement } = useCareerAnnouncements();

  if (!user || !isAdmin(user)) {
    return <div>Non autorisé</div>;
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Formations': return <GraduationCap className="h-4 w-4" />;
      case 'Renforcement des capacités': return <List className="h-4 w-4" />;
      case 'Coaching & mentorat': return <Users className="h-4 w-4" />;
      case 'Concours': return <Link className="h-4 w-4" />;
      default: return <Briefcase className="h-4 w-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'Formations': return 'Formation';
      case 'Renforcement des capacités': return 'Renforcement des capacités';
      case 'Coaching & mentorat': return 'Coaching & Mentorat';
      case 'Concours': return 'Concours';
      default: return 'Autre';
    }
  };

  const renderAnnouncementCard = (announcement: CareerAnnouncement) => (
    <Card key={announcement.id}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Briefcase className="w-5 h-5 mr-2" />
          {announcement.title}
        </CardTitle>
        <div className="space-y-1">
          <p className="text-sm font-medium text-primary">{announcement.category}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(announcement.published_date).toLocaleDateString('fr-FR')}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-3">{announcement.description}</p>
        
        {/* Informations spécifiques à chaque catégorie */}
        <div className="space-y-2 mb-4">
          {/* Formations */}
          {announcement.category === 'Formations' && (
            <div className="space-y-1">
              {announcement.niveau && (
                <div className="flex items-center text-sm">
                  <GraduationCap className="w-4 h-4 mr-2 text-blue-500" />
                  <strong>Niveau:</strong> <span className="ml-1">{announcement.niveau}</span>
                </div>
              )}
              {announcement.date_debut && (
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-green-500" />
                  <strong>Date de début:</strong> <span className="ml-1">{new Date(announcement.date_debut).toLocaleDateString('fr-FR')}</span>
                </div>
              )}
              {announcement.duree_formation && (
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2 text-orange-500" />
                  <strong>Durée:</strong> <span className="ml-1">{announcement.duree_formation} jours</span>
                </div>
              )}
              {announcement.type_formation && (
                <div className="flex items-center text-sm">
                  <span className="text-purple-500 mr-2">📍</span>
                  <strong>Type:</strong> <span className="ml-1 capitalize">{announcement.type_formation}</span>
                </div>
              )}
              {announcement.lieu && (
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-red-500" />
                  <strong>Lieu:</strong> <span className="ml-1">{announcement.lieu}</span>
                </div>
              )}
            </div>
          )}
          
          {/* Renforcement des capacités */}
          {announcement.category === 'Renforcement des capacités' && announcement.points_renforcement && announcement.points_renforcement.length > 0 && (
            <div>
              <div className="flex items-center text-sm font-semibold mb-2">
                <span className="text-blue-500 mr-2">💪</span>
                Points de renforcement:
              </div>
              <ul className="ml-6 space-y-1">
                {announcement.points_renforcement.map((point, index) => (
                  <li key={index} className="text-sm flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Coaching & mentorat */}
          {announcement.category === 'Coaching & mentorat' && (
            <div className="space-y-1">
              {announcement.duree_coaching && (
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2 text-blue-500" />
                  <strong>Durée:</strong> <span className="ml-1">{announcement.duree_coaching}</span>
                </div>
              )}
              {announcement.format && (
                <div className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">📋</span>
                  <strong>Format:</strong> <span className="ml-1">{announcement.format}</span>
                </div>
              )}
            </div>
          )}
          
          {/* Concours */}
          {announcement.category === 'Concours' && (
            <div className="space-y-1">
              {announcement.date_ouverture && (
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-green-500" />
                  <strong>Ouverture:</strong> <span className="ml-1">{new Date(announcement.date_ouverture).toLocaleDateString('fr-FR')}</span>
                </div>
              )}
              {announcement.date_limite && (
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-red-500" />
                  <strong>Date limite:</strong> <span className="ml-1">{new Date(announcement.date_limite).toLocaleDateString('fr-FR')}</span>
                </div>
              )}
              {announcement.lieu && (
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  <strong>Lieu:</strong> <span className="ml-1">{announcement.lieu}</span>
                </div>
              )}
              {announcement.nombre_places && (
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 mr-2 text-purple-500" />
                  <strong>Places:</strong> <span className="ml-1">{announcement.nombre_places}</span>
                </div>
              )}
              {announcement.lien_concours && (
                <div className="flex items-center text-sm">
                  <Link className="w-4 h-4 mr-2 text-orange-500" />
                  <strong>Lien:</strong> 
                  <a href={announcement.lien_concours} target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-600 hover:underline">
                    Accéder au concours
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex justify-end mt-4">
          <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50" onClick={() => deleteAnnouncement(announcement.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des annonces...</p>
          </div>
        </div>
        <AdminSidebar />
      </Layout>
    );
  }

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary whitespace-nowrap">Gestion carrières+</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer les annonces</p>
          </div>

          <div className="space-y-4">
            {announcements.map(renderAnnouncementCard)}
            {announcements.length === 0 && (
              <div className="text-center py-8">
                <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune annonce</h3>
                <p className="mt-1 text-sm text-gray-500">Aucune annonce de carrière disponible pour le moment.</p>
              </div>
            )}
          </div>
        </div>
        <AdminSidebar />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Gestion carrières+</h1>
            <p className="text-gray-600 mt-2">Gérer les annonces de carrière et opportunités</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {announcements.map(renderAnnouncementCard)}
            {announcements.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Briefcase className="mx-auto h-16 w-16 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Aucune annonce</h3>
                <p className="mt-2 text-gray-500">Aucune annonce de carrière disponible pour le moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardCarrieres;
