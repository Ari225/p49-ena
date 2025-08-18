import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useActivityEdit } from '@/hooks/useActivityEdit';
import ImageUpload from './ImageUpload';
import { categoryOptions, Activity } from '@/types/activity';
import { Calendar, Clock, MapPin, FileText, Tag } from 'lucide-react';

interface ActivityEditFormProps {
  activity: Activity;
  onSuccess: () => void;
  onCancel: () => void;
}

const ActivityEditForm: React.FC<ActivityEditFormProps> = ({ activity, onSuccess, onCancel }) => {
  const {
    formData,
    setFormData,
    selectedImage,
    setSelectedImage,
    imagePreview,
    setImagePreview,
    initializeForm,
    handleUpdate
  } = useActivityEdit();

  React.useEffect(() => {
    initializeForm(activity);
  }, [activity]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleUpdate(activity.id);
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

        {/* Catégorie */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 flex items-center">
            <Tag className="w-4 h-4 mr-2 text-primary" />
            Catégorie *
          </Label>
          <select
            className="w-full p-3 border border-gray-300 rounded-md focus:border-primary focus:ring-1 focus:ring-primary bg-white"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value, other_category: ''})}
            required
          >
            <option value="">Sélectionnez une catégorie</option>
            {categoryOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Autre catégorie conditionnelle */}
        {formData.category === 'Autre' && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Précisez la catégorie *
            </Label>
            <Input
              placeholder="Précisez le type d'activité"
              value={formData.other_category}
              onChange={(e) => setFormData({...formData, other_category: e.target.value})}
              className="border-gray-300 focus:border-primary focus:ring-primary"
              required
            />
          </div>
        )}

        {/* Date */}
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

        {/* Heures de début et fin */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start_time" className="text-sm font-medium text-gray-700 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              Heure de début *
            </Label>
            <Input
              id="start_time"
              type="time"
              value={formData.start_time}
              onChange={(e) => setFormData({...formData, start_time: e.target.value})}
              className="border-gray-300 focus:border-primary focus:ring-primary"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end_time" className="text-sm font-medium text-gray-700 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              Heure de fin
            </Label>
            <Input
              id="end_time"
              type="time"
              value={formData.end_time}
              onChange={(e) => setFormData({...formData, end_time: e.target.value})}
              className="border-gray-300 focus:border-primary focus:ring-primary"
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

        {/* Description brève */}
        <div className="space-y-2">
          <Label htmlFor="brief_description" className="text-sm font-medium text-gray-700">
            Description brève *
          </Label>
          <Input
            id="brief_description"
            placeholder="Résumé en une phrase"
            value={formData.brief_description}
            onChange={(e) => setFormData({...formData, brief_description: e.target.value})}
            className="border-gray-300 focus:border-primary focus:ring-primary"
            required
          />
        </div>

        {/* Description détaillée */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description détaillée *
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
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            className="border-gray-300 text-gray-700 py-3 px-6 hover:bg-gray-50"
          >
            Annuler
          </Button>
          <Button 
            type="submit" 
            className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6"
          >
            Modifier
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ActivityEditForm;