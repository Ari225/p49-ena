
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowLeft, MapPin, Users, User, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface RegionDetail {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  region: string;
  image: string;
  images?: string[];
  date: string;
  participants?: number;
  location?: string;
  organizer: string;
}

const EchoRegionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const isMobile = useIsMobile();
  const [regionNews, setRegionNews] = useState<RegionDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegionDetail();
  }, [id]);

  const fetchRegionDetail = async () => {
    try {
      setLoading(true);
      // Mock detailed data
      const mockRegionDetail: RegionDetail = {
        id: id || '1',
        title: 'Rencontre mensuelle des membres d\'Abidjan',
        content: `La rencontre mensuelle des membres de la P49 région d'Abidjan s'est tenue dans une ambiance conviviale et productive au siège régional.

        ## Ordre du jour

        La réunion a abordé plusieurs points importants :

        ### 1. Bilan des activités du mois précédent
        - Présentation des réalisations
        - Analyse des difficultés rencontrées
        - Propositions d'amélioration

        ### 2. Projets en cours
        - Suivi du projet de digitalisation des services
        - Avancement du programme de formation continue
        - Planification des activités sociales

        ### 3. Nouvelles initiatives
        - Proposition de création d'un club de lecture
        - Organisation d'un séminaire inter-régional
        - Mise en place d'un système de mentorat

        ## Participation exceptionnelle

        Cette rencontre a enregistré une participation exceptionnelle avec plus de 30 membres présents, témoignant de l'engagement fort de nos collègues de la région d'Abidjan.

        ## Prochaines étapes

        Les participants se sont accordés sur plusieurs actions à mener :
        - Constitution de groupes de travail thématiques
        - Planification de la prochaine rencontre
        - Mise en œuvre des décisions prises

        Cette rencontre confirme la vitalité du réseau P49 dans la région d'Abidjan et l'engagement de ses membres pour l'excellence du service public.`,
        excerpt: 'Plus de 30 membres se sont retrouvés pour échanger sur les projets en cours.',
        region: 'Abidjan',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop',
          'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=400&fit=crop'
        ],
        date: '2024-03-25',
        participants: 32,
        location: 'Siège régional P49 Abidjan',
        organizer: 'Délégation régionale Abidjan'
      };
      setRegionNews(mockRegionDetail);
    } catch (error) {
      console.error('Error fetching region detail:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!regionNews) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Actualité non trouvée</h1>
            <p className="text-gray-600 mb-8">L'actualité régionale que vous recherchez n'existe pas ou a été supprimée.</p>
            <Link to="/echo-regions">
              <Button className="bg-primary hover:bg-primary/90">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à l'écho des régions
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Image */}
        <div className="relative">
          <div className="h-80 md:h-96 overflow-hidden">
            <img 
              src={regionNews.image} 
              alt={regionNews.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
          
          {/* Back Button Overlay */}
          <div className="absolute top-6 left-6">
            <Link to="/echo-regions">
              <Button 
                variant="ghost" 
                className="text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm border border-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
            </Link>
          </div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
              <Badge className="bg-primary/90 text-white mb-4 backdrop-blur-sm">
                <MapPin className="w-3 h-3 mr-1" />
                {regionNews.region}
              </Badge>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                {regionNews.title}
              </h1>
              <p className="text-lg text-white/90 mb-4 max-w-2xl">
                {regionNews.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(regionNews.date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                {regionNews.participants && (
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {regionNews.participants} participants
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Event Info Card */}
          {(regionNews.location || regionNews.organizer) && (
            <Card className="mb-8 shadow-sm border-0 bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Informations sur l'événement
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {regionNews.location && (
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Lieu</p>
                        <p className="text-gray-600">{regionNews.location}</p>
                      </div>
                    </div>
                  )}
                  {regionNews.organizer && (
                    <div className="flex items-start space-x-3">
                      <User className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Organisateur</p>
                        <p className="text-gray-600">{regionNews.organizer}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Article Content */}
          <Card className="shadow-sm border-0 bg-white">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                {regionNews.content.split('\n').map((paragraph, index) => {
                  const trimmed = paragraph.trim();
                  
                  if (trimmed.startsWith('##')) {
                    return (
                      <h2 key={index} className="text-2xl font-bold text-primary mt-8 mb-4 first:mt-0">
                        {trimmed.replace('##', '').trim()}
                      </h2>
                    );
                  }
                  
                  if (trimmed.startsWith('###')) {
                    return (
                      <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                        {trimmed.replace('###', '').trim()}
                      </h3>
                    );
                  }
                  
                  if (trimmed.startsWith('-')) {
                    return (
                      <li key={index} className="ml-4 mb-2 text-gray-700 list-disc">
                        {trimmed.replace('-', '').trim()}
                      </li>
                    );
                  }
                  
                  if (trimmed) {
                    return (
                      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                        {trimmed}
                      </p>
                    );
                  }
                  
                  return null;
                })}
              </div>
            </CardContent>
          </Card>

          {/* Additional Images */}
          {regionNews.images && regionNews.images.length > 1 && (
            <Card className="mt-8 shadow-sm border-0 bg-white">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-primary mb-6">Photos de l'événement</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {regionNews.images.slice(1).map((image, index) => (
                    <div key={index} className="group overflow-hidden rounded-lg">
                      <img 
                        src={image} 
                        alt={`${regionNews.title} - Photo ${index + 2}`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Back to List Button */}
          <div className="mt-12 text-center">
            <Link to="/echo-regions">
              <Button variant="outline" size="lg" className="bg-white hover:bg-gray-50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voir toutes les actualités régionales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EchoRegionDetail;
