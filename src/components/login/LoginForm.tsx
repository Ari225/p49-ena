
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('=== DÉBUT DU PROCESSUS DE CONNEXION ===');
    console.log('Formulaire soumis avec:', { username, password: password ? 'FOURNI' : 'VIDE' });
    
    if (!username || !password) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('Appel de la fonction login...');
      const success = await login(username, password);
      console.log('Résultat de la connexion:', success);
      
      if (success) {
        console.log('Connexion réussie, redirection vers le dashboard...');
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans votre espace personnel"
        });
        navigate('/dashboard');
      } else {
        console.log('Échec de la connexion');
        toast({
          title: "Erreur de connexion",
          description: "Nom d'utilisateur ou mot de passe incorrect",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour pré-remplir les champs de test
  const fillTestCredentials = (type: 'admin' | 'redacteur') => {
    if (type === 'admin') {
      setUsername('ari_dale');
      setPassword('Reseau@2025');
    } else {
      setUsername('kouam_p49');
      setPassword('Reseau@2025');
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Boutons de test pour le développement */}
      <div className="flex gap-2 mb-4">
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => fillTestCredentials('admin')}
          className="text-xs"
        >
          Test Admin
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => fillTestCredentials('redacteur')}
          className="text-xs"
        >
          Test Rédacteur
        </Button>
      </div>

      <div className="space-y-2 text-primary">
        <Label htmlFor="username">{t('login.username')}</Label>
        <Input 
          id="username" 
          type="text" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          placeholder="ari_dale ou kouam_p49" 
          required 
        />
      </div>
      
      <div className="space-y-2 text-primary">
        <Label htmlFor="password">{t('login.password')}</Label>
        <div className="relative">
          <Input 
            id="password" 
            type={showPassword ? "text" : "password"} 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="Reseau@2025" 
            required 
            className="pr-10" 
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-700"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-primary text-white hover:bg-primary px-4 py-2 rounded flex items-center text-sm font-bold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg" 
        disabled={isLoading}
      >
        {isLoading ? 'Connexion...' : t('login.submit')}
      </Button>
      
      <div className="text-sm text-gray-700 text-center">
        <p className="text-gray-700 font-normal">Espace réservé aux administrateurs et rédacteurs.</p>
        <p className="text-xs text-gray-500 mt-2">
          Comptes de test : ari_dale / kouam_p49 - Mot de passe : Reseau@2025
        </p>
      </div>
    </form>
  );

  if (isMobile) {
    return (
      <div className="py-[50px] px-[25px] bg-background">
        <div className="w-full max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <img src="/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png" alt="P49 ENA Logo" className="h-16 w-16 object-contain mx-auto mb-4" />
              <CardTitle className="font-bold text-primary text-2xl">
                {t('login.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderForm()}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isTablet) {
    return (
      <div className="py-[75px] px-[50px] bg-background">
        <div className="w-full max-w-lg mx-auto">
          <Card>
            <CardHeader className="text-center">
              <img src="/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png" alt="P49 ENA Logo" className="h-20 w-20 object-contain mx-auto mb-6" />
              <CardTitle className="font-bold text-primary text-3xl">
                {t('login.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderForm()}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Desktop version
  return (
    <div className="py-[100px] px-8 md:px-[100px] bg-background">
      <div className="w-full max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <img src="/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png" alt="P49 ENA Logo" className="h-24 w-24 object-contain mx-auto mb-8" />
            <CardTitle className="font-bold text-primary text-3xl">
              {t('login.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderForm()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
