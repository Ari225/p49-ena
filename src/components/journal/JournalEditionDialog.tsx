import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useImageUpload } from '@/hooks/useImageUpload';
import { compressMediaFile } from '@/utils/mediaCompression';

interface JournalEditionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const JournalEditionDialog = ({ open, onOpenChange, onSuccess }: JournalEditionDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    coverImage: null as File | null,
    pdfFile: null as File | null
  });
  const [loading, setLoading] = useState(false);
  const { uploadImage, uploading: imageUploading } = useImageUpload();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.summary) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);

    try {
      let coverImageUrl = null;
      let pdfUrl = null;

      // Upload and compress cover image if provided
      if (formData.coverImage) {
        const compressedImage = await compressMediaFile(formData.coverImage);
        coverImageUrl = await uploadImage(compressedImage, 'journal-covers');
        
        if (!coverImageUrl) {
          throw new Error('Erreur lors de l\'upload de l\'image de couverture');
        }
      }

      // Upload PDF if provided (without compression for PDFs)
      if (formData.pdfFile) {
        const fileExt = formData.pdfFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

        const { data: pdfData, error: pdfError } = await supabase.storage
          .from('journal-pdfs')
          .upload(fileName, formData.pdfFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (pdfError) throw pdfError;

        const { data: pdfPublicUrlData } = supabase.storage
          .from('journal-pdfs')
          .getPublicUrl(pdfData.path);

        pdfUrl = pdfPublicUrlData.publicUrl;
      }

      // Insert journal edition into database
      const { error: insertError } = await supabase
        .from('journal_editions')
        .insert({
          title: formData.title,
          summary: formData.summary,
          cover_image_url: coverImageUrl,
          pdf_url: pdfUrl,
          publish_date: new Date().toISOString().split('T')[0], // Auto-set to today
          status: 'publie'
        });

      if (insertError) throw insertError;

      toast.success('Édition créée avec succès !');
      
      // Reset form
      setFormData({
        title: '',
        summary: '',
        coverImage: null,
        pdfFile: null
      });
      
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating journal edition:', error);
      toast.error('Erreur lors de la création de l\'édition');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'coverImage' | 'pdfFile') => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [fileType]: file }));
    }
  };

  const isSubmitting = loading || imageUploading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl mx-auto my-auto">
        <DialogHeader>
          <DialogTitle>Nouvelle Édition du Journal</DialogTitle>
          <DialogDescription>
            Créer une nouvelle édition du journal Perspectives 49 avec titre, résumé et fichiers optionnels.
          </DialogDescription>
        </DialogHeader>

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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Création...' : 'Créer l\'édition'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JournalEditionDialog;