import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Testimonial {
  id: string;
  member_name: string;
  member_position: string;
  content: string;
  image_url: string;
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDailyTestimonials();
  }, []);

  const fetchDailyTestimonials = async () => {
    try {
      const { data, error } = await supabase.rpc('get_daily_testimonials');
      if (error) throw error;
      
      setTestimonials(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des témoignages:', error);
      setTestimonials([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-[75px] px-8 md:px-12 lg:py-[100px] lg:px-[100px] bg-white">
        <div className="container mx-auto px-0">
          <h2 className="text-3xl md:text-3xl font-bold text-center text-primary mb-12">Témoignages</h2>
          <div className="text-center">Chargement des témoignages...</div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-[75px] px-8 md:px-12 lg:py-[100px] lg:px-[100px] bg-white">
        <div className="container mx-auto px-0">
          <h2 className="text-3xl md:text-3xl font-bold text-center text-primary mb-12">Témoignages</h2>
          <div className="text-center text-gray-500">Aucun témoignage disponible pour aujourd'hui.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-[75px] px-8 md:px-12 lg:py-[100px] lg:px-[100px] bg-white">
      <div className="container mx-auto px-0">
        <h2 className="text-3xl md:text-3xl font-bold text-center text-primary mb-12">Témoignages</h2>
        
        <div className="relative overflow-hidden">
          {/* Slide infini de droite vers gauche */}
          <div 
            className="flex animate-scroll-left gap-6" 
            style={{
              animation: 'slideLeft 20s linear infinite',
              width: 'fit-content'
            }}
          >
            {/* Répéter les témoignages plusieurs fois pour effet infini */}
            {Array.from({ length: 3 }).map((_, setIndex) => (
              testimonials.map((testimonial, index) => (
                <div key={`${setIndex}-${index}`} className="w-80 flex-shrink-0">
                  <Card className="h-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center gap-4">
                        <img 
                          src={testimonial.image_url || "/lovable-uploads/narcissek.jpeg"} 
                          alt={testimonial.member_name} 
                          className="w-20 h-20 rounded-full object-cover flex-shrink-0" 
                        />
                        <div className="flex-1 text-center">
                          <p className="italic mb-4 text-gray-600 text-base line-clamp-4">
                            "{testimonial.content}"
                          </p>
                          <div>
                            <h4 className="font-semibold text-primary text-base">
                              {testimonial.member_name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {testimonial.member_position}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))
            ))}
          </div>
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
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideLeft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          .animate-scroll-left {
            animation: slideLeft 20s linear infinite;
          }
          .line-clamp-4 {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `
      }} />
    </section>
  );
};

export default TestimonialsSection;