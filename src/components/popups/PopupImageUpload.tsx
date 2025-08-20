import React from 'react';
import { Upload, X } from 'lucide-react';

interface PopupImageUploadProps {
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
  selectedImage?: File | null;
  currentImageUrl?: string;
  imagePreview?: string | null;
  isUploading?: boolean;
}

const PopupImageUpload: React.FC<PopupImageUploadProps> = ({
  onImageSelect,
  onImageRemove,
  selectedImage,
  currentImageUrl,
  imagePreview,
  isUploading
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const displayImage = imagePreview || currentImageUrl;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Image du pop-up
      </label>
      {!displayImage ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-2">
            <label htmlFor="popup-image-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Cliquez pour téléverser une image
              </span>
              <input
                id="popup-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
            </label>
          </div>
        </div>
      ) : (
        <div className="relative">
          <img
            src={displayImage}
            alt="Aperçu"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={onImageRemove}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            disabled={isUploading}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      {isUploading && (
        <p className="text-sm text-gray-600">Upload en cours...</p>
      )}
    </div>
  );
};

export default PopupImageUpload;