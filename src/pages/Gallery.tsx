
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Eye } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Gallery = () => {
  const isMobile = useIsMobile();
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  const categories = [
    { id: 'all', label: 'Toutes' },
    { id: 'events', label: 'Événements' },
    { id: 'formation', label: 'Formations' },
    { id: 'meetings', label: 'Réunions' },
    { id: 'sports', label: 'Sports' }
  ];

  const filteredGalleries = selectedCategory === 'all' 
    ? galleries 
    : galleries.filter(gallery => gallery.category === selectedCategory);

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <section className={`bg-primary text-white py-20 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Galerie Photos</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Revivez les moments forts de notre communauté à travers nos albums photos
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className={`py-8 bg-gray-50 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className={`py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGalleries.map((gallery) => (
                <Card key={gallery.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
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
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Gallery;
