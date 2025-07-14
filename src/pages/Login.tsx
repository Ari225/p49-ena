
import React from 'react';
import Layout from '@/components/Layout';
import LoginHero from '@/components/login/LoginHero';
import LoginForm from '@/components/login/LoginForm';

const Login = () => {
  return (
    <Layout>
      <LoginHero />
      <LoginForm />
    </Layout>
  );
};

export default Login;
