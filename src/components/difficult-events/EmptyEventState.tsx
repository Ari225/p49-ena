
import React from 'react';
import { Heart } from 'lucide-react';

export const EmptyEventState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-500">
        Aucun événement dans cette catégorie pour le moment.
      </p>
    </div>
  );
};
