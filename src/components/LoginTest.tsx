import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const LoginTest = () => {
  const [username, setUsername] = useState('ari_dale');
  const [password, setPassword] = useState('Reseau@2025');
  const { login, loading, user } = useAuth();

  const handleTestLogin = async () => {
    try {
      console.log('Testing login with:', { username, password });
      const success = await login(username, password);
      if (success) {
        toast.success('Connexion réussie !');
      } else {
        toast.error('Échec de la connexion');
      }
    } catch (error) {
      console.error('Error during login test:', error);
      toast.error('Erreur lors du test de connexion');
    }
  };

  if (user) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Utilisateur connecté</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Nom:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Rôle:</strong> {user.role}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Test de Connexion Administrateur</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label>Nom d'utilisateur</label>
          <Input 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nom d'utilisateur"
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <Input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
          />
        </div>
        <Button 
          onClick={handleTestLogin}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Connexion...' : 'Tester la Connexion'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginTest;