import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Download, Trash2, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useImageUpload } from '@/hooks/useImageUpload';

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
  const [documents, setDocuments] = useState<OfficialDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    year: new Date().getFullYear(),
    description: '',
    document: null as File | null
  });
  const { uploadImage, uploading } = useImageUpload();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.year || !formData.description || !formData.document) {
      toast({
        title: 'Erreur',
        description: 'Tous les champs sont obligatoires',
        variant: 'destructive'
      });
      return;
    }

    try {
      // Upload du document PDF
      const documentUrl = await uploadImage(formData.document, 'documents');
      if (!documentUrl) {
        throw new Error('Erreur lors du téléchargement du document');
      }

      const { error } = await supabase
        .from('official_documents')
        .insert({
          title: formData.title,
          year: formData.year,
          description: formData.description,
          document_url: documentUrl,
          created_by: user?.id
        });

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'Document ajouté avec succès'
      });

      setIsDialogOpen(false);
      setFormData({
        title: '',
        year: new Date().getFullYear(),
        description: '',
        document: null
      });
      fetchDocuments();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du document:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'ajouter le document',
        variant: 'destructive'
      });
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

  if (isMobile) {
    return (
      <div className="p-4 pb-20">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary flex items-center">
            <FileText className="mr-2 h-6 w-6" />
            Textes officiels
          </h1>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full mb-6">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau document
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-md mx-auto">
            <DialogHeader>
              <DialogTitle>Ajouter un document</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="year">Année *</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="document">Document PDF *</Label>
                <Input
                  id="document"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFormData({ ...formData, document: e.target.files?.[0] || null })}
                  required
                />
              </div>
              <Button type="submit" disabled={uploading} className="w-full">
                {uploading ? 'Téléchargement...' : 'Ajouter'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

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
                      <Button size="sm" variant="outline" asChild>
                        <a href={doc.document_url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
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
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary flex items-center">
            <FileText className="mr-3 h-8 w-8" />
            Textes officiels
          </h1>
        </div>

        <div className="mb-6">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouveau document
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Ajouter un document</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="year">Année *</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="document">Document PDF *</Label>
                  <Input
                    id="document"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFormData({ ...formData, document: e.target.files?.[0] || null })}
                    required
                  />
                </div>
                <Button type="submit" disabled={uploading} className="w-full">
                  {uploading ? 'Téléchargement...' : 'Ajouter'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-primary mb-6 flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Liste des textes officiels ({documents.length})
            </h2>
            
            {loading ? (
              <div>Chargement...</div>
            ) : documents.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Aucun document trouvé</p>
            ) : (
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
                            <Button size="sm" variant="outline" asChild>
                              <a href={doc.document_url} target="_blank" rel="noopener noreferrer">
                                <Download className="h-4 w-4" />
                              </a>
                            </Button>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTextesOfficiels;