import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email?: string;
  role: 'admin_principal' | 'admin_secondaire' | 'redacteur';
  image_url?: string;
}

// Alias pour compatibilité
export type User = AuthUser;

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  setUser: (user: AuthUser | null) => void;
  signUp: (email: string, password: string, userData: { username: string; firstName: string; lastName: string; role?: string }) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
  // Méthodes de compatibilité
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Établir l'écoute des changements d'auth d'abord
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        setSession(session);
        
        if (session?.user) {
          // Récupérer les données du profil utilisateur depuis app_users
          setTimeout(async () => {
            try {
              // Utiliser la fonction sécurisée qui contourne les politiques RLS
              const { data: profileData, error } = await supabase
                .rpc('get_secure_user_info', { target_user_id: session.user.id });

              if (error) {
                console.error('Error fetching user profile:', error);
                setUser(null);
                return;
              }

              if (profileData && profileData.length > 0) {
                const profile = profileData[0];
                const authUser: AuthUser = {
                  id: profile.id,
                  username: profile.username,
                  firstName: profile.first_name || '',
                  lastName: profile.last_name || '',
                  email: profile.email || session.user.email || '',
                  role: profile.role as 'admin_principal' | 'admin_secondaire' | 'redacteur',
                  image_url: profile.image_url
                };
                setUser(authUser);
                console.log('User profile loaded:', authUser);
              }
            } catch (error) {
              console.error('Error in profile fetch:', error);
              setUser(null);
            }
          }, 0);
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    // Puis vérifier la session existante
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id);
      // L'état sera géré par le listener ci-dessus
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (
    email: string, 
    password: string, 
    userData: { username: string; firstName: string; lastName: string; role?: string }
  ) => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            username: userData.username,
            first_name: userData.firstName,
            last_name: userData.lastName,
            role: userData.role || 'redacteur'
          }
        }
      });

      if (error) {
        toast.error('Erreur lors de l\'inscription: ' + error.message);
        return { error };
      }

      toast.success('Inscription réussie ! Vérifiez votre email.');
      return { error: null };
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Erreur réseau lors de l\'inscription');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast.error('Email ou mot de passe incorrect');
        return { error };
      }

      toast.success('Connexion réussie !');
      return { error: null };
    } catch (error) {
      console.error('Signin error:', error);
      toast.error('Erreur réseau lors de la connexion');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // Fonction utilitaire pour nettoyer l'état d'authentification
  const cleanupAuthState = () => {
    // Supprimer toutes les clés d'auth Supabase du localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    
    // Supprimer du sessionStorage si utilisé
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  };

  const signOut = async () => {
    try {
      // Nettoyer l'état d'authentification d'abord
      cleanupAuthState();
      
      // Tentative de déconnexion globale (ignorer les erreurs)
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continuer même si cela échoue
        console.log('Global signout failed, continuing...');
      }
      
      // Mettre à jour l'état local
      setUser(null);
      setSession(null);
      toast.success('Déconnexion réussie');
      
      // Forcer un rafraîchissement complet de la page pour un état propre
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    } catch (error) {
      console.error('Signout error:', error);
      // Même en cas d'erreur, nettoyer l'état local
      cleanupAuthState();
      setUser(null);
      setSession(null);
      toast.success('Déconnexion effectuée');
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    }
  };

  // Fonction de compatibilité pour l'ancien système
  const login = async (username: string, password: string): Promise<boolean> => {
    // Pour la transition, essayer de se connecter avec l'email
    const { error } = await signIn(username.includes('@') ? username : `${username}@example.com`, password);
    return !error;
  };

  const logout = () => {
    signOut();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session,
      setUser,
      signUp, 
      signIn, 
      signOut, 
      loading,
      // Compatibilité avec l'ancien code
      login, 
      logout 
    }}>
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