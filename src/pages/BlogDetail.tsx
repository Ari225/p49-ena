import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, Share2, User, Tag, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { toast } from 'sonner';
import CommentsList from '@/components/blog/CommentsList';
const BlogDetail = () => {
  const { id } = useParams();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState({ likes: 0, dislikes: 0 });
  const [userLike, setUserLike] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBlogData();
      fetchLikes();
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
  
  const fetchLikes = async () => {
    try {
      // Récupérer les likes
      const { data: likesData } = await supabase
        .from('blog_article_likes')
        .select('like_type, user_id, visitor_ip')
        .eq('article_id', id);

      if (likesData) {
        const likesCount = likesData.filter(like => like.like_type === 'like').length;
        const dislikesCount = likesData.filter(like => like.like_type === 'dislike').length;
        setLikes({ likes: likesCount, dislikes: dislikesCount });

        // Vérifier si l'utilisateur a déjà liké
        const { data: user } = await supabase.auth.getUser();
        const userLikeData = likesData.find(like => 
          like.user_id === user.user?.id
        );
        if (userLikeData) {
          setUserLike(userLikeData.like_type);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des likes:', error);
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
  const handleLike = async (likeType: 'like' | 'dislike') => {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      // Supprimer le like précédent s'il existe
      if (userLike) {
        await supabase
          .from('blog_article_likes')
          .delete()
          .eq('article_id', id)
          .eq(user.user ? 'user_id' : 'visitor_ip', user.user?.id || 'visitor');
      }

      // Ajouter le nouveau like seulement s'il est différent
      if (userLike !== likeType) {
        const { error } = await supabase
          .from('blog_article_likes')
          .insert({
            article_id: id,
            user_id: user.user?.id,
            visitor_ip: user.user ? null : 'visitor',
            like_type: likeType
          });

        if (error) throw error;
        setUserLike(likeType);
      } else {
        setUserLike(null);
      }

      fetchLikes();
    } catch (error) {
      console.error('Erreur lors du like:', error);
      toast.error('Erreur lors de l\'enregistrement de votre réaction');
    }
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
                <span className="px-2 py-1 rounded text-xs font-medium bg-primary text-white">
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

          {/* Likes and Comments Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            {/* Likes */}
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant={userLike === 'like' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleLike('like')}
                className="flex items-center gap-2"
              >
                <ThumbsUp className="h-4 w-4" />
                {likes.likes}
              </Button>
              <Button
                variant={userLike === 'dislike' ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => handleLike('dislike')}
                className="flex items-center gap-2"
              >
                <ThumbsDown className="h-4 w-4" />
                {likes.dislikes}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare} className="ml-auto">
                <Share2 className="h-4 w-4 mr-2" />
                Partager
              </Button>
            </div>

            {/* Comments Section */}
            <CommentsList articleId={id} />
          </div>
        </div>
      </div>
    </Layout>;
};
export default BlogDetail;