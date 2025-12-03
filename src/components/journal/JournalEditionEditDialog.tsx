import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
  onSuccess: () => void | Promise<void>;
  edition: JournalEdition | null;
}

const JournalEditionEditDialog = ({
  open,
  onOpenChange,
  onSuccess,
  edition
}: JournalEditionEditDialogProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<'publie' | 'archive'>('publie');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { uploadImage, uploading: imageUploading } = useImageUpload();

  // Reset form when edition changes
  useEffect(() => {
    if (edition && open) {
      console.log('Loading edition data into form:', edition);
      setTitle(edition.title || '');
      setSummary(edition.summary || '');
      setStatus((edition.status as 'publie' | 'archive') || 'publie');
      setCoverImage(null);
      setPdfFile(null);
    }
  }, [edition, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('=== FORM SUBMITTED ===');
    console.log('Edition ID:', edition?.id);
    console.log('Title:', title);
    console.log('Summary:', summary);
    console.log('Status:', status);
    
    if (!edition) {
      console.error('No edition selected');
      toast({
        title: "Erreur",
        description: "Aucune édition sélectionnée",
        variant: "destructive"
      });
      return;
    }

    if (!title.trim() || !summary.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir le titre et le résumé",
        variant: "destructive"
      });
      return;
    }

    const hasValidCoverImage = edition.cover_image_url || coverImage;
    const hasValidPdf = edition.pdf_url || pdfFile;
    
    if (!hasValidCoverImage) {
      toast({
        title: "Erreur",
        description: "Une image de couverture est requise",
        variant: "destructive"
      });
      return;
    }
    
    if (!hasValidPdf) {
      toast({
        title: "Erreur",
        description: "Un fichier PDF est requis",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    console.log('Starting update process...');

    try {
      let coverImageUrl = edition.cover_image_url;
      let pdfUrl = edition.pdf_url;

      // Upload new cover image if provided
      if (coverImage) {
        console.log('Uploading new cover image...');
        const compressedImage = await compressMediaFile(coverImage);
        const newCoverUrl = await uploadImage(compressedImage, 'journal-covers');
        if (newCoverUrl) {
          coverImageUrl = newCoverUrl;
          console.log('Cover image uploaded:', newCoverUrl);
        }
      }

      // Upload new PDF if provided
      if (pdfFile) {
        console.log('Uploading new PDF...');
        const fileExt = pdfFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
        const { data: pdfData, error: pdfError } = await supabase.storage
          .from('journal-pdfs')
          .upload(fileName, pdfFile, {
            cacheControl: '3600',
            upsert: false
          });
        
        if (pdfError) {
          console.error('PDF upload error:', pdfError);
          throw pdfError;
        }
        
        const { data: pdfPublicUrlData } = supabase.storage
          .from('journal-pdfs')
          .getPublicUrl(pdfData.path);
        pdfUrl = pdfPublicUrlData.publicUrl;
        console.log('PDF uploaded:', pdfUrl);
      }

      // Update journal edition in database
      console.log('Updating database with:', {
        title,
        summary,
        cover_image_url: coverImageUrl,
        pdf_url: pdfUrl,
        status
      });

      const { error: updateError } = await supabase
        .from('journal_editions')
        .update({
          title: title.trim(),
          summary: summary.trim(),
          cover_image_url: coverImageUrl,
          pdf_url: pdfUrl,
          status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', edition.id);

      if (updateError) {
        console.error('Database update error:', updateError);
        throw updateError;
      }

      console.log('=== UPDATE SUCCESSFUL ===');

      toast({
        title: "Succès",
        description: "Édition modifiée avec succès !"
      });
      
      // Close dialog first
      onOpenChange(false);
      
      // Then refresh data
      console.log('Calling onSuccess to refresh data...');
      await onSuccess();
      console.log('Data refreshed');

    } catch (error) {
      console.error('Error updating journal edition:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la modification: " + (error as any)?.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const isSubmitting = loading || imageUploading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md rounded-xl border-0 shadow-2xl mx-auto">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg">Modifier l'Édition</DialogTitle>
          <DialogDescription>
            Modifiez les informations de l'édition du journal
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto px-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Titre *</label>
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Ex: Perspectives 49 - Janvier 2024"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Résumé *</label>
              <Textarea
                required
                value={summary}
                onChange={e => setSummary(e.target.value)}
                placeholder="Résumé de cette édition..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Statut *</label>
              <Select value={status} onValueChange={(value: 'publie' | 'archive') => setStatus(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="publie">Publié</SelectItem>
                  <SelectItem value="archive">Archivé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Image de couverture *
                {edition?.cover_image_url && <span className="text-xs text-green-600 ml-2">(image existante)</span>}
              </label>
              <div className={`border-2 border-dashed rounded-lg p-4 text-center ${coverImage ? 'border-green-500 bg-green-50' : edition?.cover_image_url ? 'border-green-300' : 'border-gray-300'}`}>
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setCoverImage(e.target.files?.[0] || null)}
                  className="hidden"
                  id="cover-upload-edit"
                />
                <label htmlFor="cover-upload-edit" className="cursor-pointer">
                  <span className="text-primary font-medium text-sm">
                    {edition?.cover_image_url ? 'Cliquez pour remplacer' : 'Cliquez pour ajouter'}
                  </span>
                </label>
                {coverImage && (
                  <p className="mt-2 text-xs text-green-600 font-medium">{coverImage.name}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Fichier PDF *
                {edition?.pdf_url && <span className="text-xs text-green-600 ml-2">(PDF existant)</span>}
              </label>
              <div className={`border-2 border-dashed rounded-lg p-4 text-center ${pdfFile ? 'border-green-500 bg-green-50' : edition?.pdf_url ? 'border-green-300' : 'border-gray-300'}`}>
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <input
                  type="file"
                  accept=".pdf"
                  onChange={e => setPdfFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="pdf-upload-edit"
                />
                <label htmlFor="pdf-upload-edit" className="cursor-pointer">
                  <span className="text-primary font-medium text-sm">
                    {edition?.pdf_url ? 'Cliquez pour remplacer le PDF' : 'Cliquez pour ajouter le PDF'}
                  </span>
                </label>
                {pdfFile && (
                  <p className="mt-2 text-xs text-green-600 font-medium">{pdfFile.name}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 pb-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Modification...
                  </>
                ) : (
                  "Modifier l'édition"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JournalEditionEditDialog;
