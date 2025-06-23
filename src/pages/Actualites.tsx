
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, Tag, Clock, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

const Actualites = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample data - in a real app, this would come from an API
  const actualites = [
    {
      id: 1,
      title: "Nouvelle réforme de la fonction publique annoncée",
      excerpt: "Le gouvernement annonce une série de réformes visant à moderniser l'administration publique ivoirienne...",
      author: "Direction P49",
      date: "2024-01-15",
      category: "reforme",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Assemblée générale 2024 : Un succès remarquable",
      excerpt: "Plus de 300 membres ont participé à l'assemblée générale annuelle de la P49 qui s'est tenue...",
      author: "Bureau Exécutif",
      date: "2024-01-10",
      category: "evenement",
      image: "https://images.unsplash.com/photo-1559223607-a43c990c692f?w=400&h=250&fit=crop",
      readTime: "3 min"
    },
    {
      id: 3,
      title: "Lancement du programme de formation digitale",
      excerpt: "La P49 lance un nouveau programme de formation aux outils numériques pour ses membres...",
      author: "Commission Formation",
      date: "2024-01-05",
      category: "formation",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop",
      readTime: "4 min"
    }
  ];

  const categories = [
    { value: 'all', label: 'Toutes les actualités' },
    { value: 'reforme', label: 'Réformes' },
    { value: 'evenement', label: 'Événements' },
    { value: 'formation', label: 'Formations' },
    { value: 'partenariat', label: 'Partenariats' }
  ];

  const filteredActualites = actualites.filter(actualite => {
    const matchesSearch = actualite.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         actualite.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || actualite.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header with Background Image */}
        <section className={`relative ${isMobile ? 'h-[30vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/92f8a2dc-a96b-43e9-93dd-b8dec8af0527.png" 
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

        {/* Search and Filter Section */}
        <section className={`py-8 bg-white ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Rechercher une actualité..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.value)}
                    className="text-sm"
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className={`py-12 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredActualites.map((actualite) => (
                <Card key={actualite.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={actualite.image} 
                      alt={actualite.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(actualite.date).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {actualite.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-primary hover:text-primary/80 transition-colors">
                      {actualite.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {actualite.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        {actualite.author}
                      </div>
                      <Button variant="outline" size="sm">
                        Lire plus
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Actualites;
