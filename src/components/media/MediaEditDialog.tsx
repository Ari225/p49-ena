import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    description: ''
  });
  const [customCategory, setCustomCategory] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (media) {
      setFormData({
        title: media.title,
        category: media.category === 'Autre' ? 'Autre' : media.category,
        date: media.date,
        description: media.description
      });
      // Si la catégorie n'est pas dans la liste prédéfinie, c'est une catégorie personnalisée
      const predefinedCategories = ['Évènement social', 'Les Régionales', 'Réunions', 'Assemblée Générale', 'Formation', 'Autre'];
      if (media.category && !predefinedCategories.includes(media.category)) {
        setCustomCategory(media.category);
        setFormData(prev => ({ ...prev, category: 'Autre' }));
      }
    }
  }, [media]);

  const categories = [
    'Évènement social',
    'Les Régionales',
    'Réunions',
    'Assemblée Générale',
    'Formation',
    'Autre'
  ];

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

    setLoading(true);
    try {
      const finalCategory = formData.category === 'Autre' ? customCategory : formData.category;
      
      const { error } = await supabase
        .from('media_items')
        .update({
          title: formData.title,
          category: finalCategory,
          date: formData.date,
          description: formData.description
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Modifier le média</DialogTitle>
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
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              required
            />
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
              disabled={loading}
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