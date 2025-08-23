import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Activity, ActivityFormData } from '@/types/activity';
import { supabase } from '@/integrations/supabase/client';

export const useActivityEdit = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
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

  const initializeForm = (activity: Activity) => {
    setFormData({
      title: activity.title,
      category: activity.category,
      other_category: activity.other_category || '',
      date: activity.date,
      end_date: activity.end_date || '',
      start_time: activity.start_time || '',
      end_time: activity.end_time || '',
      location: activity.location,
      brief_description: activity.brief_description,
      description: activity.description,
      participation_fees: activity.participation_fees || [],
      session_president: activity.session_president || '',
      agenda_points: activity.agenda_points || [],
      target_audience: activity.target_audience || '',
      objectives: activity.objectives || []
    });
    setCurrentImageUrl(activity.image_url || null);
    setImagePreview(activity.image_url || null);
  };

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
    setCurrentImageUrl(null);
  };

  const handleUpdate = async (activityId: string) => {
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour modifier une activité.",
        variant: "destructive"
      });
      return false;
    }

    // Valider qu'il y a une image (soit existante, soit nouvelle) sauf pour Assemblées Générales
    if (formData.category !== 'Assemblées Générales' && !selectedImage && !currentImageUrl) {
      toast({
        title: "Erreur",
        description: "L'image est obligatoire pour l'activité.",
        variant: "destructive"
      });
      return false;
    }
    
    try {
      let imageUrl = currentImageUrl;
      
      // Upload new image if selected
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

      // Update activity in database
      const { error } = await supabase
        .from('activities')
        .update({
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
          image_url: imageUrl
        })
        .eq('id', activityId);

      if (error) {
        console.error('Error updating activity:', error);
        toast({
          title: "Erreur",
          description: "Impossible de modifier l'activité.",
          variant: "destructive"
        });
        return false;
      }

      // Gérer les données spécifiques aux catégories
      // Assemblées Générales
      if (formData.category === 'Assemblées Générales') {
        // Vérifier si un enregistrement existe déjà
        const { data: existingAssemblees } = await supabase
          .from('assemblees_generales')
          .select('id')
          .eq('activity_id', activityId)
          .single();

        if (existingAssemblees) {
          // Mettre à jour l'enregistrement existant
          const { error: assembleesError } = await supabase
            .from('assemblees_generales')
            .update({
              session_president: formData.session_president,
              agenda_points: JSON.stringify(formData.agenda_points)
            })
            .eq('activity_id', activityId);

          if (assembleesError) {
            console.error('Error updating assemblees generales data:', assembleesError);
          }
        } else {
          // Créer un nouvel enregistrement
          const { error: assembleesError } = await supabase
            .from('assemblees_generales')
            .insert({
              activity_id: activityId,
              session_president: formData.session_president,
              agenda_points: JSON.stringify(formData.agenda_points)
            });

          if (assembleesError) {
            console.error('Error creating assemblees generales data:', assembleesError);
          }
        }
      } else {
        // Si la catégorie n'est plus "Assemblées Générales", supprimer les données existantes
        await supabase
          .from('assemblees_generales')
          .delete()
          .eq('activity_id', activityId);
      }

      // Gérer les données spécifiques aux Régionales
      if (formData.category === 'Les Régionales') {
        // Vérifier si un enregistrement existe déjà
        const { data: existingRegionales } = await supabase
          .from('les_regionales')
          .select('id')
          .eq('activity_id', activityId)
          .single();

        if (existingRegionales) {
          // Mettre à jour l'enregistrement existant
          const { error: regionalesError } = await supabase
            .from('les_regionales')
            .update({
              end_date: formData.end_date,
              participation_fees: JSON.stringify(formData.participation_fees)
            })
            .eq('activity_id', activityId);

          if (regionalesError) {
            console.error('Error updating regionales data:', regionalesError);
          }
        } else {
          // Créer un nouvel enregistrement
          const { error: regionalesError } = await supabase
            .from('les_regionales')
            .insert({
              activity_id: activityId,
              end_date: formData.end_date,
              participation_fees: JSON.stringify(formData.participation_fees)
            });

          if (regionalesError) {
            console.error('Error creating regionales data:', regionalesError);
          }
        }
      } else {
        // Si la catégorie n'est plus "Les Régionales", supprimer les données existantes
        await supabase
          .from('les_regionales')
          .delete()
          .eq('activity_id', activityId);
      }
      
      toast({
        title: "Activité modifiée !",
        description: "L'activité a été mise à jour avec succès.",
      });

      return true;
    } catch (error) {
      console.error('Error updating activity:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier l'activité.",
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
    currentImageUrl,
    initializeForm,
    handleUpdate,
    resetForm
  };
};