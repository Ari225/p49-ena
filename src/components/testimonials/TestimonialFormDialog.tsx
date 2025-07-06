
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Upload } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface TestimonialFormData {
  name: string;
  position: string;
  content: string;
  image: File | null;
}

interface TestimonialFormDialogProps {
  onSubmit: (data: TestimonialFormData) => void;
}

const TestimonialFormDialog = ({ onSubmit }: TestimonialFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: '',
    position: '',
    content: '',
    image: null
  });
  const isMobile = useIsMobile();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', position: '', content: '', image: null });
    setOpen(false);
  };

  const resetForm = () => {
    setFormData({ name: '', position: '', content: '', image: null });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau témoignage
        </Button>
      </DialogTrigger>
      <DialogContent className={`${isMobile ? 'max-w-[calc(100vw-40px)] mx-auto' : 'max-w-md'} rounded-lg`}>
        <DialogHeader>
          <DialogTitle>Ajouter un témoignage</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="position">Poste/Fonction *</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('image')?.click()}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                {formData.image ? formData.image.name : 'Choisir une image'}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Témoignage *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={4}
              required
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

export default TestimonialFormDialog;
