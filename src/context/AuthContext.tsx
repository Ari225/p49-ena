
import React, { createContext, useContext, useState, useEffect } from 'react';
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

// Profils codés en dur dans le projet
const hardcodedUsers: User[] = [
  {
    id: '1',
    username: 'ari_dale',
    firstName: 'Aristide',
    lastName: 'Dalé',
    email: 'aristide.dale@p49.com',
    role: 'admin_principal',
    image_url: '/lovable-uploads/2cd61362-ab99-4adc-901a-5bef1c338e97.png'
  },
  {
    id: '2',
    username: 'kouam_p49',
    firstName: 'Kouamé',
    lastName: '',
    email: 'kouame@p49.com',
    role: 'redacteur',
    image_url: '/lovable-uploads/e479be1a-3b50-400f-ab57-37aecdd654ed.png'
  }
];

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
      
      // Rechercher l'utilisateur dans les profils codés en dur
      const foundUser = hardcodedUsers.find(u => u.username === username);
      
      if (!foundUser) {
        console.error('Aucun utilisateur trouvé pour:', username);
        toast.error('Nom d\'utilisateur incorrect');
        setLoading(false);
        return false;
      }

      console.log('Utilisateur trouvé:', foundUser);

      // Vérifier le mot de passe (codé en dur pour le moment)
      const isValidPassword = password === 'Reseau@2025';
      
      console.log('Mot de passe valide:', isValidPassword);
      
      if (!isValidPassword) {
        console.error('Mot de passe incorrect pour:', username);
        toast.error('Mot de passe incorrect');
        setLoading(false);
        return false;
      }

      console.log('=== CONNEXION RÉUSSIE ===');
      console.log('Utilisateur connecté:', foundUser);
      
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      toast.success(`Connexion réussie ! Bienvenue ${foundUser.firstName || foundUser.username}`);
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
