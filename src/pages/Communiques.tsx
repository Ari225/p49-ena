import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import CommuniqueDetailPopup from '@/components/communiques/CommuniqueDetailPopup';
import { supabase } from '@/integrations/supabase/client';

interface CommuniqueItem {
  id: string;
  title: string;
  description: string;
  urgency: 'normal' | 'urgent' | 'important';
  image_url: string | null;
  published_date: string;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

const Communiques = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [communiques, setCommuniques] = useState<CommuniqueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [selectedCommunique, setSelectedCommunique] = useState<CommuniqueItem | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetchCommuniques();
  }, []);

  const fetchCommuniques = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('communiques')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching communiques:', error);
        return;
      }

      setCommuniques((data || []).map(item => ({
        ...item,
        urgency: item.urgency as 'normal' | 'urgent' | 'important'
      })));
    } catch (error) {
      console.error('Error fetching communiques:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCommuniques = communiques.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUrgency = urgencyFilter === 'all' || item.urgency === urgencyFilter;
    return matchesSearch && matchesUrgency;
  });

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
      case 'important':
        return <Badge className="bg-orange-100 text-orange-800">Important</Badge>;
      default:
        return <Badge className="bg-green-100 text-green-800">Non urgent</Badge>;
    }
  };

  const getCardStyles = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          textTitle: 'text-gray-900',
          textDesc: 'text-gray-600'
        };
      case 'important':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          textTitle: 'text-gray-900',
          textDesc: 'text-gray-600'
        };
      default:
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          textTitle: 'text-gray-900',
          textDesc: 'text-gray-600'
        };
    }
  };

  const getTextStyles = () => {
    if (isMobile) {
      return {
        title: 'text-base font-semibold mb-[10px]',
        description: 'text-xs font-normal'
      };
    } else if (isTablet) {
      return {
        title: 'text-lg font-semibold mb-[10px]',
        description: 'text-sm font-normal'
      };
    } else {
      return {
        title: 'text-xl font-semibold mb-[10px]',
        description: 'text-base font-normal'
      };
    }
  };

  const textStyles = getTextStyles();

  const handleCardClick = (communique: CommuniqueItem) => {
    setSelectedCommunique(communique);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedCommunique(null);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className={`relative ${
          isMobile ? 'h-[30vh]' : 
          isTablet ? 'h-[45vh]' : 
          'h-[60vh]'
        } flex items-center justify-center text-white overflow-hidden`}>
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/2b7ea072-aed2-4cb0-9d55-f1286499dc01.png" 
              alt="Communiqués Hero" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${
            isMobile ? 'px-[25px]' : 
            isTablet ? 'px-[50px]' : 
            'px-8 lg:px-[100px]'
          }`}>
            <h1 className={`font-bold mb-4 md:mb-6 animate-fade-in ${
              isMobile ? 'text-2xl' : 
              isTablet ? 'text-3xl' : 
              'text-4xl md:text-5xl lg:text-6xl'
            }`}>
              Communiqués
            </h1>
            <p className={`italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto ${
              isMobile ? 'text-sm' : 
              isTablet ? 'text-base' : 
              'text-lg md:text-xl'
            }`}>
              Informations officielles et communications importantes
            </p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className={`py-8 bg-white ${
          isMobile ? 'px-[25px]' : 
          isTablet ? 'px-[50px]' : 
          'px-[100px]'
        }`}>
          <div className={`${
            isMobile || isTablet ? '' : 'container mx-auto px-4'
          }`}>
            {isMobile ? (
              // Mobile layout: search bar above, buttons below
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher un communiqué..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                  <Button
                    variant={urgencyFilter === 'all' ? 'default' : 'outline'}
                    onClick={() => setUrgencyFilter('all')}
                    size="sm"
                  >
                    Tous
                  </Button>
                  <Button
                    variant={urgencyFilter === 'urgent' ? 'default' : 'outline'}
                    onClick={() => setUrgencyFilter('urgent')}
                    size="sm"
                    className={urgencyFilter === 'urgent' ? 'bg-red-600 hover:bg-red-700' : 'border-red-200 text-red-600 hover:bg-red-50'}
                  >
                    Urgent
                  </Button>
                  <Button
                    variant={urgencyFilter === 'important' ? 'default' : 'outline'}
                    onClick={() => setUrgencyFilter('important')}
                    size="sm"
                    className={urgencyFilter === 'important' ? 'bg-orange-600 hover:bg-orange-700' : 'border-orange-200 text-orange-600 hover:bg-orange-50'}
                  >
                    Important
                  </Button>
                  <Button
                    variant={urgencyFilter === 'normal' ? 'default' : 'outline'}
                    onClick={() => setUrgencyFilter('normal')}
                    size="sm"
                    className={urgencyFilter === 'normal' ? 'bg-green-600 hover:bg-green-700' : 'border-green-200 text-green-600 hover:bg-green-50'}
                  >
                    Non urgent
                  </Button>
                </div>
              </div>
            ) : (
              // Desktop and Tablet layout: centered elements
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher un communiqué..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={urgencyFilter === 'all' ? 'default' : 'outline'}
                    onClick={() => setUrgencyFilter('all')}
                    size="sm"
                  >
                    Tous
                  </Button>
                  <Button
                    variant={urgencyFilter === 'urgent' ? 'default' : 'outline'}
                    onClick={() => setUrgencyFilter('urgent')}
                    size="sm"
                    className={urgencyFilter === 'urgent' ? 'bg-red-600 hover:bg-red-700' : 'border-red-200 text-red-600 hover:bg-red-50'}
                  >
                    Urgent
                  </Button>
                  <Button
                    variant={urgencyFilter === 'important' ? 'default' : 'outline'}
                    onClick={() => setUrgencyFilter('important')}
                    size="sm"
                    className={urgencyFilter === 'important' ? 'bg-orange-600 hover:bg-orange-700' : 'border-orange-200 text-orange-600 hover:bg-orange-50'}
                  >
                    Important
                  </Button>
                  <Button
                    variant={urgencyFilter === 'normal' ? 'default' : 'outline'}
                    onClick={() => setUrgencyFilter('normal')}
                    size="sm"
                    className={urgencyFilter === 'normal' ? 'bg-green-600 hover:bg-green-700' : 'border-green-200 text-green-600 hover:bg-green-50'}
                  >
                    Non urgent
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Communiques Grid */}
        <section className={`py-12 ${
          isMobile ? 'px-[25px]' : 
          isTablet ? 'px-[50px]' : 
          'px-[100px]'
        }`}>
          <div className={`${
            isMobile || isTablet ? '' : 'container mx-auto px-4'
          }`}>
            {filteredCommuniques.length > 0 ? (
              <div className={`grid gap-8 ${
                isMobile ? 'grid-cols-1' : 
                isTablet ? 'grid-cols-2' : 
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {filteredCommuniques.map((item) => {
                  const styles = getCardStyles(item.urgency);
                  
                  return (
                    <Card 
                      key={item.id} 
                      className={`overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-white border-gray-200 h-full flex flex-col`}
                      onClick={() => handleCardClick(item)}
                    >
                      {item.image_url && (
                        <div className="h-48 flex-shrink-0">
                          <img 
                            src={item.image_url} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader className="flex-shrink-0">
                        <div className="flex items-center justify-between mb-2">
                          {getUrgencyBadge(item.urgency)}
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(item.published_date).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        <CardTitle className={`${textStyles.title} ${styles.textTitle}`}>
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow flex items-start">
                        <p className={`${textStyles.description} ${styles.textDesc}`}>
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-700 mb-4">Aucun communiqué trouvé.</p>
                <Button onClick={() => {setSearchTerm(''); setUrgencyFilter('all');}}>
                  Afficher tous les communiqués
                </Button>
              </div>
            )}
          </div>
        </section>

        <CommuniqueDetailPopup
          communique={selectedCommunique}
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
        />
      </div>
    </Layout>
  );
};

export default Communiques;
