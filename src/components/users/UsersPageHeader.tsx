
import React from 'react';
import { Users } from 'lucide-react';
import AddUserDialog from './AddUserDialog';

interface UsersPageHeaderProps {
  userCount: number;
  onUserAdded: () => void;
  isMobile?: boolean;
}

const UsersPageHeader = ({ userCount, onUserAdded, isMobile = false }: UsersPageHeaderProps) => {
  if (isMobile) {
    return (
      <>
        <div className="mb-6">
          <h1 className="text-xl font-bold text-primary leading-tight">
            Gestion des Utilisateurs
          </h1>
          <p className="text-gray-600 mt-2 text-sm">Gérer les comptes et permissions</p>
        </div>

        <div className="mb-6 w-full">
          <AddUserDialog onUserAdded={onUserAdded} />
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-primary flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Utilisateurs ({userCount})
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Gestion des Utilisateurs</h1>
        <p className="text-gray-600 mt-2">Gérer les comptes et permissions des utilisateurs</p>
      </div>

      <div className="mb-6">
        <AddUserDialog onUserAdded={onUserAdded} />
      </div>
    </>
  );
};

export default UsersPageHeader;
