import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PopupItem, PopupFormData } from '@/types/popup';
import { useImageUploadWithPreview } from '@/hooks/useImageUploadWithPreview';
import { useIsMobile } from '@/hooks/use-mobile';
import PopupImageUpload from './PopupImageUpload';

interface PopupEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  popup: PopupItem | null;
  onUpdate: (id: string, formData: PopupFormData, imageUrl?: string) => Promise<void>;
}

const PopupEditDialog: React.FC<PopupEditDialogProps> = ({
  isOpen,
  onClose,
  popup,
  onUpdate
}) => {
  const [formData, setFormData] = useState<PopupFormData>({
    title: '',
    message: '',
    type: 'announcement',
    other_type: '',
    target_audience: 'all_visitors',
    author: '',
    position: ''
  });

  const isMobile = useIsMobile();

  const { 
    selectedImage, 
    imagePreview,
    handleImageSelect, 
    handleImageRemove, 
    uploadImage, 
    isUploading 
  } = useImageUploadWithPreview();

  useEffect(() => {
    if (popup) {
      setFormData({
        title: popup.title,
        message: popup.message || '',
        type: popup.type,
        other_type: popup.other_type || '',
        target_audience: popup.target_audience,
        author: popup.author,
        position: popup.position || ''
      });
    }
  }, [popup]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!popup) return;

    let imageUrl = popup.image_url;
    
    if (selectedImage) {
      imageUrl = await uploadImage(selectedImage);
      if (!imageUrl) return;
    }

    await onUpdate(popup.id, formData, imageUrl);
    onClose();
    handleImageRemove();
  };

  const handleClose = () => {
    onClose();
    handleImageRemove();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={`${isMobile ? 'w-[95vw] max-w-[95vw] mx-auto rounded-lg max-h-[90vh] overflow-y-auto' : 'max-w-md max-h-[80vh] overflow-y-auto rounded-xl border-0 shadow-2xl'}`}>
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg">Modifier le Pop-up</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={4}
              placeholder="Contenu du message (optionnel)"
            />
          </div>

          <div>
            <Label htmlFor="type">Type *</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as any }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="welcome">Bienvenue</SelectItem>
                <SelectItem value="announcement">Annonce</SelectItem>
                <SelectItem value="alert">Alerte</SelectItem>
                <SelectItem value="information">Information</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.type === 'other' && (
            <div>
              <Label htmlFor="other_type">Préciser le type</Label>
              <Input
                id="other_type"
                value={formData.other_type}
                onChange={(e) => setFormData(prev => ({ ...prev, other_type: e.target.value }))}
                placeholder="Spécifiez le type personnalisé"
              />
            </div>
          )}

          <div>
            <Label htmlFor="target_audience">Public cible *</Label>
            <Select value={formData.target_audience} onValueChange={(value) => setFormData(prev => ({ ...prev, target_audience: value as any }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner le public cible" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_visitors">Tous les visiteurs</SelectItem>
                <SelectItem value="all_users">Tous les utilisateurs connectés</SelectItem>
                <SelectItem value="admins_only">Administrateurs uniquement</SelectItem>
                <SelectItem value="editors_only">Rédacteurs uniquement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="author">Auteur *</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="position">Fonction/Poste</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
              placeholder="Ex: Président, Directeur, etc."
            />
          </div>

          <div>
            <Label>Image</Label>
            <PopupImageUpload
              onImageSelect={handleImageSelect}
              onImageRemove={handleImageRemove}
              selectedImage={selectedImage}
              currentImageUrl={popup?.image_url}
              imagePreview={imagePreview}
              isUploading={isUploading}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? 'Mise à jour...' : 'Mettre à jour'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PopupEditDialog;