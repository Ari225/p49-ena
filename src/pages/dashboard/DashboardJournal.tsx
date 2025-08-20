
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Edit, Eye, Download, Trash2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { isAdmin } from '@/utils/roleUtils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import JournalEditionDialog from '@/components/journal/JournalEditionDialog';

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

  if (!user || !isAdmin(user)) {
    return <div>Non autorisé</div>;
  }

  useEffect(() => {
    fetchEditions();
  }, []);

  const fetchEditions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('journal_editions')
        .select('*')
        .order('publish_date', { ascending: false });
      
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
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Publié</span>;
      case 'brouillon':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">Brouillon</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">{status}</span>;
    }
  };

  const handleDialogSuccess = () => {
    fetchEditions();
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
            <h1 className="text-2xl font-bold text-primary leading-tight">
              Gestion du<br />Journal
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <FileText className="mr-2 h-5 w-5" />
                Éditions du Journal ({editions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {editions.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Aucune édition créée
                  </p>
                ) : (
                  editions.map((edition) => (
                    <div key={edition.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start space-x-4 mb-3">
                        <img 
                          src={edition.cover_image_url} 
                          alt={edition.title}
                          className="w-12 h-16 object-cover rounded flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm">{edition.title}</h3>
                           <p className="text-xs text-gray-600 mt-1">
                             Publié le {new Date(edition.publish_date).toLocaleDateString('fr-FR')}
                           </p>
                          {edition.summary && (
                            <p className="text-xs text-gray-700 mt-2">{edition.summary}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        {getStatusBadge(edition.status)}
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            PDF
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Modifier
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Supprimer
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
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Gestion du Journal</h1>
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Éditions du Journal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {editions.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Aucune édition créée
                  </p>
                ) : (
                  editions.map((edition) => (
                    <div key={edition.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={edition.cover_image_url} 
                          alt={edition.title}
                          className="w-16 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{edition.title}</h3>
                           <p className="text-sm text-gray-600">
                             Publié le {new Date(edition.publish_date).toLocaleDateString('fr-FR')}
                           </p>
                          {edition.summary && (
                            <p className="text-sm text-gray-700 mt-1">{edition.summary}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(edition.status)}
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
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

      <JournalEditionDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleDialogSuccess}
      />
    </Layout>
  );
};

export default DashboardJournal;
