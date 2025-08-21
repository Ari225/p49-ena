
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search, User, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  category: string;
  image_url: string;
  published_date: string;
  author_name: string;
  reading_time: number;
}

const Blog = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('blog_articles')
        .select('id, title, summary, category, image_url, published_date, author_name, reading_time')
        .eq('status', 'valide')
        .order('published_date', { ascending: false });

      if (error) {
        console.error('Erreur lors de la récupération des articles:', error);
        return;
      }

      if (data) {
        setPosts(data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return post.title.toLowerCase().includes(searchLower) ||
           post.summary.toLowerCase().includes(searchLower) ||
           (post.category && post.category.toLowerCase().includes(searchLower)) ||
           (post.author_name && post.author_name.toLowerCase().includes(searchLower));
  });

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Chargement...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className={`relative ${
          isMobile ? 'h-[30vh]' : 
          isTablet ? 'h-[45vh]' : 
          'h-[60vh]'
        } flex items-center justify-center text-white overflow-hidden`}>
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/archives.webp" 
              alt="Background blog" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${
            isMobile ? 'px-[25px]' : 
            isTablet ? 'px-[50px]' : 
            'px-8 lg:px-[100px]'
          }`}>
            <h1 className={`font-bold mb-[10px] md:mb-[10px] animate-fade-in ${
              isMobile ? 'text-2xl' : 
              isTablet ? 'text-4xl' : 
              'text-6xl md:text-6xl lg:text-6xl'
            }`}>
              Blog
            </h1>
            <p className={`italic mb-6 md:mb-8 animate-fade-in text-white font-normal ${
              isMobile ? 'text-sm' : 
              isTablet ? 'text-base' : 
              'text-lg md:text-lg'
            }`}>
              Analyses et réflexions de nos experts
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className={`py-8 bg-gray-50 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="w-full max-w-md relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher par titre, catégorie ou auteur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className={`py-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <Link key={post.id} to={`/blog/${post.id}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                        {post.image_url && (
                          <div className="h-48 relative">
                            <img 
                              src={post.image_url} 
                              alt={post.title} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
                              <Clock className="w-3 h-3 mr-1 inline" />
                              {post.reading_time || 5} min
                            </div>
                          </div>
                        )}
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-primary text-white">
                              {post.category || 'Non catégorisé'}
                            </span>
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(post.published_date).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                          <CardTitle className="text-lg">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4">{post.summary}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {post.author_name || 'Auteur anonyme'}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Aucun article trouvé.</p>
                <Button onClick={() => setSearchTerm('')}>
                  Afficher tous les articles
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Blog;
