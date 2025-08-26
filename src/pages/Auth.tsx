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
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';

const Auth = () => {
  const { user, signIn, signUp, loading } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();

  // Toujours permettre l'inscription maintenant
  const allowSignup = true;

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
  
  // États pour la vérification matricule
  const [matriculeStep, setMatriculeStep] = useState(true);
  const [matricule, setMatricule] = useState('');
  const [matriculeVerified, setMatriculeVerified] = useState(false);
  const [matriculeLoading, setMatriculeLoading] = useState(false);
  const [matriculeError, setMatriculeError] = useState('');

  const handleMatriculeVerification = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setMatriculeLoading(true);
    setMatriculeError('');
    
    try {
      // Utiliser la fonction sécurisée pour vérifier le matricule
      const { data, error } = await supabase.rpc('get_member_details', {
        member_matricule: matricule,
        verification_matricule: matricule
      });
      
      if (error || !data || data.length === 0) {
        setMatriculeError('Matricule non trouvé. Veuillez vérifier votre matricule.');
        return;
      }
      
      setMatriculeVerified(true);
      setMatriculeStep(false);
    } catch (error) {
      console.error('Erreur lors de la vérification du matricule:', error);
      setMatriculeError('Erreur lors de la vérification. Veuillez réessayer.');
    } finally {
      setMatriculeLoading(false);
    }
  }, [matricule]);

  const handleSignUp = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matriculeVerified) {
      setMatriculeError('Veuillez d\'abord vérifier votre matricule.');
      return;
    }
    
    const { error } = await signUp(signupEmail, signupPassword, {
      username,
      firstName,
      lastName,
      role
    });
    if (!error) {
      setActiveTab('signin');
      // Reset tous les états d'inscription
      setMatriculeStep(true);
      setMatriculeVerified(false);
      setMatricule('');
      setSignupEmail('');
      setSignupPassword('');
      setUsername('');
      setFirstName('');
      setLastName('');
      setRole('redacteur');
    }
  }, [signupEmail, signupPassword, username, firstName, lastName, role, signUp, setActiveTab, matriculeVerified]);

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
            return '/dashboard';
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

  const MatriculeVerificationForm = useMemo(() => (
    <form onSubmit={handleMatriculeVerification} className="space-y-4">
      <div className="text-center space-y-2 mb-6">
        <h3 className="text-lg font-semibold">Vérification d'accès</h3>
        <p className="text-sm text-muted-foreground">
          Pour vous inscrire, veuillez d'abord vérifier votre matricule
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="matricule">Matricule</Label>
        <Input
          id="matricule"
          type="text"
          value={matricule}
          onChange={(e) => setMatricule(e.target.value)}
          placeholder="Entrez votre matricule"
          required
        />
        {matriculeError && (
          <p className="text-sm text-destructive">{matriculeError}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={matriculeLoading}>
        {matriculeLoading ? 'Vérification...' : 'Vérifier le matricule'}
      </Button>
    </form>
  ), [matricule, matriculeError, matriculeLoading, handleMatriculeVerification]);

  const SignUpForm = useMemo(() => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            setMatriculeStep(true);
            setMatriculeVerified(false);
            setMatriculeError('');
          }}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h3 className="text-lg font-semibold">Inscription</h3>
          <p className="text-sm text-muted-foreground">
            Matricule vérifié ✓ - Complétez votre inscription
          </p>
        </div>
      </div>
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
    </div>
  ), [firstName, lastName, username, signupEmail, signupPassword, role, showPassword, loading, handleSignUp]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 py-6 md:py-12">
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
                  {matriculeStep ? MatriculeVerificationForm : SignUpForm}
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