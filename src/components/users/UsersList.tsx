
import React from 'react';
import { Users, Shield, Edit } from 'lucide-react';
import UserCard from './UserCard';
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
}

const UsersList = ({ users, currentUserId, isMobile = false }: UsersListProps) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-500">Aucun utilisateur trouvé</p>
      </div>
    );
  }

  const admins = users.filter(user => user.role === 'admin');
  const editors = users.filter(user => user.role === 'editor');

  if (isMobile) {
    return (
      <div className="space-y-3">
        {users.map((userItem) => (
          <UserCard 
            key={userItem.id} 
            userItem={userItem} 
            currentUserId={currentUserId}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-red-700">
            <Shield className="mr-2 h-5 w-5" />
            Administrateurs ({admins.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {admins.length > 0 ? (
              admins.map((userItem) => (
                <UserCard 
                  key={userItem.id} 
                  userItem={userItem} 
                  currentUserId={currentUserId}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Aucun administrateur</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <Edit className="mr-2 h-5 w-5" />
            Rédacteurs ({editors.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {editors.length > 0 ? (
              editors.map((userItem) => (
                <UserCard 
                  key={userItem.id} 
                  userItem={userItem} 
                  currentUserId={currentUserId}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Aucun rédacteur</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersList;
