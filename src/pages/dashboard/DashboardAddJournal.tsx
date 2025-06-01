
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ArrowLeft, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardAddJournal = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    pageCount: '',
    publishDate: '',
    coverImage: null as File | null,
    pdfFile: null as File | null
  });
  const [uploading, setUploading] = useState(false);

  if (!user || user.role !== 'admin') {
    return <div>Non autorisé</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.summary) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setUploading(true);

    try {
      // Mock submission - in a real app, this would upload files and save to database
      console.log('Submitting journal data:', formData);
      
      toast.success('Édition créée avec succès !');
      
      // Reset form
      setFormData({
        title: '',
        summary: '',
        pageCount: '',
        publishDate: '',
        coverImage: null,
        pdfFile: null
      });
    } catch (error) {
      console.error('Error creating journal:', error);
      toast.error('Erreur lors de la création de l\'édition');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'coverImage' | 'pdfFile') => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [fileType]: file }));
    }
  };

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <Link to="/dashboard/journal" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux éditions
            </Link>
            <h1 className="text-3xl font-bold text-primary">Nouvelle Édition</h1>
            <p className="text-gray-600 mt-2">Créer une nouvelle édition du journal</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informations de l'édition</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Titre *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Ex: Perspectives 49 - Janvier 2024"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Résumé *</label>
                  <Textarea
                    value={formData.summary}
                    onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                    placeholder="Résumé de cette édition..."
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nombre de pages</label>
                    <Input
                      type="number"
                      value={formData.pageCount}
                      onChange={(e) => setFormData(prev => ({ ...prev, pageCount: e.target.value }))}
                      placeholder="Ex: 24"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Date de publication</label>
                    <Input
                      type="date"
                      value={formData.publishDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, publishDate: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image de couverture</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'coverImage')}
                      className="hidden"
                      id="cover-upload"
                    />
                    <label htmlFor="cover-upload" className="cursor-pointer">
                      <span className="text-primary font-medium">Cliquez pour uploader</span>
                      <span className="text-gray-500"> ou glissez-déposez</span>
                    </label>
                    {formData.coverImage && (
                      <p className="mt-2 text-sm text-gray-600">{formData.coverImage.name}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Fichier PDF</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, 'pdfFile')}
                      className="hidden"
                      id="pdf-upload"
                    />
                    <label htmlFor="pdf-upload" className="cursor-pointer">
                      <span className="text-primary font-medium">Cliquez pour uploader le PDF</span>
                    </label>
                    {formData.pdfFile && (
                      <p className="mt-2 text-sm text-gray-600">{formData.pdfFile.name}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" asChild>
                    <Link to="/dashboard/journal">Annuler</Link>
                  </Button>
                  <Button type="submit" disabled={uploading}>
                    {uploading ? 'Création...' : 'Créer l\'édition'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardAddJournal;
