
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Galerie = () => {
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  
  const categories = [
    'Toutes',
    'Assemblées Générales',
    'Régionales',
    'Formations',
    'Événements Sociaux',
    'Partenariats',
    'Cérémonies'
  ];

  const photos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1559223607-a43c990c692f?w=400&h=300&fit=crop",
      title: "Assemblée Générale 2024",
      category: "Assemblées Générales",
      date: "Mars 2024",
      description: "Assemblée générale annuelle à l'hôtel Ivoire"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop",
      title: "Signature de Partenariat",
      category: "Partenariats",
      date: "Mars 2024",
      description: "Signature d'accord avec l'Institut de Management Public"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop",
      title: "Formation Continue",
      category: "Formations",
      date: "Mars 2024",
      description: "Session de formation en management public"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      title: "Régionale de l'Ouest",
      category: "Régionales",
      date: "Février 2024",
      description: "Rencontre des membres de la région Ouest à Man"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop",
      title: "Cérémonie de Remise",
      category: "Cérémonies",
      date: "Février 2024",
      description: "Remise de diplômes aux nouveaux membres"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      title: "Événement Gala",
      category: "Événements Sociaux",
      date: "Janvier 2024",
      description: "Gala annuel de fin d'année"
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
      title: "Assemblée Extraordinaire",
      category: "Assemblées Générales",
      date: "Décembre 2023",
      description: "Assemblée extraordinaire pour les réformes"
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
      title: "Workshop Leadership",
      category: "Formations",
      date: "Novembre 2023",
      description: "Atelier de développement du leadership"
    },
    {
      id: 9,
      url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop",
      title: "Régionale du Nord",
      category: "Régionales",
      date: "Novembre 2023",
      description: "Rencontre des membres du Nord à Korhogo"
    },
    {
      id: 10,
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
      title: "Dîner de Networking",
      category: "Événements Sociaux",
      date: "Octobre 2023",
      description: "Dîner de networking entre membres"
    },
    {
      id: 11,
      url: "https://images.unsplash.com/photo-1515169067868-5387ec6a056b?w=400&h=300&fit=crop",
      title: "Cérémonie d'Excellence",
      category: "Cérémonies",
      date: "Octobre 2023",
      description: "Cérémonie de reconnaissance de l'excellence"
    },
    {
      id: 12,
      url: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=300&fit=crop",
      title: "Partenariat International",
      category: "Partenariats",
      date: "Septembre 2023",
      description: "Signature avec des partenaires internationaux"
    }
  ];

  const filteredPhotos = selectedCategory === 'Toutes' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <section className="bg-primary text-white py-16 px-[100px]">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Galerie Photos</h1>
            <p className="text-xl opacity-90">
              Découvrez les moments forts de notre réseau à travers nos photos
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 px-[100px] bg-accent/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-primary" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Photos Grid */}
        <section className="py-12 px-[100px]">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-primary mb-2">
                {selectedCategory === 'Toutes' ? 'Toutes les photos' : selectedCategory}
              </h2>
              <p className="text-gray-600">
                {filteredPhotos.length} photo{filteredPhotos.length > 1 ? 's' : ''} trouvée{filteredPhotos.length > 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPhotos.map((photo) => (
                <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {photo.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-primary mb-1">{photo.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{photo.description}</p>
                    <p className="text-xs text-gray-500">{photo.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredPhotos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Aucune photo trouvée pour cette catégorie.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Galerie;
