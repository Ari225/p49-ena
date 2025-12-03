import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { X, Plus, Image, Video } from 'lucide-react';
import RichTextEditor from '@/components/ui/RichTextEditor';

interface MediaItem {
  id: string;
  title: string;
  category: string;
  description: string;
  media_urls: string[];
  date: string;
  created_at: string;
}

interface MediaEditDialogProps {
  media: MediaItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const MediaEditDialog = ({ media, isOpen, onClose, onUpdate }: MediaEditDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    description: '',
    media_urls: [] as string[]
  });
  const [customCategory, setCustomCategory] = useState('');
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (media) {
      setFormData({
        title: media.title,
        category: media.category === 'Autre' ? 'Autre' : media.category,
        date: media.date,
        description: media.description,
        media_urls: [...media.media_urls]
      });
      // Si la catégorie n'est pas dans la liste prédéfinie, c'est une catégorie personnalisée
      const predefinedCategories = ['Évènement social', 'Les Régionales', 'Réunion', 'Réunions de constitution', 'Assemblées Générales', 'Formation', 'Autre'];
      if (media.category && !predefinedCategories.includes(media.category)) {
        setCustomCategory(media.category);
        setFormData(prev => ({ ...prev, category: 'Autre' }));
      }
    }
  }, [media]);

  const categories = [
    'Évènement social',
    'Les Régionales',
    'Réunion',
    'Réunions de constitution',
    'Assemblées Générales',
    'Formation',
    'Autre'
  ];

  const getFileType = (url: string) => {
    if (url.includes('.mp4') || url.includes('.mov') || url.includes('.avi') || url.includes('video')) {
      return 'video';
    }
    return 'image';
  };

  const handleFileUpload = async (files: FileList) => {
    const newUploadingIndexes: number[] = [];
    const uploadPromises: Promise<string>[] = [];

    Array.from(files).forEach((file, index) => {
      const uploadIndex = formData.media_urls.length + index;
      newUploadingIndexes.push(uploadIndex);

      const uploadPromise = new Promise<string>(async (resolve, reject) => {
        try {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
          const filePath = `media/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('media-files')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('media-files')
            .getPublicUrl(filePath);

          resolve(publicUrl);
        } catch (error) {
          console.error('Upload error:', error);
          reject(error);
        }
      });

      uploadPromises.push(uploadPromise);
    });

    setUploadingFiles(prev => [...prev, ...newUploadingIndexes]);

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      setFormData(prev => ({
        ...prev,
        media_urls: [...prev.media_urls, ...uploadedUrls]
      }));
      
      toast({
        title: "Fichiers ajoutés",
        description: `${uploadedUrls.length} fichier(s) ajouté(s) avec succès.`,
      });
    } catch (error) {
      toast({
        title: "Erreur d'upload",
        description: "Impossible d'uploader certains fichiers.",
        variant: "destructive"
      });
    } finally {
      setUploadingFiles([]);
    }
  };

  const removeMedia = (index: number) => {
    setFormData(prev => ({
      ...prev,
      media_urls: prev.media_urls.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!media) return;

    if (!formData.title || !formData.category || !formData.date || !formData.description) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    if (formData.media_urls.length === 0) {
      toast({
        title: "Médias requis",
        description: "Veuillez ajouter au moins un fichier média.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const finalCategory = formData.category === 'Autre' ? customCategory : formData.category;
      
      const { error } = await supabase
        .from('media_items')
        .update({
          title: formData.title,
          category: finalCategory,
          date: formData.date,
          description: formData.description,
          media_urls: formData.media_urls
        })
        .eq('id', media.id);

      if (error) throw error;

      toast({
        title: "Média modifié",
        description: "Le média a été modifié avec succès.",
      });

      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating media:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le média.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isMobile ? 'w-[95vw] max-w-[95vw] mx-auto rounded-lg' : 'max-w-md rounded-xl border-0 shadow-2xl'}`}>
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg">Modifier le média</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className={`space-y-4 ${isMobile ? 'max-h-[70vh] overflow-y-auto pb-4' : 'max-h-[70vh] overflow-y-auto pb-20'}`}>
          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.category === 'Autre' && (
            <div className="space-y-2">
              <Label htmlFor="customCategory">Précisez la catégorie *</Label>
              <Input
                id="customCategory"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Entrez la catégorie personnalisée"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <RichTextEditor
              value={formData.description}
              onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
              placeholder="Décrivez le média..."
              minHeight="100px"
            />
          </div>

          {/* Gestion des médias */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Fichiers médias</Label>
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button type="button" size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter des fichiers
                </Button>
              </div>
            </div>

            {formData.media_urls.length > 0 && (
              <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                {formData.media_urls.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="relative bg-muted rounded-lg overflow-hidden aspect-video">
                      {getFileType(url) === 'image' ? (
                        <>
                          <Image className="absolute top-2 left-2 h-4 w-4 text-blue-500 z-10" />
                          <img 
                            src={url} 
                            alt={`Media ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Video className="h-8 w-8 text-red-500" />
                        </div>
                      )}
                      
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeMedia(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {uploadingFiles.map((index) => (
                  <div key={`uploading-${index}`} className="relative">
                    <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
                      <div className="text-sm text-muted-foreground">Upload...</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={loading || uploadingFiles.length > 0}
            >
              {loading ? 'Modification...' : 'Modifier'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MediaEditDialog;