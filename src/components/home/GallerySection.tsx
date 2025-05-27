
import React from 'react';
import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';

const GallerySection = () => {
  const galleryImages = [
    "https://images.unsplash.com/photo-1559223607-a43c990c692f?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop"
  ];

  return (
    <section className="bg-accent/30 py-[100px] px-[100px]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-primary">Galerie Photos</h2>
          <Link to="/galerie" className="text-primary hover:text-secondary/80 flex items-center">
            <Camera className="mr-2 h-5 w-5" />
            Voir plus
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
