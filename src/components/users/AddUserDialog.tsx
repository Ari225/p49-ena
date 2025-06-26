
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, User, Shield, Edit } from 'lucide-react';
import { toast } from 'sonner';

interface AddUserDialogProps {
  children?: React.ReactNode;
  onUserAdded?: () => void;
}

const AddUserDialog = ({ children, onUserAdded }: AddUserDialogProps) => {
  const [open, setOpen] = useState(false);
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

  const userTypes = [
    {
      value: 'admin',
      label: 'Administrateur secondaire',
      description: 'Accès à l\'espace Administrateur, gestion du site et des rédacteurs',
      icon: Shield
    },
    {
      value: 'editor',
      label: 'Rédacteur',
      description: 'Accès à l\'espace Rédacteur, rédaction d\'articles à soumettre',
      icon: Edit
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.userType || !formData.firstName || !formData.lastName || 
        !formData.username || !formData.email || !formData.password) {
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
        confirmPassword: '[HIDDEN]'
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

      setOpen(false);
      onUserAdded?.();
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Erreur lors de la création de l\'utilisateur');
    } finally {
      setLoading(false);
    }
  };

  const selectedUserType = userTypes.find(type => type.value === formData.userType);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-primary hover:bg-primary/90">
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
          {/* Type d'utilisateur */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Type d'utilisateur *</Label>
            <Select value={formData.userType} onValueChange={(value) => setFormData(prev => ({ ...prev, userType: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner le type d'utilisateur" />
              </SelectTrigger>
              <SelectContent>
                {userTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-gray-500">{type.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {selectedUserType && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-2">
                  <selectedUserType.icon className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <strong>{selectedUserType.label}</strong>: {selectedUserType.description}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Nom et Prénoms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">Prénom *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                placeholder="Prénom"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium">Nom *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                placeholder="Nom de famille"
                required
              />
            </div>
          </div>

          {/* Nom d'utilisateur */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium">Nom d'utilisateur *</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              placeholder="Nom d'utilisateur unique"
              required
            />
          </div>

          {/* Adresse e-mail */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Adresse e-mail *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="utilisateur@exemple.com"
              required
            />
          </div>

          {/* Adresse */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium">Adresse</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Adresse complète (optionnel)"
              rows={2}
            />
          </div>

          {/* Mot de passe */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Mot de passe *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Minimum 6 caractères"
                required
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirmer le mot de passe *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="Confirmer le mot de passe"
                required
              />
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-primary hover:bg-primary/90"
            >
              {loading ? 'Création...' : 'Créer l\'utilisateur'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
