
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, User } from 'lucide-react';
import { toast } from 'sonner';
import ProfileImageUpload from './ProfileImageUpload';
import UserTypeSelection from './UserTypeSelection';
import UserFormFields from './UserFormFields';

interface AddUserDialogProps {
  children?: React.ReactNode;
  onUserAdded?: () => void;
}

const AddUserDialog = ({
  children,
  onUserAdded
}: AddUserDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    userType: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Veuillez sélectionner un fichier image valide');
      }
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleFormDataChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.userType || !formData.firstName || !formData.lastName || !formData.username || !formData.email || !formData.password) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Veuillez saisir une adresse e-mail valide');
      return;
    }

    setLoading(true);
    try {
      // Mock user creation - in a real app, this would create user in database
      console.log('Creating user:', {
        ...formData,
        role: formData.userType,
        password: '[HIDDEN]',
        confirmPassword: '[HIDDEN]',
        image: selectedImage ? selectedImage.name : null
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Utilisateur ${formData.userType === 'admin' ? 'administrateur' : 'rédacteur'} créé avec succès !`);

      // Reset form
      setFormData({
        userType: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        address: '',
        password: '',
        confirmPassword: ''
      });
      setSelectedImage(null);
      setImagePreview(null);
      setOpen(false);
      onUserAdded?.();
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Erreur lors de la création de l\'utilisateur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-primary hover:bg-primary/90 w-full">
            <Plus className="mr-2 h-4 w-4" />
            Nouvel utilisateur
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <User className="mr-2 h-5 w-5" />
            Ajouter un nouvel utilisateur
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <ProfileImageUpload
            selectedImage={selectedImage}
            imagePreview={imagePreview}
            onImageChange={handleImageChange}
            onRemoveImage={removeImage}
          />

          <UserTypeSelection
            selectedUserType={formData.userType}
            onUserTypeChange={(value) => handleFormDataChange('userType', value)}
          />

          <UserFormFields
            formData={formData}
            onFormDataChange={handleFormDataChange}
          />

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90">
              {loading ? 'Création...' : 'Créer l\'utilisateur'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
