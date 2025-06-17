
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Users, Clock, Heart, PartyPopper } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const EvenementsSociaux = () => {
  const isMobile = useIsMobile();

  const heureuxEvents = [
    {
      id: '1',
      eventType: 'Heureux',
      category: 'Naissances',
      title: 'Naissance de bébé Marie',
      memberName: 'Famille Kouassi',
      date: '2024-01-15',
      location: 'Abidjan',
      description: 'Nous avons la joie d\'annoncer la naissance de Marie.',
      thought: 'Félicitations aux heureux parents !',
      keyword: 'Naissances',
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=250&fit=crop"
    },
    {
      id: '2',
      eventType: 'Heureux',
      category: 'Promotions',
      title: 'Promotion au grade de Directeur',
      memberName: 'M. Yao Kouadio',
      date: '2024-02-10',
      location: 'Yamoussoukro',
      description: 'M. Yao Kouadio a été promu au grade de Directeur.',
      thought: 'Félicitations pour cette promotion bien méritée !',
      keyword: 'Promotions',
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
    }
  ];

  const retraiteEvents = [
    {
      id: '3',
      eventType: 'Retraite',
      category: 'Retraite',
      title: 'Départ en retraite de M. Koffi',
      memberName: 'M. Jean Koffi',
      yearsOfService: '35 ans de service',
      date: '2024-02-01',
      location: 'Bouaké',
      description: 'Après 35 années de service dévoué, M. Koffi prend sa retraite.',
      thought: 'Nous lui souhaitons une retraite heureuse et épanouie !',
      keyword: 'Retraite',
      image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=250&fit=crop"
    }
  ];

  const malheureuxEvents = [
    {
      id: '4',
      eventType: 'Malheureux',
      category: 'Décès',
      title: 'Décès de Mme Adjoua',
      memberName: 'Famille Adjoua',
      date: '2024-01-20',
      location: 'Daloa',
      description: 'C\'est avec tristesse que nous annonçons le décès de Mme Adjoua.',
      thought: 'Nos pensées accompagnent la famille en ces moments difficiles.',
      keyword: 'Décès',
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop"
    }
  ];

  const allEvents = [...heureuxEvents, ...retraiteEvents, ...malheureuxEvents];

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'Heureux': return PartyPopper;
      case 'Retraite': return Users;
      case 'Malheureux': return Heart;
      default: return Calendar;
    }
  };

  const getEventColor = (eventType: string) => {
    switch (eventType) {
      case 'Heureux': return 'border-l-green-500 bg-green-50';
      case 'Retraite': return 'border-l-blue-500 bg-blue-50';
      case 'Malheureux': return 'border-l-gray-500 bg-gray-50';
      default: return 'border-l-gray-400 bg-gray-50';
    }
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <section className={`bg-primary text-white py-20 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Événements Sociaux</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Partageons ensemble nos joies, nos peines et nos moments importants au sein de notre communauté
            </p>
          </div>
        </section>

        {/* All Events Section */}
        <section className={`py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">
              Tous nos événements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allEvents.map((event) => {
                const IconComponent = getEventIcon(event.eventType);
                return (
                  <Card key={event.id} className={`overflow-hidden hover:shadow-xl transition-shadow duration-300 border-l-4 ${getEventColor(event.eventType)}`}>
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-primary text-lg flex items-center">
                        <IconComponent className="w-5 h-5 mr-2" />
                        {event.title}
                      </CardTitle>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(event.date).toLocaleDateString('fr-FR')}
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
                        <p className="text-sm"><strong>Type:</strong> {event.eventType}</p>
                        <p className="text-sm"><strong>Catégorie:</strong> {event.category}</p>
                        {(event as any).yearsOfService && (
                          <p className="text-sm"><strong>Années de service:</strong> {(event as any).yearsOfService}</p>
                        )}
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

        {/* Categories Navigation */}
        <section className={`bg-accent/30 py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary mb-8">
              Explorer par catégorie
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a href="/evenements-heureux" className="block">
                <Card className="hover:shadow-lg transition-shadow duration-300 bg-green-50 border-green-200">
                  <CardContent className="p-6 text-center">
                    <PartyPopper className="w-12 h-12 mx-auto mb-4 text-green-600" />
                    <h3 className="text-xl font-bold text-green-800 mb-2">Événements Heureux</h3>
                    <p className="text-green-700">Naissances, promotions, distinctions</p>
                  </CardContent>
                </Card>
              </a>
              <a href="/departs-retraite" className="block">
                <Card className="hover:shadow-lg transition-shadow duration-300 bg-blue-50 border-blue-200">
                  <CardContent className="p-6 text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-xl font-bold text-blue-800 mb-2">Départs en Retraite</h3>
                    <p className="text-blue-700">Célébrons nos retraités</p>
                  </CardContent>
                </Card>
              </a>
              <a href="/evenements-difficiles" className="block">
                <Card className="hover:shadow-lg transition-shadow duration-300 bg-gray-50 border-gray-200">
                  <CardContent className="p-6 text-center">
                    <Heart className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Événements Difficiles</h3>
                    <p className="text-gray-700">Soutien et compassion</p>
                  </CardContent>
                </Card>
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default EvenementsSociaux;
