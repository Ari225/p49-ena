import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const isMobile = useIsMobile();
  const isTab = useIsTablet();
  
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
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face"
  }, {
    name: "Dr. Diallo Mamadou",
    position: "Conseiller du Président",
    quote: "La formation continue proposée par le réseau est de très haute qualité.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face"
  }, {
    name: "Mme. Kone Awa",
    position: "Secrétaire Générale de Ministère",
    quote: "Les échanges d'expériences enrichissent notre pratique professionnelle quotidienne.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100&h=100&fit=crop&crop=face"
  }, {
    name: "M. Bamba Seydou",
    position: "Sous-Préfet",
    quote: "Un réseau qui nous unit au-delà des fonctions, une vraie famille professionnelle.",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=100&h=100&fit=crop&crop=face"
  }];

  // Autoslide effect
  useEffect(() => {
    if (!autoSlide || isMobile) return;
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoSlide, testimonials.length, isMobile]);

  const nextSlide = () => {
    setAutoSlide(false);
    setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setAutoSlide(false);
    setCurrentIndex(prevIndex => prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1);
  };

  const cardsPerView = isMobile ? 1 : isTab ? 2 : 3;
  const translatePercentage = isMobile ? 100 : isTab ? 50 : 100 / 3;

  if (isMobile) {
    // Mobile version
    return (
      <section className="py-[50px] px-[25px] bg-white">
        <div className="container mx-auto px-0">
          <h2 className="text-xl font-bold text-center text-primary mb-[50px] md:mb-[50px]">Témoignages</h2>
          
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-[1500ms] ease-in-out" style={{
              transform: `translateX(-${currentIndex * translatePercentage}%)`
            }}>
              {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-0">
                  <Card className="h-full transition-all duration-300 ease-in-out shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                        <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 rounded-full object-cover flex-shrink-0" />
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
            
            <div className="flex justify-center gap-4 mt-4">
              <Button onClick={prevSlide} variant="outline" size="icon" className="rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button onClick={nextSlide} variant="outline" size="icon" className="rounded-full">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <Button asChild className="bg-primary hover:bg-primary text-white py-[5px] px-[15px] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold w-full text-xs">
              <Link to="/temoignages" className="flex items-center justify-center">
                Voir tous les témoignages
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (isTab) {
    // Tablet version - uniformisée comme mobile
    return (
      <section className="py-[75px] px-[50px] bg-white">
        <div className="container mx-auto px-0">
          <h2 className="text-2xl font-bold text-center text-primary mb-[50px] md:mb-[50px]">Témoignages</h2>
          
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-[1500ms] ease-in-out" style={{
              transform: `translateX(-${currentIndex * translatePercentage}%)`
            }}>
              {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={index} className="w-1/2 flex-shrink-0 px-3">
                  <Card className="h-full transition-all duration-300 ease-in-out transform hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center gap-4">
                        <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 rounded-full object-cover flex-shrink-0" />
                        <div className="flex-1 text-center">
                          <p className="italic mb-4 text-gray-600 text-base">"{testimonial.quote}"</p>
                          <div>
                            <h4 className="font-semibold text-primary text-base">{testimonial.name}</h4>
                            <p className="text-sm text-gray-500">{testimonial.position}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
            <Button asChild className="bg-primary hover:bg-primary text-sm text-white py-[5px] px-[15px] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold">
              <Link to="/temoignages" className="flex items-center">
                Voir tous les témoignages
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Desktop version - uniformisée comme mobile
  return (
    <section className="py-[75px] px-8 md:px-12 lg:py-[100px] lg:px-[100px] bg-white">
      <div className="container mx-auto px-0">
        <h2 className="text-3xl md:text-3xl font-bold text-center text-primary mb-12">Témoignages</h2>
        
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-[1500ms] ease-in-out" style={{
            transform: `translateX(-${currentIndex * translatePercentage}%)`
          }}>
            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
              <div key={index} className="w-1/3 flex-shrink-0 px-3">
                <Card className="h-full transition-all duration-300 ease-in-out transform hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center gap-4">
                      <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 rounded-full object-cover flex-shrink-0" />
                      <div className="flex-1 text-center">
                        <p className="italic mb-4 text-gray-600 text-lg">"{testimonial.quote}"</p>
                        <div>
                          <h4 className="font-semibold text-primary text-base">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500">{testimonial.position}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
          <Button asChild className="bg-primary hover:bg-primary text-base md:text-sm text-white py-[5px] px-[15px] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold">
            <Link to="/temoignages" className="flex items-center">
              Voir tous les témoignages
              <ChevronRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
