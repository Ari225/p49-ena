
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Eye, Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Gallery = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');

  const galleries = [
    {
      id: 1,
      title: "Gala annuel 2024",
      category: "events",
      date: "2024-03-15",
      imageCount: 45,
      thumbnail: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop",
      description: "Photos du gala annuel de la promotion 49"
    },
    {
      id: 2,
      title: "Formation leadership",
      category: "formation",
      date: "2024-02-20",
      imageCount: 32,
      thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop",
      description: "Séances de formation en leadership et management"
    },
    {
      id: 3,
      title: "Assemblée générale",
      category: "meetings",
      date: "2024-01-10",
      imageCount: 28,
      thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop",
      description: "Assemblée générale annuelle des membres"
    },
    {
      id: 4,
      title: "Activités sportives",
      category: "sports",
      date: "2024-02-05",
      imageCount: 56,
      thumbnail: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=300&fit=crop",
      description: "Tournoi sportif inter-promotions"
    },
    {
      id: 5,
      title: "Conférence innovation",
      category: "formation",
      date: "2024-01-25",
      imageCount: 23,
      thumbnail: "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=400&h=300&fit=crop",
      description: "Conférence sur l'innovation dans l'administration"
    },
    {
      id: 6,
      title: "Soirée culturelle",
      category: "events",
      date: "2023-12-15",
      imageCount: 67,
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      description: "Soirée de célébration de la culture ivoirienne"
    }
  ];

  const filteredGalleries = galleries.filter(gallery => 
    gallery.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="bg-accent/30">
        {/* Header Section */}
        <section 
          className={`relative ${isMobile ? 'h-[30vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}
        >
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/f8333693-f1e8-4657-ad09-b60382767706.png" 
              alt="Background médiathèque" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
            <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold mb-4 md:mb-6 animate-fade-in`}>
              Médiathèque
            </h1>
            <p className={`${isMobile ? 'text-sm' : 'text-lg md:text-xl'} italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
              Revivez les moments forts de notre communauté à travers nos photos et vidéos
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className={`py-8 bg-white backdrop-blur-sm ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-full px-4">
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Rechercher par titre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/90 backdrop-blur-sm"
              />
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className={`py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGalleries.map((gallery) => (
                <Card key={gallery.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group bg-white/90 backdrop-blur-sm">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={gallery.thumbnail} 
                      alt={gallery.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex items-center text-white">
                        <Eye className="w-5 h-5 mr-2" />
                        <span className="font-semibold">Voir les photos</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-black/70 text-white">
                        {gallery.imageCount} photos
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-2">{gallery.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{gallery.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(gallery.date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {filteredGalleries.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto">
                  <p className="text-gray-500 text-lg">Aucun résultat trouvé pour "{searchQuery}"</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Gallery;
