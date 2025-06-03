
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface CommuniqueDetail {
  id: string;
  title: string;
  content: string;
  description: string;
  type: string;
  color: string;
  image: string;
  published_date: string;
  urgency: 'normal' | 'urgent' | 'important';
  reference?: string;
}

const CommuniqueDetail = () => {
  const { id } = useParams<{ id: string }>();
  const isMobile = useIsMobile();
  const [communique, setCommunique] = useState<CommuniqueDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommuniqueDetail();
  }, [id]);

  const fetchCommuniqueDetail = async () => {
    try {
      setLoading(true);
      // Mock detailed data
      const mockCommuniqueDetail: CommuniqueDetail = {
        id: id || '1',
        title: 'Communiqué urgent - Report d\'événement',
        content: `Mesdames et Messieurs les membres de la P49,

        Nous avons l'honneur de vous informer que l'événement prévu le 25 mars 2024 est reporté à une date ultérieure qui vous sera communiquée prochainement.
        
        Cette décision a été prise suite aux circonstances exceptionnelles actuelles et dans le souci de garantir la sécurité et le confort de tous nos participants.
        
        Modalités du report :
        - Les inscriptions déjà effectuées restent valides
        - Aucune démarche supplémentaire n'est requise de votre part
        - La nouvelle date sera fixée dans les meilleurs délais
        - Tous les participants inscrits seront informés personnellement
        
        Nous nous excusons pour tout désagrément que ce report pourrait occasionner et vous remercions de votre compréhension.
        
        Pour toute question, n'hésitez pas à nous contacter au secrétariat.`,
        description: 'Report de l\'événement prévu le 25 mars 2024.',
        type: 'Communiqué urgent',
        color: 'red',
        image: '/lovable-uploads/cdf92e8b-3396-4192-b8a1-f94647a7b289.jpg',
        published_date: '2024-03-20',
        urgency: 'urgent',
        reference: 'COM-P49-2024-001'
      };
      setCommunique(mockCommuniqueDetail);
    } catch (error) {
      console.error('Error fetching communique detail:', error);
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

  if (!communique) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Communiqué non trouvé</h1>
            <Link to="/communiques">
              <Button>Retour aux communiqués</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
      case 'important':
        return <Badge className="bg-orange-100 text-orange-800">Important</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Back Button */}
        <section className={`py-6 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <Link to="/communiques">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux communiqués
            </Button>
          </Link>
        </section>

        {/* Communique Content */}
        <article className={`pb-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <Card className={`bg-${communique.color}-50 border-${communique.color}-200`}>
              <CardContent className="p-8">
                {/* Header */}
                <header className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    {getUrgencyBadge(communique.urgency)}
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(communique.published_date).toLocaleDateString('fr-FR')}
                    </div>
                    {communique.reference && (
                      <div className="flex items-center text-sm text-gray-500">
                        <FileText className="w-4 h-4 mr-2" />
                        Réf: {communique.reference}
                      </div>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                    {communique.title}
                  </h1>
                </header>

                {/* Main Image */}
                {communique.image && (
                  <div className="mb-8">
                    <img 
                      src={communique.image} 
                      alt={communique.title}
                      className="w-full h-96 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  {communique.content.split('\n').map((paragraph, index) => (
                    <p key={index} className={`mb-4 text-${communique.color}-800 leading-relaxed`}>
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default CommuniqueDetail;
