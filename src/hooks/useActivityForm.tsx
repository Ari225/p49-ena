import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ActivityFormData } from '@/types/activity';
import { supabase } from '@/integrations/supabase/client';
import { compressMediaFile } from '@/utils/mediaCompression';

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
    end_date: '',
    start_time: '',
    end_time: '',
    location: '',
    brief_description: '',
    description: '',
    participation_fees: [],
    session_president: '',
    agenda_points: [],
    target_audience: '',
    objectives: []
  });

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      other_category: '',
      date: '',
      end_date: '',
      start_time: '',
      end_time: '',
      location: '',
      brief_description: '',
      description: '',
      participation_fees: [],
      session_president: '',
      agenda_points: [],
      target_audience: '',
      objectives: []
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

    // Valider que l'image est obligatoire (sauf pour Assemblées Générales et Réunions de constitution)
    if (formData.category !== 'Assemblées Générales' && formData.category !== 'Réunions de constitution' && !selectedImage) {
      toast({
        title: "Erreur",
        description: "L'image est obligatoire pour créer une activité.",
        variant: "destructive"
      });
      return false;
    }
    
    try {
      let imageUrl = null;
      
      // Upload image if selected
      if (selectedImage) {
        // Compresser l'image avant l'upload
        const compressedImage = await compressMediaFile(selectedImage);
        
        const fileExt = compressedImage.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `activities/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('media-files')
          .upload(filePath, compressedImage);

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
      const { data: activityData, error } = await supabase
        .from('activities')
        .insert({
          title: formData.title,
          category: formData.category,
          other_category: formData.category === 'Autre' ? formData.other_category : null,
          date: formData.date,
          end_date: formData.category === 'Les Régionales' ? formData.end_date : null,
          start_time: formData.start_time,
          end_time: formData.end_time || null,
          location: formData.location,
          brief_description: formData.brief_description,
          description: formData.category === 'Assemblées Générales' 
            ? formData.agenda_points.map((point, index) => `${index + 1}. ${point}`).join('\n')
            : formData.description,
          image_url: imageUrl,
          created_by: user.id,
          target_audience: formData.category === 'Réunions de constitution' ? formData.target_audience : null,
          objectives: formData.category === 'Réunions de constitution' ? JSON.stringify(formData.objectives) : null
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating activity:', error);
        toast({
          title: "Erreur",
          description: "Impossible de créer l'activité.",
          variant: "destructive"
        });
        return false;
      }

      // Si c'est une activité "Assemblées Générales", sauvegarder les données supplémentaires
      if (formData.category === 'Assemblées Générales' && activityData) {
        const { error: assembleesError } = await supabase
          .from('assemblees_generales')
          .insert({
            activity_id: activityData.id,
            session_president: formData.session_president,
            agenda_points: JSON.stringify(formData.agenda_points)
          });

        if (assembleesError) {
          console.error('Error creating assemblees generales data:', assembleesError);
          toast({
            title: "Erreur",
            description: "Impossible de sauvegarder les données de l'assemblée générale.",
            variant: "destructive"
          });
          return false;
        }
      }

      // Si c'est une activité "Les Régionales", sauvegarder les données supplémentaires
      if (formData.category === 'Les Régionales' && activityData) {
        const { error: regionalesError } = await supabase
          .from('les_regionales')
          .insert({
            activity_id: activityData.id,
            end_date: formData.end_date,
            participation_fees: JSON.stringify(formData.participation_fees)
          });

        if (regionalesError) {
          console.error('Error creating regionales data:', regionalesError);
          toast({
            title: "Erreur",
            description: "Impossible de sauvegarder les données des Régionales.",
            variant: "destructive"
          });
          return false;
        }
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