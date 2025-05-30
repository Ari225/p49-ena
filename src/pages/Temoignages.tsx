
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

const Temoignages = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const testimonials = [
    {
      name: "Dr. Kouassi Marie",
      position: "Directrice Générale, Ministère de l'Économie",
      quote: "Le réseau P49 m'a permis de développer mes compétences et de créer des liens durables avec des professionnels exceptionnels. C'est une communauté qui valorise l'excellence et l'entraide.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b047?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "M. Yao Jean-Baptiste",
      position: "Préfet de Région",
      quote: "Une communauté exceptionnelle qui favorise l'excellence dans le service public. Les formations et les échanges nous permettent de mieux servir nos concitoyens.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Mme. Touré Fatou",
      position: "Directrice des Ressources Humaines",
      quote: "L'entraide et la solidarité de la P49 sont remarquables. Un vrai réseau de soutien qui nous accompagne dans nos défis professionnels et personnels.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Dr. Diallo Mamadou",
      position: "Conseiller du Président",
      quote: "La formation continue proposée par le réseau est de très haute qualité. Elle nous permet de rester à la pointe des meilleures pratiques administratives.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Mme. Kone Awa",
      position: "Secrétaire Générale de Ministère",
      quote: "Les échanges d'expériences enrichissent notre pratique professionnelle quotidienne. C'est un réseau qui nous fait grandir ensemble.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "M. Bamba Seydou",
      position: "Sous-Préfet",
      quote: "Un réseau qui nous unit au-delà des fonctions, une vraie famille professionnelle. L'esprit de corps de la P49 est exemplaire.",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Dr. Assi Brigitte",
      position: "Directrice de Cabinet",
      quote: "Les mentors de la P49 m'ont accompagnée dans ma progression de carrière. Leur guidance a été déterminante dans mon parcours professionnel.",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "M. Kouakou Ernest",
      position: "Ambassadeur",
      quote: "L'excellence de la P49 rayonne bien au-delà de nos frontières nationales. Nous sommes fiers de représenter cette promotion à l'international.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Mme. Ouattara Salimata",
      position: "Inspectrice Générale",
      quote: "La P49 incarne les valeurs de service public et d'intégrité. C'est un modèle pour les futures générations d'administrateurs.",
      image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "M. Traoré Ibrahim",
      position: "Gouverneur",
      quote: "Fier d'appartenir à cette promotion qui marque l'histoire de l'administration ivoirienne. Notre impact sur le développement du pays est significatif.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const filteredTestimonials = testimonials.filter(testimonial =>
    testimonial.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <section className="bg-primary text-white py-16 px-[100px]">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Témoignages</h1>
            <p className="text-xl opacity-90">
              Découvrez ce que nos membres disent de leur expérience au sein de la P49
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8 px-[100px] bg-accent/20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Rechercher par nom..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-12 px-[100px]">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <p className="text-gray-600">
                {filteredTestimonials.length} témoignage{filteredTestimonials.length > 1 ? 's' : ''} trouvé{filteredTestimonials.length > 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTestimonials.map((testimonial, index) => (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start space-x-4 mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-16 h-16 rounded-full object-cover flex-shrink-0" 
                      />
                      <div>
                        <h3 className="font-semibold text-primary">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.position}</p>
                      </div>
                    </div>
                    <p className="italic text-gray-700 flex-1">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredTestimonials.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Aucun témoignage trouvé pour cette recherche.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Temoignages;
