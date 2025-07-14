
import React, { useState } from 'react';
import { Users, Shield, Edit, Crown } from 'lucide-react';
import UserCard from './UserCard';
import UserEditDialog from './UserEditDialog';
import UserDeleteDialog from './UserDeleteDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

interface UsersListProps {
  users: User[];
  currentUserId?: string;
  isMobile?: boolean;
  onUpdateUser?: (user: User) => void;
  onDeleteUser?: (userId: string) => void;
}

const UsersList = ({ users, currentUserId, isMobile = false, onUpdateUser, onDeleteUser }: UsersListProps) => {
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setEditUser(user);
  };

  const handleDelete = (user: User) => {
    setDeleteUser(user);
  };

  const handleSaveUser = (updatedUser: User) => {
    onUpdateUser?.(updatedUser);
  };

  const handleConfirmDelete = (userId: string) => {
    onDeleteUser?.(userId);
  };

  if (users.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-500">Aucun utilisateur trouvé</p>
      </div>
    );
  }

  const adminsPrincipaux = users.filter(user => user.role === 'admin_principal');
  const adminsSecondaires = users.filter(user => user.role === 'admin_secondaire');
  const redacteurs = users.filter(user => user.role === 'redacteur');

  if (isMobile) {
    return (
      <>
        <div className="space-y-3">
          {users.map((userItem) => (
            <UserCard 
              key={userItem.id} 
              userItem={userItem} 
              currentUserId={currentUserId}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
        
        <UserEditDialog
          user={editUser}
          isOpen={!!editUser}
          onClose={() => setEditUser(null)}
          onSave={handleSaveUser}
        />
        
        <UserDeleteDialog
          user={deleteUser}
          isOpen={!!deleteUser}
          onClose={() => setDeleteUser(null)}
          onConfirm={handleConfirmDelete}
        />
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-purple-700">
              <Crown className="mr-2 h-5 w-5" />
              Admin Principal ({adminsPrincipaux.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {adminsPrincipaux.length > 0 ? (
                adminsPrincipaux.map((userItem) => (
                  <UserCard 
                    key={userItem.id} 
                    userItem={userItem} 
                    currentUserId={currentUserId}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Aucun administrateur principal</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-red-700">
              <Shield className="mr-2 h-5 w-5" />
              Admin Secondaire ({adminsSecondaires.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {adminsSecondaires.length > 0 ? (
                adminsSecondaires.map((userItem) => (
                  <UserCard 
                    key={userItem.id} 
                    userItem={userItem} 
                    currentUserId={currentUserId}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Aucun administrateur secondaire</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <Edit className="mr-2 h-5 w-5" />
              Rédacteurs ({redacteurs.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {redacteurs.length > 0 ? (
                redacteurs.map((userItem) => (
                  <UserCard 
                    key={userItem.id} 
                    userItem={userItem} 
                    currentUserId={currentUserId}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Aucun rédacteur</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <UserEditDialog
        user={editUser}
        isOpen={!!editUser}
        onClose={() => setEditUser(null)}
        onSave={handleSaveUser}
      />
      
      <UserDeleteDialog
        user={deleteUser}
        isOpen={!!deleteUser}
        onClose={() => setDeleteUser(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default UsersList;
