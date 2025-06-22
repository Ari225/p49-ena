
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email?: string;
  role: 'admin' | 'editor' | 'member';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock admin user for development
  useEffect(() => {
    const mockUser: User = {
      id: '1',
      username: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@p49.com',
      role: 'admin'
    };
    setUser(mockUser);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Mock login logic
    if (username === 'admin' && password === 'admin') {
      const mockUser: User = {
        id: '1',
        username: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@p49.com',
        role: 'admin'
      };
      setUser(mockUser);
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
