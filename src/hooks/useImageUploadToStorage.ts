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

      // Générer un nom de fichier unique avec timestamp pour éviter le cache
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2);
      const fileExtension = 'jpg'; // Toujours JPG après compression
      const fileName = `${timestamp}-${randomId}.${fileExtension}`;
      const filePath = options.folder ? `${options.folder}/${fileName}` : fileName;

      console.log('☁️ Upload vers Supabase Storage:', filePath);
      
      // Upload vers Supabase Storage avec upsert pour remplacer si existe
      const { data, error } = await supabase.storage
        .from(options.bucket)
        .upload(filePath, compressedBlob, {
          contentType: 'image/jpeg',
          upsert: true, // Permet de remplacer l'image existante
          cacheControl: '3600' // Cache 1 heure
        });

      if (error) {
        console.error('❌ Erreur upload:', error);
        // Si le bucket n'existe pas, afficher un message plus explicite
        if (error.message.includes('The resource was not found')) {
          toast.error('Erreur: Le dossier de stockage n\'existe pas. Contactez l\'administrateur.');
        } else {
          toast.error(`Erreur upload: ${error.message}`);
        }
        throw error;
      }

      setUploadProgress(80);

      // Obtenir l'URL publique avec cache busting
      const { data: { publicUrl } } = supabase.storage
        .from(options.bucket)
        .getPublicUrl(filePath);

      // Ajouter un paramètre de cache busting pour forcer le refresh
      const cacheBustingUrl = `${publicUrl}?t=${timestamp}`;

      setUploadProgress(100);

      console.log('✅ Image uploadée avec succès:', cacheBustingUrl);
      toast.success('Image uploadée et mise à jour avec succès !');

      return cacheBustingUrl;

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
      // Extraire le chemin du fichier depuis l'URL (ignorer les paramètres de cache busting)
      const urlParts = url.split('?')[0].split('/'); // Retirer les paramètres ?t=...
      const fileName = urlParts[urlParts.length - 1];
      
      // Si l'URL contient un dossier, l'inclure dans le chemin
      const pathParts = urlParts.slice(-2); // Prendre les 2 derniers éléments (dossier/fichier)
      const filePath = pathParts.length > 1 && pathParts[0] !== fileName ? pathParts.join('/') : fileName;
      
      console.log('🗑️ Suppression de l\'image:', filePath);
      
      const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

      if (error) {
        console.error('❌ Erreur suppression:', error);
        return false;
      }

      console.log('✅ Image supprimée avec succès');
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