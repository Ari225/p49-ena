
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const GallerySection = () => {
  const isMobile = useIsMobile();
  
  const galleryImages = [
    {
      id: 1,
      src: '/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg',
      alt: 'Événement P49',
      category: 'Événements'
    },
    {
      id: 2,
      src: '/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg',
      alt: 'Formation P49',
      category: 'Formations'
    },
    {
      id: 3,
      src: '/lovable-uploads/8cbb0164-0529-47c1-9caa-8244c17623b3.jpg',
      alt: 'Assemblée P49',
      category: 'Assemblées'
    },
    {
      id: 4,
      src: '/lovable-uploads/b85cd7b2-67e0-481b-9dec-dd22369d51c0.png',
      alt: 'Cérémonie P49',
      category: 'Cérémonies'
    }
  ];

  return (
    <section className={`bg-white py-12 md:py-16 lg:py-[100px] ${isMobile ? 'px-[25px]' : 'px-4 md:px-8 lg:px-[100px]'}`}>
      <div className="container mx-auto px-0">
        <div className={`flex ${isMobile ? 'flex-row' : 'flex-col sm:flex-row'} items-center justify-between mb-8 md:mb-12 gap-4`}>
          <h2 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold text-primary flex items-center`}>
            <Camera className="w-6 h-6 mr-2" />
            Médiathèque
          </h2>
          <Button asChild className="bg-primary text-white font-semibold hover:bg-primary rounded flex items-center text-sm md:text-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg h-10">
            <Link to="/galerie" className="py-[5px] px-[15px]">
              <span className="hidden sm:inline">Voir la galerie</span>
              <span className="sm:hidden">Voir plus</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {galleryImages.map((image) => (
            <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
              <CardContent className="p-0 relative">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                    {image.category}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
