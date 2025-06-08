import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
interface NewsItem {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  image_url: string;
  published_date: string;
  author: string;
}
const Actualites = () => {
  const isMobile = useIsMobile();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  useEffect(() => {
    fetchNews();
  }, []);
  const fetchNews = async () => {
    try {
      setLoading(true);
      // Mock data instead of Supabase
      const mockNews: NewsItem[] = [{
        id: '1',
        title: 'Nouvelle formation en leadership',
        content: 'Une formation spécialisée en leadership pour les membres de la P49...',
        summary: 'Une formation spécialisée en leadership pour les membres de la P49.',
        category: 'Formation',
        image_url: '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg',
        published_date: '2024-01-15',
        author: 'Équipe P49'
      }, {
        id: '2',
        title: 'Assemblée générale annuelle',
        content: 'L\'assemblée générale de la P49 se tiendra le mois prochain...',
        summary: 'L\'assemblée générale de la P49 se tiendra le mois prochain.',
        category: 'Événement',
        image_url: '/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg',
        published_date: '2024-01-10',
        author: 'Bureau Exécutif'
      }];
      setNews(mockNews);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };
  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const categories = [...new Set(news.map(item => item.category))];
  if (loading) {
    return <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Chargement...</div>
        </div>
      </Layout>;
  }
  return <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <section className={`bg-primary text-white py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Actualités</h1>
            <p className="text-xl opacity-90">
              Restez informés des dernières nouvelles et événements de notre réseau
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className={`py-8 bg-gray-50 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Rechercher une actualité..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Button variant={selectedCategory === '' ? 'default' : 'outline'} onClick={() => setSelectedCategory('')}>
                  Toutes
                </Button>
                {categories.map(category => <Button key={category} variant={selectedCategory === category ? 'default' : 'outline'} onClick={() => setSelectedCategory(category)}>
                    {category}
                  </Button>)}
              </div>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className={`py-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-0">
            {filteredNews.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNews.map(item => <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {item.image_url && <div className="h-48">
                        <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                      </div>}
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{item.category}</Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(item.published_date).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{item.summary}</p>
                      <p className="text-sm text-gray-500">Par {item.author}</p>
                    </CardContent>
                  </Card>)}
              </div> : <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Aucune actualité trouvée.</p>
                <Button onClick={() => {
              setSearchTerm('');
              setSelectedCategory('');
            }}>
                  Afficher toutes les actualités
                </Button>
              </div>}
          </div>
        </section>
      </div>
    </Layout>;
};
export default Actualites;