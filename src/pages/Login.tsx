
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import LoginHero from '@/components/login/LoginHero';
import LoginForm from '@/components/login/LoginForm';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Rediriger vers la nouvelle page d'auth
  useEffect(() => {
    navigate('/auth');
  }, [navigate]);

  return (
    <Layout>
      <LoginHero />
      <LoginForm />
    </Layout>
  );
};

export default Login;
