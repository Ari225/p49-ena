
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Eye, Search, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useIsMobile } from '@/hooks/use-mobile';

interface JournalEdition {
  id: string;
  title: string;
  summary: string;
  cover_image_url: string;
  pdf_url: string;
  publish_date: string;
  page_count: number;
  status: string;
}

const Archives = () => {
  const isMobile = useIsMobile();
  const [journals, setJournals] = useState<JournalEdition[]>([]);
  const [filteredJournals, setFilteredJournals] = useState<JournalEdition[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const months = [
    { value: '01', label: 'Janvier' },
    { value: '02', label: 'Février' },
    { value: '03', label: 'Mars' },
    { value: '04', label: 'Avril' },
    { value: '05', label: 'Mai' },
    { value: '06', label: 'Juin' },
    { value: '07', label: 'Juillet' },
    { value: '08', label: 'Août' },
    { value: '09', label: 'Septembre' },
    { value: '10', label: 'Octobre' },
    { value: '11', label: 'Novembre' },
    { value: '12', label: 'Décembre' }
  ];

  useEffect(() => {
    fetchJournals();
  }, []);

  useEffect(() => {
    filterJournals();
  }, [journals, searchTerm, selectedMonth, selectedYear]);

  const fetchJournals = async () => {
    try {
      const { data, error } = await supabase
        .from('journal_editions')
        .select('*')
        .eq('status', 'publie')
        .order('publish_date', { ascending: false });

      if (error) throw error;
      setJournals(data || []);
    } catch (error) {
      console.error('Error fetching journals:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterJournals = () => {
    let filtered = journals;

    if (searchTerm) {
      filtered = filtered.filter(journal => 
        journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        journal.summary?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedMonth || selectedYear) {
      filtered = filtered.filter(journal => {
        const date = new Date(journal.publish_date);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());

        if (selectedMonth && selectedYear) {
          return month === selectedMonth && year === selectedYear;
        } else if (selectedMonth) {
          return month === selectedMonth;
        } else if (selectedYear) {
          return year === selectedYear;
        }
        return true;
      });
    }

    setFilteredJournals(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedMonth('');
    setSelectedYear('');
  };

  const availableYears = [...new Set(journals.map(journal => 
    new Date(journal.publish_date).getFullYear().toString()
  ))].sort((a, b) => b.localeCompare(a));

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
        {/* Header Section */}
        <section className={`bg-primary text-white py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Archives</h1>
            <p className="text-xl opacity-90">
              Consultez toutes les éditions passées de Perspectives 49
            </p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className={`py-8 ${isMobile ? 'px-[25px]' : 'px-[100px]'} bg-accent/10`}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher par titre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le mois" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner l'année" />
                </SelectTrigger>
                <SelectContent>
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Réinitialiser
              </Button>
            </div>

            <p className="text-gray-600 text-sm">
              {filteredJournals.length} édition(s) trouvée(s)
            </p>
          </div>
        </section>

        {/* Archives Grid */}
        <section className={`py-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            {filteredJournals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredJournals.map((journal) => (
                  <Card key={journal.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="p-4">
                      <div className="aspect-[3/4] mb-4">
                        <img 
                          src={journal.cover_image_url || "/lovable-uploads/ec8d10e9-3108-4b8f-9db7-6734f1399fcc.png"} 
                          alt={journal.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <CardTitle className="text-lg text-primary">{journal.title}</CardTitle>
                      <div className="flex items-center text-sm text-gray-600 mt-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(journal.publish_date).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-4 pt-0">
                      {journal.summary && (
                        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{journal.summary}</p>
                      )}
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        {journal.page_count && (
                          <span>{journal.page_count} pages</span>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-primary hover:bg-primary/90 flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          Lire
                        </Button>
                        <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white flex-1">
                          <Download className="h-3 w-3 mr-1" />
                          PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Aucune édition trouvée avec ces critères de recherche.</p>
                <Button onClick={clearFilters} variant="outline">
                  Afficher toutes les éditions
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Archives;
