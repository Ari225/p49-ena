
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
      
      // Rechercher l'utilisateur dans la base de données Supabase
      const { data: users, error: fetchError } = await supabase
        .from('app_users')
        .select('*')
        .eq('username', username)
        .limit(1);

      if (fetchError) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', fetchError);
        toast.error('Erreur de connexion à la base de données');
        setLoading(false);
        return false;
      }

      if (!users || users.length === 0) {
        console.error('Aucun utilisateur trouvé pour:', username);
        toast.error('Nom d\'utilisateur incorrect');
        setLoading(false);
        return false;
      }

      const foundUser = users[0];
      console.log('Utilisateur trouvé:', foundUser);

      // Vérifier le mot de passe (décodage simple du hash base64)
      const storedPasswordHash = foundUser.password_hash;
      const inputPasswordHash = btoa(password);
      
      console.log('Vérification du mot de passe...');
      
      if (storedPasswordHash !== inputPasswordHash) {
        console.error('Mot de passe incorrect pour:', username);
        toast.error('Mot de passe incorrect');
        setLoading(false);
        return false;
      }

      console.log('=== CONNEXION RÉUSSIE ===');
      
      // Convertir les données de la base vers le format User
      const user: User = {
        id: foundUser.id,
        username: foundUser.username,
        firstName: foundUser.first_name || '',
        lastName: foundUser.last_name || '',
        email: foundUser.email,
        role: foundUser.role,
        image_url: foundUser.image_url
      };
      
      console.log('Utilisateur connecté:', user);
      
      setUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      toast.success(`Connexion réussie ! Bienvenue ${user.firstName || user.username}`);
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
