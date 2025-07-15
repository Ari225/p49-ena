
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, CalendarPlus, Eye } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

interface Activity {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  participants: string;
  description: string;
  type: string;
  status: string;
  calendarDate: Date;
  image?: string;
}

interface ActivityCardProps {
  activity: Activity;
  getEventTypeColor: (type: string) => string;
  handleAddToCalendar: (activity: Activity) => void;
  isPast?: boolean;
}

const ActivityCard = ({ activity, getEventTypeColor, handleAddToCalendar, isPast = false }: ActivityCardProps) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Images de la galerie du projet
  const galleryImages = [
    "/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg",
    "/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg",
    "/lovable-uploads/8cbb0164-0529-47c1-9caa-8244c17623b3.jpg",
    "/lovable-uploads/cdf92e8b-3396-4192-b8a1-f94647a7b289.jpg",
    "/lovable-uploads/bonheur.jpg",
    "/lovable-uploads/malheur.jpg",
    "/lovable-uploads/Equipe.jpg",
    "/lovable-uploads/Equipe1.jpg"
  ];

  // Sélectionner une image aléatoire basée sur l'id de l'activité
  const getRandomImage = () => {
    const imageIndex = activity.id % galleryImages.length;
    return galleryImages[imageIndex];
  };

  // Fonction pour obtenir les classes de hauteur d'image selon la version
  const getImageHeightClasses = () => {
    if (isMobile) {
      return 'h-32'; // Mobile - plus petit
    } else if (isTablet) {
      return 'h-36'; // Tablette - moyen
    } else {
      return 'h-40'; // Desktop - plus grand
    }
  };

  // Fonction pour obtenir les classes de boutons selon la version
  const getButtonClasses = () => {
    if (isMobile) {
      return isPast ? 'w-full' : 'flex-col gap-2 w-full'; // Mobile - boutons pleine largeur
    } else if (isTablet) {
      return isPast ? 'w-full' : 'flex-1 gap-2'; // Tablette - boutons flexibles
    } else {
      return isPast ? 'w-full' : 'flex-1 gap-2'; // Desktop - boutons flexibles
    }
  };

  // Fonction pour obtenir la disposition des boutons selon la version
  const getButtonLayout = () => {
    if (isMobile) {
      return 'flex-col'; // Mobile - boutons empilés
    } else if (isTablet) {
      return 'flex-row'; // Tablette - boutons en ligne
    } else {
      return 'flex-row'; // Desktop - boutons en ligne
    }
  };

  return (
    <Card className={`hover:shadow-lg transition-shadow duration-300 ${isPast ? 'opacity-80' : ''}`}>
      <div className={`w-full ${getImageHeightClasses()} overflow-hidden rounded-t-lg`}>
        <img 
          src={activity.image || getRandomImage()} 
          alt={activity.title}
          className={`w-full h-full object-cover ${isPast ? 'grayscale' : ''}`}
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge className={isPast ? "bg-gray-100 text-gray-700" : getEventTypeColor(activity.type)}>
            {activity.type}
          </Badge>
          <span className="text-sm text-gray-500">
            {activity.date}
          </span>
        </div>
        <h3 className={`font-semibold mb-2 ${isPast ? 'text-gray-600' : 'text-primary'}`}>
          {activity.title}
        </h3>
        <div className={`space-y-1 text-sm mb-3 ${isPast ? 'text-gray-500' : 'text-gray-600'}`}>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {activity.time}
          </div>
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {activity.location}
          </div>
        </div>
        <div className={`flex ${getButtonLayout()} ${getButtonClasses()}`}>
          <Button asChild size="sm" variant="outline" className={isPast ? "w-full" : "flex-1"}>
            <Link to={`/activites/${activity.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              {isPast ? "Voir détails" : "Détails"}
            </Link>
          </Button>
          {!isPast && (
            <Button
              size="sm"
              onClick={() => handleAddToCalendar(activity)}
              className="bg-green-600 hover:bg-green-700 flex-1"
            >
              <CalendarPlus className="h-4 w-4" />
              {!isMobile && <span className="ml-1">Ajouter</span>}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
