
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import DashboardRoutes from '@/components/dashboard/DashboardRoutes';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Non autorisé</div>;
  }

  return <DashboardRoutes />;
};

export default Dashboard;
