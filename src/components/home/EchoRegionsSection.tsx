
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

const EchoRegionsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const regionalNews = [{
    id: '1',
    title: "Rencontre mensuelle des membres d'Abidjan",
    summary: "Plus de 30 membres se sont retrouvés pour échanger sur les projets en cours.",
    category: "Abidjan",
    image_url: "/lovable-uploads/narcissek.jpeg",
    published_date: "2024-03-25"
  }, {
    id: '2',
    title: "Session de formation en leadership",
    summary: "Formation intensive sur le leadership transformationnel pour 15 membres.",
    category: "Bouaké",
    image_url: "/lovable-uploads/narcissek.jpeg",
    published_date: "2024-03-20"
  }, {
    id: '3',
    title: "Inauguration du bureau régional",
    summary: "Ouverture officielle du nouveau bureau régional en présence du Préfet.",
    category: "San-Pédro",
    image_url: "/lovable-uploads/narcissek.jpeg",
    published_date: "2024-03-15"
  }, {
    id: '4',
    title: "Atelier sur la gestion publique",
    summary: "Workshop sur les innovations en gestion publique locale.",
    category: "Korhogo",
    image_url: "/lovable-uploads/narcissek.jpeg",
    published_date: "2024-03-10"
  }];

  // Auto-scroll for desktop only
  useEffect(() => {
    if (!isMobile && !isTablet) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % regionalNews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isMobile, isTablet]);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % regionalNews.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => prevIndex === 0 ? regionalNews.length - 1 : prevIndex - 1);
  };

  const RegionalNewsCard = ({ item, variant = 'mobile' }) => {
    return (
      <Link to={`/echo-region/${item.id}`}>
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white border border-transparent h-full">
          <div className="aspect-[16/10] overflow-hidden relative">
            <img 
              src={item.image_url} 
              alt={item.title} 
              className={`w-full h-full object-cover transition-transform duration-500 ${
                variant === 'desktop' ? 'group-hover:scale-110' : 'group-hover:scale-105'
              }`} 
            />
            <div className="absolute top-4 left-4">
              <span className="bg-primary text-white px-2 py-1 rounded text-xs font-medium">
                {item.category}
              </span>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex items-center text-sm text-gray-500 gap-4 mb-3">
              <div className={`flex items-center ${variant !== 'mobile' ? 'bg-gray-50 px-2 py-1 rounded-md' : ''}`}>
                <Calendar className={`${variant === 'mobile' ? 'h-4 w-4 mr-2' : 'h-3 w-3 mr-1'}`} />
                {new Date(item.published_date).toLocaleDateString('fr-FR')}
              </div>
              <div className="flex items-center">
                <Clock className={`${variant === 'mobile' ? 'h-4 w-4 mr-1' : 'h-3 w-3 mr-1'}`} />
                <span>3 min</span>
              </div>
            </div>
            <h3 className={`font-semibold text-primary leading-tight line-clamp-2 mb-3 ${
              variant === 'mobile' ? 'text-base' : 
              variant === 'tablet' ? 'text-lg' : 'text-lg'
            }`}>
              {item.title}
            </h3>
            <p className={`text-gray-700 line-clamp-3 leading-relaxed mb-4 ${
              variant === 'mobile' ? 'text-xs' : 
              variant === 'tablet' ? 'text-sm' : 'text-sm'
            }`}>
              {item.summary}
            </p>
          </CardContent>
        </Card>
      </Link>
    );
  };

  return (
    <section className={`bg-white py-12 md:py-16 lg:py-[100px] ${isMobile ? 'px-[25px]' : isTablet ? 'px-[50px]' : 'px-4 md:px-8 lg:px-[100px]'}`}>
      <div className="container mx-auto px-0">
        <div className={`flex ${isMobile ? 'flex-row' : 'flex-col sm:flex-row'} items-center justify-between mb-[50px] md:mb-[50px]`}>
          <h2 className={`${isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl md:text-3xl'} font-bold text-primary`}>
            Écho des régions
          </h2>
          <Link to="/echo-regions" className={`${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm md:text-sm'} bg-primary text-white hover:bg-primary/90 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg py-[5px] px-[15px] font-semibold`}>
            <span className="hidden sm:inline">Actualités régionales</span>
            <span className="sm:hidden">Voir tout</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {/* MOBILE VERSION */}
        {isMobile && (
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-300 ease-in-out" style={{
                transform: `translateX(-${currentIndex * 100}%)`
              }}>
                {regionalNews.map((news, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-0">
                    <RegionalNewsCard item={news} variant="mobile" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation arrows */}
            <div className="flex justify-center gap-4 mt-4">
              <Button onClick={prevSlide} variant="outline" size="icon" className="rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button onClick={nextSlide} variant="outline" size="icon" className="rounded-full">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* TABLET VERSION */}
        {isTablet && !isMobile && (
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-300 ease-in-out" style={{
                transform: `translateX(-${currentIndex * 50}%)`
              }}>
                {regionalNews.map((news, index) => (
                  <div key={index} className="w-1/2 flex-shrink-0 px-2">
                    <RegionalNewsCard item={news} variant="tablet" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation arrows */}
            <div className="flex justify-center gap-4 mt-6">
              <Button onClick={prevSlide} variant="outline" size="icon" className="rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button onClick={nextSlide} variant="outline" size="icon" className="rounded-full">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* DESKTOP VERSION */}
        {!isMobile && !isTablet && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {regionalNews.map((news, index) => (
              <RegionalNewsCard key={index} item={news} variant="desktop" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EchoRegionsSection;
