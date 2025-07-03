
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import ProfileImageUpload from './ProfileImageUpload';
import UserTypeSelection from './UserTypeSelection';
import UserFormFields from './UserFormFields';

interface AddUserDialogProps {
  onUserAdded: () => void;
  isMobile?: boolean;
}

interface UserFormData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  profileImage: File | null;
}

const AddUserDialog = ({ onUserAdded, isMobile = false }: AddUserDialogProps) => {
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    profileImage: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.firstName || !formData.lastName || !formData.role || !formData.password) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setCreating(true);

    try {
      // Mock user creation - in a real app, this would create user in database
      console.log('Creating user:', formData);
      
      toast.success('Utilisateur créé avec succès !');
      
      // Reset form
      setFormData({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        password: '',
        profileImage: null
      });
      
      setOpen(false);
      onUserAdded();
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Erreur lors de la création de l\'utilisateur');
    } finally {
      setCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={isMobile ? "w-full" : ""}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvel utilisateur
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg mx-auto">
        <DialogHeader>
          <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <ProfileImageUpload
            profileImage={formData.profileImage}
            onImageChange={(image) => setFormData(prev => ({ ...prev, profileImage: image }))}
          />

          <UserTypeSelection
            selectedRole={formData.role}
            onRoleChange={(role) => setFormData(prev => ({ ...prev, role }))}
          />

          <UserFormFields
            formData={formData}
            onFormDataChange={setFormData}
          />

          <div className="flex justify-end space-x-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={creating}>
              {creating ? 'Création...' : 'Créer l\'utilisateur'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
