import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { isAdmin } from '@/utils/roleUtils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Eye, Trash2, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import PDFViewer from '@/components/PDFViewer';

interface OfficialDocument {
  id: string;
  title: string;
  year: number;
  description: string;
  document_url: string;
  created_at: string;
  created_by: string;
}

const DashboardTextesOfficiels = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [documents, setDocuments] = useState<OfficialDocument[]>([]);
  const [loading, setLoading] = useState(true);

  if (!user || !isAdmin(user)) {
    return <div>Non autorisé</div>;
  }

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('official_documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des documents:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les documents',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) return;

    try {
      const { error } = await supabase
        .from('official_documents')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'Document supprimé avec succès'
      });
      fetchDocuments();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le document',
        variant: 'destructive'
      });
    }
  };

  // Render mobile layout
  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">
              Textes officiels
            </h1>
            <p className="text-gray-600 mt-2 text-sm">Consultation des textes relatifs à la P49 et l'administration ivoirienne</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-primary flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Liste des textes officiels ({documents.length})
            </h2>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div>Chargement...</div>
            ) : documents.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Aucun document trouvé</p>
            ) : (
              documents.map((doc) => (
                <Card key={doc.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span className="flex items-center">
                        <FileText className="mr-2 h-5 w-5" />
                        {doc.title}
                      </span>
                      <Badge variant="secondary">{doc.year}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(doc.created_at).toLocaleDateString()}
                      </span>
                      <div className="flex space-x-2">
                        <PDFViewer
                          pdfUrl={doc.document_url}
                          title={doc.title}
                          triggerButton={
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          }
                        />
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDelete(doc.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
        <AdminSidebar />
      </Layout>
    );
  }

  // Render tablet layout
  if (isTablet) {
    return (
      <Layout>
        <div className="px-[30px] py-[40px] pb-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Textes officiels</h1>
            <p className="text-gray-600 mt-2">Consultation des textes relatifs à la P49 et l'administration ivoirienne</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-primary flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Liste des textes officiels ({documents.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <p className="text-center py-8 col-span-full">Chargement...</p>
            ) : documents.length === 0 ? (
              <p className="text-gray-500 text-center py-8 col-span-full">Aucun document trouvé</p>
            ) : (
              documents.map((doc) => (
                <Card key={doc.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span className="flex items-center">
                        <FileText className="mr-2 h-5 w-5" />
                        {doc.title}
                      </span>
                      <Badge variant="secondary">{doc.year}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(doc.created_at).toLocaleDateString()}
                      </span>
                      <div className="flex space-x-2">
                        <PDFViewer
                          pdfUrl={doc.document_url}
                          title={doc.title}
                          triggerButton={
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          }
                        />
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDelete(doc.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
        <AdminSidebar />
      </Layout>
    );
  }

  // Render desktop layout
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Textes officiels</h1>
            <p className="text-gray-600 mt-2">Consultation des textes relatifs à la P49 et l'administration ivoirienne</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-primary flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Liste des textes officiels ({documents.length})
            </h2>
          </div>
          
          {loading ? (
            <div>Chargement...</div>
          ) : documents.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Aucun document trouvé</p>
          ) : (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Titre</th>
                        <th className="text-left py-3 px-4">Année</th>
                        <th className="text-left py-3 px-4">Description</th>
                        <th className="text-left py-3 px-4">Date de création</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((doc) => (
                        <tr key={doc.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{doc.title}</td>
                          <td className="py-3 px-4">
                            <Badge variant="secondary">{doc.year}</Badge>
                          </td>
                          <td className="py-3 px-4 max-w-xs">
                            <p className="truncate">{doc.description}</p>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-500">
                            {new Date(doc.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <PDFViewer
                                pdfUrl={doc.document_url}
                                title={doc.title}
                                triggerButton={
                                  <Button size="sm" variant="outline">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                }
                              />
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDelete(doc.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardTextesOfficiels;