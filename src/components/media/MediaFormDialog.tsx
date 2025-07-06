
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
      <DialogContent className={`${isMobile ? 'max-w-[calc(100vw-40px)] mx-auto' : 'max-w-md'} rounded-lg`}>
        <DialogHeader>
          <DialogTitle>Ajouter un média</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label htmlFor="type">Type *</Label>
            <Select
              value={formData.type}
              onValueChange={(value: 'Photos' | 'Vidéos' | 'Documents') => 
                setFormData(prev => ({ ...prev, type: value, media: null }))
              }
            >
              <SelectTrigger>
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
              <Label htmlFor="media">Média *</Label>
              <div className="flex items-center space-x-2">
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
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {formData.media ? formData.media.name : `Choisir ${formData.type.toLowerCase()}`}
                </Button>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="Séparer par des virgules"
            />
          </div>
          
          <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'justify-end space-x-2'}`}>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className={isMobile ? 'w-full' : ''}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className={`bg-primary hover:bg-primary/90 ${isMobile ? 'w-full' : ''}`}
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
