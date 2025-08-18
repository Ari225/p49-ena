
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ActivityFormData } from '@/types/activity';

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
    
    try {
      // Mock successful submission without Supabase
      console.log('Activity submitted:', formData);
      
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
