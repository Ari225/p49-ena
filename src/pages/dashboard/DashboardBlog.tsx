
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import EditorSidebar from '@/components/EditorSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { FileText, Edit, Eye, Trash2 } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { isAdmin } from '@/utils/roleUtils';
import BlogFormDialog from '@/components/blog/BlogFormDialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import EditorDashboardBlog from './EditorDashboardBlog';

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
  const [viewingArticle, setViewingArticle] = useState<BlogPost | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; article: BlogPost | null }>({ isOpen: false, article: null });

  if (!user) {
    return <div>Non autorisé</div>;
  }

  // Si l'utilisateur n'est pas admin, afficher le dashboard rédacteur
  if (!isAdmin(user)) {
    return <EditorDashboardBlog />;
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Transform data to match BlogPost interface
      const transformedPosts = (data || []).map(post => {
        return {
          ...post,
          author: post.author_name || 'Auteur inconnu',
          published_date: post.published_date || post.created_at
        };
      });

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
          matricule: articleData.matricule,
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

  const handleViewArticle = (post: BlogPost) => {
    setViewingArticle(post);
  };

  const handleEditArticle = (post: BlogPost) => {
    setEditingArticle(post);
    setIsFormOpen(true);
  };

  const handleDeleteArticle = (post: BlogPost) => {
    setDeleteConfirm({ isOpen: true, article: post });
  };

  const confirmDeleteArticle = async () => {
    if (!deleteConfirm.article) return;

    try {
      const { error } = await supabase
        .from('blog_articles')
        .delete()
        .eq('id', deleteConfirm.article.id);

      if (error) throw error;

      toast.success('Article supprimé avec succès');
      setDeleteConfirm({ isOpen: false, article: null });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Erreur lors de la suppression de l\'article');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'valide':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Validé</span>;
      case 'en_attente':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">En attente</span>;
      case 'refuse':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">Refusé</span>;
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
            <h1 className="text-2xl font-bold text-primary">Gestion des<br />Articles de Blog</h1>
            <p className="text-gray-600 mt-1 text-sm">Tous les articles de blog des rédacteurs</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <FileText className="mr-2 h-5 w-5" />
                Tous les Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {posts.length === 0 ? (
                  <p className="text-center text-gray-500 py-8 text-sm">
                    Aucun article de blog soumis
                  </p>
                ) : (
                  posts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="flex gap-4 p-4">
                        <div className="flex-shrink-0">
                          <img 
                            src={post.image_url || '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg'} 
                            alt={post.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="bg-primary text-white px-2 py-1 rounded text-xs font-medium">
                                  {post.category || 'Général'}
                                </span>
                                {getStatusBadge(post.status)}
                              </div>
                              <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1">{post.title}</h3>
                              <p className="text-xs text-gray-600 mb-2">
                                Par <span className="font-medium text-primary">{post.author}</span> - {new Date(post.published_date).toLocaleDateString('fr-FR')}
                              </p>
                              {post.summary && (
                                <p className="text-xs text-gray-700 line-clamp-2">{post.summary}</p>
                              )}
                            </div>
                            <div className="flex space-x-1 ml-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewArticle(post)}>
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleEditArticle(post)}>
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteArticle(post)}>
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
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
            <p className="text-gray-600 mt-2">Tous les articles de blog des rédacteurs</p>
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
                    <div key={post.id} className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="flex gap-6 p-6">
                        <div className="flex-shrink-0">
                          <img 
                            src={post.image_url || '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg'} 
                            alt={post.title}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="bg-primary text-white px-3 py-1 rounded text-sm font-medium">
                                  {post.category || 'Général'}
                                </span>
                                {getStatusBadge(post.status)}
                              </div>
                              <h3 className="font-semibold text-lg text-gray-900 mb-2">{post.title}</h3>
                              <p className="text-sm text-gray-600 mb-3">
                                Par <span className="font-medium text-primary">{post.author}</span> - Publié le {new Date(post.published_date).toLocaleDateString('fr-FR')}
                              </p>
                              {post.summary && (
                                <p className="text-sm text-gray-700 line-clamp-2">{post.summary}</p>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <Button variant="outline" size="sm" onClick={() => handleViewArticle(post)}>
                                <Eye className="h-4 w-4 mr-1" />
                                Voir
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleEditArticle(post)}>
                                <Edit className="h-4 w-4 mr-1" />
                                Modifier
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteArticle(post)}>
                                <Trash2 className="h-4 w-4 mr-1" />
                                Supprimer
                              </Button>
                            </div>
                          </div>
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

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Gestion du Blog</h1>
            <p className="text-gray-600 mt-2">Tous les articles de blog des rédacteurs</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Articles du Blog
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {posts.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Aucun article de blog créé
                  </p>
                ) : (
                  posts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg border shadow-sm hover:shadow-lg transition-all duration-200">
                      <div className="flex gap-6 p-6">
                        <div className="flex-shrink-0">
                          <img 
                            src={post.image_url || '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg'} 
                            alt={post.title}
                            className="w-32 h-32 object-cover rounded-lg shadow-sm"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                                  {post.category || 'Général'}
                                </span>
                                {getStatusBadge(post.status)}
                              </div>
                              <h3 className="font-semibold text-xl text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                              <p className="text-base text-gray-600 mb-4">
                                Par <span className="font-semibold text-primary">{post.author}</span> - Publié le {new Date(post.published_date).toLocaleDateString('fr-FR')}
                              </p>
                              {post.summary && (
                                <p className="text-gray-700 line-clamp-3 text-base leading-relaxed">{post.summary}</p>
                              )}
                            </div>
                            <div className="flex items-center space-x-3 ml-6">
                              <Button variant="outline" size="default" onClick={() => handleViewArticle(post)} className="flex items-center gap-2">
                                <Eye className="h-4 w-4" />
                                Voir
                              </Button>
                              <Button variant="outline" size="default" onClick={() => handleEditArticle(post)} className="flex items-center gap-2">
                                <Edit className="h-4 w-4" />
                                Modifier
                              </Button>
                              <Button variant="outline" size="default" className="text-red-600 hover:text-red-700 flex items-center gap-2" onClick={() => handleDeleteArticle(post)}>
                                <Trash2 className="h-4 w-4" />
                                Supprimer
                              </Button>
                            </div>
                          </div>
                        </div>
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
        onClose={() => {
          setIsFormOpen(false);
          setEditingArticle(null);
        }}
        onSubmit={handleCreateArticle}
        editingArticle={editingArticle}
      />

      {/* Dialog pour voir un article */}
      <Dialog open={!!viewingArticle} onOpenChange={() => setViewingArticle(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewingArticle?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Par {viewingArticle?.author}</span>
              <span>{viewingArticle?.published_date && new Date(viewingArticle.published_date).toLocaleDateString('fr-FR')}</span>
              {getStatusBadge(viewingArticle?.status || '')}
            </div>
            {viewingArticle?.image_url && (
              <img src={viewingArticle.image_url} alt={viewingArticle.title} className="w-full h-64 object-cover rounded-lg" />
            )}
            <div className="prose max-w-none">
              <p className="text-lg text-muted-foreground">{viewingArticle?.summary}</p>
              <div dangerouslySetInnerHTML={{ __html: viewingArticle?.content || '' }} />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={deleteConfirm.isOpen} onOpenChange={(isOpen) => !isOpen && setDeleteConfirm({ isOpen: false, article: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer l'article "{deleteConfirm.article?.title}" ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteConfirm({ isOpen: false, article: null })}>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteArticle} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default DashboardBlog;
