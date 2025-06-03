
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowLeft, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface BlogDetail {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image_url: string;
  images?: string[];
  published_date: string;
  author: string;
  reading_time: number;
  tags?: string[];
}

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const isMobile = useIsMobile();
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogDetail();
  }, [id]);

  const fetchBlogDetail = async () => {
    try {
      setLoading(true);
      // Mock detailed data
      const mockBlogDetail: BlogDetail = {
        id: id || '1',
        title: 'L\'importance de la formation continue dans l\'administration publique',
        content: `La formation continue représente un pilier fondamental de l'excellence dans l'administration publique moderne. Dans un monde en constante évolution, les fonctionnaires doivent s'adapter aux nouvelles technologies, aux changements réglementaires et aux attentes croissantes des citoyens.

        ## Les défis contemporains de l'administration

        L'administration publique fait face à de nombreux défis :
        - La digitalisation des services publics
        - L'évolution des besoins citoyens
        - La nécessité d'une plus grande efficacité
        - L'adaptation aux nouvelles réglementations

        ## Les bénéfices de la formation continue

        La formation continue apporte de nombreux avantages :

        ### Pour les fonctionnaires
        - Développement des compétences techniques
        - Amélioration de l'employabilité
        - Satisfaction professionnelle accrue
        - Adaptation aux changements

        ### Pour l'administration
        - Amélioration de la qualité des services
        - Optimisation des processus
        - Innovation dans les pratiques
        - Meilleure satisfaction citoyenne

        ## Recommandations pour une formation efficace

        Pour maximiser l'impact de la formation continue, il est essentiel de :
        1. Identifier les besoins spécifiques de chaque service
        2. Proposer des formations adaptées aux réalités du terrain
        3. Assurer un suivi post-formation
        4. Encourager le partage d'expériences entre collègues

        La P49 s'engage à accompagner ses membres dans cette démarche d'amélioration continue.`,
        excerpt: 'Découvrez pourquoi la formation continue est essentielle pour l\'excellence de l\'administration publique.',
        category: 'Formation',
        image_url: '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg',
        images: [
          '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg',
          '/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg'
        ],
        published_date: '2024-01-20',
        author: 'Dr. Kouakou Marie',
        reading_time: 5,
        tags: ['Formation', 'Administration publique', 'Développement professionnel', 'Innovation']
      };
      setBlog(mockBlogDetail);
    } catch (error) {
      console.error('Error fetching blog detail:', error);
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

  if (!blog) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
            <Link to="/blog">
              <Button>Retour au blog</Button>
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
          <Link to="/blog">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au blog
            </Button>
          </Link>
        </section>

        {/* Article Content */}
        <article className={`pb-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary">{blog.category}</Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(blog.published_date).toLocaleDateString('fr-FR')}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <User className="w-4 h-4 mr-2" />
                  {blog.author}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  {blog.reading_time} min de lecture
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {blog.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {blog.excerpt}
              </p>
            </header>

            {/* Main Image */}
            {blog.image_url && (
              <div className="mb-8">
                <img 
                  src={blog.image_url} 
                  alt={blog.title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-8">
              {blog.content.split('\n').map((paragraph, index) => {
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
                if (paragraph.trim().match(/^\d+\./)) {
                  return (
                    <li key={index} className="ml-4 mb-2 text-gray-700 list-decimal">
                      {paragraph.replace(/^\d+\./, '').trim()}
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
            {blog.images && blog.images.length > 1 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-primary mb-4">Images supplémentaires</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {blog.images.slice(1).map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`${blog.title} - Image ${index + 2}`}
                      className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-primary mb-3">Mots-clés</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
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

export default BlogDetail;
