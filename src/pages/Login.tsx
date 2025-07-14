
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Login = () => {
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
    setIsLoading(true);
    try {
      const success = await login(username, password);
      if (success) {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans votre espace personnel"
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Erreur de connexion",
          description: "Nom d'utilisateur ou mot de passe incorrect",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mobile Version
  if (isMobile) {
    return (
      <Layout>
        {/* Hero Section - Mobile */}
        <section className="relative h-[30vh] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/d0535478-3ab2-4846-a655-f5cd50daa143.png" 
              alt="Background connexion" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className="relative z-10 text-center px-[25px]">
            <h1 className="text-2xl font-bold mb-[10px] animate-fade-in">
              Espace de Connexion
            </h1>
            <p className="text-sm italic mb-6 animate-fade-in text-white font-normal">
              Accédez à votre tableau de bord
            </p>
          </div>
        </section>

        {/* Login Section - Mobile */}
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2 text-primary">
                    <Label htmlFor="username-mobile">{t('login.username')}</Label>
                    <Input 
                      id="username-mobile" 
                      type="text" 
                      value={username} 
                      onChange={e => setUsername(e.target.value)} 
                      placeholder="Administrateur ou Rédacteur" 
                      required 
                    />
                  </div>
                  <div className="space-y-2 text-primary">
                    <Label htmlFor="password-mobile">{t('login.password')}</Label>
                    <div className="relative">
                      <Input 
                        id="password-mobile" 
                        type={showPassword ? "text" : "password"} 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        placeholder="Mot de passe" 
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
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  // Tablet Version
  if (isTablet) {
    return (
      <Layout>
        {/* Hero Section - Tablet */}
        <section className="relative h-[45vh] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/d0535478-3ab2-4846-a655-f5cd50daa143.png" 
              alt="Background connexion" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className="relative z-10 text-center px-[50px]">
            <h1 className="text-4xl font-bold mb-[10px] animate-fade-in">
              Espace de Connexion
            </h1>
            <p className="text-base italic mb-6 animate-fade-in text-white font-normal">
              Accédez à votre tableau de bord administrateur
            </p>
          </div>
        </section>

        {/* Login Section - Tablet */}
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
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2 text-primary">
                    <Label htmlFor="username-tablet">{t('login.username')}</Label>
                    <Input 
                      id="username-tablet" 
                      type="text" 
                      value={username} 
                      onChange={e => setUsername(e.target.value)} 
                      placeholder="Administrateur ou Rédacteur" 
                      required 
                    />
                  </div>
                  <div className="space-y-2 text-primary">
                    <Label htmlFor="password-tablet">{t('login.password')}</Label>
                    <div className="relative">
                      <Input 
                        id="password-tablet" 
                        type={showPassword ? "text" : "password"} 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        placeholder="Mot de passe" 
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
                    className="w-full bg-primary text-white hover:bg-primary px-4 py-2 rounded flex items-center text-base font-bold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Connexion...' : t('login.submit')}
                  </Button>
                  <div className="text-sm text-gray-700 text-center">
                    <p className="text-gray-700 font-normal">Espace réservé aux administrateurs et rédacteurs.</p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  // Desktop Version
  return (
    <Layout>
      {/* Hero Section - Desktop */}
      <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/d0535478-3ab2-4846-a655-f5cd50daa143.png" 
            alt="Background connexion" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>
        
        <div className="relative z-10 text-center px-8 lg:px-[100px]">
          <h1 className="text-6xl md:text-6xl lg:text-6xl font-bold mb-[10px] md:mb-[10px] animate-fade-in">
            Espace de Connexion
          </h1>
          <p className="text-lg md:text-lg italic mb-6 md:mb-8 animate-fade-in text-white font-normal">
            Accédez à votre tableau de bord administrateur
          </p>
        </div>
      </section>

      {/* Login Section - Desktop */}
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2 text-primary">
                  <Label htmlFor="username-desktop">{t('login.username')}</Label>
                  <Input 
                    id="username-desktop" 
                    type="text" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    placeholder="Administrateur ou Rédacteur" 
                    required 
                  />
                </div>
                <div className="space-y-2 text-primary">
                  <Label htmlFor="password-desktop">{t('login.password')}</Label>
                  <div className="relative">
                    <Input 
                      id="password-desktop" 
                      type={showPassword ? "text" : "password"} 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      placeholder="Mot de passe" 
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
                  className="w-full bg-primary text-white hover:bg-primary px-4 py-2 rounded flex items-center text-sm md:text-sm font-bold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Connexion...' : t('login.submit')}
                </Button>
                <div className="text-sm text-gray-700 text-center">
                  <p className="text-gray-700 font-normal">Espace réservé aux administrateurs et rédacteurs.</p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
