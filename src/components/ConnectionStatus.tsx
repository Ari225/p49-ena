import React from 'react';
import { Check, Wifi } from 'lucide-react';
import { useSupabase } from '@/context/SupabaseContext';

const ConnectionStatus = () => {
  const { isConnected, isLoading } = useSupabase();

  if (isLoading) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-background/80 backdrop-blur-sm border border-border rounded-full p-2 shadow-sm">
        <Wifi className="h-4 w-4 text-muted-foreground animate-pulse" />
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-full p-2 shadow-sm">
        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
      </div>
    );
  }

  return null;
};

export default ConnectionStatus;