
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import NewsCard from '@/components/home/news/NewsCard';

const Actualites = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [actualites, setActualites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchActualites();
  }, []);

  const fetchActualites = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_visible', true)
        .order('published_date', { ascending: false });

      if (error) throw error;
      setActualites(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des actualités:', error);
      setActualites([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredActualites = actualites.filter(actualite =>
    actualite.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    actualite.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredActualites.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedActualites = filteredActualites.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header with Background Image */}
        <section className={`relative ${isMobile ? 'h-[30vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/actualites_bg.webp" 
              alt="Background actualités" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold mb-4 md:mb-6 animate-fade-in`}>
              Actualités
            </h1>
            <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
              Restez informé des dernières nouvelles de la P49 et de l'administration publique
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className={`py-8 bg-white ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="w-full">
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Rechercher une actualité..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className={`py-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="w-full">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="text-gray-500 mt-4">Chargement des actualités...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedActualites.length > 0 ? (
                    paginatedActualites.map((actualite) => (
                      <NewsCard 
                        key={actualite.id} 
                        item={actualite} 
                        variant={isMobile ? 'mobile' : 'desktop'}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <p className="text-gray-500">Aucune actualité trouvée pour votre recherche.</p>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        {currentPage > 1 && (
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => handlePageChange(currentPage - 1)}
                              className="cursor-pointer"
                            />
                          </PaginationItem>
                        )}
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => handlePageChange(page)}
                              isActive={page === currentPage}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        {currentPage < totalPages && (
                          <PaginationItem>
                            <PaginationNext 
                              onClick={() => handlePageChange(currentPage + 1)}
                              className="cursor-pointer"
                            />
                          </PaginationItem>
                        )}
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Actualites;
