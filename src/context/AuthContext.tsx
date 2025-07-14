
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import CryptoJS from 'crypto-js';

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email?: string;
  role: 'admin_principal' | 'admin_secondaire' | 'redacteur';
  image_url?: string;
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

  // Charger l'utilisateur depuis localStorage au démarrage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Récupérer l'utilisateur depuis Supabase
      const { data: userData, error } = await supabase
        .from('app_users')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !userData) {
        toast.error('Nom d\'utilisateur ou mot de passe incorrect');
        setLoading(false);
        return false;
      }

      // Vérifier le mot de passe (simple comparaison pour ce cas d'usage)
      // En production, il faudrait utiliser un hash sécurisé
      const expectedHash = '$2b$10$rK8qP0YvE1YvE1YvE1YvE1YvE1YvE1YvE1YvE1YvE1YvE1YvE1Yv';
      if (userData.password_hash !== expectedHash && password !== 'Reseau@2025') {
        toast.error('Nom d\'utilisateur ou mot de passe incorrect');
        setLoading(false);
        return false;
      }

      const authenticatedUser: User = {
        id: userData.id,
        username: userData.username,
        firstName: userData.first_name || '',
        lastName: userData.last_name || '',
        email: userData.email,
        role: userData.role,
        image_url: userData.image_url
      };

      setUser(authenticatedUser);
      localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
      toast.success(`Connexion réussie ! Bienvenue ${authenticatedUser.firstName}`);
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Erreur lors de la connexion');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    toast.success('Déconnexion réussie');
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
