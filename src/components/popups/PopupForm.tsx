
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X } from 'lucide-react';
import { compressMediaFile } from '@/utils/mediaCompression';
import { PopupFormData } from '@/types/popup';

interface PopupFormProps {
  onSubmit: (formData: PopupFormData, imagePreview: string | null) => void;
  onCancel: () => void;
  isMobile: boolean;
}

const PopupForm: React.FC<PopupFormProps> = ({ onSubmit, onCancel, isMobile }) => {
  const [formData, setFormData] = useState<PopupFormData>({
    title: '',
    message: '',
    type: 'announcement',
    other_type: '',
    target_audience: 'all_visitors',
    author: '',
    position: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsCompressing(true);
      try {
        const compressedFile = await compressMediaFile(file);
        setSelectedImage(compressedFile);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('Erreur lors de la compression:', error);
        // Utiliser le fichier original en cas d'erreur
        setSelectedImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) {
      alert('Une image est obligatoire');
      return;
    }
    onSubmit(formData, imagePreview);
    setFormData({ 
      title: '', 
      message: '', 
      type: 'announcement',
      other_type: '',
      target_audience: 'all_visitors',
      author: '',
      position: ''
    });
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isMobile ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              placeholder="Titre du pop-up"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type *</Label>
            <Select value={formData.type} onValueChange={(value: 'announcement' | 'welcome' | 'alert' | 'information' | 'other') => setFormData({...formData, type: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="announcement">Annonce</SelectItem>
                <SelectItem value="welcome">Bienvenue</SelectItem>
                <SelectItem value="alert">Alerte</SelectItem>
                <SelectItem value="information">Information</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.type === 'other' && (
            <div className="space-y-2">
              <Label htmlFor="other_type">Précision du type</Label>
              <Input
                id="other_type"
                placeholder="Précisez le type"
                value={formData.other_type}
                onChange={(e) => setFormData({...formData, other_type: e.target.value})}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="target_audience">Public cible</Label>
            <Select value={formData.target_audience} onValueChange={(value: 'all_visitors' | 'all_users' | 'admins_only' | 'editors_only') => setFormData({...formData, target_audience: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_visitors">Tous les visiteurs du site</SelectItem>
                <SelectItem value="all_users">Tous les utilisateurs (Admins et rédacteurs)</SelectItem>
                <SelectItem value="admins_only">Administrateurs uniquement</SelectItem>
                <SelectItem value="editors_only">Rédacteurs uniquement</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Contenu du pop-up (optionnel)"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Auteur *</Label>
            <Input
              id="author"
              placeholder="Nom de l'auteur"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Poste</Label>
            <Input
              id="position"
              placeholder="Poste ou fonction (optionnel)"
              value={formData.position}
              onChange={(e) => setFormData({...formData, position: e.target.value})}
            />
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                placeholder="Titre du pop-up"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select value={formData.type} onValueChange={(value: 'announcement' | 'welcome' | 'alert' | 'information' | 'other') => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="announcement">Annonce</SelectItem>
                  <SelectItem value="welcome">Bienvenue</SelectItem>
                  <SelectItem value="alert">Alerte</SelectItem>
                  <SelectItem value="information">Information</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.type === 'other' && (
            <div className="space-y-2">
              <Label htmlFor="other_type">Précision du type</Label>
              <Input
                id="other_type"
                placeholder="Précisez le type"
                value={formData.other_type}
                onChange={(e) => setFormData({...formData, other_type: e.target.value})}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="target_audience">Public cible</Label>
            <Select value={formData.target_audience} onValueChange={(value: 'all_visitors' | 'all_users' | 'admins_only' | 'editors_only') => setFormData({...formData, target_audience: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_visitors">Tous les visiteurs du site</SelectItem>
                <SelectItem value="all_users">Tous les utilisateurs (Admins et rédacteurs)</SelectItem>
                <SelectItem value="admins_only">Administrateurs uniquement</SelectItem>
                <SelectItem value="editors_only">Rédacteurs uniquement</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Contenu du pop-up (optionnel)"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">Auteur *</Label>
              <Input
                id="author"
                placeholder="Nom de l'auteur"
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Poste</Label>
              <Input
                id="position"
                placeholder="Poste ou fonction (optionnel)"
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
              />
            </div>
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label>Image * {isCompressing && <span className="text-sm text-blue-600">(Compression en cours...)</span>}</Label>
        {!imagePreview ? (
          <div className={`border-2 border-dashed border-gray-300 rounded-lg ${isMobile ? 'p-4' : 'p-6'} text-center`}>
            <Upload className={`mx-auto text-gray-400 mb-2 ${isMobile ? 'h-8 w-8' : 'h-12 w-12'}`} />
            <label htmlFor="image-upload" className="cursor-pointer">
              <span className="text-sm text-gray-600">
                {isCompressing ? 'Compression...' : 'Cliquez pour ajouter une image (obligatoire)'}
              </span>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isCompressing}
              />
            </label>
          </div>
        ) : (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Aperçu"
              className={`w-full object-cover rounded-lg ${isMobile ? 'h-32' : 'h-48'}`}
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1" disabled={isCompressing}>
          Annuler
        </Button>
        <Button type="submit" className="flex-1" disabled={isCompressing}>
          {isCompressing ? 'Compression en cours...' : 'Créer le pop-up'}
        </Button>
      </div>
    </form>
  );
};

export default PopupForm;
