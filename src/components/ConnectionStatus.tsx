import React, { useEffect, useState } from 'react';
import { Check, Wifi, X } from 'lucide-react';
import { useSupabase } from '@/context/SupabaseContext';

const ConnectionStatus = () => {
  const { isConnected, isLoading } = useSupabase();
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShowStatus(true);
    }
  }, [isLoading]);

  if (!showStatus) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isLoading ? (
        <div className="bg-background/80 backdrop-blur-sm border border-border rounded-full p-2 shadow-sm">
          <Wifi className="h-4 w-4 text-muted-foreground animate-pulse" />
        </div>
      ) : isConnected ? (
        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-full p-2 shadow-sm">
          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
        </div>
      ) : (
        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-full p-2 shadow-sm">
          <X className="h-4 w-4 text-red-600 dark:text-red-400" />
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus;