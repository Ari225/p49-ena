import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, MapPin } from 'lucide-react';
const EchoRegionsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const regionalNews = [{
    region: "Abidjan",
    title: "Rencontre mensuelle des membres d'Abidjan",
    date: "25 Mars 2024",
    excerpt: "Plus de 30 membres se sont retrouvés pour échanger sur les projets en cours.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop"
  }, {
    region: "Bouaké",
    title: "Session de formation en leadership",
    date: "20 Mars 2024",
    excerpt: "Formation intensive sur le leadership transformationnel pour 15 membres.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop"
  }, {
    region: "San-Pédro",
    title: "Inauguration du bureau régional",
    date: "15 Mars 2024",
    excerpt: "Ouverture officielle du nouveau bureau régional en présence du Préfet.",
    image: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=400&h=250&fit=crop"
  }, {
    region: "Korhogo",
    title: "Atelier sur la gestion publique",
    date: "10 Mars 2024",
    excerpt: "Workshop sur les innovations en gestion publique locale.",
    image: "https://images.unsplash.com/photo-1559223607-a43c990c692f?w=400&h=250&fit=crop"
  }];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % regionalNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return <section className="bg-white py-12 md:py-16 lg:py-[100px] px-4 md:px-8 lg:px-[100px]">
      <div className="container mx-auto px-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">Écho des Régions</h2>
          <Button asChild className="bg-primary text-white hover:bg-primary px-4 py-2 rounded flex items-center text-sm md:text-base transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
            <Link to="/echo-regions">
              <span className="hidden sm:inline">Actualités régionales</span>
              <span className="sm:hidden">Voir tout</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {regionalNews.map((news, index) => <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-32 md:h-48">
                <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 md:top-3 left-2 md:left-3 bg-primary text-white px-2 py-1 text-xs flex items-center rounded-lg">
                  <MapPin className="w-3 h-3 mr-1" />
                  {news.region}
                </div>
              </div>
              <CardContent className="p-3 md:p-4">
                <h3 className="font-semibold text-primary mb-2 text-xs line-clamp-2 md:text-base">
                  {news.title}
                </h3>
                <p className="mb-2 md:mb-3 line-clamp-2 text-gray-700 text-sm">
                  {news.excerpt}
                </p>
                <p className="text-xs text-gray-500">{news.date}</p>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default EchoRegionsSection;