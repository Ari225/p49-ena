
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      name: "Dr. Kouassi Marie",
      position: "Directrice Générale, Ministère de l'Économie",
      quote: "Le réseau P49 m'a permis de développer mes compétences et de créer des liens durables.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b047?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "M. Yao Jean-Baptiste",
      position: "Préfet de Région",
      quote: "Une communauté exceptionnelle qui favorise l'excellence dans le service public.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Mme. Touré Fatou",
      position: "Directrice des Ressources Humaines",
      quote: "L'entraide et la solidarité de la P49 sont remarquables. Un vrai réseau de soutien.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Dr. Diallo Mamadou",
      position: "Conseiller du Président",
      quote: "La formation continue proposée par le réseau est de très haute qualité.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Mme. Kone Awa",
      position: "Secrétaire Générale de Ministère",
      quote: "Les échanges d'expériences enrichissent notre pratique professionnelle quotidienne.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "M. Bamba Seydou",
      position: "Sous-Préfet",
      quote: "Un réseau qui nous unit au-delà des fonctions, une vraie famille professionnelle.",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(testimonials.length / 3));
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(testimonials.length / 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.ceil(testimonials.length / 3) - 1 : prevIndex - 1
    );
  };

  const getVisibleTestimonials = () => {
    const startIndex = currentIndex * 3;
    return testimonials.slice(startIndex, startIndex + 3);
  };

  return (
    <section className="bg-accent/30 py-[100px] px-[100px]">
      <div className="container mx-auto px-0">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">Témoignages</h2>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.slice(slideIndex * 3, slideIndex * 3 + 3).map((testimonial, index) => (
                      <Card key={index} className="h-full transition-all duration-300 ease-in-out transform hover:scale-105">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name} 
                              className="w-16 h-16 rounded-full object-cover flex-shrink-0" 
                            />
                            <div className="flex-1">
                              <p className="italic mb-4 text-gray-600 text-sm">"{testimonial.quote}"</p>
                              <div>
                                <h4 className="font-semibold text-primary text-sm">{testimonial.name}</h4>
                                <p className="text-xs text-gray-500">{testimonial.position}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>
        </div>
        
        <div className="text-center mt-8">
          <Button asChild className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
            <Link to="/temoignages">Voir tous les témoignages</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
