import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { compressMediaFile } from '@/utils/mediaCompression';
import { toast } from '@/hooks/use-toast';

export const useImageUploadWithPreview = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const uploadImage = async (file: File, folder: string = 'popups'): Promise<string | null> => {
    setIsUploading(true);
    try {
      // Compress the image first
      const compressedFile = await compressMediaFile(file);
      
      // Generate unique filename
      const fileExt = compressedFile.name.split('.').pop();
      const fileName = `${folder}/${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('media-files')
        .upload(fileName, compressedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('media-files')
        .getPublicUrl(data.path);

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Erreur d'upload",
        description: "Impossible de télécharger l'image",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    selectedImage,
    imagePreview,
    isUploading,
    handleImageSelect,
    handleImageRemove,
    uploadImage
  };
};