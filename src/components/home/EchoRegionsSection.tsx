
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, MapPin, ChevronLeft } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const EchoRegionsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const regionalNews = [{
    region: "Abidjan",
    title: "Rencontre mensuelle des membres d'Abidjan",
    date: "25 Mars 2024",
    excerpt: "Plus de 30 membres se sont retrouvés pour échanger sur les projets en cours.",
    image: "/lovable-uploads/86d6f303-a616-4f82-9bdc-8e06f6878a5a.png"
  }, {
    region: "Bouaké",
    title: "Session de formation en leadership",
    date: "20 Mars 2024",
    excerpt: "Formation intensive sur le leadership transformationnel pour 15 membres.",
    image: "/lovable-uploads/92f8a2dc-a96b-43e9-93dd-b8dec8af0527.png"
  }, {
    region: "San-Pédro",
    title: "Inauguration du bureau régional",
    date: "15 Mars 2024",
    excerpt: "Ouverture officielle du nouveau bureau régional en présence du Préfet.",
    image: "/lovable-uploads/8d7f1d5e-9bec-4321-88cd-0115cd5572e9.png"
  }, {
    region: "Korhogo",
    title: "Atelier sur la gestion publique",
    date: "10 Mars 2024",
    excerpt: "Workshop sur les innovations en gestion publique locale.",
    image: "/lovable-uploads/674fac65-3da0-4339-8260-56ec359feae2.png"
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

  return (
    <section className={`bg-white py-12 md:py-16 lg:py-[100px] ${isMobile ? 'px-[25px]' : isTablet ? 'px-[50px]' : 'px-4 md:px-8 lg:px-[100px]'}`}>
      <div className="container mx-auto px-0">
        <div className={`flex ${isMobile ? 'flex-row' : 'flex-col sm:flex-row'} items-center justify-between mb-[50px] md:mb-[50px] gap-4`}>
          <h2 className={`${isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl md:text-3xl'} font-bold text-primary`}>
            Écho des régions
          </h2>
          <Button asChild className={`${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm md:text-sm'} bg-primary text-white hover:bg-primary rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg py-[5px] px-[15px] font-semibold`}>
            <Link to="/echo-regions" className="flex items-center">
              <span className="hidden sm:inline">Actualités régionales</span>
              <span className="sm:hidden">Voir tout</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
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
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-32 md:h-48">
                        <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                        <div className="absolute top-2 md:top-3 left-2 md:left-3 bg-primary text-white px-2 py-1 text-xs flex items-center rounded">
                          <MapPin className="w-3 h-3 mr-1" />
                          {news.region}
                        </div>
                      </div>
                      <CardContent className="p-3 md:p-4">
                        <h3 className="font-semibold text-primary mb-2 text-base line-clamp-2 md:text-base">
                          {news.title}
                        </h3>
                        <p className="mb-2 md:mb-3 line-clamp-2 text-gray-700 text-sm font-normal">
                          {news.excerpt}
                        </p>
                        <p className="text-xs text-gray-700 font-normal">{news.date}</p>
                      </CardContent>
                    </Card>
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
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-40">
                        <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                        <div className="absolute top-3 left-3 bg-primary text-white px-2 py-1 text-xs flex items-center rounded">
                          <MapPin className="w-3 h-3 mr-1" />
                          {news.region}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-primary mb-2 text-base line-clamp-2">
                          {news.title}
                        </h3>
                        <p className="mb-3 line-clamp-2 text-gray-700 text-sm font-normal">
                          {news.excerpt}
                        </p>
                        <p className="text-xs text-gray-700 font-normal">{news.date}</p>
                      </CardContent>
                    </Card>
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
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-32 md:h-48">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 md:top-3 left-2 md:left-3 bg-primary text-white px-2 py-1 text-xs flex items-center rounded">
                    <MapPin className="w-3 h-3 mr-1" />
                    {news.region}
                  </div>
                </div>
                <CardContent className="p-3 md:p-4">
                  <h3 className="font-semibold text-primary mb-2 text-base line-clamp-2 md:text-base">
                    {news.title}
                  </h3>
                  <p className="mb-2 md:mb-3 line-clamp-2 text-gray-700 text-sm font-normal">
                    {news.excerpt}
                  </p>
                  <p className="text-xs text-gray-700 font-normal">{news.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EchoRegionsSection;
