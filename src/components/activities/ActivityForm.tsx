
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useActivityForm } from '@/hooks/useActivityForm';
import ImageUpload from './ImageUpload';
import { categoryOptions, typeOptions } from '@/types/activity';
import { Calendar, Clock, MapPin, Users, FileText, Tag } from 'lucide-react';

interface ActivityFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ onSuccess, onCancel }) => {
  const {
    formData,
    setFormData,
    selectedImage,
    setSelectedImage,
    imagePreview,
    setImagePreview,
    handleSubmit
  } = useActivityForm();

  const onSubmit = async (e: React.FormEvent) => {
    const success = await handleSubmit(e);
    if (success) {
      onSuccess();
    }
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto px-1">
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Titre */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-gray-700 flex items-center">
            <FileText className="w-4 h-4 mr-2 text-primary" />
            Titre de l'activité *
          </Label>
          <Input
            id="title"
            placeholder="Saisissez le titre de l'activité"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="border-gray-300 focus:border-primary focus:ring-primary"
            required
          />
        </div>

        {/* Catégorie et Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center">
              <Tag className="w-4 h-4 mr-2 text-primary" />
              Catégorie *
            </Label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md focus:border-primary focus:ring-1 focus:ring-primary bg-white"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value, type: ''})}
              required
            >
              <option value="">Sélectionnez une catégorie</option>
              {categoryOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {formData.category === 'Autre activité' && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Type d'activité *
              </Label>
              <select
                className="w-full p-3 border border-gray-300 rounded-md focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                required
              >
                <option value="">Sélectionnez un type</option>
                {typeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Date et Heure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium text-gray-700 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-primary" />
              Date *
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="border-gray-300 focus:border-primary focus:ring-primary"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time" className="text-sm font-medium text-gray-700 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              Heure *
            </Label>
            <Input
              id="time"
              placeholder="ex: 09:00 - 17:00"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="border-gray-300 focus:border-primary focus:ring-primary"
              required
            />
          </div>
        </div>

        {/* Lieu */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium text-gray-700 flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            Lieu *
          </Label>
          <Input
            id="location"
            placeholder="Lieu de l'activité"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="border-gray-300 focus:border-primary focus:ring-primary"
            required
          />
        </div>

        {/* Participants */}
        <div className="space-y-2">
          <Label htmlFor="participants" className="text-sm font-medium text-gray-700 flex items-center">
            <Users className="w-4 h-4 mr-2 text-primary" />
            Nombre de participants *
          </Label>
          <Input
            id="participants"
            placeholder="ex: 25 places disponibles"
            value={formData.participants}
            onChange={(e) => setFormData({...formData, participants: e.target.value})}
            className="border-gray-300 focus:border-primary focus:ring-primary"
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description de l'activité *
          </Label>
          <Textarea
            id="description"
            placeholder="Décrivez l'activité en détail..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="border-gray-300 focus:border-primary focus:ring-primary min-h-[100px] resize-none"
            required
          />
        </div>

        {/* Upload d'image */}
        <ImageUpload
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
        />

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
          <Button 
            type="submit" 
            className="flex-1 bg-primary hover:bg-primary/90 text-white font-medium py-3"
          >
            Publier l'activité
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            className="flex-1 border-gray-300 text-gray-700 py-3 hover:bg-gray-50"
          >
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
