
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { setUserContext } from '@/utils/supabaseHelpers';

interface User {
  id: string;
  username: string;
  role: 'admin' | 'editor';
  email?: string;
  first_name?: string;
  last_name?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  setCurrentUserId: (userId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

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
    await setUserContext(userId);
  };

  const login = async (usernameOrEmail: string, password: string): Promise<boolean> => {
    try {
      console.log('Tentative de connexion pour:', usernameOrEmail);
      
      // Créons un système de comptes prédéfinis pour les tests
      const predefinedAccounts = [
        {
          id: '1',
          username: 'admin',
          password: 'admin123',
          role: 'admin_principal',
          email: 'admin@p49ena.com',
          first_name: 'Admin',
          last_name: 'Principal'
        },
        {
          id: '2', 
          username: 'redacteur',
          password: 'redacteur123',
          role: 'editor',
          email: 'redacteur@p49ena.com',
          first_name: 'Rédacteur',
          last_name: 'Principal'
        }
      ];

      // Vérifier d'abord les comptes prédéfinis
      const predefinedUser = predefinedAccounts.find(
        account => account.username === usernameOrEmail && account.password === password
      );

      if (predefinedUser) {
        console.log('Utilisateur prédéfini trouvé:', predefinedUser);
        
        let mappedRole: 'admin' | 'editor';
        if (predefinedUser.role === 'admin_principal' || predefinedUser.role === 'admin_secondaire') {
          mappedRole = 'admin';
        } else {
          mappedRole = 'editor';
        }

        const user: User = {
          id: predefinedUser.id,
          username: predefinedUser.username,
          role: mappedRole,
          email: predefinedUser.email,
          first_name: predefinedUser.first_name,
          last_name: predefinedUser.last_name
        };

        setUser(user);
        localStorage.setItem('p49_user', JSON.stringify(user));
        await setCurrentUserId(user.id);
        return true;
      }

      // Si pas trouvé dans les comptes prédéfinis, essayer la base de données
      const passwordMethods = [
        btoa(password), // Base64 simple (méthode actuelle)
        password, // Mot de passe en clair (pour test)
      ];

      // Essayons de trouver l'utilisateur avec différentes méthodes de hachage
      for (const passwordHash of passwordMethods) {
        const { data: userData, error } = await supabase
          .from('app_users')
          .select('*')
          .or(`username.eq.${usernameOrEmail},email.eq.${usernameOrEmail}`)
          .eq('password_hash', passwordHash)
          .maybeSingle();

        if (!error && userData) {
          console.log('Utilisateur trouvé dans la base:', userData);
          
          // Mapper le rôle de la base de données vers le format attendu par l'application
          let mappedRole: 'admin' | 'editor';
          if (userData.role === 'admin_principal' || userData.role === 'admin_secondaire') {
            mappedRole = 'admin';
          } else {
            mappedRole = 'editor';
          }

          const user: User = {
            id: userData.id,
            username: userData.username,
            role: mappedRole,
            email: userData.email,
            first_name: userData.first_name,
            last_name: userData.last_name
          };

          setUser(user);
          localStorage.setItem('p49_user', JSON.stringify(user));
          await setCurrentUserId(user.id);
          return true;
        }
      }

      console.error('Aucun utilisateur trouvé avec ces identifiants');
      return false;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      return false;
    }
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
