import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    login
  } = useAuth();
  const {
    t
  } = useLanguage();
  const navigate = useNavigate();
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
  return <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-[100px] relative" style={{
      backgroundImage: 'url(/lovable-uploads/e85e9bf0-20c7-4672-aac9-e32d078db6e6.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
        {/* Primary overlay */}
        <div className="absolute inset-0 bg-primary/80 mx-[94px]"></div>
        
        <div className="w-full max-w-md relative z-10">
          <Card>
            <CardHeader className="text-center">
              <img src="/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png" alt="P49 ENA Logo" className="h-16 w-16 object-contain mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold text-primary">
                {t('login.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username">{t('login.username')}</Label>
                  <Input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="admin ou redacteur" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t('login.password')}</Label>
                  <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" required />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? 'Connexion...' : t('login.submit')}
                </Button>
                <div className="text-sm text-gray-600 text-center">
                  <p>Comptes de démonstration :</p>
                  <p><strong>Admin :</strong> admin / admin123</p>
                  <p><strong>Rédacteur :</strong> redacteur / redacteur123</p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>;
};
export default Login;