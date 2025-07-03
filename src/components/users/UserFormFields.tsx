
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  address: string;
  password: string;
  confirmPassword: string;
}

interface UserFormFieldsProps {
  formData: FormData;
  onFormDataChange: (field: keyof FormData, value: string) => void;
}

const UserFormFields = ({ formData, onFormDataChange }: UserFormFieldsProps) => {
  return (
    <>
      {/* Nom et Prénoms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium">Prénom *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={e => onFormDataChange('firstName', e.target.value)}
            placeholder="Prénom"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium">Nom *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={e => onFormDataChange('lastName', e.target.value)}
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
          onChange={e => onFormDataChange('username', e.target.value)}
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
          onChange={e => onFormDataChange('email', e.target.value)}
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
          onChange={e => onFormDataChange('address', e.target.value)}
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
            onChange={e => onFormDataChange('password', e.target.value)}
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
            onChange={e => onFormDataChange('confirmPassword', e.target.value)}
            placeholder="Confirmer le mot de passe"
            required
          />
        </div>
      </div>
    </>
  );
};

export default UserFormFields;
