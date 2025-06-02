
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
  } | null>(null);
  const isMobile = useIsMobile();

  const galleryImages = [{
    url: "https://images.unsplash.com/photo-1559223607-a43c990c692f?w=300&h=200&fit=crop",
    title: "Assemblée Générale 2024"
  }, {
    url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=200&fit=crop",
    title: "Signature de Partenariat"
  }, {
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300&h=200&fit=crop",
    title: "Formation Continue"
  }, {
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    title: "Régionale de l'Ouest"
  }, {
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=200&fit=crop",
    title: "Cérémonie de Remise"
  }, {
    url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop",
    title: "Événement Gala"
  }];

  const handleImageClick = (image: {
    url: string;
    title: string;
  }) => {
    setSelectedImage(image);
  };

  return (
    <>
      <section className={`bg-white py-12 md:py-16 lg:py-[100px] ${isMobile ? 'px-[25px]' : 'px-4 md:px-8 lg:px-[100px]'}`}>
        <div className="container mx-auto px-4">
          <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'flex-col sm:flex-row'} items-start sm:items-center justify-between mb-8 md:mb-12 gap-4`}>
            <h2 className={`text-2xl md:text-3xl font-bold text-primary ${isMobile ? 'text-center w-full' : ''}`}>Médiathèque</h2>
            <Link to="/galerie" className={`bg-primary text-white hover:bg-primary px-4 py-2 rounded flex items-center font-semibold text-sm md:text-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${isMobile ? 'w-full justify-center' : ''}`}>
              <Camera className="mr-2 h-4 w-4" />
              Voir plus
            </Link>
          </div>
          <div className={`grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4'}`}>
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className={`aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 group relative cursor-pointer ${isMobile ? 'hover:scale-102' : ''}`}
                onClick={() => handleImageClick(image)}
              >
                <img 
                  src={image.url} 
                  alt={image.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className={`text-white ${isMobile ? 'text-xs' : 'text-xs md:text-sm'} text-center px-2`}>{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className={`${isMobile ? 'max-w-[95vw] max-h-[85vh]' : 'max-w-4xl max-h-[90vh]'} p-0`}>
          {selectedImage && (
            <div className="relative">
              <img 
                src={selectedImage.url.replace('w=300&h=200', 'w=1200&h=800')} 
                alt={selectedImage.title} 
                className={`w-full h-auto object-contain ${isMobile ? 'max-h-[75vh]' : 'max-h-[80vh]'}`} 
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold`}>{selectedImage.title}</h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GallerySection;
