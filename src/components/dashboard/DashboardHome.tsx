
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import EditorSidebar from '@/components/EditorSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { isAdmin } from '@/utils/roleUtils';
import DashboardStats from './DashboardStats';
import RecentActivity from './RecentActivity';

const DashboardHome = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const userIsAdmin = isAdmin(user);

  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">
              Bienvenue, {user?.username}
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              {userIsAdmin ? 'Panneau d\'administration' : 'Espace rédacteur'}
            </p>
          </div>

          <DashboardStats isMobile={true} />
          <RecentActivity isMobile={true} />
          
          {userIsAdmin ? <AdminSidebar /> : <EditorSidebar />}
        </div>
      </Layout>
    );
  }

  // Desktop version
  return (
    <Layout>
      <div className="flex">
        {userIsAdmin ? <AdminSidebar /> : <EditorSidebar />}
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">
              Bienvenue, {user?.username}
            </h1>
            <p className="text-gray-600 mt-2">
              {userIsAdmin ? 'Panneau d\'administration' : 'Espace rédacteur'}
            </p>
          </div>

          <DashboardStats />
          <RecentActivity />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardHome;
