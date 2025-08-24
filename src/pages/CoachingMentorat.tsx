import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCheck, MessageCircle, Target, Calendar, Clock, MapPin } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { useCareerAnnouncements } from '@/hooks/useCareerAnnouncements';
const CoachingMentorat = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const navigate = useNavigate();
  const { announcements, loading } = useCareerAnnouncements();
  
  // Filtrer les annonces de catégorie "Coaching & mentorat"
  const coachingAnnouncements = announcements.filter(
    announcement => announcement.category === 'Coaching & mentorat'
  );

  const handleDemande = () => {
    navigate('/contact');
  };
  return <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section with Background Image */}
        <section className={`relative ${isMobile ? 'h-[30vh]' : isTablet ? 'h-[45vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
          <div className="absolute inset-0">
            <img src="/lovable-uploads/actualites_bg.webp" alt="Background coaching mentorat" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : isTablet ? 'px-[50px]' : 'px-8 lg:px-[100px]'}`}>
            <h1 className={`font-bold mb-[10px] md:mb-[10px] animate-fade-in ${isMobile ? 'text-2xl' : isTablet ? 'text-4xl' : 'text-6xl md:text-6xl lg:text-6xl'}`}>Coaching &amp; mentorat</h1>
            <p className={`italic mb-6 md:mb-8 animate-fade-in text-white font-normal ${isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-lg md:text-lg'}`}>
              Accompagnement personnalisé pour développer votre potentiel et accélérer votre carrière
            </p>
          </div>
        </section>

        <div className={`container mx-auto py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          {loading ? (
            <div className="text-center text-gray-600">
              Chargement des programmes de coaching...
            </div>
          ) : coachingAnnouncements.length === 0 ? (
            <div className="text-center text-gray-600">
              Aucun programme de coaching & mentorat disponible pour le moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coachingAnnouncements.map((coaching, index) => (
                <Card key={coaching.id} className="hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <UserCheck className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-primary text-xl">{coaching.title}</CardTitle>
                    </div>
                    <p className="text-gray-600">{coaching.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-6">
                      {coaching.duree_coaching && (
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Durée:</span>
                          <span className="font-medium">{coaching.duree_coaching}</span>
                        </div>
                      )}
                      {coaching.format && (
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Format:</span>
                          <span className="font-medium">{coaching.format}</span>
                        </div>
                      )}
                      {coaching.lieu && (
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{coaching.lieu}</span>
                        </div>
                      )}
                      {coaching.date_debut && (
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Début : {new Date(coaching.date_debut).toLocaleDateString('fr-FR')}</span>
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={handleDemande}
                      className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Demander un accompagnement
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Benefits Section */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-primary mb-8">
              Pourquoi choisir notre accompagnement ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-primary mb-3">Expertise Reconnue</h3>
                <p className="text-gray-600">Nos coachs et mentors sont des professionnels expérimentés du secteur public</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-primary mb-3">Approche Personnalisée</h3>
                <p className="text-gray-600">Chaque programme est adapté à vos besoins et objectifs spécifiques</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-primary mb-3">Résultats Mesurables</h3>
                <p className="text-gray-600">Suivi régulier et évaluation des progrès pour garantir l'efficacité</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>;
};
export default CoachingMentorat;