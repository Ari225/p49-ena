import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SupabaseContextType {
  isConnected: boolean;
  isLoading: boolean;
  testConnection: () => Promise<boolean>;
  insertData: (table: string, data: any) => Promise<{ data: any; error: any }>;
  selectData: (table: string, columns?: string) => Promise<{ data: any; error: any }>;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const testConnection = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      console.log('Testing Supabase connection...');
      
      const { error } = await supabase
        .from('app_users')
        .select('count', { count: 'exact', head: true });
      
      if (error) {
        console.error('Supabase connection failed:', error);
        setIsConnected(false);
        toast.error('Connexion à Supabase échouée');
        return false;
      }
      
      console.log('Supabase connection successful');
      setIsConnected(true);
      toast.success('Connexion à Supabase réussie');
      return true;
    } catch (err) {
      console.error('Network error:', err);
      setIsConnected(false);
      toast.error('Erreur réseau lors de la connexion à Supabase');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const insertData = async (table: string, data: any) => {
    try {
      console.log(`Inserting data into ${table}:`, data);
      let result;
      
      // Type-safe table operations
      switch (table) {
        case 'media_items':
          result = await supabase.from('media_items').insert(data);
          break;
        case 'activities':
          result = await supabase.from('activities').insert(data);
          break;
        case 'news':
          result = await supabase.from('news').insert(data);
          break;
        case 'blog_articles':
          result = await supabase.from('blog_articles').insert(data);
          break;
        case 'app_users':
          result = await supabase.from('app_users').insert(data);
          break;
        default:
          throw new Error(`Table ${table} not supported`);
      }
      
      if (result.error) {
        console.error(`Insert error for ${table}:`, result.error);
        toast.error(`Erreur lors de l'insertion dans ${table}: ${result.error.message}`);
      } else {
        console.log(`Data inserted successfully into ${table}`);
        toast.success(`Données insérées avec succès dans ${table}`);
      }
      
      return result;
    } catch (err) {
      console.error(`Insert network error for ${table}:`, err);
      toast.error(`Erreur réseau lors de l'insertion dans ${table}`);
      return { data: null, error: err };
    }
  };

  const selectData = async (table: string, columns: string = '*') => {
    try {
      console.log(`Selecting data from ${table}...`);
      let result;
      
      // Type-safe table operations
      switch (table) {
        case 'media_items':
          result = await supabase.from('media_items').select(columns);
          break;
        case 'activities':
          result = await supabase.from('activities').select(columns);
          break;
        case 'news':
          result = await supabase.from('news').select(columns);
          break;
        case 'blog_articles':
          result = await supabase.from('blog_articles').select(columns);
          break;
        case 'app_users':
          result = await supabase.from('app_users').select(columns);
          break;
        default:
          throw new Error(`Table ${table} not supported`);
      }
      
      if (result.error) {
        console.error(`Select error for ${table}:`, result.error);
        toast.error(`Erreur lors de la lecture de ${table}: ${result.error.message}`);
      } else {
        console.log(`Data selected successfully from ${table}:`, result.data?.length || 0, 'rows');
      }
      
      return result;
    } catch (err) {
      console.error(`Select network error for ${table}:`, err);
      toast.error(`Erreur réseau lors de la lecture de ${table}`);
      return { data: null, error: err };
    }
  };

  useEffect(() => {
    // Test connection on mount
    testConnection();
  }, []);

  return (
    <SupabaseContext.Provider value={{
      isConnected,
      isLoading,
      testConnection,
      insertData,
      selectData
    }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};