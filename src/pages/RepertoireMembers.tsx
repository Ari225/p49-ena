
import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import Layout from '@/components/Layout';
import MemberCard from '@/components/members/MemberCard';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data for 800+ members with Ivorian names and cities
const generateMockMembers = () => {
  const positions = ['Directeur Général', 'Directeur Adjoint', 'Chef de Service', 'Attaché d\'Administration', 'Secrétaire Général', 'Contrôleur Financier', 'Inspecteur', 'Analyste', 'Coordinateur', 'Responsable RH', 'Chef de Projet', 'Conseiller'];
  const localities = ['Abidjan', 'Bouaké', 'Daloa', 'Yamoussoukro', 'San-Pédro', 'Korhogo', 'Man', 'Divo', 'Gagnoa', 'Anyama', 'Abengourou', 'Agboville', 'Grand-Bassam', 'Sassandra'];
  const firstNames = ['Kouadio', 'Akissi', 'Kouassi', 'Adjoua', 'Yao', 'Amenan', 'Kofi', 'Affoué', 'N\'Guessan', 'Aya', 'Koffi', 'Mariam', 'Kouame', 'Fatou', 'Brou', 'Aminata'];
  const lastNames = ['Diallo', 'Traoré', 'Ouattara', 'Koné', 'Coulibaly', 'Bamba', 'Yao', 'Kouassi', 'N\'Dri', 'Bakayoko', 'Touré', 'Fofana', 'Sangaré', 'Diabaté', 'Silué', 'Gbagbo'];
  const members = [];
  for (let i = 1; i <= 850; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const position = positions[Math.floor(Math.random() * positions.length)];
    const locality = localities[Math.floor(Math.random() * localities.length)];
    members.push({
      id: i,
      firstName,
      lastName,
      position,
      locality,
      photo: `https://images.unsplash.com/photo-${1500000000000 + i}?w=150&h=150&fit=crop&face`,
      socialMedia: {
        facebook: Math.random() > 0.3 ? `https://facebook.com/${firstName.toLowerCase()}.${lastName.toLowerCase()}` : null,
        instagram: Math.random() > 0.5 ? `https://instagram.com/${firstName.toLowerCase()}_${lastName.toLowerCase()}` : null,
        linkedin: Math.random() > 0.4 ? `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}` : null
      }
    });
  }
  return members;
};

const RepertoireMembers = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 24;
  const allMembers = useMemo(() => generateMockMembers(), []);

  // Filter members based on search term
  const filteredMembers = useMemo(() => {
    if (!searchTerm.trim()) return allMembers;
    return allMembers.filter(member => member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || member.lastName.toLowerCase().includes(searchTerm.toLowerCase()));
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
  
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile-specific div for responsive styling */}
        <div className="lg:hidden">
          {/* Mobile-specific responsive adjustments will be handled by individual components */}
        </div>
        
        {/* Header Section */}
        <div className="bg-primary text-white px-4 lg:px-[100px] py-12 lg:py-[100px]">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl lg:text-4xl md:text-5xl font-bold text-center mb-4">
              Répertoire des Membres
            </h1>
            <p className="text-lg lg:text-xl text-center text-gray-200 max-w-3xl mx-auto">
              Découvrez notre réseau de plus de 800 membres à travers la Côte d'Ivoire
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-[100px] py-8 lg:py-[100px]">
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input type="text" placeholder="Rechercher par nom ou prénom..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 py-3 text-lg" />
            </div>
            {searchTerm && <p className="text-sm text-gray-600 mt-2 text-center">
                {filteredMembers.length} membre(s) trouvé(s)
              </p>}
          </div>

          {/* Members Grid */}
          {currentMembers.length > 0 ? <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {currentMembers.map(member => <MemberCard key={member.id} member={member} />)}
              </div>

              {/* Pagination */}
              {totalPages > 1 && <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious onClick={() => handlePageChange(Math.max(1, currentPage - 1))} className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
                    </PaginationItem>
                    
                    {generatePaginationItems()}
                    
                    <PaginationItem>
                      <PaginationNext onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>}
            </> : <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                Aucun membre trouvé pour "{searchTerm}"
              </p>
              <button onClick={() => setSearchTerm('')} className="mt-4 text-primary hover:underline">
                Afficher tous les membres
              </button>
            </div>}
        </div>
      </div>
    </Layout>
  );
};

export default RepertoireMembers;
