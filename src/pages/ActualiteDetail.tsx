
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, Share2, User, Tag, ChevronRight } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { formatContent } from '@/utils/contentSecurity';

const ActualiteDetail = () => {
  const { id } = useParams();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [actualite, setActualite] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (id) {
      fetchActualite();
    }
  }, [id]);

  const fetchActualite = async () => {
    try {
      setLoading(true);
      const { data: newsData, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .eq('is_visible', true)
        .single();

      if (error) {
        console.error('Error fetching news:', error);
        setNotFound(true);
        return;
      }

      if (newsData) {
        setActualite({
          id: newsData.id,
          title: newsData.title,
          content: newsData.details || newsData.summary || '',
          category: newsData.category,
          date: newsData.published_date,
          author: newsData.published_by || '',
          image: newsData.image_url || '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg',
          readTime: newsData.reading_time ? `${newsData.reading_time} min` : '3 min',
          summary: newsData.summary
        });
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Error in fetchActualite:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = actualite?.title || 'Actualité P49';
    const text = actualite?.summary || 'Découvrez cette actualité de la P49';

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        console.error('Erreur lors du partage:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        // Vous pouvez ajouter une notification toast ici
        alert('Lien copié dans le presse-papier !');
      } catch (error) {
        console.error('Erreur lors de la copie:', error);
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement de l'actualité...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (notFound || !actualite) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Actualité non trouvée</h1>
            <p className="text-gray-600 mb-6">L'actualité que vous recherchez n'existe pas ou n'est plus disponible.</p>
            <Link to="/actualites">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux actualités
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
        {/* Navigation Header */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className={`${isMobile ? 'px-4 py-4' : isTablet ? 'px-8 py-6' : 'px-16 py-6'} max-w-7xl mx-auto`}>
            <Link to="/actualites">
              <Button variant="ghost" className="text-gray-600 hover:text-primary hover:bg-primary/5 p-0 h-auto font-normal group">
                <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Retour aux actualités
              </Button>
            </Link>
          </div>
        </div>

        <div className={`${isMobile ? 'px-4 py-6' : isTablet ? 'px-8 py-8' : 'px-16 py-12'} max-w-4xl mx-auto`}>
          {/* Article Container */}
          <article className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Hero Image */}
            <div className="relative">
              <div className={`${isMobile ? 'h-48' : isTablet ? 'h-64' : 'h-80'} overflow-hidden`}>
                <img 
                  src={actualite.image} 
                  alt={actualite.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-white/90 backdrop-blur text-primary shadow-sm">
                  <Tag className="h-3 w-3 mr-1.5" />
                  {actualite.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className={`${isMobile ? 'p-6' : isTablet ? 'p-8' : 'p-10'}`}>
              {/* Title */}
              <h1 className={`${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'} font-bold text-gray-900 mb-6 leading-tight`}>
                {actualite.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">
                    {new Date(actualite.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">{actualite.readTime} de lecture</span>
                </div>
              </div>

              {/* Article Body */}
              <div className="prose prose-lg max-w-none [&_a]:pointer-events-auto [&_a]:cursor-pointer [&_a]:relative [&_a]:z-10">
                {actualite.content ? (
                  <div 
                    className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                    style={{
                      lineHeight: '1.8',
                    }}
                    dangerouslySetInnerHTML={{ 
                      __html: formatContent(actualite.content)
                    }}
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    {actualite.summary || "Contenu de l'actualité non disponible."}
                  </p>
                )}
              </div>

              {/* Debug info pour voir le contenu brut */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 p-4 bg-gray-100 rounded text-xs">
                  <strong>Debug - Contenu brut:</strong>
                  <pre className="whitespace-pre-wrap">{actualite.content}</pre>
                </div>
              )}

              {/* Author Section */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {actualite.author}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Publié le {new Date(actualite.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <Button variant="outline" size="sm" className="text-gray-600 border-gray-200 hover:bg-gray-50" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Partager cet article
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-primary/90 text-white">
          <div className={`${isMobile ? 'px-4 py-16' : isTablet ? 'px-8 py-20' : 'px-16 py-24'} max-w-4xl mx-auto text-center`}>
            <h2 className={`${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'} font-bold mb-4`}>
              Découvrez plus d'actualités
            </h2>
            <p className={`${isMobile ? 'text-base' : 'text-lg'} mb-8 opacity-90 max-w-2xl mx-auto`}>
              Restez informé des dernières nouvelles de la P49 et de l'administration publique ivoirienne
            </p>
            <Link to="/actualites">
              <Button 
                size="lg" 
                className="bg-secondary text-primary hover:bg-secondary/90 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Voir toutes les actualités
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ActualiteDetail;
