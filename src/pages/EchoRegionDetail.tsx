
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowLeft, MapPin, Users } from 'lucide-react';
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
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop',
          'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop'
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
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Chargement...</div>
        </div>
      </Layout>
    );
  }

  if (!regionNews) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Actualité régionale non trouvée</h1>
            <Link to="/echo-regions">
              <Button>Retour à l'écho des régions</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Back Button */}
        <section className={`py-6 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <Link to="/echo-regions">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'écho des régions
            </Button>
          </Link>
        </section>

        {/* Article Content */}
        <article className={`pb-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Badge className="bg-primary text-white flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {regionNews.region}
                </Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(regionNews.date).toLocaleDateString('fr-FR')}
                </div>
                {regionNews.participants && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    {regionNews.participants} participants
                  </div>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {regionNews.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {regionNews.excerpt}
              </p>
            </header>

            {/* Event Info */}
            {(regionNews.location || regionNews.organizer) && (
              <Card className="mb-8 bg-gray-50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">Informations sur l'événement</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {regionNews.location && (
                      <div>
                        <strong className="text-gray-700">Lieu :</strong>
                        <p className="text-gray-600">{regionNews.location}</p>
                      </div>
                    )}
                    {regionNews.organizer && (
                      <div>
                        <strong className="text-gray-700">Organisateur :</strong>
                        <p className="text-gray-600">{regionNews.organizer}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Main Image */}
            {regionNews.image && (
              <div className="mb-8">
                <img 
                  src={regionNews.image} 
                  alt={regionNews.title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-8">
              {regionNews.content.split('\n').map((paragraph, index) => {
                if (paragraph.trim().startsWith('##')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-primary mt-8 mb-4">
                      {paragraph.replace('##', '').trim()}
                    </h2>
                  );
                }
                if (paragraph.trim().startsWith('###')) {
                  return (
                    <h3 key={index} className="text-xl font-semibold text-primary mt-6 mb-3">
                      {paragraph.replace('###', '').trim()}
                    </h3>
                  );
                }
                if (paragraph.trim().startsWith('-')) {
                  return (
                    <li key={index} className="ml-4 mb-2 text-gray-700">
                      {paragraph.replace('-', '').trim()}
                    </li>
                  );
                }
                return (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph.trim()}
                  </p>
                );
              })}
            </div>

            {/* Additional Images */}
            {regionNews.images && regionNews.images.length > 1 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-primary mb-4">Photos de l'événement</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {regionNews.images.slice(1).map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`${regionNews.title} - Photo ${index + 2}`}
                      className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default EchoRegionDetail;
