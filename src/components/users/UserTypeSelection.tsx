
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Edit } from 'lucide-react';

interface UserType {
  value: string;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
}

interface UserTypeSelectionProps {
  selectedUserType: string;
  onUserTypeChange: (value: string) => void;
}

const userTypes: UserType[] = [
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

const UserTypeSelection = ({ selectedUserType, onUserTypeChange }: UserTypeSelectionProps) => {
  const selectedType = userTypes.find(type => type.value === selectedUserType);

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Type d'utilisateur *</Label>
      <Select value={selectedUserType} onValueChange={onUserTypeChange}>
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner le type d'utilisateur" />
        </SelectTrigger>
        <SelectContent>
          {userTypes.map(type => {
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
      {selectedType && (
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-2">
            <selectedType.icon className="h-4 w-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <strong>{selectedType.label}</strong>: {selectedType.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTypeSelection;
