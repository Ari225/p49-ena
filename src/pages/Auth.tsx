import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Auth = () => {
  const { user, signIn, signUp, loading } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();

  // Vérifier si l'inscription est autorisée via le paramètre URL
  const allowSignup = searchParams.get('mode') === 'signup';

  // États pour les formulaires
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);

  // États pour la connexion
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');

  // États pour l'inscription
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('redacteur');

  const handleSignUp = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await signUp(signupEmail, signupPassword, {
      username,
      firstName,
      lastName,
      role
    });
    if (!error) {
      setActiveTab('signin');
    }
  }, [signupEmail, signupPassword, username, firstName, lastName, role, signUp, setActiveTab]);

  const handleSignIn = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await signIn(signinEmail, signinPassword);
    if (!error) {
      console.log('Connexion réussie, redirection en cours...');
    }
  }, [signinEmail, signinPassword, signIn]);

  // Effet pour la redirection basée sur le rôle - APRÈS tous les hooks
  useEffect(() => {
    if (user) {
      const getRedirectPath = (role: string) => {
        switch (role) {
          case 'admin_principal':
          case 'admin_secondaire':
            return '/dashboard';
          case 'redacteur':
            return '/dashboard/my-articles';
          default:
            return '/dashboard';
        }
      };
      
      const redirectPath = getRedirectPath(user.role);
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate]);

  const SignInForm = useMemo(() => (
    <form onSubmit={handleSignIn} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signin-email">Email</Label>
        <Input
          id="signin-email"
          type="email"
          value={signinEmail}
          onChange={(e) => setSigninEmail(e.target.value)}
          placeholder="votre@email.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signin-password">Mot de passe</Label>
        <div className="relative">
          <Input
            id="signin-password"
            type={showPassword ? 'text' : 'password'}
            value={signinPassword}
            onChange={(e) => setSigninPassword(e.target.value)}
            placeholder="Votre mot de passe"
            required
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Connexion...' : 'Se connecter'}
      </Button>
    </form>
  ), [signinEmail, signinPassword, showPassword, loading, handleSignIn]);

  const SignUpForm = useMemo(() => (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="signup-firstname">Prénom</Label>
          <Input
            id="signup-firstname"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Votre prénom"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-lastname">Nom</Label>
          <Input
            id="signup-lastname"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Votre nom"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-username">Nom d'utilisateur</Label>
        <Input
          id="signup-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nom d'utilisateur unique"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          value={signupEmail}
          onChange={(e) => setSignupEmail(e.target.value)}
          placeholder="votre@email.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Mot de passe</Label>
        <div className="relative">
          <Input
            id="signup-password"
            type={showPassword ? 'text' : 'password'}
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            placeholder="Mot de passe sécurisé"
            required
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-role">Rôle</Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un rôle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="redacteur">Rédacteur</SelectItem>
            <SelectItem value="admin_secondaire">Admin Secondaire</SelectItem>
            <SelectItem value="admin_principal">Admin Principal</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Inscription...' : 'S\'inscrire'}
      </Button>
    </form>
  ), [firstName, lastName, username, signupEmail, signupPassword, role, showPassword, loading, handleSignUp]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <Card className={`w-full ${isMobile ? 'max-w-md' : 'max-w-2xl'}`}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Authentification</CardTitle>
            <CardDescription>
              Connectez-vous ou créez un compte pour accéder au tableau de bord
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className={`grid w-full ${allowSignup ? 'grid-cols-2' : 'grid-cols-1'}`}>
                <TabsTrigger value="signin">Connexion</TabsTrigger>
                {allowSignup && <TabsTrigger value="signup">Inscription</TabsTrigger>}
              </TabsList>
              <TabsContent value="signin" className="space-y-4 mt-6">
                {SignInForm}
              </TabsContent>
              {allowSignup && (
                <TabsContent value="signup" className="space-y-4 mt-6">
                  {SignUpForm}
                </TabsContent>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Auth;