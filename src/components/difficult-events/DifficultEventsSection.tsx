import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Users, Heart, AlertCircle, Stethoscope, Car } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
const DifficultEventsSection = () => {
  const isMobile = useIsMobile();
  const malheureuxEvents = [{
    id: '1',
    eventType: 'Malheureux',
    category: 'Décès',
    title: 'Décès de AMANI Kouakou Paul',
    memberName: 'Famille Amani',
    date: '2025-07-07',
    location: 'Abidjan',
    description: 'C\'est avec une profonde tristesse le Bureau Exécutif a été informé du rappel à Dieu du condisciple AMANI Kouakou Paul.',
    thought: 'Nos pensées et nos prières accompagnent la famille en ces moments difficiles. Que son âme repose en paix éternelle.',
    keyword: 'Décès',
    image: "/lovable-uploads/e7c5020a-c86a-46e3-b52e-533af9783600.png"
  }, {
    id: '2',
    eventType: 'Malheureux',
    category: 'Décès',
    title: 'Décès de Mme Adjoua Kone',
    memberName: 'Famille Kone',
    date: '2024-01-20',
    location: 'Daloa',
    description: 'C\'est avec une profonde tristesse que nous annonçons le décès de Mme Adjoua Kone, une femme remarquable qui nous a quittés trop tôt.',
    thought: 'Nos pensées et nos prières accompagnent la famille en ces moments difficiles. Que son âme repose en paix éternelle.',
    keyword: 'Décès',
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop"
  }, {
    id: '2',
    eventType: 'Malheureux',
    category: 'Maladies',
    title: 'Hospitalisation de M. Kouakou Assi',
    memberName: 'M. Kouakou Assi',
    date: '2024-02-15',
    location: 'Abidjan',
    description: 'M. Kouakou Assi est actuellement hospitalisé suite à des complications de santé. Il fait preuve d\'un courage exemplaire.',
    thought: 'Nous lui souhaitons un prompt rétablissement et envoyons toute notre force à sa famille.',
    keyword: 'Maladies',
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop"
  }, {
    id: '3',
    eventType: 'Malheureux',
    category: 'Accidents',
    title: 'Accident de circulation de M. Seydou Bamba',
    memberName: 'M. Seydou Bamba',
    date: '2024-01-30',
    location: 'Bouaké',
    description: 'M. Seydou Bamba a été victime d\'un grave accident de la circulation. Il est heureusement hors de danger.',
    thought: 'Nous sommes soulagés qu\'il soit en voie de guérison et lui souhaitons un prompt rétablissement.',
    keyword: 'Accidents',
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop"
  }, {
    id: '4',
    eventType: 'Malheureux',
    category: 'Décès',
    title: 'Décès du père de Mme Sarah Yao',
    memberName: 'Famille Yao',
    date: '2024-02-10',
    location: 'Yamoussoukro',
    description: 'Nous partageons la douleur de Mme Sarah Yao suite au décès de son père bien-aimé.',
    thought: 'Nos condoléances les plus sincères à Mme Yao et à toute sa famille. Que Dieu accorde le repos éternel au défunt.',
    keyword: 'Décès',
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop"
  }, {
    id: '5',
    eventType: 'Malheureux',
    category: 'Autres',
    title: 'Incendie chez M. Diabaté',
    memberName: 'M. Ibrahim Diabaté',
    date: '2024-02-20',
    location: 'Korhogo',
    description: 'La maison de M. Ibrahim Diabaté a été ravagée par un incendie. Heureusement, aucune vie humaine n\'est à déplorer.',
    thought: 'Nous exprimons notre solidarité et notre soutien dans cette épreuve. La communauté est là pour vous aider.',
    keyword: 'Autres',
    image: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=400&h=250&fit=crop"
  }];
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Décès':
        return Heart;
      case 'Maladies':
        return Stethoscope;
      case 'Accidents':
        return Car;
      default:
        return AlertCircle;
    }
  };
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Décès':
        return 'border-l-gray-500 bg-gray-50';
      case 'Maladies':
        return 'border-l-red-500 bg-red-50';
      case 'Accidents':
        return 'border-l-orange-500 bg-orange-50';
      default:
        return 'border-l-gray-400 bg-gray-50';
    }
  };
  return <section className={`py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 my-[100px]">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-primary mb-4`}>Partager la peine, apporter le réconfort</h2>
          <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 max-w-2xl mx-auto`}>
            Dans les moments d'épreuve, notre communauté se mobilise pour exprimer sa solidarité et son soutien inconditionnel.
          </p>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-2 gap-8'}`}>
          {malheureuxEvents.map(event => {
          const IconComponent = getCategoryIcon(event.category);
          return <Card key={event.id} className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 border-l-4 ${getCategoryColor(event.category)}`}>
                <div className="aspect-video overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
                <CardHeader>
                  <CardTitle className={`text-gray-800 ${isMobile ? 'text-base' : 'text-lg'} flex items-center`}>
                    <IconComponent className="w-5 h-5 mr-2" />
                    {event.title}
                  </CardTitle>
                  <div className={`space-y-2 ${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>
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
                  <p className={`text-gray-700 ${isMobile ? 'text-xs' : 'text-sm'} mb-3`}>{event.description}</p>
                  <div className="space-y-2 mb-4">
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'}`}><strong>Catégorie:</strong> {event.category}</p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'}`}><strong>Mot-clé:</strong> {event.keyword}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border-l-2 border-blue-200">
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-700 italic`}>
                      <Heart className="h-3 w-3 inline mr-1" />
                      {event.thought}
                    </p>
                  </div>
                </CardContent>
              </Card>;
        })}
        </div>
      </div>
    </section>;
};
export default DifficultEventsSection;