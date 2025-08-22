import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useImageUpload } from '@/hooks/useImageUpload';
import { compressMediaFile } from '@/utils/mediaCompression';

interface JournalEdition {
  id: string;
  title: string;
  summary: string;
  cover_image_url: string;
  pdf_url: string;
  publish_date: string;
  status: string;
}

interface JournalEditionEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  edition: JournalEdition | null;
}

const JournalEditionEditDialog = ({
  open,
  onOpenChange,
  onSuccess,
  edition
}: JournalEditionEditDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    status: 'brouillon',
    coverImage: null as File | null,
    pdfFile: null as File | null
  });
  const [loading, setLoading] = useState(false);
  const {
    uploadImage,
    uploading: imageUploading
  } = useImageUpload();

  useEffect(() => {
    if (edition) {
      setFormData({
        title: edition.title,
        summary: edition.summary || '',
        status: edition.status,
        coverImage: null,
        pdfFile: null
      });
    }
  }, [edition]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!edition || !formData.title) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);
    try {
      let coverImageUrl = edition.cover_image_url;
      let pdfUrl = edition.pdf_url;

      // Upload new cover image if provided
      if (formData.coverImage) {
        const compressedImage = await compressMediaFile(formData.coverImage);
        const newCoverUrl = await uploadImage(compressedImage, 'journal-covers');
        if (newCoverUrl) {
          coverImageUrl = newCoverUrl;
        }
      }

      // Upload new PDF if provided
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

      // Update journal edition in database
      const { error: updateError } = await supabase
        .from('journal_editions')
        .update({
          title: formData.title,
          summary: formData.summary,
          cover_image_url: coverImageUrl,
          pdf_url: pdfUrl,
          status: formData.status as any,
          updated_at: new Date().toISOString()
        })
        .eq('id', edition.id);

      if (updateError) throw updateError;

      toast.success('Édition modifiée avec succès !');
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating journal edition:', error);
      toast.error('Erreur lors de la modification de l\'édition');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'coverImage' | 'pdfFile') => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [fileType]: file
      }));
    }
  };

  const isSubmitting = loading || imageUploading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl mx-auto my-auto">
        <DialogHeader>
          <DialogTitle>Modifier l'Édition</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Titre *</label>
            <Input
              value={formData.title}
              onChange={e => setFormData(prev => ({
                ...prev,
                title: e.target.value
              }))}
              placeholder="Ex: Perspectives 49 - Janvier 2024"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Résumé</label>
            <Textarea
              value={formData.summary}
              onChange={e => setFormData(prev => ({
                ...prev,
                summary: e.target.value
              }))}
              placeholder="Résumé de cette édition..."
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Statut</label>
            <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brouillon">Brouillon</SelectItem>
                <SelectItem value="publie">Publié</SelectItem>
                <SelectItem value="archive">Archivé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Nouvelle image de couverture (optionnel)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <input
                type="file"
                accept="image/*"
                onChange={e => handleFileChange(e, 'coverImage')}
                className="hidden"
                id="cover-upload-edit"
              />
              <label htmlFor="cover-upload-edit" className="cursor-pointer">
                <span className="text-primary font-medium">Cliquez pour changer</span>
              </label>
              {formData.coverImage && (
                <p className="mt-2 text-sm text-gray-600">{formData.coverImage.name}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Nouveau fichier PDF (optionnel)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <input
                type="file"
                accept=".pdf"
                onChange={e => handleFileChange(e, 'pdfFile')}
                className="hidden"
                id="pdf-upload-edit"
              />
              <label htmlFor="pdf-upload-edit" className="cursor-pointer">
                <span className="text-primary font-medium">Cliquez pour changer le PDF</span>
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
              {isSubmitting ? 'Modification...' : 'Modifier l\'édition'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JournalEditionEditDialog;