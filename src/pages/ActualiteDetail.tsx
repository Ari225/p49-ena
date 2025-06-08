import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowLeft, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
interface NewsDetail {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  image_url: string;
  images?: string[];
  published_date: string;
  author: string;
  tags?: string[];
}
const ActualiteDetail = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const isMobile = useIsMobile();
  const [news, setNews] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchNewsDetail();
  }, [id]);
  const fetchNewsDetail = async () => {
    try {
      setLoading(true);
      // Mock detailed data
      const mockNewsDetail: NewsDetail = {
        id: id || '1',
        title: 'Nouvelle formation en leadership',
        content: `Cette formation spécialisée en leadership s'adresse aux membres de la P49 souhaitant développer leurs compétences managériales et leur capacité à diriger des équipes.

        Le programme comprend plusieurs modules :
        
        1. Les fondamentaux du leadership moderne
        2. La communication efficace en équipe
        3. La gestion des conflits et la négociation
        4. Le leadership transformationnel
        5. L'intelligence émotionnelle au service du management
        
        Cette formation se déroulera sur 5 jours consécutifs et sera animée par des experts reconnus dans le domaine du leadership et du management public.
        
        Les participants recevront un certificat de participation et pourront bénéficier d'un suivi personnalisé post-formation.`,
        summary: 'Une formation spécialisée en leadership pour les membres de la P49.',
        category: 'Formation',
        image_url: '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg',
        images: ['/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg', '/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg', '/lovable-uploads/8cbb0164-0529-47c1-9caa-8244c17623b3.jpg'],
        published_date: '2024-01-15',
        author: 'Équipe P49',
        tags: ['Leadership', 'Formation', 'Management', 'Développement professionnel']
      };
      setNews(mockNewsDetail);
    } catch (error) {
      console.error('Error fetching news detail:', error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Chargement...</div>
        </div>
      </Layout>;
  }
  if (!news) {
    return <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Actualité non trouvée</h1>
            <Link to="/actualites">
              <Button>Retour aux actualités</Button>
            </Link>
          </div>
        </div>
      </Layout>;
  }
  return <Layout>
      <div className="bg-white min-h-screen">
        {/* Back Button */}
        <section className={`py-6 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <Link to="/actualites">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux actualités
            </Button>
          </Link>
        </section>

        {/* Article Content */}
        <article className={`pb-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-0">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary">{news.category}</Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(news.published_date).toLocaleDateString('fr-FR')}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <User className="w-4 h-4 mr-2" />
                  {news.author}
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {news.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {news.summary}
              </p>
            </header>

            {/* Main Image */}
            {news.image_url && <div className="mb-8">
                <img src={news.image_url} alt={news.title} className="w-full h-96 object-cover rounded-lg shadow-lg" />
              </div>}

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-8">
              {news.content.split('\n').map((paragraph, index) => <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph.trim()}
                </p>)}
            </div>

            {/* Additional Images */}
            {news.images && news.images.length > 1 && <div className="mb-8">
                <h3 className="text-xl font-semibold text-primary mb-4">Images supplémentaires</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {news.images.slice(1).map((image, index) => <img key={index} src={image} alt={`${news.title} - Image ${index + 2}`} className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow" />)}
                </div>
              </div>}

            {/* Tags */}
            {news.tags && news.tags.length > 0 && <div className="mb-8">
                <h3 className="text-lg font-semibold text-primary mb-3">Mots-clés</h3>
                <div className="flex flex-wrap gap-2">
                  {news.tags.map((tag, index) => <Badge key={index} variant="outline">
                      {tag}
                    </Badge>)}
                </div>
              </div>}
          </div>
        </article>
      </div>
    </Layout>;
};
export default ActualiteDetail;