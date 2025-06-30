import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Users, PartyPopper, Heart, Gift, Star, Award } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
const EvenementsHeureux = () => {
  const isMobile = useIsMobile();
  const heureuxEvents = [{
    id: '1',
    eventType: 'Heureux',
    category: 'Naissances',
    title: 'Naissance de bébé Marie',
    memberName: 'Famille Kouassi',
    date: '2024-01-15',
    location: 'Abidjan',
    description: 'Nous avons la joie d\'annoncer la naissance de Marie, un petit ange qui illumine déjà la famille.',
    thought: 'Félicitations aux heureux parents ! Que cette petite merveille vous apporte joie et bonheur.',
    keyword: 'Naissances',
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=250&fit=crop"
  }, {
    id: '2',
    eventType: 'Heureux',
    category: 'Promotions',
    title: 'Promotion au grade de Directeur',
    memberName: 'M. Yao Kouadio',
    date: '2024-02-10',
    location: 'Yamoussoukro',
    description: 'M. Yao Kouadio a été promu au grade de Directeur des Ressources Humaines suite à son excellent travail.',
    thought: 'Félicitations pour cette promotion bien méritée ! Votre dévouement est enfin récompensé.',
    keyword: 'Promotions',
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
  }, {
    id: '3',
    eventType: 'Heureux',
    category: 'Distinctions',
    title: 'Médaille d\'honneur du travail',
    memberName: 'Mme Akissi Brou',
    date: '2024-01-25',
    location: 'Abidjan',
    description: 'Mme Akissi Brou a reçu la médaille d\'honneur du travail pour ses 25 années de service exemplaire.',
    thought: 'Un honneur bien mérité ! Votre engagement inspire toute notre communauté.',
    keyword: 'Distinctions',
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop"
  }, {
    id: '4',
    eventType: 'Heureux',
    category: 'Naissances',
    title: 'Naissance des jumeaux Paul et Pierre',
    memberName: 'Famille Diabaté',
    date: '2024-02-05',
    location: 'Bouaké',
    description: 'Double bonheur pour la famille Diabaté avec l\'arrivée des jumeaux Paul et Pierre.',
    thought: 'Quelle joie immense ! Que ces deux petits anges grandissent en bonne santé.',
    keyword: 'Naissances',
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=250&fit=crop"
  }];
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Naissances':
        return Gift;
      case 'Promotions':
        return Star;
      case 'Distinctions':
        return Award;
      default:
        return PartyPopper;
    }
  };
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Naissances':
        return 'border-l-pink-500 bg-pink-50';
      case 'Promotions':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'Distinctions':
        return 'border-l-purple-500 bg-purple-50';
      default:
        return 'border-l-green-500 bg-green-50';
    }
  };
  return <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section with Background Image */}
        <section className={`relative ${isMobile ? 'h-[30vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
          <div className="absolute inset-0">
            <img src="/lovable-uploads/bc525a09-b8a2-469f-b451-2f78bc437b6e.png" alt="Background événements heureux" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
            
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold mb-4 md:mb-6 animate-fade-in`}>
              Événements Heureux
            </h1>
            <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
              Célébrons ensemble les moments de joie, les réussites et les bonheurs qui illuminent notre communauté
            </p>
          </div>
        </section>

        {/* Events Section */}
        <section className={`py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-primary mb-4`}>Nos moments de bonheur</h2>
              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 max-w-2xl mx-auto`}>
                Partageons la joie des naissances, célébrons les promotions et honorons les distinctions de nos membres.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {heureuxEvents.map(event => {
              const IconComponent = getCategoryIcon(event.category);
              return <Card key={event.id} className={`overflow-hidden hover:shadow-xl transition-shadow duration-300 border-l-4 ${getCategoryColor(event.category)}`}>
                    <div className="aspect-video overflow-hidden">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <CardHeader>
                      <CardTitle className={`text-green-800 ${isMobile ? 'text-lg' : 'text-xl'} flex items-center`}>
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
                      <p className={`text-gray-700 ${isMobile ? 'text-sm' : 'text-base'} mb-3`}>{event.description}</p>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm"><strong>Catégorie:</strong> {event.category}</p>
                        <p className="text-sm"><strong>Mot-clé:</strong> {event.keyword}</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg border-l-2 border-green-200">
                        <p className={`${isMobile ? 'text-sm' : 'text-base'} text-green-800 italic`}>
                          <Heart className="h-3 w-3 inline mr-1" />
                          {event.thought}
                        </p>
                      </div>
                    </CardContent>
                  </Card>;
            })}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className={`bg-green-50 py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center text-primary mb-12`}>
              Nos bonheurs en chiffres
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-6 bg-white">
                <Gift className="w-12 h-12 mx-auto mb-4 text-pink-600" />
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-pink-800 mb-2`}>12</h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-pink-700`}>Naissances cette année</p>
              </Card>
              <Card className="text-center p-6 bg-white">
                <Star className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-yellow-800 mb-2`}>8</h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-yellow-700`}>Promotions célébrées</p>
              </Card>
              <Card className="text-center p-6 bg-white">
                <Award className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-purple-800 mb-2`}>5</h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-purple-700`}>Distinctions honorées</p>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </Layout>;
};
export default EvenementsHeureux;