
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Edit, Eye, Trash2 } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { isAdmin } from '@/utils/roleUtils';
import BlogFormDialog from '@/components/blog/BlogFormDialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content?: string;
  category?: string;
  reading_time?: number;
  image_url?: string;
  author_id?: string;
  author?: string;
  created_at: string;
  updated_at: string;
  published_date?: string;
  status: string;
  validated_by?: string;
}

const DashboardBlog = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  if (!user) {
    return <div>Non autorisé</div>;
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_articles')
        .select(`
          *,
          app_users!author_id(first_name, last_name)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Transform data to match BlogPost interface
      const transformedPosts = (data || []).map(post => ({
        ...post,
        author: post.app_users ? `${post.app_users.first_name} ${post.app_users.last_name}` : 'Auteur inconnu',
        published_date: post.published_date || post.created_at
      }));

      setPosts(transformedPosts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast.error('Erreur lors du chargement des articles');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateArticle = async (articleData: any) => {
    try {
      let imageUrl = null;

      // Upload image if selected
      if (articleData.selectedImage) {
        const fileExt = articleData.selectedImage.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('blog-images')
          .upload(fileName, articleData.selectedImage);

        if (uploadError) {
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from('blog-images')
          .getPublicUrl(uploadData.path);
        
        imageUrl = urlData.publicUrl;
      }

      const { error } = await supabase
        .from('blog_articles')
        .insert({
          title: articleData.title,
          summary: articleData.summary,
          content: articleData.content,
          category: articleData.category,
          reading_time: articleData.reading_time,
          image_url: imageUrl,
          author_id: user?.id,
          status: 'en_attente'
        });

      if (error) {
        throw error;
      }

      toast.success('Article créé avec succès');
      setIsFormOpen(false);
      fetchPosts();
    } catch (error) {
      console.error('Error creating article:', error);
      toast.error('Erreur lors de la création de l\'article');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Publié</span>;
      case 'draft':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">Brouillon</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">{status}</span>;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className={isMobile ? "px-[25px] py-[50px] pb-20" : isTablet ? "px-[30px] py-[40px] pb-20" : "flex"}>
          {!isMobile && !isTablet && <AdminSidebar />}
          <div className={isMobile ? "" : isTablet ? "" : "flex-1 ml-64 p-8"}>
            <div className="text-center">Chargement...</div>
          </div>
        </div>
        {(isMobile || isTablet) && <AdminSidebar />}
      </Layout>
    );
  }

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Gestion du<br />Blog</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer les articles du blog</p>
          </div>

          <div className="mb-4">
            <Button 
              className="bg-primary hover:bg-primary/90 w-full"
              onClick={() => setIsFormOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouvel article
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <FileText className="mr-2 h-5 w-5" />
                Articles du Blog
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {posts.length === 0 ? (
                  <p className="text-center text-gray-500 py-8 text-sm">
                    Aucun article de blog créé
                  </p>
                ) : (
                  posts.map((post) => (
                    <div key={post.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="mb-3">
                        <h3 className="font-medium text-sm">{post.title}</h3>
                        <p className="text-xs text-gray-600 mt-1">
                          Par {post.author} - Publié le {new Date(post.published_date).toLocaleDateString('fr-FR')}
                        </p>
                        {post.summary && (
                          <p className="text-xs text-gray-700 mt-2 line-clamp-2">{post.summary}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        {getStatusBadge(post.status)}
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <AdminSidebar />
        
        <BlogFormDialog
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleCreateArticle}
          editingArticle={editingArticle}
        />
      </Layout>
    );
  }

  if (isTablet) {
    return (
      <Layout>
        <div className="px-[30px] py-[40px] pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Gestion du Blog</h1>
            <p className="text-gray-600 mt-2">Gérer les articles du blog</p>
          </div>

          <div className="mb-6">
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => setIsFormOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouvel article
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Articles du Blog
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {posts.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Aucun article de blog créé
                  </p>
                ) : (
                  posts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{post.title}</h3>
                        <p className="text-sm text-gray-600">
                          Par {post.author} - Publié le {new Date(post.published_date).toLocaleDateString('fr-FR')}
                        </p>
                        {post.summary && (
                          <p className="text-sm text-gray-700 mt-1">{post.summary}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(post.status)}
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <AdminSidebar />
        
        <BlogFormDialog
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleCreateArticle}
          editingArticle={editingArticle}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Gestion du Blog</h1>
            <p className="text-gray-600 mt-2">Gérer les articles du blog</p>
          </div>

          <div className="mb-6">
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => setIsFormOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouvel article
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Articles du Blog
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {posts.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Aucun article de blog créé
                  </p>
                ) : (
                  posts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{post.title}</h3>
                        <p className="text-sm text-gray-600">
                          Par {post.author} - Publié le {new Date(post.published_date).toLocaleDateString('fr-FR')}
                        </p>
                        {post.summary && (
                          <p className="text-sm text-gray-700 mt-1">{post.summary}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(post.status)}
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <BlogFormDialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateArticle}
        editingArticle={editingArticle}
      />
    </Layout>
  );
};

export default DashboardBlog;
