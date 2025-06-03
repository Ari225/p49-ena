
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search, User, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image_url: string;
  published_date: string;
  author: string;
  reading_time: number;
}

const Blog = () => {
  const isMobile = useIsMobile();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Mock data
      const mockPosts: BlogPost[] = [
        {
          id: '1',
          title: 'L\'importance de la formation continue dans l\'administration publique',
          excerpt: 'Découvrez pourquoi la formation continue est essentielle pour l\'excellence de l\'administration publique.',
          category: 'Formation',
          image_url: '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg',
          published_date: '2024-01-20',
          author: 'Dr. Kouakou Marie',
          reading_time: 5
        },
        {
          id: '2',
          title: 'Les défis de la digitalisation administrative',
          excerpt: 'Comment les nouvelles technologies transforment l\'administration publique moderne.',
          category: 'Innovation',
          image_url: '/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg',
          published_date: '2024-01-15',
          author: 'M. Traoré Seydou',
          reading_time: 7
        }
      ];
      setPosts(mockPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(posts.map(post => post.category))];

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
        {/* Header Section */}
        <section className={`bg-primary text-white py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-xl opacity-90">
              Analyses, réflexions et témoignages de notre communauté
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className={`py-8 bg-gray-50 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedCategory === '' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('')}
                >
                  Toutes
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
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
                        <div className="h-48">
                          <img 
                            src={post.image_url} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary">{post.category}</Badge>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.reading_time} min
                          </div>
                        </div>
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(post.published_date).toLocaleDateString('fr-FR')}
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
                <Button onClick={() => { setSearchTerm(''); setSelectedCategory(''); }}>
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
