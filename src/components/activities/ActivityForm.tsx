
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useActivityForm } from '@/hooks/useActivityForm';
import ImageUpload from './ImageUpload';
import { categoryOptions, typeOptions } from '@/types/activity';

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
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        placeholder="Titre de l'activité"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        required
      />
      
      <select
        className="w-full p-2 border rounded-md"
        value={formData.category}
        onChange={(e) => setFormData({...formData, category: e.target.value, type: ''})}
        required
      >
        <option value="">Catégorie</option>
        {categoryOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

      {formData.category === 'Autre activité' && (
        <select
          className="w-full p-2 border rounded-md"
          value={formData.type}
          onChange={(e) => setFormData({...formData, type: e.target.value})}
          required
        >
          <option value="">Type d'activité</option>
          {typeOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          required
        />
        <Input
          placeholder="Heure (ex: 09:00 - 17:00)"
          value={formData.time}
          onChange={(e) => setFormData({...formData, time: e.target.value})}
          required
        />
      </div>

      <Input
        placeholder="Lieu"
        value={formData.location}
        onChange={(e) => setFormData({...formData, location: e.target.value})}
        required
      />

      <Input
        placeholder="Nombre de participants"
        value={formData.participants}
        onChange={(e) => setFormData({...formData, participants: e.target.value})}
        required
      />

      <Textarea
        placeholder="Description de l'activité"
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        required
      />

      <ImageUpload
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
      />

      <div className="flex gap-2">
        <Button type="submit" className="flex-1">Publier l'activité</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </form>
  );
};

export default ActivityForm;
