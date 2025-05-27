
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronRight, Clock } from 'lucide-react';

const NewsCarousel = () => {
  const { t } = useLanguage();
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  
  const newsItems = [
    {
      title: "Assemblée Générale 2024",
      date: "15 Mars 2024",
      excerpt: "La prochaine assemblée générale aura lieu le 30 mars 2024 à l'hôtel Ivoire.",
      image: "https://images.unsplash.com/photo-1559223607-a43c990c692f?w=800&h=500&fit=crop",
      category: "Événement"
    },
    {
      title: "Nouveau Partenariat Stratégique",
      date: "10 Mars 2024",
      excerpt: "Signature d'un accord de partenariat avec l'Institut de Management Public pour renforcer nos capacités.",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=500&fit=crop",
      category: "Partenariat"
    },
    {
      title: "Programme de Formation Continue 2024",
      date: "5 Mars 2024",
      excerpt: "Lancement du programme de formation continue pour nos membres avec des modules spécialisés.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop",
      category: "Formation"
    },
    {
      title: "Régionale de l'Ouest 2024",
      date: "28 Février 2024",
      excerpt: "Rencontre régionale réussie avec plus de 50 membres présents à Man.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop",
      category: "Régionale"
    },
    {
      title: "Reconnaissance Internationale",
      date: "20 Février 2024",
      excerpt: "Notre réseau reconnu par l'IIAS comme modèle de coopération entre énarques.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=500&fit=crop",
      category: "Reconnaissance"
    }
  ];

  useEffect(() => {
    const newsInterval = setInterval(() => {
      setCurrentNewsIndex(prevIndex => (prevIndex + 1) % newsItems.length);
    }, 4000);
    return () => clearInterval(newsInterval);
  }, []);

  return (
    <section className="bg-accent/30 px-[100px] py-[100px]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-primary text-3xl font-bold">{t('home.news_title')}</h2>
          <Link to="/actualites" className="text-primary hover:text-secondary/80 flex items-center">
            Voir tout <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          {newsItems.map((item, index) => (
            <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentNewsIndex ? 'opacity-100' : 'opacity-0'}`}>
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="max-w-2xl">
                  <span className="inline-block bg-primary px-3 py-1 rounded-full text-sm font-semibold mb-3 text-white">
                    {item.category}
                  </span>
                  <h3 className="text-3xl font-bold mb-3">{item.title}</h3>
                  <p className="text-lg mb-4 opacity-90 text-white">{item.excerpt}</p>
                  <div className="flex items-center text-sm opacity-75">
                    <Clock className="w-4 h-4 mr-2" />
                    {item.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Navigation dots */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            {newsItems.map((_, index) => (
              <button key={index} onClick={() => setCurrentNewsIndex(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentNewsIndex ? 'bg-secondary' : 'bg-white/50'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsCarousel;
