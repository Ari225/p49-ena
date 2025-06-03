
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface CommuniqueItem {
  id: string;
  title: string;
  description: string;
  type: string;
  color: string;
  image: string;
  published_date: string;
  urgency: 'normal' | 'urgent' | 'important';
}

const Communiques = () => {
  const isMobile = useIsMobile();
  const [communiques, setCommuniques] = useState<CommuniqueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCommuniques();
  }, []);

  const fetchCommuniques = async () => {
    try {
      setLoading(true);
      // Mock data
      const mockCommuniques: CommuniqueItem[] = [
        {
          id: '1',
          title: 'Communiqué urgent',
          description: 'Report de l\'événement prévu le 25 mars 2024.',
          type: 'Communiqué urgent',
          color: 'red',
          image: '/lovable-uploads/cdf92e8b-3396-4192-b8a1-f94647a7b289.jpg',
          published_date: '2024-03-20',
          urgency: 'urgent'
        },
        {
          id: '2',
          title: 'Nouvelle inscription',
          description: 'Ouverture des inscriptions pour la formation de mars.',
          type: 'Information',
          color: 'blue',
          image: '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg',
          published_date: '2024-03-15',
          urgency: 'normal'
        }
      ];
      setCommuniques(mockCommuniques);
    } catch (error) {
      console.error('Error fetching communiques:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCommuniques = communiques.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
      case 'important':
        return <Badge className="bg-orange-100 text-orange-800">Important</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

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
            <h1 className="text-4xl font-bold mb-4">Communiqués</h1>
            <p className="text-xl opacity-90">
              Informations officielles et communications importantes
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className={`py-8 bg-gray-50 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un communiqué..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </section>

        {/* Communiques Grid */}
        <section className={`py-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            {filteredCommuniques.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCommuniques.map((item) => (
                  <Link key={item.id} to={`/communiques/${item.id}`}>
                    <Card className={`overflow-hidden hover:shadow-lg transition-shadow bg-${item.color}-50 border-${item.color}-200`}>
                      {item.image && (
                        <div className="h-48">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          {getUrgencyBadge(item.urgency)}
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(item.published_date).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        <CardTitle className={`text-lg text-${item.color}-800`}>{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className={`text-${item.color}-600`}>{item.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Aucun communiqué trouvé.</p>
                <Button onClick={() => setSearchTerm('')}>
                  Afficher tous les communiqués
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Communiques;
