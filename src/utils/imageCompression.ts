/**
 * Utilitaire de compression d'images pour optimiser les performances web
 */
export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'webp' | 'png';
}

const DEFAULT_OPTIONS: CompressionOptions = {
  maxWidth: 1024,
  maxHeight: 1024,
  quality: 0.8,
  format: 'jpeg'
};

/**
 * Compresse une image en réduisant sa taille et sa qualité
 */
export const compressImage = async (
  file: File, 
  options: CompressionOptions = {}
): Promise<Blob> => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    if (!ctx) {
      reject(new Error('Impossible de créer le contexte canvas'));
      return;
    }
    
    img.onload = () => {
      // Calculer les nouvelles dimensions
      let { width, height } = img;
      
      if (width > opts.maxWidth! || height > opts.maxHeight!) {
        const ratio = Math.min(opts.maxWidth! / width, opts.maxHeight! / height);
        width *= ratio;
        height *= ratio;
      }
      
      // Configurer le canvas
      canvas.width = width;
      canvas.height = height;
      
      // Dessiner l'image redimensionnée
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convertir en blob avec compression
      canvas.toBlob(
        (blob) => {
          if (blob) {
            console.log(`📸 Image compressée: ${(file.size / 1024).toFixed(1)}KB → ${(blob.size / 1024).toFixed(1)}KB`);
            resolve(blob);
          } else {
            reject(new Error('Échec de la compression'));
          }
        },
        `image/${opts.format}`,
        opts.quality
      );
    };
    
    img.onerror = () => {
      reject(new Error('Erreur lors du chargement de l\'image'));
    };
    
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Vérifie si un fichier est une image valide
 */
export const isValidImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type);
};

/**
 * Formate la taille d'un fichier en string lisible
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};