
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { hashPassword } from '@/utils/passwordUtils';
import { isAdminPrincipal } from '@/utils/roleUtils';
import { AppUser, AuthUser } from '@/types/user';

interface UserEditDialogProps {
  user: AppUser | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: AppUser) => void;
  currentUser: AuthUser | null;
}

const UserEditDialog: React.FC<UserEditDialogProps> = ({
  user,
  isOpen,
  onClose,
  onSave,
  currentUser
}) => {
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    username: user?.username || '',
    role: (user?.role || 'redacteur') as 'admin_principal' | 'admin_secondaire' | 'redacteur',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        username: user.username,
        role: user.role as 'admin_principal' | 'admin_secondaire' | 'redacteur',
        password: '',
        confirmPassword: ''
      });
    }
  }, [user]);

  const canEditUser = () => {
    if (!currentUser || !user) return false;
    
    // Admin principal peut tout modifier
    if (currentUser.role === 'admin_principal') return true;
    
    // Admin secondaire ne peut pas modifier l'admin principal
    if (currentUser.role === 'admin_secondaire' && user.role === 'admin_principal') return false;
    
    // Admin secondaire peut modifier ses propres infos et celles des rédacteurs
    if (currentUser.role === 'admin_secondaire') {
      return currentUser.id === user.id || user.role === 'redacteur';
    }
    
    // Rédacteur peut seulement modifier ses propres infos
    if (currentUser.role === 'redacteur') {
      return currentUser.id === user.id;
    }
    
    return false;
  };

  const canChangePassword = () => {
    if (!currentUser || !user) return false;
    
    // Admin principal peut changer tous les mots de passe
    if (isAdminPrincipal(currentUser)) return true;
    
    // Admin secondaire peut changer son mot de passe et celui des rédacteurs
    if (currentUser.role === 'admin_secondaire') {
      return currentUser.id === user.id || user.role === 'redacteur';
    }
    
    // Rédacteur peut changer seulement son propre mot de passe
    if (currentUser.role === 'redacteur') {
      return currentUser.id === user.id;
    }
    
    return false;
  };

  const handleSave = async () => {
    if (!user || !canEditUser()) return;
    
    setLoading(true);
    
    try {
      // Validation du mot de passe si fourni
      if (formData.password && formData.password !== formData.confirmPassword) {
        toast.error('Les mots de passe ne correspondent pas');
        setLoading(false);
        return;
      }

      const updateData: any = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        username: formData.username,
        role: formData.role,
      };

      // Ajouter le mot de passe hashé si fourni et autorisé
      if (formData.password && canChangePassword()) {
        updateData.password_hash = hashPassword(formData.password);
      }

      const { error } = await supabase
        .from('app_users')
        .update(updateData)
        .eq('id', user.id);

      if (error) throw error;

      const updatedUser: AppUser = {
        ...user,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        username: formData.username,
        role: formData.role as 'admin_principal' | 'admin_secondaire' | 'redacteur',
      };
      
      onSave(updatedUser);
      toast.success(`${formData.first_name} ${formData.last_name} a été modifié avec succès`);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast.error('Erreur lors de la modification de l\'utilisateur');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md mx-auto rounded-xl">
        <DialogHeader>
          <DialogTitle>Modifier l'utilisateur</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first_name">Prénom</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="last_name">Nom</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="username">Nom d'utilisateur</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          
          <div>
            <Label htmlFor="role">Rôle</Label>
            <Select value={formData.role} onValueChange={(value: 'admin_principal' | 'admin_secondaire' | 'redacteur') => setFormData({ ...formData, role: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin_principal">Admin Principal</SelectItem>
                <SelectItem value="admin_secondaire">Admin Secondaire</SelectItem>
                <SelectItem value="redacteur">Rédacteur</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {canChangePassword() && (
            <>
              <div>
                <Label htmlFor="password">Nouveau mot de passe (optionnel)</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Laisser vide pour ne pas changer"
                />
              </div>
              
              {formData.password && (
                <div>
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="flex space-x-2 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1" disabled={loading}>
            Annuler
          </Button>
          <Button onClick={handleSave} className="flex-1" disabled={loading || !canEditUser()}>
            {loading ? 'Modification...' : 'Enregistrer'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditDialog;
