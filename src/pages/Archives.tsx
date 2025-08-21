
import React from 'react';
import Layout from '@/components/Layout';
import ArchivesHeader from '@/components/archives/ArchivesHeader';
import ArchivesFilters from '@/components/archives/ArchivesFilters';
import ArchivesGrid from '@/components/archives/ArchivesGrid';
import { useArchivesData } from '@/hooks/useArchivesData';

const Archives = () => {
  const {
    filteredJournals,
    loading,
    searchTerm,
    setSearchTerm,
    clearFilters
  } = useArchivesData();

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Chargement...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        <ArchivesHeader />
        
        <ArchivesFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          clearFilters={clearFilters}
          filteredCount={filteredJournals.length}
        />

        <ArchivesGrid
          filteredJournals={filteredJournals}
          clearFilters={clearFilters}
        />
      </div>
    </Layout>
  );
};

export default Archives;
