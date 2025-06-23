import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Users, Heart, AlertCircle, Stethoscope, Car } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const EvenementsDifficiles = () => {
  const isMobile = useIsMobile();

  const difficileEvents = [
    {
      id: '1',
      eventType: 'Malheureux',
      category: 'Décès',
      title: 'Décès de Mme Adjoua Kone',
      memberName: 'Famille Kone',
      date: '2024-01-20',
      location: 'Daloa',
      description: 'C\'est avec une profonde tristesse que nous annonçons le décès de Mme Adjoua Kone, survenu après une longue maladie.',
      thought: 'Nos pensées et nos prières accompagnent la famille en ces moments difficiles. Que son âme repose en paix.',
      keyword: 'Décès',
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop"
    },
    {
      id: '2',
      eventType: 'Malheureux',
      category: 'Maladies',
      title: 'Hospitalisation de M. Kouakou',
      memberName: 'M. Kouakou Assi',
      date: '2024-02-15',
      location: 'Abidjan',
      description: 'M. Kouakou Assi est actuellement hospitalisé suite à des complications de santé. Il se bat courageusement.',
      thought: 'Nous lui souhaitons un prompt rétablissement et envoyons nos pensées à sa famille.',
      keyword: 'Maladies',
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop"
    },
    {
      id: '3',
      eventType: 'Malheureux',
      category: 'Accidents',
      title: 'Accident de la route de M. Bamba',
      memberName: 'M. Seydou Bamba',
      date: '2024-01-30',
      location: 'Bouaké',
      description: 'M. Seydou Bamba a été victime d\'un accident de la circulation. Il est actuellement en convalescence.',
      thought: 'Nous sommes soulagés qu\'il soit hors de danger et lui souhaitons une guérison rapide.',
      keyword: 'Accidents',
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop"
    },
    {
      id: '4',
      eventType: 'Malheureux',
      category: 'Décès',
      title: 'Décès du père de Mme Yao',
      memberName: 'Famille Yao',
      date: '2024-02-10',
      location: 'Yamoussoukro',
      description: 'Nous compatissons avec Mme Yao suite au décès de son père bien-aimé.',
      thought: 'Nos condoléances les plus sincères à Mme Yao et à toute sa famille.',
      keyword: 'Décès',
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Décès': return Heart;
      case 'Maladies': return Stethoscope;
      case 'Accidents': return Car;
      default: return AlertCircle;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Décès': return 'border-l-gray-500 bg-gray-50';
      case 'Maladies': return 'border-l-red-500 bg-red-50';
      case 'Accidents': return 'border-l-orange-500 bg-orange-50';
      default: return 'border-l-gray-400 bg-gray-50';
    }
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <section className={`relative ${isMobile ? 'h-[30vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/8686ede3-f750-45db-a93e-c58913dc701e.png" 
              alt="Background événements difficiles" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
            <Heart className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12 md:w-16 md:h-16'} mx-auto mb-4 md:mb-6`} />
            <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'} font-bold mb-2 md:mb-4 animate-fade-in`}>
              Événements Difficiles
            </h1>
            <p className={`${isMobile ? 'text-sm' : 'text-lg md:text-xl'} italic mb-4 md:mb-6 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
              Dans les moments difficiles, nous nous serrons les coudes et apportons notre soutien à ceux qui en ont besoin
            </p>
          </div>
        </section>

        {/* Events Section */}
        <section className={`py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Soutien et compassion</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Exprimons notre solidarité et notre compassion envers nos membres qui traversent des épreuves difficiles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {difficileEvents.map((event) => {
                const IconComponent = getCategoryIcon(event.category);
                return (
                  <Card key={event.id} className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 border-l-4 ${getCategoryColor(event.category)}`}>
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-gray-800 text-lg flex items-center">
                        <IconComponent className="w-5 h-5 mr-2" />
                        {event.title}
                      </CardTitle>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(event.date).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {event.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          {event.memberName}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-sm mb-3">{event.description}</p>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm"><strong>Catégorie:</strong> {event.category}</p>
                        <p className="text-sm"><strong>Mot-clé:</strong> {event.keyword}</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg border-l-2 border-blue-200">
                        <p className="text-sm text-gray-700 italic">
                          <Heart className="h-3 w-3 inline mr-1" />
                          {event.thought}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className={`bg-gray-50 py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">
              Notre soutien
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-6 bg-white">
                <Heart className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Solidarité</h3>
                <p className="text-gray-700">Nous sommes là pour nos membres dans les moments difficiles</p>
              </Card>
              <Card className="text-center p-6 bg-white">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Communauté</h3>
                <p className="text-gray-700">Une famille unie qui se soutient mutuellement</p>
              </Card>
              <Card className="text-center p-6 bg-white">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Assistance</h3>
                <p className="text-gray-700">Aide et accompagnement dans les épreuves</p>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default EvenementsDifficiles;
