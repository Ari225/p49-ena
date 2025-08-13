
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
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
  address: string;
  confirmPassword: string;
  profileImage: File | null;
}

const AddUserDialog = ({ onUserAdded, isMobile = false }: AddUserDialogProps) => {
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    address: '',
    confirmPassword: '',
    profileImage: null
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier la taille du fichier (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('L\'image ne doit pas dépasser 5MB');
        return;
      }

      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        toast.error('Veuillez sélectionner un fichier image valide');
        return;
      }

      setSelectedImage(file);
      setFormData(prev => ({ ...prev, profileImage: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setFormData(prev => ({ ...prev, profileImage: null }));
  };

  const handleFormDataChange = (field: keyof UserFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      console.log('Début upload image:', file.name, file.type, file.size);
      
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `user-images/${fileName}`;

      console.log('Upload vers:', filePath);

      const { data, error: uploadError } = await supabase.storage
        .from('media-files')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type
        });

      if (uploadError) {
        console.error('Erreur upload:', uploadError);
        throw uploadError;
      }

      console.log('Upload réussi:', data);

      // Obtenir l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from('media-files')
        .getPublicUrl(filePath);

      console.log('URL publique:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.firstName || !formData.lastName || !formData.role || !formData.password) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (!selectedImage) {
      toast.error('Veuillez sélectionner une photo de profil');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    setCreating(true);

    try {
      console.log('Début de la création utilisateur:', formData);
      
      // Upload de l'image si présente
      let imageUrl = null;
      if (selectedImage) {
        console.log('Upload de l\'image en cours...');
        imageUrl = await uploadImage(selectedImage);
        if (!imageUrl) {
          toast.error('Erreur lors de l\'upload de l\'image');
          setCreating(false);
          return;
        }
        console.log('Image uploadée avec succès:', imageUrl);
      }

      // Mappage des rôles
      let mappedRole = formData.role;
      if (formData.role === 'admin') {
        mappedRole = 'admin_secondaire';
      } else if (formData.role === 'editor') {
        mappedRole = 'redacteur';
      }

      console.log('Rôle mappé:', mappedRole);

      // Création d'un hash compatible avec la fonction authenticate_app_user
      const passwordHash = btoa(formData.password);

      // Insertion dans la base de données
      const { data: newUser, error } = await supabase
        .from('app_users')
        .insert({
          username: formData.username,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          role: mappedRole as 'admin_principal' | 'admin_secondaire' | 'redacteur',
          password_hash: passwordHash,
          address: formData.address || null,
          image_url: imageUrl
        })
        .select()
        .single();

      if (error) {
        console.error('Erreur lors de la création:', error);
        toast.error(`Erreur lors de la création: ${error.message}`);
        setCreating(false);
        return;
      }

      console.log('Utilisateur créé avec succès:', newUser);
      toast.success('Utilisateur créé avec succès !');
      
      // Reset form
      setFormData({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        password: '',
        address: '',
        confirmPassword: '',
        profileImage: null
      });
      
      setSelectedImage(null);
      setImagePreview(null);
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
            selectedImage={selectedImage}
            imagePreview={imagePreview}
            onImageChange={handleImageChange}
            onRemoveImage={handleRemoveImage}
          />

          <UserTypeSelection
            selectedUserType={formData.role}
            onUserTypeChange={(role) => setFormData(prev => ({ ...prev, role }))}
          />

          <UserFormFields
            formData={formData}
            onFormDataChange={handleFormDataChange}
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
