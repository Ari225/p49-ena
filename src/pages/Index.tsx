import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import Layout from '@/components/Layout';
import PresidentWelcomeModal from '@/components/PresidentWelcomeModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Calendar, Users, FileText, BookOpen, Camera, ChevronRight, Award, MapPin, Briefcase, GraduationCap, Heart, Clock, Handshake, Activity, Zap, Shield } from 'lucide-react';
const Index = () => {
  const {
    t
  } = useLanguage();
  const backgroundImages = ['/lovable-uploads/b85cd7b2-67e0-481b-9dec-dd22369d51c0.png', '/lovable-uploads/d0535478-3ab2-4846-a655-f5cd50daa143.png', '/lovable-uploads/de98936e-ecc5-4568-8c53-32bd57058a99.png'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);
  useEffect(() => {
    const newsInterval = setInterval(() => {
      setCurrentNewsIndex(prevIndex => (prevIndex + 1) % newsItems.length);
    }, 4000);
    return () => clearInterval(newsInterval);
  }, []);
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonialIndex(prevIndex => (prevIndex + 1) % (testimonials.length - 2));
    }, 5000);
    return () => clearInterval(testimonialInterval);
  }, []);
  const newsItems = [{
    title: "Assemblée Générale 2024",
    date: "15 Mars 2024",
    excerpt: "La prochaine assemblée générale aura lieu le 30 mars 2024 à l'hôtel Ivoire.",
    image: "https://images.unsplash.com/photo-1559223607-a43c990c692f?w=800&h=500&fit=crop",
    category: "Événement"
  }, {
    title: "Nouveau Partenariat Stratégique",
    date: "10 Mars 2024",
    excerpt: "Signature d'un accord de partenariat avec l'Institut de Management Public pour renforcer nos capacités.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=500&fit=crop",
    category: "Partenariat"
  }, {
    title: "Programme de Formation Continue 2024",
    date: "5 Mars 2024",
    excerpt: "Lancement du programme de formation continue pour nos membres avec des modules spécialisés.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop",
    category: "Formation"
  }, {
    title: "Régionale de l'Ouest 2024",
    date: "28 Février 2024",
    excerpt: "Rencontre régionale réussie avec plus de 50 membres présents à Man.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop",
    category: "Régionale"
  }, {
    title: "Reconnaissance Internationale",
    date: "20 Février 2024",
    excerpt: "Notre réseau reconnu par l'IIAS comme modèle de coopération entre énarques.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=500&fit=crop",
    category: "Reconnaissance"
  }];
  const galleryImages = ["https://images.unsplash.com/photo-1559223607-a43c990c692f?w=300&h=200&fit=crop", "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=200&fit=crop", "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300&h=200&fit=crop", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop", "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=200&fit=crop", "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop"];
  const achievements = [{
    number: "800+",
    title: "Membres",
    description: "appartenant au Réseau"
  }, {
    number: "15",
    title: "Années",
    description: "d'excellence et d'entraide"
  }, {
    number: "50+",
    title: "Événements Organisés",
    description: "Régionales, formations et réunions"
  }, {
    number: "12",
    title: "Régions Représentées",
    description: "sur le territoire ivoirien"
  }];
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
  }, {
    name: "Dr. Assi Brigitte",
    position: "Directrice de Cabinet",
    quote: "Les mentors de la P49 m'ont accompagnée dans ma progression de carrière.",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=100&h=100&fit=crop&crop=face"
  }, {
    name: "M. Kouakou Ernest",
    position: "Ambassadeur",
    quote: "L'excellence de la P49 rayonne bien au-delà de nos frontières nationales.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
  }, {
    name: "Mme. Ouattara Salimata",
    position: "Inspectrice Générale",
    quote: "La P49 incarne les valeurs de service public et d'intégrité.",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop&crop=face"
  }, {
    name: "M. Traoré Ibrahim",
    position: "Gouverneur",
    quote: "Fier d'appartenir à cette promotion qui marque l'histoire de l'administration ivoirienne.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face"
  }];
  const values = [{
    title: "Connexion",
    description: "Maintenir des liens solides entre tous les membres du réseau",
    icon: Handshake
  }, {
    title: "Action",
    description: "Agir ensemble pour le développement et l'excellence",
    icon: Zap
  }, {
    title: "Solidarité",
    description: "Soutenir et accompagner chaque membre dans sa carrière",
    icon: Heart
  }, {
    title: "Dévouement",
    description: "Servir avec engagement au profit de la nation",
    icon: Shield
  }];
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentTestimonialIndex + i) % testimonials.length;
      visible.push({
        ...testimonials[index],
        position: i
      });
    }
    return visible;
  };
  return <Layout>
      <PresidentWelcomeModal />
      
      {/* Hero Section with Background Carousel */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background Images Carousel */}
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}>
              <img src={image} alt={`Background ${index + 1}`} className="w-full h-full object-cover" />
            </div>)}
          <div className="absolute inset-0 bg-primary/50"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center w-full px-[100px] my-0 py-0">
          <h1 className="text-4xl font-bold mb-6 animate-fade-in md:text-6xl">
            {t('home.hero_title')}
          </h1>
          <p className="text-xl md:text-2xl italic mb-8 animate-fade-in text-white">
            {t('home.hero_subtitle')}
          </p>
          <Button asChild className="bg-secondary text-primary hover:bg-secondary/90 font-semibold px-8 py-3 text-lg">
            <Link to="/historique" className="text-white">Découvrir notre histoire</Link>
          </Button>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white px-[100px] py-[100px]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center text-primary mb-12 font-bold">Valeurs de la P49</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-[#dfbe36]/[0.43]">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-primary mb-3 text-lg">{value.title}</h3>
                <p className="text-sm leading-relaxed text-gray-700">{value.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* News Carousel Section */}
      <section className="bg-accent/30 px-[100px] py-[100px]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-primary text-3xl font-bold">{t('home.news_title')}</h2>
            <Link to="/actualites" className="text-primary hover:text-secondary/80 flex items-center">
              Voir tout <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            {newsItems.map((item, index) => <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentNewsIndex ? 'opacity-100' : 'opacity-0'}`}>
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
              </div>)}
            
            {/* Navigation dots */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              {newsItems.map((_, index) => <button key={index} onClick={() => setCurrentNewsIndex(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentNewsIndex ? 'bg-secondary' : 'bg-white/50'}`} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="bg-primary text-white py-[50px] px-[100px]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => <div key={index} className="text-center">
                <div className="text-3xl md:text-3xl font-bold text-secondary mb-2">
                  {achievement.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                <p className="text-white/80">{achievement.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Communiques Section */}
      <section className="bg-white px-[100px] py-[100px]">
        <div className="container mx-auto px-0">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-primary">{t('home.communiques_title')}</h2>
            <Link to="/communiques" className="text-primary hover:text-secondary/80 flex items-center">
              Voir tout <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="flex gap-8">
            {/* Image container on the left with A4 aspect ratio */}
            <div className="w-[500px] bg-white">
              <div className="w-[500px] bg-white shadow-xl p-6">
                <img alt="Communiqué" src="/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg" className="w-full h-auto rounded-lg object-contain" />
              </div>
            </div>
            {/* Communiqués stacked on the right */}
            <div className="flex-1 space-y-4">
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-red-800 mb-2 text-lg">Communiqué urgent</h3>
                  <p className="text-sm text-red-600">Report de l'événement prévu le 25 mars 2024.</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-blue-800 mb-2 text-lg">Nouvelle inscription</h3>
                  <p className="text-sm text-blue-600">Ouverture des inscriptions pour la formation de mars.</p>
                </CardContent>
              </Card>
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-green-800 mb-2 text-lg">Félicitations</h3>
                  <p className="text-sm text-green-600">Promotion de plusieurs membres à de nouveaux postes.</p>
                </CardContent>
              </Card>
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-purple-800 mb-2 text-lg">Communiqué de presse</h3>
                  <p className="text-sm text-purple-600">Publication des résultats du dernier concours interne.</p>
                </CardContent>
              </Card>
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-orange-800 mb-2 text-lg">Communiqué ENA</h3>
                  <p className="text-sm text-orange-600">Nouvelles directives pour les formations continues.</p>
                </CardContent>
              </Card>
              <Card className="bg-indigo-50 border-indigo-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-indigo-800 mb-2 text-lg">Communiqué P49</h3>
                  <p className="text-sm text-indigo-600">Assemblée générale extraordinaire du réseau P49.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-accent/30 py-[100px] px-[100px]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
            <div className="lg:w-1/3">
              <img src="/lovable-uploads/a668606d-be7a-45cb-a8ce-e322a78234e8.png" alt="P49 ENA Logo" className="w-60 h-60 mx-auto object-contain" />
            </div>
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">{t('home.about_title')}</h2>
              <p className="text-gray-700 leading-relaxed mb-6 text-base text-justify">
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
      <section className="bg-white py-[100px] px-[100px]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Nos rubriques</h2>
          <div className="grid grid-cols-5 gap-6">
            <Card className="hover:shadow-xl transition-shadow duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors bg-[#dfbe36]/[0.43]">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-primary text-lg">{t('header.presentation')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Découvrez l'histoire, la structure et les membres de notre réseau.
                </p>
                <Link to="/historique" className="text-primary hover:text-secondary/80 font-medium">
                  Explorer →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors bg-[#dfbe36]/[0.43]">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-primary text-lg">{t('header.activities')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Agenda, événements régionaux et assemblées générales.
                </p>
                <Link to="/agenda" className="text-primary hover:text-secondary/80 font-medium">
                  Explorer →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors bg-[#dfbe36]/[0.43]">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg text-primary">{t('header.social_events')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Événements heureux, départs à la retraite et nécrologie.
                </p>
                <Link to="/evenements-heureux" className="text-primary hover:text-secondary/80 font-medium">
                  Explorer →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors bg-[#dfbe36]/[0.43]">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-primary text-lg">{t('header.careers')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Formations, coaching et actualités des concours.
                </p>
                <Link to="/formations" className="text-primary hover:text-secondary/80 font-medium">
                  Explorer →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors bg-[#dfbe36]/[0.43]">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-primary text-lg">{t('header.perspectives')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Notre journal, actualités et archives.
                </p>
                <Link to="/derniere-edition" className="text-primary hover:text-secondary/80 font-medium">
                  Explorer →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Auto-sliding Carousel */}
      <section className="bg-accent/30 py-[100px] px-[100px]">
        <div className="container mx-auto px-0">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Témoignages</h2>
          <Carousel opts={{
          align: "start",
          loop: true
        }} className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/3">
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
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Journal Section */}
      <section className="bg-white py-[100px] px-[100px]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Notre Journal</h2>
          <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
            <div className="lg:w-1/3">
              <div className="bg-gradient-to-br from-primary to-primary/80 p-8 rounded-lg shadow-xl px-0 py-0">
                <div className="bg-white p-6 rounded-lg">
                  <img src="/lovable-uploads/ec8d10e9-3108-4b8f-9db7-6734f1399fcc.png" alt="Perspectives 49 Journal" className="w-full h-auto object-contain" />
                </div>
              </div>
            </div>
            <div className="lg:w-2/3">
              <h3 className="text-2xl font-bold text-primary mb-6">Perspectives 49 - Bulletin n°1</h3>
              <p className="text-gray-700 leading-relaxed mb-6 text-justify">
                Ce premier numéro de Perspectives 49 inaugure un journal d'information engagé, ancré dans les réalités locales et soucieux de valoriser les initiatives citoyennes.

                Le bulletin s'organise autour de quatre rubriques principales. La rubrique Actualités citoyennes propose un décryptage des faits marquants et des enjeux sociaux. Le Dossier spécial offre un éclairage sur l'entrepreneuriat des jeunes et les dynamiques économiques émergentes. La rubrique Vie associative met en avant les actions communautaires et les projets de terrain. Enfin, Culture & expressions valorise les talents locaux et les pratiques artistiques.

                Avec une approche rigoureuse et accessible, Perspectives 49 ambitionne d'informer, de questionner et d'inspirer.
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
      <section className="bg-accent/30 py-[100px] px-[100px]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-primary">Galerie Photos</h2>
            <Link to="/galerie" className="text-primary hover:text-secondary/80 flex items-center">
              <Camera className="mr-2 h-5 w-5" />
              Voir plus
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