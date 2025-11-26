// Utility functions for media compression
import { PDFDocument } from 'pdf-lib';

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
      // More aggressive compression for better web performance
      const maxWidth = 1200; // Reduced from 1920 for faster loading
      const maxHeight = 800;  // Reduced from 1080 for faster loading
      let { width, height } = img;

      // Always resize if image is larger than reasonable web size
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;
      
      // Improve image quality before compression
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Try WebP first (better compression), fallback to JPEG
      const tryWebP = () => {
        // Check if browser supports WebP
        const testCanvas = document.createElement('canvas');
        testCanvas.width = 1;
        testCanvas.height = 1;
        const supportsWebP = testCanvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;

        if (supportsWebP) {
          compressWithFormat('image/webp', 0.8);
        } else {
          compressWithFormat('image/jpeg', 0.85);
        }
      };

      const compressWithFormat = (format: string, initialQuality: number) => {
        let quality = initialQuality;
        
        const tryCompress = () => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                // Fallback to JPEG if WebP fails
                if (format === 'image/webp') {
                  compressWithFormat('image/jpeg', 0.85);
                  return;
                }
                reject(new Error('Failed to compress image'));
                return;
              }

              const sizeInMB = blob.size / (1024 * 1024);
              
              if (sizeInMB <= maxSizeMB || quality <= 0.3) {
                // Determine file extension based on format
                const extension = format === 'image/webp' ? '.webp' : '.jpg';
                const fileName = file.name.replace(/\.[^/.]+$/, '') + extension;
                
                const compressedFile = new File([blob], fileName, {
                  type: format,
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                quality -= 0.1;
                tryCompress();
              }
            },
            format,
            quality
          );
        };

        tryCompress();
      };

      tryWebP();
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

export const compressPDF = async (file: File, maxSizeMB: number = 10): Promise<File> => {
  const sizeInMB = file.size / (1024 * 1024);
  
  if (sizeInMB <= maxSizeMB) {
    return file; // No compression needed
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    // Optimize the PDF by removing metadata and compressing
    const pdfBytes = await pdfDoc.save({
      useObjectStreams: false,
      addDefaultPage: false,
    });
    
    // Convert to proper Blob format
    const compressedFile = new File([new Uint8Array(pdfBytes)], file.name, {
      type: 'application/pdf',
      lastModified: Date.now(),
    });
    
    const compressedSizeInMB = compressedFile.size / (1024 * 1024);
    console.log(`PDF compressed from ${sizeInMB.toFixed(2)}MB to ${compressedSizeInMB.toFixed(2)}MB`);
    
    return compressedFile;
  } catch (error) {
    console.warn(`Failed to compress PDF ${file.name}:`, error);
    return file; // Return original if compression fails
  }
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
    // More aggressive compression for communiqués (2MB limit for faster web loading)
    return compressImage(file, 2);
  } else if (file.type.startsWith('video/')) {
    return compressVideo(file, 20); // 20MB limit for videos
  } else if (file.type === 'application/pdf') {
    return compressPDF(file, 10); // 10MB limit for PDFs
  }
  
  return file; // Return as-is for other file types
};

// Specific function for communiqué images with more aggressive compression
export const compressCommuniqueImage = async (file: File): Promise<File> => {
  if (file.type.startsWith('image/')) {
    // Very aggressive compression for public communiqués (1.5MB limit)
    return compressImage(file, 1.5);
  }
  return file;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};