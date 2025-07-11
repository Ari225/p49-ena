
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Search, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

const Actualites = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample data - in a real app, this would come from an API
  const actualites = [
    {
      id: '1',
      title: "Nouvelle réforme de la fonction publique annoncée",
      excerpt: "Le gouvernement annonce une série de réformes visant à moderniser l'administration publique ivoirienne...",
      category: "Réforme",
      date: "2024-01-15",
      image: "/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg",
      readTime: "5 min"
    },
    {
      id: '2',
      title: "Assemblée générale 2024 : Un succès remarquable",
      excerpt: "Plus de 300 membres ont participé à l'assemblée générale annuelle de la P49 qui s'est tenue...",
      category: "Événement",
      date: "2024-01-10",
      image: "/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg",
      readTime: "3 min"
    },
    {
      id: '3',
      title: "Lancement du programme de formation digitale",
      excerpt: "La P49 lance un nouveau programme de formation aux outils numériques pour ses membres...",
      category: "Formation",
      date: "2024-01-05",
      image: "/lovable-uploads/8cbb0164-0529-47c1-9caa-8244c17623b3.jpg",
      readTime: "4 min"
    },
    {
      id: '4',
      title: "Séminaire de développement professionnel",
      excerpt: "Un séminaire intensif pour le renforcement des capacités professionnelles.",
      category: "Formation",
      date: "2024-01-20",
      image: "/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg",
      readTime: "5 min"
    },
    {
      id: '5',
      title: "Nouveau programme de mentorat",
      excerpt: "Lancement du programme de mentorat pour les jeunes diplômés.",
      category: "Programme",
      date: "2024-01-18",
      image: "/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg",
      readTime: "4 min"
    },
    {
      id: '6',
      title: "Conférence internationale sur la gouvernance",
      excerpt: "Participation à la conférence internationale sur les bonnes pratiques.",
      category: "Conférence",
      date: "2024-01-16",
      image: "/lovable-uploads/8cbb0164-0529-47c1-9caa-8244c17623b3.jpg",
      readTime: "6 min"
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
    const matchesCategory = selectedCategory === 'all' || actualite.category.toLowerCase() === selectedCategory;
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
              Découvrez toute l'actualité de la P49
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
                <Link key={actualite.id} to={`/actualite/${actualite.id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={actualite.image} 
                        alt={actualite.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center bg-primary/10 px-2 py-1 rounded-full">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(actualite.date).toLocaleDateString('fr-FR')}
                        </div>
                        <span className="bg-secondary/20 text-secondary px-2 py-1 rounded-full font-medium">
                          {actualite.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-primary hover:text-primary/80 transition-colors mb-3 text-lg leading-tight line-clamp-2">
                        {actualite.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                        {actualite.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{actualite.readTime} de lecture</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/5 transition-colors">
                          <Eye className="h-4 w-4 mr-1" />
                          Lire
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Actualites;
