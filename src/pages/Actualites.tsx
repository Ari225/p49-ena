
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import NewsCard from '@/components/home/news/NewsCard';

const Actualites = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - in a real app, this would come from an API
  const actualites = [
    {
      id: '1',
      title: "Nouvelle réforme de la fonction publique annoncée",
      summary: "Le gouvernement annonce une série de réformes visant à moderniser l'administration publique ivoirienne...",
      category: "Réforme",
      published_date: "2024-01-15",
      image_url: "/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg"
    },
    {
      id: '2',
      title: "Assemblée générale 2024 : Un succès remarquable",
      summary: "Plus de 300 membres ont participé à l'assemblée générale annuelle de la P49 qui s'est tenue...",
      category: "Événement",
      published_date: "2024-01-10",
      image_url: "/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg"
    },
    {
      id: '3',
      title: "Lancement du programme de formation digitale",
      summary: "La P49 lance un nouveau programme de formation aux outils numériques pour ses membres...",
      category: "Formation",
      published_date: "2024-01-05",
      image_url: "/lovable-uploads/8cbb0164-0529-47c1-9caa-8244c17623b3.jpg"
    },
    {
      id: '4',
      title: "Séminaire de développement professionnel",
      summary: "Un séminaire intensif pour le renforcement des capacités professionnelles.",
      category: "Formation",
      published_date: "2024-01-20",
      image_url: "/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg"
    },
    {
      id: '5',
      title: "Nouveau programme de mentorat",
      summary: "Lancement du programme de mentorat pour les jeunes diplômés.",
      category: "Programme",
      published_date: "2024-01-18",
      image_url: "/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg"
    },
    {
      id: '6',
      title: "Conférence internationale sur la gouvernance",
      summary: "Participation à la conférence internationale sur les bonnes pratiques.",
      category: "Conférence",
      published_date: "2024-01-16",
      image_url: "/lovable-uploads/8cbb0164-0529-47c1-9caa-8244c17623b3.jpg"
    }
  ];

  const filteredActualites = actualites.filter(actualite => {
    const matchesSearch = actualite.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         actualite.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredActualites.map((actualite) => (
                <NewsCard 
                  key={actualite.id} 
                  item={actualite} 
                  variant={isMobile ? 'mobile' : 'desktop'}
                />
              ))}
            </div>
            
            {filteredActualites.length === 0 && (
              <div className="text-center py-12">
                <p className={`text-gray-500 mb-4 ${isMobile ? 'text-sm' : ''}`}>
                  Aucune actualité trouvée avec ce terme de recherche.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Actualites;
