
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Shield, User } from 'lucide-react';

interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  created_at: string;
  image_url?: string;
}

interface UserCardProps {
  userItem: User;
  currentUserId?: string;
}

const UserCard = ({ userItem, currentUserId }: UserCardProps) => {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4 text-red-600" />;
      case 'editor':
        return <Edit className="h-4 w-4 text-blue-600" />;
      default:
        return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrateur';
      case 'editor':
        return 'Rédacteur';
      default:
        return 'Membre';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'editor':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3 mb-3">
        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center flex-shrink-0 border border-primary/20 overflow-hidden">
          {userItem.image_url ? (
            <img 
              src={userItem.image_url} 
              alt={`${userItem.first_name} ${userItem.last_name}`}
              className="w-full h-full object-cover"
            />
          ) : (
            getRoleIcon(userItem.role)
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-900 truncate">{userItem.first_name} {userItem.last_name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(userItem.role)}`}>
              {getRoleLabel(userItem.role)}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">
            @{userItem.username}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            {userItem.email}
          </p>
          <p className="text-xs text-gray-400">
            Membre depuis le {new Date(userItem.created_at).toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>
      <div className="flex space-x-2 pt-2 border-t border-gray-100">
        <Button variant="outline" size="sm" className="flex-1 text-xs">
          <Edit className="h-3 w-3 mr-1" />
          Modifier
        </Button>
        {userItem.id !== currentUserId && (
          <Button variant="outline" size="sm" className="flex-1 text-xs text-red-600 hover:text-red-700 hover:border-red-300">
            <Trash2 className="h-3 w-3 mr-1" />
            Supprimer
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
