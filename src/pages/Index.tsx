import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import Layout from '@/components/Layout';
import PresidentWelcomeModal from '@/components/PresidentWelcomeModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, FileText, BookOpen, Camera, ChevronRight } from 'lucide-react';
const Index = () => {
  const {
    t
  } = useLanguage();
  const backgroundImages = ['/lovable-uploads/b85cd7b2-67e0-481b-9dec-dd22369d51c0.png', '/lovable-uploads/d0535478-3ab2-4846-a655-f5cd50daa143.png', '/lovable-uploads/de98936e-ecc5-4568-8c53-32bd57058a99.png'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);
  const newsItems = [{
    title: "Assemblée Générale 2024",
    date: "15 Mars 2024",
    excerpt: "La prochaine assemblée générale aura lieu le 30 mars 2024 à l'hôtel Ivoire.",
    image: "https://images.unsplash.com/photo-1559223607-a43c990c692f?w=400&h=250&fit=crop"
  }, {
    title: "Nouveau Partenariat",
    date: "10 Mars 2024",
    excerpt: "Signature d'un accord de partenariat avec l'Institut de Management Public.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=250&fit=crop"
  }, {
    title: "Formation Continue",
    date: "5 Mars 2024",
    excerpt: "Lancement du programme de formation continue pour nos membres.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop"
  }];
  const galleryImages = ["https://images.unsplash.com/photo-1559223607-a43c990c692f?w=300&h=200&fit=crop", "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=200&fit=crop", "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300&h=200&fit=crop", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop", "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=200&fit=crop", "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop"];
  return <Layout>
      <PresidentWelcomeModal />
      
      {/* Hero Section with Background Carousel */}
      <section className="relative h-[70vh] flex items-center justify-center text-white overflow-hidden">
        {/* Background Images Carousel */}
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-30' : 'opacity-0'}`}>
              <img src={image} alt={`Background ${index + 1}`} className="w-full h-full object-cover" />
            </div>)}
          <div className="flex bg-[#192130]/65 my-0 py-0"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-[100px] py-0 my-[240px]">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            {t('home.hero_title')}
          </h1>
          <p className="text-xl md:text-2xl italic mb-8 text-secondary animate-fade-in">
            {t('home.hero_subtitle')}
          </p>
          <Button asChild className="bg-secondary text-primary hover:bg-secondary/90 font-semibold px-8 py-3 text-lg">
            <Link to="/historique">Découvrir notre histoire</Link>
          </Button>
        </div>
      </section>

      {/* News and Communiques Section */}
      <section className="py-16 bg-accent/30 px-[100px]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* News */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-primary">{t('home.news_title')}</h2>
                <Link to="/actualites" className="text-secondary hover:text-secondary/80 flex items-center">
                  Voir tout <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-6">
                {newsItems.map((item, index) => <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex space-x-4">
                        <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-primary mb-2">{item.title}</h3>
                          <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                          <p className="text-gray-600 text-sm">{item.excerpt}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </div>

            {/* Communiques */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-primary">{t('home.communiques_title')}</h2>
                <Link to="/communiques" className="text-secondary hover:text-secondary/80 flex items-center">
                  Voir tout <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-4">
                <Card className="bg-red-50 border-red-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-red-800 mb-2">Communiqué Urgent</h3>
                    <p className="text-sm text-red-600">Report de l'événement prévu le 25 mars 2024.</p>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-blue-800 mb-2">Nouvelle Inscription</h3>
                    <p className="text-sm text-blue-600">Ouverture des inscriptions pour la formation de mars.</p>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-green-800 mb-2">Félicitations</h3>
                    <p className="text-sm text-green-600">Promotion de plusieurs membres à de nouveaux postes.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white px-[100px]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
            <div className="lg:w-1/3">
              <img src="/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png" alt="P49 ENA Logo" className="w-40 h-40 mx-auto object-contain" />
            </div>
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold text-primary mb-6">{t('home.about_title')}</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-6 text-justify">
                {t('home.about_description')}
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/historique">En savoir plus</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Site Sections */}
      <section className="py-16 bg-accent/30 px-[100px]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Explorez nos Rubriques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-primary">{t('header.presentation')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Découvrez l'histoire, la structure et les membres de notre réseau.
                </p>
                <Link to="/historique" className="text-secondary hover:text-secondary/80 font-medium">
                  Explorer →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-primary">{t('header.activities')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Agenda, événements régionaux et assemblées générales.
                </p>
                <Link to="/agenda" className="text-secondary hover:text-secondary/80 font-medium">
                  Explorer →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-primary">{t('header.careers')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Formations, coaching et actualités des concours.
                </p>
                <Link to="/formations" className="text-secondary hover:text-secondary/80 font-medium">
                  Explorer →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Journal Section */}
      <section className="py-16 bg-white px-[100px]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Perspectives 49 - Notre Journal</h2>
          <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
            <div className="lg:w-1/3">
              <div className="bg-gradient-to-br from-primary to-primary/80 p-8 rounded-lg shadow-xl">
                <div className="bg-white p-6 rounded-lg">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-primary mb-2">PERSPECTIVES 49</h3>
                    <div className="text-lg text-secondary font-semibold mb-4">Édition Mars 2024</div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>• Interview exclusive</p>
                      <p>• Dossier spécial réforme</p>
                      <p>• Carrières et nominations</p>
                      <p>• Vie du réseau</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-2/3">
              <h3 className="text-2xl font-bold text-primary mb-6">Notre Publication Trimestrielle</h3>
              <p className="text-gray-700 leading-relaxed mb-6 text-justify">
                Perspectives 49 est le journal officiel de notre réseau, publié chaque trimestre. 
                Il présente les actualités de nos membres, les analyses sur l'administration publique, 
                les interviews d'experts et les événements marquants de notre communauté.
              </p>
              <div className="flex space-x-4">
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link to="/derniere-edition">Dernière édition</Link>
                </Button>
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  <Link to="/archives">Archives</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-accent/30 px-[100px]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-primary">Galerie Photos</h2>
            <Link to="/galerie" className="text-secondary hover:text-secondary/80 flex items-center">
              <Camera className="mr-2 h-5 w-5" />
              Voir toutes les photos
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryImages.map((image, index) => <div key={index} className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>)}
          </div>
        </div>
      </section>
    </Layout>;
};
export default Index;