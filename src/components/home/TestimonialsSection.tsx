
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const isMobile = useIsMobile();
  
  const testimonials = [{
    name: "Dr. Kouassi Marie",
    position: "Directrice Générale, Ministère de l'Économie",
    quote: "Le réseau P49 m'a permis de développer mes compétences et de créer des liens durables.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b047?w=100&h=100&fit=crop&crop=face"
  }, {
    name: "M. Yao Jean-Baptiste",
    position: "Préfet de Région",
    quote: "Une communauté exceptionnelle qui favorise l'excellence dans le service public.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  }, {
    name: "Mme. Touré Fatou",
    position: "Directrice des Ressources Humaines",
    quote: "L'entraide et la solidarité de la P49 sont remarquables. Un vrai réseau de soutien.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  }, {
    name: "Dr. Diallo Mamadou",
    position: "Conseiller du Président",
    quote: "La formation continue proposée par le réseau est de très haute qualité.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  }, {
    name: "Mme. Kone Awa",
    position: "Secrétaire Générale de Ministère",
    quote: "Les échanges d'expériences enrichissent notre pratique professionnelle quotidienne.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
  }, {
    name: "M. Bamba Seydou",
    position: "Sous-Préfet",
    quote: "Un réseau qui nous unit au-delà des fonctions, une vraie famille professionnelle.",
    image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face"
  }];

  // Autoslide effect
  useEffect(() => {
    if (!autoSlide || isMobile) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [autoSlide, testimonials.length, isMobile]);

  const nextSlide = () => {
    setAutoSlide(false); // Stop auto sliding when user interacts
    setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setAutoSlide(false); // Stop auto sliding when user interacts
    setCurrentIndex(prevIndex => prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1);
  };

  const cardsPerView = isMobile ? 1 : 3;
  const translatePercentage = isMobile ? 100 : 100 / 3;

  if (isMobile) {
    return (
      <section className="py-[50px] px-[25px] bg-white">
        <div className="container mx-auto px-0">
          <h2 className="text-2xl font-bold text-center text-primary mb-8">Témoignages</h2>
          
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-[1500ms] ease-in-out" style={{
              transform: `translateX(-${currentIndex * translatePercentage}%)`
            }}>
              {/* Créer une boucle infinie en dupliquant les témoignages */}
              {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <Card className="h-full transition-all duration-300 ease-in-out shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                        <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                        <div className="flex-1 text-center sm:text-left">
                          <p className="italic mb-3 text-gray-600 text-sm line-clamp-3">"{testimonial.quote}"</p>
                          <div>
                            <h4 className="font-semibold text-primary text-sm">{testimonial.name}</h4>
                            <p className="text-xs text-gray-500">{testimonial.position}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows only */}
            <div className="flex justify-center gap-4 mt-4">
              <Button 
                onClick={prevSlide}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                onClick={nextSlide}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <Button asChild className="bg-primary hover:bg-primary text-white py-[5px] px-[15px] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold w-full text-sm">
              <Link to="/temoignages" className="flex items-center justify-center">
                Voir tous les témoignages
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Desktop version with auto-sliding
  return (
    <section className="py-[100px] px-[100px] bg-white">
      <div className="container mx-auto px-0">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">Témoignages</h2>
        
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-[1500ms] ease-in-out" style={{
            transform: `translateX(-${currentIndex * translatePercentage}%)`
          }}>
            {/* Créer une boucle infinie en dupliquant les témoignages */}
            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
              <div key={index} className="w-1/3 flex-shrink-0 px-3">
                <Card className="h-full transition-all duration-300 ease-in-out transform hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
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
              </div>
            ))}
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => {
                  setAutoSlide(false);
                  setCurrentIndex(idx);
                }}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentIndex === idx ? 'bg-primary' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>
        </div>
        
        <div className="text-center mt-8">
          <Button asChild className="bg-primary hover:bg-primary text-base md:text-base text-white py-[5px] px-[15px] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold">
            <Link to="/temoignages" className="flex items-center">
              Voir tous les témoignages
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
