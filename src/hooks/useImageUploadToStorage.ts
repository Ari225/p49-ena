import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { compressImage, isValidImageFile } from '@/utils/imageCompression';
import { toast } from 'sonner';

export interface UploadImageOptions {
  bucket: string;
  folder?: string;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export const useImageUploadToStorage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadImage = async (
    file: File,
    options: UploadImageOptions
  ): Promise<string | null> => {
    if (!file) return null;

    if (!isValidImageFile(file)) {
      toast.error('Format d\'image non supporté. Utilisez JPG, PNG ou WebP.');
      return null;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB max
      toast.error('L\'image est trop volumineuse (max 10MB)');
      return null;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Compresser l'image
      console.log('📸 Compression de l\'image...');
      const compressedBlob = await compressImage(file, {
        maxWidth: options.maxWidth || 800,
        maxHeight: options.maxHeight || 600,
        quality: options.quality || 0.8,
        format: 'jpeg'
      });

      setUploadProgress(30);

      // Générer un nom de fichier unique
      const fileExtension = 'jpg'; // Toujours JPG après compression
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
      const filePath = options.folder ? `${options.folder}/${fileName}` : fileName;

      console.log('☁️ Upload vers Supabase Storage...');
      
      // Upload vers Supabase Storage
      const { data, error } = await supabase.storage
        .from(options.bucket)
        .upload(filePath, compressedBlob, {
          contentType: 'image/jpeg',
          upsert: false
        });

      if (error) {
        console.error('❌ Erreur upload:', error);
        throw error;
      }

      setUploadProgress(80);

      // Obtenir l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from(options.bucket)
        .getPublicUrl(filePath);

      setUploadProgress(100);

      console.log('✅ Image uploadée avec succès:', publicUrl);
      toast.success('Image uploadée avec succès !');

      return publicUrl;

    } catch (error) {
      console.error('💥 Erreur lors de l\'upload:', error);
      toast.error('Erreur lors de l\'upload de l\'image');
      return null;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const deleteImage = async (url: string, bucket: string): Promise<boolean> => {
    try {
      // Extraire le chemin du fichier depuis l'URL
      const urlParts = url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      const { error } = await supabase.storage
        .from(bucket)
        .remove([fileName]);

      if (error) {
        console.error('❌ Erreur suppression:', error);
        return false;
      }

      console.log('🗑️ Image supprimée avec succès');
      return true;
    } catch (error) {
      console.error('💥 Erreur lors de la suppression:', error);
      return false;
    }
  };

  return {
    uploadImage,
    deleteImage,
    isUploading,
    uploadProgress
  };
};