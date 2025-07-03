
import React from 'react';
import { Users } from 'lucide-react';
import UserCard from './UserCard';

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
}

const UsersList = ({ users, currentUserId }: UsersListProps) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-500">Aucun utilisateur trouvé</p>
      </div>
    );
  }

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
};

export default UsersList;
