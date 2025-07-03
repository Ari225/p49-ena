
import React from 'react';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';

interface LoadingStateProps {
  isMobile: boolean;
}

const LoadingState = ({ isMobile }: LoadingStateProps) => {
  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="text-center">Chargement...</div>
        </div>
        <AdminSidebar />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 ml-64 p-8">
          <div className="text-center">Chargement...</div>
        </div>
      </div>
    </Layout>
  );
};

export default LoadingState;
