
import React from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import JournalCard from './JournalCard';

interface JournalEdition {
  id: string;
  title: string;
  summary: string;
  cover_image_url?: string;
  pdf_url: string;
  publish_date: string;
  page_count: number;
  status: string;
}

interface ArchivesGridProps {
  filteredJournals: JournalEdition[];
  clearFilters: () => void;
}

const ArchivesGrid = ({ filteredJournals, clearFilters }: ArchivesGridProps) => {
  const isMobile = useIsMobile();

  return (
    <section className={`py-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
      <div className="container mx-auto px-4">
        {filteredJournals.length > 0 ? (
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}`}>
            {filteredJournals.map((journal) => (
              <JournalCard key={journal.id} journal={journal} />
            ))}
          </div>
        ) : (
          <div className={`text-center py-12 ${isMobile ? 'px-4' : ''}`}>
            <p className={`text-gray-500 mb-4 ${isMobile ? 'text-sm' : ''}`}>
              Aucune édition trouvée avec ces critères de recherche.
            </p>
            <Button 
              onClick={clearFilters} 
              variant="outline"
              className={isMobile ? 'w-full' : ''}
            >
              Afficher toutes les éditions
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArchivesGrid;
