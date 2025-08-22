
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { FileText, Plus, Edit, Eye, Download, Trash2, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { isAdmin } from '@/utils/roleUtils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import JournalEditionDialog from '@/components/journal/JournalEditionDialog';
import JournalEditionEditDialog from '@/components/journal/JournalEditionEditDialog';
import JournalPreviewDialog from '@/components/journal/JournalPreviewDialog';

interface JournalEdition {
  id: string;
  title: string;
  summary: string;
  cover_image_url: string;
  pdf_url: string;
  publish_date: string;
  page_count: number;
  status: string;
}

const DashboardJournal = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [editions, setEditions] = useState<JournalEdition[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [selectedEdition, setSelectedEdition] = useState<JournalEdition | null>(null);

  if (!user || !isAdmin(user)) {
    return <div>Non autorisé</div>;
  }

  useEffect(() => {
    fetchEditions();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('journal_editions_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'journal_editions'
        },
        () => {
          fetchEditions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchEditions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('journal_editions')
        .select('*')
        .order('publish_date', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setEditions(data || []);
    } catch (error) {
      console.error('Error fetching journal editions:', error);
      toast.error('Erreur lors du chargement des éditions');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'publie':
        return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Publié</span>;
      case 'brouillon':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Brouillon</span>;
      case 'archive':
        return <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Archivé</span>;
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  const handleDialogSuccess = () => {
    fetchEditions();
  };

  const handleView = (edition: JournalEdition) => {
    setSelectedEdition(edition);
    setPreviewDialogOpen(true);
  };

  const handleEdit = (edition: JournalEdition) => {
    setSelectedEdition(edition);
    setEditDialogOpen(true);
  };

  const handleDownload = (edition: JournalEdition) => {
    if (edition.pdf_url) {
      window.open(edition.pdf_url, '_blank');
    } else {
      toast.error('Aucun PDF disponible pour cette édition');
    }
  };

  const handleDelete = async (edition: JournalEdition) => {
    try {
      const { error } = await supabase
        .from('journal_editions')
        .delete()
        .eq('id', edition.id);

      if (error) throw error;

      toast.success('Édition supprimée avec succès');
      fetchEditions();
    } catch (error) {
      console.error('Error deleting edition:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    if (isMobile) {
      return (
        <Layout>
          <div className="px-[25px] py-[50px] pb-20">
            <div className="text-center">Chargement...</div>
          </div>
          <AdminSidebar />
        </Layout>
      );
    }

    return (
      <Layout>
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1 ml-64 p-8">
            <div className="text-center">Chargement...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary leading-tight whitespace-nowrap">
              Gestion du journal
            </h1>
            <p className="text-gray-600 mt-2 text-sm">Gérer les éditions du journal Perspectives 49</p>
          </div>

          <div className="mb-6">
            <Button 
              onClick={() => setDialogOpen(true)}
              className="bg-primary hover:bg-primary/90 w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle édition
            </Button>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-primary flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Éditions du journal ({editions.length})
            </h2>
          </div>

          <div className="space-y-4">
            {editions.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Aucune édition créée
              </p>
            ) : (
              editions.map((edition) => (
                <div key={edition.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  {/* Image en haut */}
                  {edition.cover_image_url ? (
                    <div className="h-32 overflow-hidden">
                      <img 
                        src={edition.cover_image_url} 
                        alt={edition.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-32 bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">Aucune image</span>
                    </div>
                  )}
                  
                  {/* Contenu en dessous */}
                  <div className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-sm leading-tight line-clamp-2 flex-1 mr-2">{edition.title}</h3>
                      {getStatusBadge(edition.status)}
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(edition.publish_date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    
                    {edition.summary && (
                      <p className="text-xs text-gray-600 line-clamp-2 mb-3">{truncateText(edition.summary, 80)}</p>
                    )}
                    
                    {/* Boutons d'action */}
                    <div className="grid grid-cols-4 gap-2 pt-2 border-t border-gray-100">
                      <Button variant="outline" size="sm" onClick={() => handleView(edition)} className="text-xs">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload(edition)} className="text-xs">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(edition)} className="text-xs">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 text-xs">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Supprimer l'édition</AlertDialogTitle>
                            <AlertDialogDescription>
                              Êtes-vous sûr de vouloir supprimer "{edition.title}" ? Cette action est irréversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(edition)} className="bg-red-600 hover:bg-red-700">
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <AdminSidebar />
        
        <JournalEditionDialog 
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSuccess={handleDialogSuccess}
        />
        
        <JournalEditionEditDialog 
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onSuccess={handleDialogSuccess}
          edition={selectedEdition}
        />
        
        <JournalPreviewDialog 
          open={previewDialogOpen}
          onOpenChange={setPreviewDialogOpen}
          edition={selectedEdition}
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
            <h1 className="text-3xl font-bold text-primary">Gestion du journal</h1>
            <p className="text-gray-600 mt-2">Gérer les éditions du journal Perspectives 49</p>
          </div>

          <div className="mb-6">
            <Button 
              onClick={() => setDialogOpen(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle édition
            </Button>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-primary flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Éditions du journal ({editions.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {editions.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Aucune édition créée
              </p>
            ) : (
              editions.map((edition) => (
                <div key={edition.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  {/* Image en haut */}
                  {edition.cover_image_url ? (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={edition.cover_image_url} 
                        alt={edition.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">Aucune image</span>
                    </div>
                  )}
                  
                  {/* Contenu en dessous */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg line-clamp-2 flex-1 mr-2">{edition.title}</h3>
                      {getStatusBadge(edition.status)}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>Publié le {new Date(edition.publish_date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    
                    {edition.summary && (
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4">{truncateText(edition.summary, 120)}</p>
                    )}
                    
                    {/* Boutons d'action */}
                    <div className="flex items-center justify-end space-x-2 pt-2 border-t border-gray-100">
                      <Button variant="outline" size="sm" onClick={() => handleView(edition)} title="Voir">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload(edition)} title="Télécharger">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(edition)} title="Modifier">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" title="Supprimer">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Supprimer l'édition</AlertDialogTitle>
                            <AlertDialogDescription>
                              Êtes-vous sûr de vouloir supprimer "{edition.title}" ? Cette action est irréversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(edition)} className="bg-red-600 hover:bg-red-700">
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <JournalEditionDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleDialogSuccess}
      />
      
      <JournalEditionEditDialog 
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSuccess={handleDialogSuccess}
        edition={selectedEdition}
      />
      
      <JournalPreviewDialog 
        open={previewDialogOpen}
        onOpenChange={setPreviewDialogOpen}
        edition={selectedEdition}
      />
    </Layout>
  );
};

export default DashboardJournal;
