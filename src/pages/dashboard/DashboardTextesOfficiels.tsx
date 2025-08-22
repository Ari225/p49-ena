import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Plus, Calendar, User, Trash2, Download, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useImageUpload } from '@/hooks/useImageUpload';
import { toast } from '@/hooks/use-toast';

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
  const { uploadImage, uploading } = useImageUpload();
  const [documents, setDocuments] = useState<OfficialDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    year: new Date().getFullYear(),
    description: '',
    document: null as File | null
  });

  // Charger les documents
  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('official_documents')
        .select('*')
        .order('year', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des documents:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les documents",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.year || !formData.description || !formData.document) {
      toast({
        title: "Erreur",
        description: "Tous les champs sont obligatoires",
        variant: "destructive"
      });
      return;
    }

    try {
      // Upload du document
      const documentUrl = await uploadImage(formData.document, 'official-documents');
      if (!documentUrl) return;

      // Insérer en base
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
        title: "Succès",
        description: "Document ajouté avec succès"
      });

      setFormData({
        title: '',
        year: new Date().getFullYear(),
        description: '',
        document: null
      });
      setDialogOpen(false);
      fetchDocuments();
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le document",
        variant: "destructive"
      });
    }
  };

  // Supprimer un document
  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) return;

    try {
      const { error } = await supabase
        .from('official_documents')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Document supprimé avec succès"
      });

      fetchDocuments();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le document",
        variant: "destructive"
      });
    }
  };

  if (!user) {
    return <div className="p-4">Vous devez être connecté pour accéder à cette page.</div>;
  }

  if (loading) {
    return <div className="p-4">Chargement...</div>;
  }

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="p-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary flex items-center">
              <FileText className="mr-2 h-6 w-6" />
              Textes officiels
            </h1>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full mb-6">
                <Plus className="mr-2 h-4 w-4" />
                Nouveau document
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-md">
              <DialogHeader>
                <DialogTitle>Ajouter un document</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="year">Année *</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="document">Document PDF *</Label>
                  <Input
                    id="document"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFormData(prev => ({ ...prev, document: e.target.files?.[0] || null }))}
                    required
                  />
                </div>
                <Button type="submit" disabled={uploading} className="w-full">
                  {uploading ? 'Ajout en cours...' : 'Ajouter'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <div className="space-y-4">
            {documents.map((doc) => (
              <Card key={doc.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span className="flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      {doc.title}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(doc.document_url, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(doc.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="mr-1 h-4 w-4" />
                      {doc.year}
                    </div>
                    <p className="text-sm text-gray-700">{doc.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {documents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun document trouvé
            </div>
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

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mb-8">
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
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="year">Année *</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="document">Document PDF *</Label>
                <Input
                  id="document"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFormData(prev => ({ ...prev, document: e.target.files?.[0] || null }))}
                  required
                />
              </div>
              <Button type="submit" disabled={uploading} className="w-full">
                {uploading ? 'Ajout en cours...' : 'Ajouter'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <div className="grid gap-6">
          {documents.map((doc) => (
            <Card key={doc.id}>
              <CardHeader>
                <CardTitle className="text-xl flex items-center justify-between">
                  <span className="flex items-center">
                    <FileText className="mr-3 h-6 w-6" />
                    {doc.title}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => window.open(doc.document_url, '_blank')}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Voir
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDelete(doc.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="mr-2 h-5 w-5" />
                    Année: {doc.year}
                  </div>
                  <p className="text-gray-700">{doc.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {documents.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FileText className="mx-auto h-12 w-12 mb-4" />
            <p>Aucun document trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTextesOfficiels;