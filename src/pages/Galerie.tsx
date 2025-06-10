
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Play, Video } from 'lucide-react';

const Galerie = () => {
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  
  const categories = ['Toutes', 'Assemblées Générales', 'Régionales', 'Formations', 'Événements Sociaux', 'Partenariats', 'Cérémonies'];
  
  const mediaItems = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1559223607-a43c990c692f?w=400&h=300&fit=crop",
      title: "Assemblée Générale 2024",
      category: "Assemblées Générales",
      date: "Mars 2024",
      description: "Assemblée générale annuelle à l'hôtel Ivoire",
      type: "image"
    },
    {
      id: 2,
      url: "https://videos.pexels.com/video-files/3196036/3196036-uhd_2560_1440_25fps.mp4",
      thumbnail: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop",
      title: "Signature de Partenariat - Vidéo",
      category: "Partenariats",
      date: "Mars 2024",
      description: "Vidéo de la signature d'accord avec l'Institut de Management Public",
      type: "video"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop",
      title: "Formation Continue",
      category: "Formations",
      date: "Mars 2024",
      description: "Session de formation en management public",
      type: "image"
    },
    {
      id: 4,
      url: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      title: "Régionale de l'Ouest - Highlights",
      category: "Régionales",
      date: "Février 2024",
      description: "Vidéo des moments forts de la rencontre des membres de la région Ouest à Man",
      type: "video"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop",
      title: "Cérémonie de Remise",
      category: "Cérémonies",
      date: "Février 2024",
      description: "Remise de diplômes aux nouveaux membres",
      type: "image"
    },
    {
      id: 6,
      url: "https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      title: "Gala Annuel - Résumé",
      category: "Événements Sociaux",
      date: "Janvier 2024",
      description: "Vidéo résumé du gala annuel de fin d'année",
      type: "video"
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
      title: "Assemblée Extraordinaire",
      category: "Assemblées Générales",
      date: "Décembre 2023",
      description: "Assemblée extraordinaire pour les réformes",
      type: "image"
    },
    {
      id: 8,
      url: "https://videos.pexels.com/video-files/3196287/3196287-uhd_2560_1440_25fps.mp4",
      thumbnail: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
      title: "Workshop Leadership - Session",
      category: "Formations",
      date: "Novembre 2023",
      description: "Vidéo de l'atelier de développement du leadership",
      type: "video"
    },
    {
      id: 9,
      url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop",
      title: "Régionale du Nord",
      category: "Régionales",
      date: "Novembre 2023",
      description: "Rencontre des membres du Nord à Korhogo",
      type: "image"
    },
    {
      id: 10,
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
      title: "Dîner de Networking",
      category: "Événements Sociaux",
      date: "Octobre 2023",
      description: "Dîner de networking entre membres",
      type: "image"
    },
    {
      id: 11,
      url: "https://videos.pexels.com/video-files/3209815/3209815-uhd_2560_1440_25fps.mp4",
      thumbnail: "https://images.unsplash.com/photo-1515169067868-5387ec6a056b?w=400&h=300&fit=crop",
      title: "Cérémonie d'Excellence - Moments forts",
      category: "Cérémonies",
      date: "Octobre 2023",
      description: "Vidéo de la cérémonie de reconnaissance de l'excellence",
      type: "video"
    },
    {
      id: 12,
      url: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=300&fit=crop",
      title: "Partenariat International",
      category: "Partenariats",
      date: "Septembre 2023",
      description: "Signature avec des partenaires internationaux",
      type: "image"
    }
  ];

  const filteredItems = selectedCategory === 'Toutes' ? mediaItems : mediaItems.filter(item => item.category === selectedCategory);

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <section className="bg-primary text-white py-16 px-[100px]">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Galerie Photos & Vidéos</h1>
            <p className="text-xl opacity-90">
              Découvrez les moments forts de notre réseau à travers nos photos et vidéos
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 px-[100px] bg-accent/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
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

        {/* Media Grid */}
        <section className="px-[100px] py-[100px]">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-primary mb-2">
                {selectedCategory === 'Toutes' ? 'Tous les médias' : selectedCategory}
              </h2>
              <p className="text-gray-600">
                {filteredItems.length} élément{filteredItems.length > 1 ? 's' : ''} trouvé{filteredItems.length > 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map(item => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="aspect-video overflow-hidden cursor-pointer relative">
                        <img 
                          src={item.type === 'video' ? item.thumbnail : item.url} 
                          alt={item.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                        />
                        {item.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                              <Play className="w-6 h-6 text-primary ml-1" />
                            </div>
                          </div>
                        )}
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                      <div className="relative">
                        {item.type === 'video' ? (
                          <video 
                            controls 
                            className="w-full h-auto object-contain max-h-[80vh]"
                            poster={item.thumbnail}
                          >
                            <source src={item.url} type="video/mp4" />
                            Votre navigateur ne supporte pas la lecture de vidéos.
                          </video>
                        ) : (
                          <img 
                            src={item.url.replace('w=400&h=300', 'w=1200&h=800')} 
                            alt={item.title} 
                            className="w-full h-auto object-contain max-h-[80vh]" 
                          />
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                          <p className="text-sm opacity-90 mb-1">{item.description}</p>
                          <p className="text-xs opacity-75">{item.date}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                      {item.type === 'video' && (
                        <Badge variant="outline" className="text-xs flex items-center">
                          <Video className="w-3 h-3 mr-1" />
                          Vidéo
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-primary mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Aucun média trouvé pour cette catégorie.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Galerie;
