import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import EditorSidebar from '@/components/EditorSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Edit, Eye, Trash2, X, CheckCircle, XCircle, PenTool } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import BlogFormDialog from '@/components/blog/BlogFormDialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  reading_time: number;
  image_url?: string;
  author_id?: string;
  author?: string;
  created_at: string;
  updated_at: string;
  published_date?: string;
  status: string;
  validated_by?: string;
  matricule: string;
}

const EditorDashboardBlog = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<BlogPost | null>(null);
  const [viewingArticle, setViewingArticle] = useState<BlogPost | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

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
        .eq('author_id', user.id) // Filtrer par auteur
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Transform data to match BlogPost interface
      const transformedPosts = (data || []).map(post => ({
        ...post,
        author: post.author_name || (post.app_users ? `${post.app_users.first_name} ${post.app_users.last_name}` : `${user.firstName} ${user.lastName}`),
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

  const handleViewArticle = (article: BlogPost) => {
    setViewingArticle(article);
  };

  const handleEditArticle = (article: BlogPost) => {
    setEditingArticle(article);
    setIsFormOpen(true);
  };

  const handleDeleteArticle = (articleId: string) => {
    setArticleToDelete(articleId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteArticle = async () => {
    if (!articleToDelete) return;

    try {
      const { error } = await supabase
        .from('blog_articles')
        .delete()
        .eq('id', articleToDelete);

      if (error) {
        throw error;
      }

      toast.success('Article supprimé avec succès');
      fetchPosts(); // Actualiser la liste après suppression
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Erreur lors de la suppression de l\'article');
    } finally {
      setDeleteDialogOpen(false);
      setArticleToDelete(null);
    }
  };

  const handleToggleStatus = async (post: BlogPost) => {
    try {
      let newStatus: 'en_attente' | 'valide' | 'refuse';
      switch (post.status) {
        case 'en_attente':
          newStatus = 'valide';
          break;
        case 'valide':
          newStatus = 'en_attente';
          break;
        case 'refuse':
          newStatus = 'valide';
          break;
        default:
          newStatus = 'en_attente';
      }

      const { error } = await supabase
        .from('blog_articles')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', post.id);

      if (error) throw error;

      const statusText = newStatus === 'valide' ? 'publié' : 
                        newStatus === 'en_attente' ? 'mis en attente' : 'refusé';
      toast.success(`Article ${statusText} avec succès`);
      fetchPosts(); // Actualiser la liste après changement de statut
    } catch (error) {
      console.error('Error toggling article status:', error);
      toast.error('Erreur lors du changement de statut de l\'article');
    }
  };

  const handleCreateOrUpdateArticle = async (articleData: any) => {
    try {
      let imageUrl = editingArticle?.image_url || null;

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

      const articlePayload = {
        title: articleData.title,
        summary: articleData.summary,
        content: articleData.content,
        category: articleData.category,
        reading_time: articleData.reading_time,
        matricule: articleData.matricule,
        author_name: articleData.authorData?.name,
        author_function: articleData.authorData?.function,
        author_image: articleData.authorData?.image,
        image_url: imageUrl,
        author_id: user?.id,
        status: (editingArticle ? editingArticle.status : 'en_attente') as 'en_attente' | 'valide' | 'refuse',
        published_date: new Date().toISOString().split('T')[0]
      };

      if (editingArticle) {
        // Update existing article
        const { error } = await supabase
          .from('blog_articles')
          .update(articlePayload)
          .eq('id', editingArticle.id);

        if (error) {
          throw error;
        }

        toast.success('Article mis à jour avec succès');
      } else {
        // Create new article
        const { error } = await supabase
          .from('blog_articles')
          .insert(articlePayload);

        if (error) {
          throw error;
        }

        toast.success('Article créé et publié avec succès');
      }

      setIsFormOpen(false);
      setEditingArticle(null);
      fetchPosts();
    } catch (error) {
      console.error('Error saving article:', error);
      toast.error('Erreur lors de l\'enregistrement de l\'article');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'valide':
      case 'publie':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Publié</span>;
      case 'en_attente':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">En attente</span>;
      case 'refuse':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">Refusé</span>;
      default:
        return null;
    }
  };

  const getToggleButtonText = (status: string) => {
    switch (status) {
      case 'en_attente':
        return 'Publier';
      case 'valide':
      case 'publie':
        return 'Dépublier';
      case 'refuse':
        return 'Publier';
      default:
        return 'Publier';
    }
  };

  const formatContent = (content: string) => {
    if (!content) return '';
    
    // Configure marked options
    marked.setOptions({
      breaks: true,
      gfm: true
    });
    
    // Convert markdown to HTML
    const htmlContent = marked.parse(content);
    
    // Sanitize HTML to prevent XSS attacks
    return DOMPurify.sanitize(htmlContent as string);
  };

  if (loading) {
    return (
      <Layout>
        <div className={isMobile ? "px-[25px] py-[50px] pb-20" : isTablet ? "px-[30px] py-[40px] pb-20" : "flex"}>
          {!isMobile && !isTablet && <EditorSidebar />}
          <div className={isMobile ? "" : isTablet ? "" : "flex-1 ml-64 p-8"}>
            <div className="text-center">Chargement...</div>
          </div>
        </div>
        {(isMobile || isTablet) && <EditorSidebar />}
      </Layout>
    );
  }

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary flex items-center">
              <PenTool className="mr-3 h-6 w-6" />
              Liste des articles de blog ({posts.length})
            </h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer vos articles de blog</p>
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

          <div className="space-y-6">
            {posts.length === 0 ? (
              <p className="text-center text-gray-500 py-8 text-sm">
                Aucun article créé
              </p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <div className="md:flex">
                    {post.image_url && (
                      <div className="md:w-48 h-48 md:h-auto">
                        <img 
                          src={post.image_url} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          {post.category && (
                            <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-2">
                              {post.category}
                            </span>
                          )}
                          <h3 className="font-semibold text-sm mb-2 line-clamp-2">{post.title}</h3>
                          {post.summary && (
                            <p className="text-xs text-gray-600 mb-3 line-clamp-2">{post.summary}</p>
                          )}
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div>
                              <span>Par {post.author}</span>
                              <span className="mx-2">•</span>
                              <span>{new Date(post.created_at).toLocaleDateString('fr-FR')}</span>
                              {post.reading_time && (
                                <>
                                  <span className="mx-2">•</span>
                                  <span>{post.reading_time} min de lecture</span>
                                </>
                              )}
                            </div>
                            {getStatusBadge(post.status)}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 mt-3">
                        <Button variant="outline" size="sm" onClick={() => handleViewArticle(post)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEditArticle(post)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleToggleStatus(post)}
                          className={post.status === 'valide' || post.status === 'publie' ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'}
                        >
                          {post.status === 'valide' || post.status === 'publie' ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteArticle(post.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <EditorSidebar />
        
        <BlogFormDialog
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingArticle(null);
          }}
          onSubmit={handleCreateOrUpdateArticle}
          editingArticle={editingArticle}
        />

        <Dialog open={!!viewingArticle} onOpenChange={() => setViewingArticle(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                {viewingArticle?.title}
                <Button variant="ghost" size="sm" onClick={() => setViewingArticle(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>
            {viewingArticle && (
              <div className="space-y-4">
                {viewingArticle.image_url && (
                  <img 
                    src={viewingArticle.image_url} 
                    alt={viewingArticle.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
                <div className="text-sm text-gray-600">
                  <span>Par {viewingArticle.author}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(viewingArticle.created_at).toLocaleDateString('fr-FR')}</span>
                  {viewingArticle.reading_time && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{viewingArticle.reading_time} min de lecture</span>
                    </>
                  )}
                </div>
                {viewingArticle.summary && (
                  <p className="text-gray-600 italic">{viewingArticle.summary}</p>
                )}
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-em:text-gray-600 prose-blockquote:border-l-primary prose-blockquote:text-gray-600 prose-ul:text-gray-700 prose-ol:text-gray-700"
                  dangerouslySetInnerHTML={{ __html: formatContent(viewingArticle.content || '') }} 
                />
              </div>
            )}
          </DialogContent>
        </Dialog>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteArticle} className="bg-red-600 hover:bg-red-700">
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Layout>
    );
  }

  if (isTablet) {
    return (
      <Layout>
        <div className="px-[30px] py-[40px] pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary flex items-center">
              <PenTool className="mr-3 h-7 w-7" />
              Liste des articles de blog ({posts.length})
            </h1>
            <p className="text-gray-600 mt-2">Gérer vos articles de blog</p>
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

          <div className="space-y-6">
            {posts.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Aucun article créé
              </p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <div className="md:flex">
                    {post.image_url && (
                      <div className="md:w-48 h-48 md:h-auto">
                        <img 
                          src={post.image_url} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          {post.category && (
                            <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-2">
                              {post.category}
                            </span>
                          )}
                          <h3 className="font-semibold text-base mb-2 line-clamp-2">{post.title}</h3>
                          {post.summary && (
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.summary}</p>
                          )}
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                              <span>Par {post.author}</span>
                              <span className="mx-2">•</span>
                              <span>{new Date(post.created_at).toLocaleDateString('fr-FR')}</span>
                              {post.reading_time && (
                                <>
                                  <span className="mx-2">•</span>
                                  <span>{post.reading_time} min de lecture</span>
                                </>
                              )}
                            </div>
                            {getStatusBadge(post.status)}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 mt-3">
                        <Button variant="outline" size="sm" onClick={() => handleViewArticle(post)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEditArticle(post)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleToggleStatus(post)}
                          className={post.status === 'valide' || post.status === 'publie' ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'}
                        >
                          {post.status === 'valide' || post.status === 'publie' ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteArticle(post.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <EditorSidebar />
        
        <BlogFormDialog
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingArticle(null);
          }}
          onSubmit={handleCreateOrUpdateArticle}
          editingArticle={editingArticle}
        />

        <Dialog open={!!viewingArticle} onOpenChange={() => setViewingArticle(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                {viewingArticle?.title}
                <Button variant="ghost" size="sm" onClick={() => setViewingArticle(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>
            {viewingArticle && (
              <div className="space-y-4">
                {viewingArticle.image_url && (
                  <img 
                    src={viewingArticle.image_url} 
                    alt={viewingArticle.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
                <div className="text-sm text-gray-600">
                  <span>Par {viewingArticle.author}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(viewingArticle.created_at).toLocaleDateString('fr-FR')}</span>
                  {viewingArticle.reading_time && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{viewingArticle.reading_time} min de lecture</span>
                    </>
                  )}
                </div>
                {viewingArticle.summary && (
                  <p className="text-gray-600 italic">{viewingArticle.summary}</p>
                )}
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-em:text-gray-600 prose-blockquote:border-l-primary prose-blockquote:text-gray-600 prose-ul:text-gray-700 prose-ol:text-gray-700"
                  dangerouslySetInnerHTML={{ __html: formatContent(viewingArticle.content || '') }} 
                />
              </div>
            )}
          </DialogContent>
        </Dialog>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteArticle} className="bg-red-600 hover:bg-red-700">
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex">
        <EditorSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary flex items-center">
              <PenTool className="mr-3 h-8 w-8" />
              Liste des articles de blog ({posts.length})
            </h1>
            <p className="text-gray-600 mt-2">Gérer vos articles de blog</p>
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

          <div className="space-y-6">
            {posts.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Aucun article créé
              </p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <div className="md:flex">
                    {post.image_url && (
                      <div className="md:w-64 h-48 md:h-auto">
                        <img 
                          src={post.image_url} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          {post.category && (
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
                              {post.category}
                            </span>
                          )}
                          <h3 className="font-semibold text-lg mb-3 line-clamp-2">{post.title}</h3>
                          {post.summary && (
                            <p className="text-gray-600 mb-4 line-clamp-2">{post.summary}</p>
                          )}
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                              <span>Par {post.author}</span>
                              <span className="mx-2">•</span>
                              <span>{new Date(post.created_at).toLocaleDateString('fr-FR')}</span>
                              {post.reading_time && (
                                <>
                                  <span className="mx-2">•</span>
                                  <span>{post.reading_time} min de lecture</span>
                                </>
                              )}
                            </div>
                            {getStatusBadge(post.status)}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewArticle(post)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEditArticle(post)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleToggleStatus(post)}
                          className={post.status === 'valide' || post.status === 'publie' ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'}
                        >
                          {post.status === 'valide' || post.status === 'publie' ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteArticle(post.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      <BlogFormDialog
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingArticle(null);
        }}
        onSubmit={handleCreateOrUpdateArticle}
        editingArticle={editingArticle}
      />

      <Dialog open={!!viewingArticle} onOpenChange={() => setViewingArticle(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              {viewingArticle?.title}
              <Button variant="ghost" size="sm" onClick={() => setViewingArticle(null)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          {viewingArticle && (
            <div className="space-y-4">
              {viewingArticle.image_url && (
                <img 
                  src={viewingArticle.image_url} 
                  alt={viewingArticle.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
              <div className="text-sm text-gray-600">
                <span>Par {viewingArticle.author}</span>
                <span className="mx-2">•</span>
                <span>{new Date(viewingArticle.created_at).toLocaleDateString('fr-FR')}</span>
                {viewingArticle.reading_time && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{viewingArticle.reading_time} min de lecture</span>
                  </>
                )}
              </div>
              {viewingArticle.summary && (
                <p className="text-gray-600 italic">{viewingArticle.summary}</p>
              )}
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-em:text-gray-600 prose-blockquote:border-l-primary prose-blockquote:text-gray-600 prose-ul:text-gray-700 prose-ol:text-gray-700"
                  dangerouslySetInnerHTML={{ __html: formatContent(viewingArticle.content || '') }} 
                />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteArticle} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default EditorDashboardBlog;