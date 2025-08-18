
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ActivityFormData } from '@/types/activity';
import { supabase } from '@/integrations/supabase/client';

export const useActivityForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<ActivityFormData>({
    title: '',
    category: '',
    other_category: '',
    date: '',
    start_time: '',
    end_time: '',
    location: '',
    brief_description: '',
    description: ''
  });

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      other_category: '',
      date: '',
      start_time: '',
      end_time: '',
      location: '',
      brief_description: '',
      description: ''
    });
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour créer une activité.",
        variant: "destructive"
      });
      return false;
    }
    
    try {
      let imageUrl = null;
      
      // Upload image if selected
      if (selectedImage) {
        const fileExt = selectedImage.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `activities/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('media-files')
          .upload(filePath, selectedImage);

        if (uploadError) {
          console.error('Error uploading image:', uploadError);
          toast({
            title: "Erreur",
            description: "Erreur lors de l'upload de l'image.",
            variant: "destructive"
          });
          return false;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('media-files')
          .getPublicUrl(filePath);
        
        imageUrl = publicUrl;
      }

      // Insert activity into database
      const { error } = await supabase
        .from('activities')
        .insert({
          title: formData.title,
          category: formData.category,
          other_category: formData.category === 'Autre' ? formData.other_category : null,
          date: formData.date,
          start_time: formData.start_time,
          end_time: formData.end_time || null,
          location: formData.location,
          brief_description: formData.brief_description,
          description: formData.description,
          image_url: imageUrl,
          created_by: user.id
        });

      if (error) {
        console.error('Error creating activity:', error);
        toast({
          title: "Erreur",
          description: "Impossible de créer l'activité.",
          variant: "destructive"
        });
        return false;
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
