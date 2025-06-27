
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X } from 'lucide-react';

interface PopupFormData {
  title: string;
  message: string;
  type: 'welcome' | 'announcement' | 'alert';
  display_duration: number;
  priority: 'low' | 'medium' | 'high';
  target_audience: 'all' | 'members' | 'admins';
  auto_close: boolean;
}

interface PopupFormProps {
  onSubmit: (formData: PopupFormData, imagePreview: string | null) => void;
  isMobile: boolean;
}

const PopupForm: React.FC<PopupFormProps> = ({ onSubmit, isMobile }) => {
  const [formData, setFormData] = useState<PopupFormData>({
    title: '',
    message: '',
    type: 'announcement',
    display_duration: 5,
    priority: 'medium',
    target_audience: 'all',
    auto_close: true
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, imagePreview);
    setFormData({ 
      title: '', 
      message: '', 
      type: 'announcement',
      display_duration: 5,
      priority: 'medium',
      target_audience: 'all',
      auto_close: true
    });
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isMobile ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              placeholder="Titre du pop-up"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Contenu du pop-up"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={formData.type} onValueChange={(value: 'welcome' | 'announcement' | 'alert') => setFormData({...formData, type: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="announcement">Annonce</SelectItem>
                <SelectItem value="welcome">Bienvenue</SelectItem>
                <SelectItem value="alert">Alerte</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                placeholder="Titre du pop-up"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={(value: 'welcome' | 'announcement' | 'alert') => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="announcement">Annonce</SelectItem>
                  <SelectItem value="welcome">Bienvenue</SelectItem>
                  <SelectItem value="alert">Alerte</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Contenu du pop-up"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
              rows={4}
            />
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label>Image (optionnelle)</Label>
        {!imagePreview ? (
          <div className={`border-2 border-dashed border-gray-300 rounded-lg ${isMobile ? 'p-4' : 'p-6'} text-center`}>
            <Upload className={`mx-auto text-gray-400 mb-2 ${isMobile ? 'h-8 w-8' : 'h-12 w-12'}`} />
            <label htmlFor="image-upload" className="cursor-pointer">
              <span className="text-sm text-gray-600">Cliquez pour ajouter une image</span>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
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

      <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-3'} gap-4`}>
        <div className="space-y-2">
          <Label htmlFor="duration">{isMobile ? 'Durée (secondes)' : 'Durée d\'affichage (secondes)'}</Label>
          <Input
            id="duration"
            type="number"
            min="1"
            max="60"
            value={formData.display_duration}
            onChange={(e) => setFormData({...formData, display_duration: parseInt(e.target.value)})}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priorité</Label>
          <Select value={formData.priority} onValueChange={(value: 'low' | 'medium' | 'high') => setFormData({...formData, priority: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Faible</SelectItem>
              <SelectItem value="medium">Moyenne</SelectItem>
              <SelectItem value="high">Élevée</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {!isMobile && (
          <div className="space-y-2">
            <Label htmlFor="audience">Public cible</Label>
            <Select value={formData.target_audience} onValueChange={(value: 'all' | 'members' | 'admins') => setFormData({...formData, target_audience: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les utilisateurs</SelectItem>
                <SelectItem value="members">Membres uniquement</SelectItem>
                <SelectItem value="admins">Administrateurs uniquement</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {isMobile && (
        <div className="space-y-2">
          <Label htmlFor="audience">Public cible</Label>
          <Select value={formData.target_audience} onValueChange={(value: 'all' | 'members' | 'admins') => setFormData({...formData, target_audience: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les utilisateurs</SelectItem>
              <SelectItem value="members">Membres uniquement</SelectItem>
              <SelectItem value="admins">Administrateurs uniquement</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="auto-close"
          checked={formData.auto_close}
          onChange={(e) => setFormData({...formData, auto_close: e.target.checked})}
          className="rounded"
        />
        <Label htmlFor="auto-close" className={isMobile ? 'text-sm' : ''}>
          {isMobile ? 'Fermeture automatique' : 'Fermeture automatique après la durée définie'}
        </Label>
      </div>

      <Button type="submit" className="w-full">Créer le pop-up</Button>
    </form>
  );
};

export default PopupForm;
