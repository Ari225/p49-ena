
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardRoutes from '@/components/dashboard/DashboardRoutes';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return <div>Redirection vers la page de connexion...</div>;
  }

  return <DashboardRoutes />;
};

export default Dashboard;
