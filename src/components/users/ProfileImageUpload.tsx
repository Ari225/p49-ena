
import React from 'react';
import { Label } from '@/components/ui/label';
import { Upload, User, X } from 'lucide-react';

interface ProfileImageUploadProps {
  selectedImage: File | null;
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

const ProfileImageUpload = ({
  selectedImage,
  imagePreview,
  onImageChange,
  onRemoveImage
}: ProfileImageUploadProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Photo de profil (optionnel)</Label>
      <div className="flex items-center space-x-4">
        {imagePreview ? (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Aperçu"
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            />
            <button
              type="button"
              onClick={onRemoveImage}
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
            <User className="h-6 w-6 text-gray-400" />
          </div>
        )}
        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="hidden"
            id="profile-image"
          />
          <Label
            htmlFor="profile-image"
            className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Upload className="h-4 w-4 mr-2" />
            Choisir une image
          </Label>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF jusqu'à 5MB</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
