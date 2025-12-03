
import React from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
  imagePreview: string | null;
  setImagePreview: (preview: string | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedImage,
  setSelectedImage,
  imagePreview,
  setImagePreview
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Image de l'activité *
      </label>
      {!imagePreview ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-2">
            <label htmlFor="image-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Cliquez pour téléverser une image
              </span>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>
      ) : (
        <div className="relative">
          <img
            src={imagePreview}
            alt="Aperçu"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
