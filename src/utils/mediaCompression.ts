// Utility functions for media compression

export const compressImage = async (file: File, maxSizeMB: number = 5): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Cannot get canvas context'));
      return;
    }

    const img = new Image();
    img.onload = () => {
      // Calculate new dimensions while maintaining aspect ratio
      const maxWidth = 1920;
      const maxHeight = 1080;
      let { width, height } = img;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Start with quality 0.8 and reduce if needed
      let quality = 0.8;
      const tryCompress = () => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'));
              return;
            }

            const sizeInMB = blob.size / (1024 * 1024);
            
            if (sizeInMB <= maxSizeMB || quality <= 0.1) {
              // Create a new File object with the compressed blob
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              quality -= 0.1;
              tryCompress();
            }
          },
          'image/jpeg',
          quality
        );
      };

      tryCompress();
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

export const compressVideo = async (file: File, maxSizeMB: number = 20): Promise<File> => {
  // For video compression, we'll use a simpler approach
  // In a real application, you might want to use FFmpeg.wasm for proper video compression
  const sizeInMB = file.size / (1024 * 1024);
  
  if (sizeInMB <= maxSizeMB) {
    return file; // No compression needed
  }

  // For now, we'll just return the original file with a warning
  // In a production environment, you'd implement proper video compression
  console.warn(`Video file ${file.name} (${sizeInMB.toFixed(2)}MB) exceeds ${maxSizeMB}MB limit but will be uploaded as-is. Consider implementing video compression.`);
  return file;
};

export const compressMediaFile = async (file: File): Promise<File> => {
  if (file.type.startsWith('image/')) {
    return compressImage(file, 5); // 5MB limit for images
  } else if (file.type.startsWith('video/')) {
    return compressVideo(file, 20); // 20MB limit for videos
  }
  
  return file; // Return as-is for other file types
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};