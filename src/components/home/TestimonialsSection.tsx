import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useIsMobile, useIsTablet, useIsDesktop } from '@/hooks/use-mobile';
import Autoplay from "embla-carousel-autoplay";

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
  const isMobile = useIsMobile();
  const isTab = useIsTablet();
  const isDesktop = useIsDesktop();

  const getTitleClasses = () => {
    if (isMobile) {
      return 'text-xl'; // Mobile
    } else if (isTab) {
      return 'text-2xl'; // Tablette
    } else {
      return 'text-3xl md:text-3xl'; // Desktop
    }
  };

  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 7000, stopOnInteraction: true })
  );

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
          <h2 className={`${getTitleClasses()} font-bold text-center text-primary mb-[50px] md:mb-[50px]`}>Témoignages</h2>
          <div className="text-center">Chargement des témoignages...</div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-[75px] px-8 md:px-12 lg:py-[100px] lg:px-[100px] bg-white">
        <div className="container mx-auto px-0">
          <h2 className={`${getTitleClasses()} font-bold text-center text-primary mb-[50px] md:mb-[50px]`}>Témoignages</h2>
          <div className="text-center text-gray-500 mb-8">Aucun témoignage disponible pour aujourd'hui.</div>
          
          <div className="text-center">
            <Button asChild className={`bg-primary hover:bg-primary text-white py-[5px] px-[15px] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold ${
              isMobile ? 'w-full text-xs' : 
              isTab ? 'px-8 py-3 text-sm' :
              'text-sm md:text-sm' // Desktop
            }`}>
              <Link to="/temoignages" className="flex items-center justify-center">
                Voir tous les témoignages
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Responsive carousel options
  const getCarouselOptions = () => {
    if (isMobile) {
      return {
        align: "center" as const,
        slidesToScroll: 1,
        containScroll: "trimSnaps" as const,
      };
    }
    if (isTab) {
      return {
        align: "center" as const,
        slidesToScroll: 1,
        containScroll: "trimSnaps" as const,
      };
    }
    return {
      align: "center" as const,
      slidesToScroll: 1,
      containScroll: "trimSnaps" as const,
    };
  };

  return (
    <section className="py-[75px] px-4 md:px-8 lg:py-[100px] lg:px-16 bg-white">
      <div className="container mx-auto px-0">
        <h2 className={`${getTitleClasses()} font-bold text-center text-primary mb-[50px] md:mb-[50px]`}>Témoignages</h2>
        
        <div className="relative">
          <Carousel
            opts={getCarouselOptions()}
            plugins={[autoplayPlugin.current as any]}
            className="w-full"
            onMouseEnter={() => autoplayPlugin.current.stop()}
            onMouseLeave={() => autoplayPlugin.current.play()}
          >
            <CarouselContent className={`
              ${isMobile ? '-ml-2 md:-ml-4' : ''}
              ${isTab ? '-ml-4' : ''}
              ${isDesktop ? '-ml-6' : ''}
            `}>
              {testimonials.map((testimonial, index) => (
                <CarouselItem 
                  key={index} 
                  className={`
                    ${isMobile ? 'pl-2 md:pl-4 basis-full' : ''}
                    ${isTab ? 'pl-4 basis-1/2 md:basis-1/3' : ''}
                    ${isDesktop ? 'pl-6 basis-1/3' : ''}
                  `}
                >
                  <div className="p-1">
                    <Card className={`
                      h-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg
                      ${isTab && 'mx-2'}
                      ${isDesktop && 'mx-1'}
                    `}>
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
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {isDesktop && (
              <>
                <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2" />
              </>
            )}
          </Carousel>
        </div>
        
        <div className="text-center mt-8">
          <Button asChild className={`bg-primary hover:bg-primary text-white py-[5px] px-[15px] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold ${
            isMobile ? 'w-full text-xs' : 
            isTab ? 'px-8 py-3 text-sm' :
            'text-sm md:text-sm' // Desktop
          }`}>
            <Link to="/temoignages" className="flex items-center justify-center">
              Voir tous les témoignages
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
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