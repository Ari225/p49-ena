import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Users, Heart, Clock, Trophy } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const DepartsRetraite = () => {
  const isMobile = useIsMobile();

  const retraiteEvents = [
    {
      id: '1',
      eventType: 'Retraite',
      category: 'Retraite',
      title: 'Départ en retraite de M. Jean Koffi',
      memberName: 'M. Jean Koffi',
      yearsOfService: '35 ans de service',
      date: '2024-02-01',
      location: 'Bouaké',
      description: 'Après 35 années de service dévoué au sein de l\'administration, M. Jean Koffi prend une retraite bien méritée.',
      thought: 'Nous lui souhaitons une retraite heureuse et épanouie ! Merci pour tout ce que vous avez apporté.',
      keyword: 'Retraite',
      image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=250&fit=crop"
    },
    {
      id: '2',
      eventType: 'Retraite',
      category: 'Retraite',
      title: 'Départ en retraite de Mme Adjoua Koffi',
      memberName: 'Mme Adjoua Koffi',
      yearsOfService: '30 ans de service',
      date: '2024-01-20',
      location: 'Abidjan',
      description: 'Mme Adjoua Koffi termine sa carrière après 30 années d\'excellence dans ses fonctions.',
      thought: 'Votre dévouement restera gravé dans nos mémoires. Profitez pleinement de cette nouvelle étape !',
      keyword: 'Retraite',
      image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=250&fit=crop"
    },
    {
      id: '3',
      eventType: 'Retraite',
      category: 'Retraite',
      title: 'Départ en retraite de M.Konan Yao',
      memberName: 'M. Konan Yao',
      yearsOfService: '40 ans de service',
      date: '2024-03-15',
      location: 'Yamoussoukro',
      description: 'Après 4 décennies de service exemplaire, M. Konan Yao entame sa retraite.',
      thought: 'Quarante années de dévouement ! Vous avez marqué l\'histoire de notre institution.',
      keyword: 'Retraite',
      image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=250&fit=crop"
    },
    {
      id: '4',
      eventType: 'Retraite',
      category: 'Retraite',
      title: 'Départ en retraite de Mme Fatou Traoré',
      memberName: 'Mme Fatou Traoré',
      yearsOfService: '28 ans de service',
      date: '2024-02-28',
      location: 'San-Pédro',
      description: 'Mme Fatou Traoré clôture brillamment sa carrière après 28 années de loyaux services.',
      thought: 'Votre sourire et votre professionnalisme vont nous manquer. Belle retraite !',
      keyword: 'Retraite',
      image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=250&fit=crop"
    }
  ];

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section with Background Image */}
        <section className={`relative ${isMobile ? 'h-[30vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/c88b877d-abfc-430e-a6d4-5a7bc89ff587.png" 
              alt="Background départs retraite" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
            <Trophy className="w-16 h-16 mx-auto mb-6" />
            <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold mb-4 md:mb-6 animate-fade-in`}>
              Départs en Retraite
            </h1>
            <p className={`${isMobile ? 'text-sm' : 'text-lg md:text-xl'} italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
              Honorons ceux qui ont consacré leur carrière au service de notre institution et célébrons leur nouvelle étape de vie
            </p>
          </div>
        </section>

        {/* Events Section */}
        <section className={`py-16 ${isMobile ? 'px-[15px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-primary mb-4`}>Nos retraités honorés</h2>
              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 max-w-2xl mx-auto`}>
                Rendons hommage à nos collègues qui prennent une retraite bien méritée après des années de service dévoué.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {retraiteEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-blue-500 bg-blue-50">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className={`text-blue-800 ${isMobile ? 'text-base' : 'text-xl'} flex items-center`}>
                      <Trophy className="w-5 h-5 mr-2" />
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
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.yearsOfService}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-gray-700 ${isMobile ? 'text-sm' : 'text-base'} mb-3 text-left`}>{event.description}</p>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm"><strong>Catégorie:</strong> {event.category}</p>
                      <p className="text-sm"><strong>Années de service:</strong> {event.yearsOfService}</p>
                      <p className="text-sm"><strong>Mot-clé:</strong> {event.keyword}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg border-l-2 border-blue-300">
                      <p className={`${isMobile ? 'text-sm' : 'text-base'} text-blue-800 italic`}>
                        <Heart className="h-3 w-3 inline mr-1" />
                        {event.thought}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className={`bg-blue-50 py-16 ${isMobile ? 'px-[15px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center text-primary mb-12`}>
              Statistiques des départs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-6 bg-white">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-blue-800 mb-2`}>15</h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-blue-700`}>Départs cette année</p>
              </Card>
              <Card className="text-center p-6 bg-white">
                <Clock className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-blue-800 mb-2`}>32 ans</h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-blue-700`}>Moyenne d'années de service</p>
              </Card>
              <Card className="text-center p-6 bg-white">
                <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-blue-800 mb-2`}>450+</h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-blue-700`}>Années cumulées d'expérience</p>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default DepartsRetraite;
