
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Upload, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface MediaFormData {
  title: string;
  category: string;
  date: string;
  description: string;
  mediaFiles: File[];
}

interface MediaFormDialogProps {
  onSubmit: (data: MediaFormData) => void;
}

const MediaFormDialog = ({ onSubmit }: MediaFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<MediaFormData>({
    title: '',
    category: '',
    date: '',
    description: '',
    mediaFiles: []
  });
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    
    if (validFiles.length !== files.length) {
      toast({
        title: "Fichiers non valides",
        description: "Seules les images et vidéos sont acceptées.",
        variant: "destructive"
      });
    }
    
    setFormData(prev => ({ 
      ...prev, 
      mediaFiles: [...prev.mediaFiles, ...validFiles] 
    }));
  };

  const removeMediaFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      mediaFiles: prev.mediaFiles.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.date || !formData.description) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Upload media files and get URLs
      const mediaUrls: string[] = [];
      
      for (const file of formData.mediaFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        // For now, we'll use placeholder URLs since we don't have storage configured
        // TODO: Implement actual file upload to Supabase Storage
        mediaUrls.push(`https://placeholder.com/${fileName}`);
      }

      // Insert media item into database
      const { error } = await supabase
        .from('media_items')
        .insert({
          title: formData.title,
          category: formData.category,
          date: formData.date,
          description: formData.description,
          media_urls: mediaUrls
        });

      if (error) throw error;

      toast({
        title: "Média ajouté !",
        description: "Le média a été ajouté avec succès à la médiathèque.",
      });

      onSubmit(formData);
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error('Error creating media:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le média.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      date: '',
      description: '',
      mediaFiles: []
    });
  };

  const categories = [
    'Événements',
    'Formation', 
    'Archives',
    'Assemblées Générales',
    'Régionales',
    'Cérémonies',
    'Partenariats',
    'Événements Sociaux'
  ];

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau média
        </Button>
      </DialogTrigger>
      <DialogContent className={`${isMobile ? 'w-[95vw] max-w-[95vw] mx-auto rounded-lg max-h-[90vh] overflow-y-auto' : 'max-w-md'}`}>
        <DialogHeader className="pb-4">
          <DialogTitle className="text-lg">Ajouter un média</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">Titre *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">Catégorie *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="w-full">
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

          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium">Date *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="media" className="text-sm font-medium">Médias</Label>
            <div className="w-full">
              <Input
                id="media"
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleMediaChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('media')?.click()}
                className="w-full justify-start text-left"
              >
                <Upload className="mr-2 h-4 w-4 flex-shrink-0" />
                Ajouter des images et vidéos
              </Button>
            </div>
            
            {formData.mediaFiles.length > 0 && (
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {formData.mediaFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-xs truncate flex-1">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMediaFile(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full resize-none"
              required
            />
          </div>
          
          <div className={`flex pt-4 border-t ${isMobile ? 'flex-col gap-3' : 'justify-end gap-2'}`}>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className={isMobile ? 'w-full' : 'min-w-[80px]'}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className={`bg-primary hover:bg-primary/90 ${isMobile ? 'w-full' : 'min-w-[80px]'}`}
              disabled={loading}
            >
              {loading ? 'Publication...' : 'Publier'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MediaFormDialog;
