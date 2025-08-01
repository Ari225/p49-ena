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