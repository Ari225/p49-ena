import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, Share2, User, Tag, ChevronRight } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { toast } from 'sonner';
const BlogDetail = () => {
  const {
    id
  } = useParams();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [blog, setBlog] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (id) {
      fetchBlogData();
      fetchRelatedArticles();
    }
  }, [id]);
  const fetchBlogData = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('blog_articles').select('*').eq('id', id).eq('status', 'valide').single();
      if (error) {
        console.error('Erreur lors de la récupération de l\'article:', error);
        return;
      }
      setBlog(data);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'article:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchRelatedArticles = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('blog_articles').select('id, title, summary, image_url, published_date, author_name, reading_time, category').eq('status', 'valide').neq('id', id).order('published_date', {
        ascending: false
      }).limit(3);
      if (error) {
        console.error('Erreur lors de la récupération des articles connexes:', error);
        return;
      }
      setRelatedArticles(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des articles connexes:', error);
    }
  };
  const formatContent = (content: string) => {
    if (!content) return '';
    marked.setOptions({
      breaks: true,
      gfm: true
    });
    const htmlContent = marked.parse(content);
    return DOMPurify.sanitize(htmlContent as string);
  };
  const handleShare = async () => {
    const shareData = {
      title: blog?.title || 'Article du blog P49',
      text: blog?.summary || 'Découvrez cet article intéressant sur le blog de la P49',
      url: window.location.href
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Lien copié dans le presse-papier');
      }
    } catch (error) {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Lien copié dans le presse-papier');
    }
  };
  if (loading) {
    return <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement de l'article...</p>
          </div>
        </div>
      </Layout>;
  }
  if (!blog) {
    return <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
            <p className="text-gray-600 mb-6">L'article que vous recherchez n'existe pas ou n'est pas encore publié.</p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au blog
              </Button>
            </Link>
          </div>
        </div>
      </Layout>;
  }
  return <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section with Image */}
        <div className="relative h-96 overflow-hidden">
          <img src={blog.image_url || '/lovable-uploads/8cbb0164-0529-47c1-9caa-8244c17623b3.jpg'} alt={blog.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Navigation Overlay */}
          <div className="absolute top-6 left-6">
            <Link to="/blog">
              <Button variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au blog
              </Button>
            </Link>
          </div>

          {/* Share Button */}
          <div className="absolute top-6 right-6">
            
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/90 text-white backdrop-blur-sm">
                  <Tag className="h-3 w-3 mr-2" />
                  {blog.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span className="font-medium">{blog.author_name || 'Auteur anonyme'}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    {new Date(blog.published_date || blog.created_at).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{blog.reading_time || 5} min de lecture</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            {/* Tags */}
            {blog.tags && <div className="flex flex-wrap gap-2 mb-8">
                {blog.tags.map((tag, index) => <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium border border-primary/20">
                    #{tag}
                  </span>)}
              </div>}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed [&>h3]:text-gray-900 [&>h3]:font-bold [&>h3]:text-2xl [&>h3]:mb-4 [&>h3]:mt-8 [&>ul]:text-gray-700 [&>p]:text-gray-700 [&>p]:mb-6 [&>p]:leading-relaxed [&>ul>li]:mb-2 [&>blockquote]:my-8 [&>blockquote]:p-6 [&>blockquote]:bg-gray-50 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:italic [&>blockquote]:text-gray-700 [&>blockquote]:rounded-r-lg" dangerouslySetInnerHTML={{
              __html: formatContent(blog.content)
            }} />
            </div>

            {/* Author Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 shadow-lg">
                  {blog.author_image ? <img src={blog.author_image} alt={blog.author_name || 'Auteur'} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                      <User className="h-8 w-8 text-white" />
                    </div>}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {blog.author_name || 'Auteur anonyme'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {blog.author_function || 'Membre éminent de la Promotion 49, expert en administration publique et réformes institutionnelles.'}
                  </p>
                  <Button variant="outline" size="sm" onClick={handleShare} className="text-gray-600 border-gray-300 hover:bg-gray-50">
                    <Share2 className="h-4 w-4 mr-2" />
                    Partager cet article
                  </Button>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Related Articles */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Articles connexes
              </h2>
              <p className="text-lg text-gray-600">
                Découvrez d'autres réflexions de nos membres
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.length > 0 ? relatedArticles.map(article => <Link key={article.id} to={`/blog/${article.id}`} className="block">
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div className="w-full h-32 mb-4 rounded-lg overflow-hidden">
                      {article.image_url ? <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg"></div>}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.summary}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>
                        {new Date(article.published_date).toLocaleDateString('fr-FR')}
                      </span>
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{article.reading_time || 5} min</span>
                    </div>
                  </div>
                </Link>) : <div className="col-span-full text-center text-gray-500">
                  <p>Aucun article connexe trouvé</p>
                </div>}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        
      </div>
    </Layout>;
};
export default BlogDetail;