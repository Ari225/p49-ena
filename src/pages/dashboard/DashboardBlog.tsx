import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import EditorSidebar from '@/components/EditorSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { FileText, Edit, Eye, Trash2, Calendar, User, CheckCircle, XCircle } from 'lucide-react';
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
  const {
    user
  } = useAuth();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [viewingArticle, setViewingArticle] = useState<BlogPost | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    article: BlogPost | null;
  }>({
    isOpen: false,
    article: null
  });
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
      const {
        data,
        error
      } = await supabase.from('blog_articles').select('*').order('created_at', {
        ascending: false
      });
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
      console.log('Saving article data:', articleData);
      console.log('Editing article:', editingArticle);
      let imageUrl = null;

      // Upload image if selected
      if (articleData.selectedImage) {
        const fileExt = articleData.selectedImage.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const {
          data: uploadData,
          error: uploadError
        } = await supabase.storage.from('blog-images').upload(fileName, articleData.selectedImage);
        if (uploadError) {
          throw uploadError;
        }
        const {
          data: urlData
        } = supabase.storage.from('blog-images').getPublicUrl(uploadData.path);
        imageUrl = urlData.publicUrl;
      }
      if (editingArticle) {
        // Mise à jour de l'article existant
        const updateData: any = {
          title: articleData.title,
          summary: articleData.summary,
          content: articleData.content,
          category: articleData.category,
          reading_time: articleData.reading_time,
          updated_at: new Date().toISOString()
        };

        // Ne mettre à jour l'image que si une nouvelle image est fournie
        if (imageUrl) {
          updateData.image_url = imageUrl;
        }
        console.log('Updating article with data:', updateData);
        const {
          error
        } = await supabase.from('blog_articles').update(updateData).eq('id', editingArticle.id);
        if (error) {
          console.error('Update error:', error);
          throw error;
        }
        console.log('Article updated successfully');
        toast.success('Article modifié avec succès');
      } else {
        // Création d'un nouvel article
        const insertData = {
          title: articleData.title,
          summary: articleData.summary,
          content: articleData.content,
          category: articleData.category,
          reading_time: articleData.reading_time,
          image_url: imageUrl,
          author_id: user?.id,
          status: 'en_attente' as const
        };
        console.log('Creating article with data:', insertData);
        const {
          error
        } = await supabase.from('blog_articles').insert(insertData);
        if (error) {
          console.error('Insert error:', error);
          throw error;
        }
        console.log('Article created successfully');
        toast.success('Article créé avec succès');
      }
      setIsFormOpen(false);
      setEditingArticle(null);
      fetchPosts();
    } catch (error) {
      console.error('Error saving article:', error);
      toast.error(editingArticle ? 'Erreur lors de la modification de l\'article' : 'Erreur lors de la création de l\'article');
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
    setDeleteConfirm({
      isOpen: true,
      article: post
    });
  };
  const confirmDeleteArticle = async () => {
    if (!deleteConfirm.article) return;
    try {
      const {
        error
      } = await supabase.from('blog_articles').delete().eq('id', deleteConfirm.article.id);
      if (error) throw error;
      toast.success('Article supprimé avec succès');
      setDeleteConfirm({
        isOpen: false,
        article: null
      });
      fetchPosts(); // Actualiser la liste après suppression
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Erreur lors de la suppression de l\'article');
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
      const {
        error
      } = await supabase.from('blog_articles').update({
        status: newStatus,
        validated_by: newStatus === 'valide' ? user?.id : null,
        updated_at: new Date().toISOString()
      }).eq('id', post.id);
      if (error) throw error;
      const statusText = newStatus === 'valide' ? 'publié' : newStatus === 'en_attente' ? 'mis en attente' : 'refusé';
      toast.success(`Article ${statusText} avec succès`);
      fetchPosts(); // Actualiser la liste après changement de statut
    } catch (error) {
      console.error('Error toggling article status:', error);
      toast.error('Erreur lors du changement de statut de l\'article');
    }
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'en_attente':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">En attente</span>;
      case 'refuse':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">Refusé</span>;
      case 'valide':
      case 'publie':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Publié</span>;
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
  if (loading) {
    return <Layout>
        <div className={isMobile ? "px-[25px] py-[50px] pb-20" : isTablet ? "px-[30px] py-[40px] pb-20" : "flex"}>
          {!isMobile && !isTablet && <AdminSidebar />}
          <div className={isMobile ? "" : isTablet ? "" : "flex-1 ml-64 p-8"}>
            <div className="text-center">Chargement...</div>
          </div>
        </div>
        {(isMobile || isTablet) && <AdminSidebar />}
      </Layout>;
  }
  if (isMobile) {
    return <Layout>
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
                {posts.length === 0 ? <p className="text-center text-gray-500 py-8 text-sm">
                    Aucun article de blog soumis
                  </p> : posts.map(post => <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      {post.image_url && <div className="h-32">
                          <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                        </div>}
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="px-2 py-1 rounded text-xs font-medium bg-primary text-white">
                            {post.category || 'Non catégorisé'}
                          </span>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(post.published_date).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg text-primary mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-2">
                          Par <span className="font-medium text-primary">{post.author}</span>
                        </p>
                        {post.summary && <p className="text-xs text-gray-700 mb-3 line-clamp-3">{post.summary}</p>}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {getStatusBadge(post.status)}
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="outline" size="sm" onClick={() => handleViewArticle(post)}>
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditArticle(post)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleToggleStatus(post)} className={post.status === 'valide' || post.status === 'publie' ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'}>
                              {post.status === 'valide' || post.status === 'publie' ? <XCircle className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteArticle(post)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>)}
              </div>
            </CardContent>
          </Card>
        </div>
        <AdminSidebar />
        
        <BlogFormDialog isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleCreateArticle} editingArticle={editingArticle} />
      </Layout>;
  }
  if (isTablet) {
    return <Layout>
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
                {posts.length === 0 ? <p className="text-center text-gray-500 py-8">
                    Aucun article de blog créé
                  </p> : posts.map(post => <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      {post.image_url && <div className="h-25">
                          <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                        </div>}
                      <CardContent className="p-5">
                        <div className="flex justify-between items-center mb-3">
                          <span className="px-2 py-1 rounded text-xs font-medium bg-primary text-white">
                            {post.category || 'Non catégorisé'}
                          </span>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(post.published_date).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        <h3 className="font-semibold text-xl text-primary mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Par <span className="font-medium text-primary">{post.author}</span>
                        </p>
                        {post.summary && <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.summary}</p>}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {getStatusBadge(post.status)}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewArticle(post)}>
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditArticle(post)}>
                              <Edit className="h-4 w-4 mr-1" />
                              Modifier
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleToggleStatus(post)} className={post.status === 'valide' || post.status === 'publie' ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'}>
                              {post.status === 'valide' || post.status === 'publie' ? <XCircle className="h-4 w-4 mr-1" /> : <CheckCircle className="h-4 w-4 mr-1" />}
                              {getToggleButtonText(post.status)}
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteArticle(post)}>
                              <Trash2 className="h-4 w-4 mr-1" />
                              Supprimer
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>)}
              </div>
            </CardContent>
          </Card>
        </div>
        <AdminSidebar />
        
        <BlogFormDialog isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleCreateArticle} editingArticle={editingArticle} />
      </Layout>;
  }
  return <Layout>
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
                {posts.length === 0 ? <p className="text-center text-gray-500 py-8">
                    Aucun article de blog créé
                  </p> : posts.map(post => <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      {post.image_url && <div className="h-32 md:h-48">
                          <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                        </div>}
                      <CardContent className="p-4 md:p-6">
                        <div className="flex justify-between items-center mb-3">
                          <span className="px-2 py-1 rounded text-xs font-medium bg-primary text-white">
                            {post.category || 'Non catégorisé'}
                          </span>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(post.published_date).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        <h3 className="font-semibold text-xl text-primary mb-2 md:mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Par <span className="font-medium text-primary">{post.author}</span>
                        </p>
                        {post.summary && <p className="text-gray-600 mb-3 md:mb-4 line-clamp-3 text-sm md:text-base">{post.summary}</p>}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {getStatusBadge(post.status)}
                          </div>
                          <div className="flex space-x-2">
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
                      </CardContent>
                    </Card>)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <BlogFormDialog isOpen={isFormOpen} onClose={() => {
      setIsFormOpen(false);
      setEditingArticle(null);
    }} onSubmit={handleCreateArticle} editingArticle={editingArticle} />

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
            {viewingArticle?.image_url && <img src={viewingArticle.image_url} alt={viewingArticle.title} className="w-full h-64 object-cover rounded-lg" />}
            <div className="prose max-w-none">
              <p className="text-lg text-muted-foreground">{viewingArticle?.summary}</p>
              <div dangerouslySetInnerHTML={{
              __html: viewingArticle?.content || ''
            }} />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={deleteConfirm.isOpen} onOpenChange={isOpen => !isOpen && setDeleteConfirm({
      isOpen: false,
      article: null
    })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer l'article "{deleteConfirm.article?.title}" ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteConfirm({
            isOpen: false,
            article: null
          })}>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteArticle} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>;
};
export default DashboardBlog;