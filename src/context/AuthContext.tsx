
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
      
      // Auth via RPC (server-side verification)
      const { data: authResult, error: authError } = await supabase
        .rpc('authenticate_app_user', { _username: username, _password: password });

      if (authError) {
        console.error('Erreur Supabase RPC:', authError);
        toast.error('Nom d\'utilisateur ou mot de passe incorrect');
        setLoading(false);
        return false;
      }

      if (!authResult || !Array.isArray(authResult) || authResult.length === 0) {
        toast.error('Nom d\'utilisateur ou mot de passe incorrect');
        setLoading(false);
        return false;
      }

      const foundUser = authResult[0];

      const user: User = {
        id: foundUser.id,
        username: foundUser.username,
        firstName: foundUser.first_name || '',
        lastName: foundUser.last_name || '',
        email: foundUser.email,
        role: foundUser.role,
        image_url: foundUser.image_url
      };
      
      // NOUVEAU: Créer/synchroniser l'utilisateur avec Supabase Auth
      try {
        console.log('Tentative de connexion avec Supabase Auth...');
        
        // Essayer de se connecter avec un mot de passe temporaire basé sur l'ID utilisateur
        const tempPassword = `temp_${foundUser.id}`;
        const { data: signInResult, error: signInError } = await supabase.auth.signInWithPassword({
          email: foundUser.email,
          password: tempPassword
        });
        
        if (signInError && signInError.message.includes('Invalid login credentials')) {
          console.log('Utilisateur Supabase Auth inexistant, création en cours...');
          
          // Créer l'utilisateur avec Supabase Auth
          const { error: signUpError } = await supabase.auth.signUp({
            email: foundUser.email,
            password: tempPassword,
            options: {
              data: {
                username: foundUser.username,
                first_name: foundUser.first_name,
                last_name: foundUser.last_name
              }
            }
          });
          
          if (signUpError) {
            console.warn('Erreur lors de la création de l\'utilisateur Supabase:', signUpError);
          } else {
            console.log('Utilisateur Supabase créé avec succès');
          }
        } else if (!signInError) {
          console.log('Connexion Supabase réussie');
        }
      } catch (supabaseError) {
        console.warn('Erreur lors de la synchronisation Supabase:', supabaseError);
        // Ne pas bloquer la connexion si la synchronisation échoue
      }
      
      setUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      toast.success(`Connexion réussie ! Bienvenue ${user.firstName || user.username}`);
      setLoading(false);
      return true;
      
    } catch (error) {
      console.error('Erreur de connexion:', error);
      toast.error('Erreur de réseau. Veuillez vérifier votre connexion.');
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
