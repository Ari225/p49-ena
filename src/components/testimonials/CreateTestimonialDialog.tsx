import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Loader, CheckCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CreateTestimonialDialogProps {
  isOpen: boolean;
  onClose: () => void;
  matricule: string;
  onSuccess: () => void;
}

const CreateTestimonialDialog = ({ isOpen, onClose, matricule, onSuccess }: CreateTestimonialDialogProps) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `testimonials/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media-files')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Erreur upload:', uploadError);
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('media-files')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      console.error('Erreur lors de l\'upload de l\'image:', err);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Veuillez saisir votre témoignage');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      let imageUrl = null;
      
      if (image) {
        imageUrl = await uploadImage(image);
        if (!imageUrl) {
          setError('Erreur lors de l\'upload de l\'image');
          setIsLoading(false);
          return;
        }
      }

      const { data, error: supabaseError } = await supabase.rpc('create_testimonial_with_verification', {
        p_matricule: matricule,
        p_content: content.trim(),
        p_image_url: imageUrl
      });

      if (supabaseError) {
        console.error('Erreur Supabase:', supabaseError);
        setError('Erreur lors de la création du témoignage');
        return;
      }

      const result = data?.[0];
      if (!result?.success) {
        setError(result?.message || 'Erreur lors de la création du témoignage');
        return;
      }

      toast({
        title: "Témoignage ajouté",
        description: "Votre témoignage a été publié avec succès.",
      });

      onSuccess();
      handleClose();
    } catch (err) {
      console.error('Erreur:', err);
      setError('Erreur lors de la création du témoignage');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setContent('');
    setImage(null);
    setError('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className={`${isMobile ? 'max-w-[calc(100vw-40px)] mx-auto' : 'max-w-md'} rounded-lg`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Ajouter un témoignage
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">Votre témoignage *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Partagez votre expérience avec le réseau P49..."
              rows={5}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Image (optionnelle)</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isLoading}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('image')?.click()}
                disabled={isLoading}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                {image ? image.name : 'Choisir une image'}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className={isMobile ? 'flex-1' : ''}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className={`bg-primary hover:bg-primary/90 ${isMobile ? 'flex-1' : ''}`}
            >
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Publication...
                </>
              ) : (
                'Publier'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTestimonialDialog;