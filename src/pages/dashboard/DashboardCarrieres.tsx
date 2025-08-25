
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
    <Card key={announcement.id} className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {getCategoryIcon(announcement.category)}
          {announcement.title}
        </CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
            {getCategoryLabel(announcement.category)}
          </span>
          {announcement.category === 'Formations' && announcement.niveau && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
              Niveau: {announcement.niveau}
            </span>
          )}
          {announcement.category === 'Formations' && announcement.type_formation && (
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
              {announcement.type_formation}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-3">{announcement.description}</p>
        
        {/* Informations spécifiques selon la catégorie */}
        <div className="space-y-2 mb-4">
          {announcement.category === 'Formations' && (
            <>
              {announcement.date_debut && (
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  Début: {new Date(announcement.date_debut).toLocaleDateString('fr-FR')}
                </div>
              )}
              {announcement.duree_formation && (
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  Durée: {announcement.duree_formation}
                </div>
              )}
              {announcement.lieu && (
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-2" />
                  Lieu: {announcement.lieu}
                </div>
              )}
            </>
          )}
          
          {announcement.category === 'Coaching & mentorat' && (
            <>
              {announcement.duree_coaching && (
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  Durée: {announcement.duree_coaching}
                </div>
              )}
              {announcement.format && (
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-2" />
                  Format: {announcement.format}
                </div>
              )}
            </>
          )}
          
          {announcement.category === 'Concours' && (
            <>
              {announcement.date_ouverture && (
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  Ouverture: {new Date(announcement.date_ouverture).toLocaleDateString('fr-FR')}
                </div>
              )}
              {announcement.date_limite && (
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  Limite: {new Date(announcement.date_limite).toLocaleDateString('fr-FR')}
                </div>
              )}
              {announcement.nombre_places && (
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-2" />
                  Places: {announcement.nombre_places}
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex justify-end">
          <Button 
            size="sm" 
            variant="outline" 
            className="text-red-600 hover:bg-red-50"
            onClick={() => deleteAnnouncement(announcement.id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Supprimer
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
