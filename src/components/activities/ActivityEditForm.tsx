import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useActivityEdit } from '@/hooks/useActivityEdit';
import ImageUpload from './ImageUpload';
import { categoryOptions, Activity } from '@/types/activity';
import { Calendar, Clock, MapPin, FileText, Tag, Plus, X, DollarSign } from 'lucide-react';

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
    
    // Validation spéciale pour Les Régionales
    if (formData.category === 'Les Régionales') {
      if (!formData.end_date) {
        return;
      }
      if (formData.participation_fees.length === 0 || formData.participation_fees.some(fee => !fee.name.trim() || !fee.amount.trim())) {
        return;
      }
    }
    
    const success = await handleUpdate(activity.id);
    if (success) {
      onSuccess();
    }
  };

  const addParticipationFee = () => {
    setFormData({
      ...formData,
      participation_fees: [...formData.participation_fees, { name: '', amount: '' }]
    });
  };

  const removeParticipationFee = (index: number) => {
    setFormData({
      ...formData,
      participation_fees: formData.participation_fees.filter((_, i) => i !== index)
    });
  };

  const updateParticipationFee = (index: number, field: 'name' | 'amount', value: string) => {
    const updatedFees = [...formData.participation_fees];
    updatedFees[index] = { ...updatedFees[index], [field]: value };
    setFormData({
      ...formData,
      participation_fees: updatedFees
    });
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
            Date de début *
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

        {/* Date de fin - Obligatoire pour Les Régionales */}
        <div className="space-y-2">
          <Label htmlFor="end_date" className="text-sm font-medium text-gray-700 flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            Date de fin {formData.category === 'Les Régionales' && '*'}
          </Label>
          <Input
            id="end_date"
            type="date"
            value={formData.end_date}
            onChange={(e) => setFormData({...formData, end_date: e.target.value})}
            className="border-gray-300 focus:border-primary focus:ring-primary"
            required={formData.category === 'Les Régionales'}
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

        {/* Champs spécifiques aux Régionales */}
        {formData.category === 'Les Régionales' && (
          <div className="space-y-4 p-4 border border-primary/20 rounded-lg bg-primary/5">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-primary" />
                Tarifs de participation (en FCFA) *
              </Label>
              <p className="text-xs text-gray-500">
                Ajoutez un ou plusieurs tarifs pour cette activité régionale
              </p>
              
              {formData.participation_fees.map((fee, index) => (
                <div key={index} className="space-y-3 p-3 border border-gray-200 rounded-lg bg-gray-50/50">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-700">Tarif {index + 1}</h4>
                    {formData.participation_fees.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeParticipationFee(index)}
                        className="text-red-600 hover:bg-red-50 border-red-300"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Input
                      placeholder="Nom du tarif (ex: Tarif étudiant, Tarif professionnel...)"
                      value={fee.name}
                      onChange={(e) => updateParticipationFee(index, 'name', e.target.value)}
                      className="border-gray-300 focus:border-primary focus:ring-primary"
                      required
                    />
                    <Input
                      placeholder="Montant en FCFA (ex: 50000)"
                      value={fee.amount}
                      onChange={(e) => updateParticipationFee(index, 'amount', e.target.value)}
                      className="border-gray-300 focus:border-primary focus:ring-primary"
                      type="number"
                      min="0"
                      required
                    />
                  </div>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addParticipationFee}
                className="flex items-center gap-2 text-primary border-primary hover:bg-primary/5"
              >
                <Plus className="w-4 h-4" />
                Ajouter un tarif
              </Button>
              
              {formData.participation_fees.length === 0 && (
                <Button
                  type="button"
                  onClick={() => setFormData({...formData, participation_fees: [{ name: '', amount: '' }]})}
                  className="w-full bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30"
                >
                  Ajouter le premier tarif
                </Button>
              )}
            </div>
          </div>
        )}

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