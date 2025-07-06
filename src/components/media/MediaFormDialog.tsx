
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Upload } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MediaFormData {
  title: string;
  type: 'Photos' | 'Vidéos' | 'Documents' | '';
  media: File | null;
  description: string;
  tags: string;
}

interface MediaFormDialogProps {
  onSubmit: (data: MediaFormData) => void;
}

const MediaFormDialog = ({ onSubmit }: MediaFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<MediaFormData>({
    title: '',
    type: '',
    media: null,
    description: '',
    tags: ''
  });
  const isMobile = useIsMobile();

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, media: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.type) {
      onSubmit(formData as MediaFormData & { type: 'Photos' | 'Vidéos' | 'Documents' });
      setFormData({ title: '', type: '', media: null, description: '', tags: '' });
      setOpen(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', type: '', media: null, description: '', tags: '' });
  };

  const getAcceptedFileTypes = () => {
    switch (formData.type) {
      case 'Photos':
        return 'image/*';
      case 'Vidéos':
        return 'video/*';
      case 'Documents':
        return '.pdf,.doc,.docx,.txt';
      default:
        return '*/*';
    }
  };

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
            <Label htmlFor="type" className="text-sm font-medium">Type *</Label>
            <Select
              value={formData.type}
              onValueChange={(value: 'Photos' | 'Vidéos' | 'Documents') => 
                setFormData(prev => ({ ...prev, type: value, media: null }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choisir le type de média" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Photos">Photos</SelectItem>
                <SelectItem value="Vidéos">Vidéos</SelectItem>
                <SelectItem value="Documents">Documents</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {formData.type && (
            <div className="space-y-2">
              <Label htmlFor="media" className="text-sm font-medium">Média *</Label>
              <div className="w-full">
                <Input
                  id="media"
                  type="file"
                  accept={getAcceptedFileTypes()}
                  onChange={handleMediaChange}
                  className="hidden"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('media')?.click()}
                  className="w-full justify-start text-left"
                >
                  <Upload className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">
                    {formData.media ? formData.media.name : `Choisir ${formData.type.toLowerCase()}`}
                  </span>
                </Button>
              </div>
            </div>
          )}
          
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
          
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-medium">Tags</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="Séparer par des virgules"
              className="w-full"
            />
          </div>
          
          <div className={`flex pt-4 border-t ${isMobile ? 'flex-col gap-3' : 'justify-end gap-2'}`}>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className={isMobile ? 'w-full' : 'min-w-[80px]'}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className={`bg-primary hover:bg-primary/90 ${isMobile ? 'w-full' : 'min-w-[80px]'}`}
            >
              Publier
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MediaFormDialog;
