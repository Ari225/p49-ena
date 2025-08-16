
import React, { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import Layout from '@/components/Layout';
import MemberCard from '@/components/members/MemberCard';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';

interface Member {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  locality: string;
  photo: string;
  whatsapp: string | null;
  matricule: string;
  socialMedia: {
    facebook?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
  };
}

const RepertoireMembers = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [allMembers, setAllMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const membersPerPage = 24;

  // Fetch members from Supabase
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        console.log('Fetching members from Supabase...');
        
        // Utiliser la fonction RPC get_member_directory au lieu d'un appel direct
        const { data, error } = await supabase
          .rpc('get_member_directory');
        
        console.log('Raw data from Supabase:', data);
        console.log('Error from Supabase:', error);
        
        if (error) {
          console.error('Error fetching members:', error);
          return;
        }
        
        console.log('Number of records returned:', data?.length || 0);
        
        const formattedMembers: Member[] = (data || [])
          .map((member: any) => ({
            id: member.id,
            firstName: member.prenoms || '',
            lastName: member.nom_famille || '',
            position: member.emploi_fonction_publique || '',
            locality: member.lieu_exercice || '',
            photo: member.photo || '',
            whatsapp: member.has_whatsapp ? 'true' : null,
            matricule: member.matricule || '',
            socialMedia: {
              facebook: member.has_facebook ? 'true' : null,
              instagram: member.has_instagram ? 'true' : null,
              linkedin: member.has_linkedin ? 'true' : null
            }
          }))
          .filter(member => member.firstName.trim() || member.lastName.trim()) // Filter out empty names
          .sort((a, b) => {
            // Sort alphabetically by lastName first, then firstName
            const lastNameComparison = a.lastName.localeCompare(b.lastName, 'fr', { sensitivity: 'base' });
            if (lastNameComparison !== 0) return lastNameComparison;
            return a.firstName.localeCompare(b.firstName, 'fr', { sensitivity: 'base' });
          });
        
        setAllMembers(formattedMembers);
      } catch (error) {
        console.error('Error loading members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Filter members based on search term
  const filteredMembers = useMemo(() => {
    if (!searchTerm.trim()) return allMembers;
    return allMembers.filter(member => 
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allMembers, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const startIndex = (currentPage - 1) * membersPerPage;
  const currentMembers = filteredMembers.slice(startIndex, startIndex + membersPerPage);

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Generate pagination items
  const generatePaginationItems = () => {
    const items = [];
    const maxVisiblePages = isMobile ? 3 : 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    if (startPage > 1) {
      items.push(<PaginationItem key="1">
          <PaginationLink onClick={() => handlePageChange(1)} isActive={currentPage === 1}>
            1
          </PaginationLink>
        </PaginationItem>);
      if (startPage > 2) {
        items.push(<PaginationItem key="ellipsis1"><PaginationEllipsis /></PaginationItem>);
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      items.push(<PaginationItem key={i}>
          <PaginationLink onClick={() => handlePageChange(i)} isActive={currentPage === i}>
            {i}
          </PaginationLink>
        </PaginationItem>);
    }
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<PaginationItem key="ellipsis2"><PaginationEllipsis /></PaginationItem>);
      }
      items.push(<PaginationItem key={totalPages}>
          <PaginationLink onClick={() => handlePageChange(totalPages)} isActive={currentPage === totalPages}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>);
    }
    return items;
  };

  // Fonction pour obtenir la configuration responsive du grid
  const getGridConfig = () => {
    if (isMobile) {
      return {
        gridCols: 'grid-cols-2',
        gap: 'gap-3',
        padding: 'px-[25px]'
      };
    } else if (isTablet) {
      return {
        gridCols: 'grid-cols-3',
        gap: 'gap-4',
        padding: 'px-[50px]'
      };
    } else {
      return {
        gridCols: 'grid-cols-4',
        gap: 'gap-6',
        padding: 'px-[100px]'
      };
    }
  };

  const gridConfig = getGridConfig();
  
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Header Section with Background Image */}
        <section className={`relative ${isMobile ? 'h-[30vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/674fac65-3da0-4339-8260-56ec359feae2.png" 
              alt="Background répertoire membres" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${gridConfig.padding}`}>
            <h1 className={`${isMobile ? 'text-2xl' : isTablet ? 'text-4xl' : 'text-6xl md:text-6xl lg:text-6xl'} font-bold mb-[10px] md:mb-[10px] animate-fade-in`}>
              Répertoire des membres
            </h1>
            <p className={`${isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-lg md:text-lg'} italic mb-4 md:mb-6 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
              Notre réseau compte plus de 800 membres 
            </p>
          </div>
        </section>

        <div className={`container mx-auto ${gridConfig.padding} py-[50px] md:py-[50px]`}>
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-[50px] md:mb-[50px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                type="text" 
                placeholder="Rechercher par nom ou prénom..." 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
                className={`${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm md:text-sm'} pl-10 py-3`} 
              />
            </div>
            {searchTerm && (
              <p className="text-sm text-gray-600 mt-2 text-center">
                {filteredMembers.length} membre(s) trouvé(s)
              </p>
            )}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Chargement des membres...</p>
            </div>
          ) : (
            <>
              {/* Members Grid - Version spécifique selon l'appareil */}
              {currentMembers.length > 0 ? (
            <>
              {/* MOBILE VERSION */}
              {isMobile && (
                <div className={`grid ${gridConfig.gridCols} ${gridConfig.gap} mb-8`}>
                  {currentMembers.map(member => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              )}

              {/* TABLET VERSION */}
              {isTablet && (
                <div className={`grid ${gridConfig.gridCols} ${gridConfig.gap} mb-8`}>
                  {currentMembers.map(member => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              )}

              {/* DESKTOP VERSION */}
              {!isMobile && !isTablet && (
                <div className={`grid ${gridConfig.gridCols} ${gridConfig.gap} mb-8`}>
                  {currentMembers.map(member => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))} 
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} 
                      />
                    </PaginationItem>
                    
                    {generatePaginationItems()}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} 
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} 
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className={`${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm md:text-sm'} text-xl text-gray-600`}>
                Aucun membre trouvé pour "{searchTerm}"
              </p>
              <button 
                onClick={() => setSearchTerm('')} 
                className={`${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm md:text-sm'} mt-4 text-primary hover:underline`}
              >
                Afficher tous les membres
              </button>
            </div>
          )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RepertoireMembers;
