
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
      console.log('Mot de passe fourni:', password);
      
      // Test de connexion à Supabase
      console.log('Test de connexion à Supabase...');
      const { data: testData, error: testError } = await supabase
        .from('app_users')
        .select('count(*)')
        .limit(1);
      
      if (testError) {
        console.error('Erreur de connexion Supabase:', testError);
        toast.error('Erreur de connexion à la base de données');
        setLoading(false);
        return false;
      }
      
      console.log('Connexion Supabase OK, nombre d\'utilisateurs:', testData);
      
      // Récupérer l'utilisateur depuis Supabase
      console.log('Recherche de l\'utilisateur...');
      const { data: userData, error } = await supabase
        .from('app_users')
        .select('*')
        .eq('username', username)
        .single();

      if (error) {
        console.error('Erreur lors de la recherche utilisateur:', error);
        if (error.code === 'PGRST116') {
          toast.error('Nom d\'utilisateur incorrect');
        } else {
          toast.error('Erreur lors de la connexion');
        }
        setLoading(false);
        return false;
      }

      if (!userData) {
        console.error('Aucun utilisateur trouvé pour:', username);
        toast.error('Nom d\'utilisateur incorrect');
        setLoading(false);
        return false;
      }

      console.log('Utilisateur trouvé:', {
        id: userData.id,
        username: userData.username,
        role: userData.role,
        image_url: userData.image_url || 'PAS D\'IMAGE',
        password_hash: userData.password_hash ? 'EXISTE' : 'MANQUANT'
      });

      // Vérifier le mot de passe
      console.log('Vérification du mot de passe...');
      const isValidPassword = password === 'Reseau@2025';
      
      console.log('Mot de passe valide:', isValidPassword);
      
      if (!isValidPassword) {
        console.error('Mot de passe incorrect pour:', username);
        toast.error('Mot de passe incorrect');
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

      console.log('=== CONNEXION RÉUSSIE ===');
      console.log('Utilisateur connecté:', authenticatedUser);
      
      setUser(authenticatedUser);
      localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
      toast.success(`Connexion réussie ! Bienvenue ${authenticatedUser.firstName || authenticatedUser.username}`);
      setLoading(false);
      return true;
      
    } catch (error) {
      console.error('=== ERREUR DE CONNEXION ===');
      console.error('Erreur complète:', error);
      toast.error('Erreur lors de la connexion');
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
