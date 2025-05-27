
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  username: string;
  role: 'admin' | 'editor';
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  setCurrentUserId: (userId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users for demo purposes
const mockUsers: { [key: string]: { password: string; user: User } } = {
  admin: {
    password: 'admin123',
    user: { id: '11111111-1111-1111-1111-111111111111', username: 'admin', role: 'admin', email: 'admin@p49ena.ci' }
  },
  redacteur: {
    password: 'redacteur123',
    user: { id: '22222222-2222-2222-2222-222222222222', username: 'redacteur', role: 'editor', email: 'redacteur@p49ena.ci' }
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('p49_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      // Set the current user ID in Supabase session
      setCurrentUserId(userData.id);
    }
  }, []);

  const setCurrentUserId = async (userId: string) => {
    try {
      // Set the current user ID in Supabase context
      await supabase.rpc('set_config', {
        setting_name: 'app.current_user_id',
        setting_value: userId,
        is_local: false
      });
    } catch (error) {
      console.log('Note: set_config function not available, using direct SQL execution');
      // Fallback: set the configuration directly
      try {
        await supabase.from('app_users').select('id').eq('id', userId).limit(1);
      } catch (fallbackError) {
        console.error('Error setting user context:', fallbackError);
      }
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    const userData = mockUsers[username];
    if (userData && userData.password === password) {
      setUser(userData.user);
      localStorage.setItem('p49_user', JSON.stringify(userData.user));
      await setCurrentUserId(userData.user.id);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('p49_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      setCurrentUserId
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
