
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import NewsCard from '@/components/home/news/NewsCard';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

const Actualites = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [searchTerm, setSearchTerm] = useState('');
  const [actualites, setActualites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Determine items per page based on device
  const getItemsPerPage = () => {
    if (isMobile) return 5;
    if (isTablet) return 8;
    return 9; // Desktop
  };

  const itemsPerPage = getItemsPerPage();

  useEffect(() => {
    fetchActualites();
  }, []);

  const fetchActualites = async () => {
    try {
      setLoading(true);
      const { data: newsData, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_visible', true)
        .order('published_date', { ascending: false });

      if (error) {
        console.error('Error fetching news:', error);
        return;
      }

      if (newsData) {
        const formattedNews = newsData.map(item => ({
          id: item.id,
          title: item.title,
          summary: item.summary || '',
          category: item.category,
          published_date: item.published_date,
          image_url: item.image_url || '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg'
        }));
        setActualites(formattedNews);
      }
    } catch (error) {
      console.error('Error in fetchActualites:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredActualites = actualites.filter(actualite => {
    const matchesSearch = actualite.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         actualite.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredActualites.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActualites = filteredActualites.slice(startIndex, endIndex);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
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
              <div className="text-center py-12">
                <p className="text-gray-500">Chargement des actualités...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentActualites.map((actualite) => (
                    <NewsCard 
                      key={actualite.id} 
                      item={actualite} 
                      variant={isMobile ? 'mobile' : 'desktop'}
                    />
                  ))}
                </div>
                
                {filteredActualites.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <p className={`text-gray-500 mb-4 ${isMobile ? 'text-sm' : ''}`}>
                      Aucune actualité trouvée avec ce terme de recherche.
                    </p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        {currentPage > 1 && (
                          <PaginationItem>
                            <PaginationPrevious 
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(currentPage - 1);
                              }}
                            />
                          </PaginationItem>
                        )}
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              isActive={page === currentPage}
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(page);
                              }}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        {currentPage < totalPages && (
                          <PaginationItem>
                            <PaginationNext 
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(currentPage + 1);
                              }}
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
