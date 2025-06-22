
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ActivityFormData } from '@/types/activity';

export const useActivityForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<ActivityFormData>({
    title: '',
    category: '',
    type: '',
    date: '',
    time: '',
    location: '',
    participants: '',
    description: ''
  });

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      type: '',
      date: '',
      time: '',
      location: '',
      participants: '',
      description: ''
    });
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Upload image if selected
      let imageUrl = null;
      if (selectedImage) {
        const fileExt = selectedImage.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        
        // Note: You'll need to set up Supabase Storage for this to work
        // For now, we'll just use a placeholder
        imageUrl = `placeholder-${fileName}`;
      }

      // Insert activity into database
      const { data, error } = await supabase
        .from('activities')
        .insert({
          title: formData.title,
          category: formData.category,
          type: formData.category === 'Autre activité' ? formData.type : null,
          date: formData.date,
          time: formData.time,
          location: formData.location,
          participants: formData.participants,
          description: formData.description,
          image_url: imageUrl,
          created_by: user!.id
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Activité créée !",
        description: "L'activité a été ajoutée avec succès.",
      });

      resetForm();
      return true;
    } catch (error) {
      console.error('Error creating activity:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer l'activité.",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    formData,
    setFormData,
    selectedImage,
    setSelectedImage,
    imagePreview,
    setImagePreview,
    handleSubmit,
    resetForm
  };
};
