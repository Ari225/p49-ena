
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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
        const parsedUser = JSON.parse(savedUser);
        console.log('Utilisateur chargé depuis localStorage:', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      console.log('=== DÉBUT DE LA CONNEXION ===');
      console.log('Tentative de connexion pour:', username);
      
      // CONNEXION DE SECOURS - Vos identifiants hardcodés
      if (username === 'ari_dale' && password === 'Reseau@2025') {
        const user: User = {
          id: '1f2f2d6c-61e1-457c-bdf3-7f938f4e821a',
          username: 'ari_dale',
          firstName: 'Aristide',
          lastName: 'Dalé',
          email: 'aristidedale1@gmail.com',
          role: 'admin_principal',
          image_url: '/lovable-uploads/aristide-profile.png'
        };
        
        console.log('=== CONNEXION RÉUSSIE (MODE SECOURS) ===');
        setUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        toast.success(`Connexion réussie ! Bienvenue ${user.firstName}`);
        setLoading(false);
        return true;
      }
      
      // Tentative de connexion Supabase normale
      const { data: users, error: fetchError } = await supabase
        .from('app_users')
        .select('*')
        .eq('username', username)
        .limit(1);

      if (fetchError) {
        console.error('Erreur Supabase, utilisation du mode secours');
        toast.error('Nom d\'utilisateur ou mot de passe incorrect');
        setLoading(false);
        return false;
      }

      if (!users || users.length === 0) {
        toast.error('Nom d\'utilisateur incorrect');
        setLoading(false);
        return false;
      }

      const foundUser = users[0];
      const inputPasswordHash = btoa(password);
      
      if (foundUser.password_hash !== inputPasswordHash) {
        toast.error('Mot de passe incorrect');
        setLoading(false);
        return false;
      }

      const user: User = {
        id: foundUser.id,
        username: foundUser.username,
        firstName: foundUser.first_name || '',
        lastName: foundUser.last_name || '',
        email: foundUser.email,
        role: foundUser.role,
        image_url: foundUser.image_url
      };
      
      setUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      toast.success(`Connexion réussie ! Bienvenue ${user.firstName || user.username}`);
      setLoading(false);
      return true;
      
    } catch (error) {
      console.error('Erreur de connexion:', error);
      toast.error('Nom d\'utilisateur ou mot de passe incorrect');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    console.log('Déconnexion de l\'utilisateur');
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
