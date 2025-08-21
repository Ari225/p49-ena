
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ArchivesFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearFilters: () => void;
  filteredCount: number;
}

const ArchivesFilters = ({
  searchTerm,
  setSearchTerm,
  clearFilters,
  filteredCount
}: ArchivesFiltersProps) => {
  const isMobile = useIsMobile();

  return (
    <section className={`py-8 ${isMobile ? 'px-[25px]' : 'px-[100px]'} bg-accent/10`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher par titre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {searchTerm && (
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="border-primary text-primary hover:bg-primary hover:text-white md:w-auto w-full"
            >
              Réinitialiser
            </Button>
          )}
        </div>

        <p className="text-gray-600 text-sm">
          {filteredCount} édition(s) trouvée(s)
        </p>
      </div>
    </section>
  );
};

export default ArchivesFilters;
