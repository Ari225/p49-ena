
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const TestimonialsSection = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  
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
    },
    {
      name: "Dr. Assi Brigitte",
      position: "Directrice de Cabinet",
      quote: "Les mentors de la P49 m'ont accompagnée dans ma progression de carrière.",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "M. Kouakou Ernest",
      position: "Ambassadeur",
      quote: "L'excellence de la P49 rayonne bien au-delà de nos frontières nationales.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Mme. Ouattara Salimata",
      position: "Inspectrice Générale",
      quote: "La P49 incarne les valeurs de service public et d'intégrité.",
      image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "M. Traoré Ibrahim",
      position: "Gouverneur",
      quote: "Fier d'appartenir à cette promotion qui marque l'histoire de l'administration ivoirienne.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonialIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(testimonialInterval);
  }, []);

  return (
    <section className="bg-accent/30 py-[100px] px-[100px]">
      <div className="container mx-auto px-0">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">Témoignages</h2>
        <div className="relative">
          <Carousel opts={{
            align: "start",
            loop: true
          }} className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className={`pl-2 md:pl-4 md:basis-1/3 transition-transform duration-700 ease-in-out ${index === currentTestimonialIndex ? 'translate-x-0' : index < currentTestimonialIndex ? '-translate-x-full' : 'translate-x-full'}`}>
                  <Card className="h-full">
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrentTestimonialIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonialIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* View Testimonials Button */}
        <div className="text-center mt-8">
          <Button asChild className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
            <Link to="/temoignages">Voir les Témoignages</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
