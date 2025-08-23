import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock, Edit, Trash2 } from 'lucide-react';
import { Activity as ActivityType } from '@/types/activity';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
interface ActivityCardProps {
  activity: ActivityType;
  onEdit?: (activity: ActivityType) => void;
  onDelete?: (activity: ActivityType) => void;
}
const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onEdit,
  onDelete
}) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  // Calculer le statut automatique basé sur la date/heure
  const getActivityStatus = (activity: ActivityType) => {
    const now = new Date();
    const activityDate = new Date(activity.date);
    
    // Si l'activité a une heure de fin, vérifier si elle est passée
    if (activity.end_time) {
      const [hours, minutes] = activity.end_time.split(':');
      const activityEndDateTime = new Date(activityDate);
      activityEndDateTime.setHours(parseInt(hours), parseInt(minutes));
      return activityEndDateTime < now ? 'Terminé' : 'À venir';
    }
    
    // Si l'activité a une heure de début, vérifier si elle est passée
    if (activity.start_time) {
      const [hours, minutes] = activity.start_time.split(':');
      const activityStartDateTime = new Date(activityDate);
      activityStartDateTime.setHours(parseInt(hours), parseInt(minutes));
      return activityStartDateTime < now ? 'Terminé' : 'À venir';
    }
    
    // Si pas d'heure, comparer seulement les dates
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    return activityDate < todayStart ? 'Terminé' : 'À venir';
  };

  const currentStatus = getActivityStatus(activity);
  const isPast = currentStatus === 'Terminé';
  return <Card className={`hover:shadow-lg transition-shadow duration-300 ${isPast ? 'opacity-80' : ''}`}>
      {(activity.image || activity.image_url) && <div className="w-full h-48 overflow-hidden rounded-t-lg">
          <img src={activity.image || activity.image_url} alt={activity.title} className={`w-full h-full object-cover ${isPast ? 'grayscale' : ''}`} />
        </div>}
      <CardContent className="p-4 md:p-6">
        <div className="flex justify-between items-start mb-3">
          <span className={`px-2 py-1 rounded text-xs font-medium ${isPast ? 'bg-gray-500 text-white' : 'bg-primary text-white'}`}>
            {activity.other_category || activity.category}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${currentStatus === 'À venir' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
            {currentStatus}
          </span>
        </div>
        
        <h4 className={`font-semibold mb-3 ${isPast ? 'text-gray-600' : 'text-primary'} ${isMobile ? 'text-lg' : isTablet ? 'text-lg' : 'text-xl md:text-xl'}`}>
          {activity.title}
        </h4>
        
        <p className={`mb-4 ${isPast ? 'text-gray-500' : 'text-gray-700'} ${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm md:text-sm'}`}>
          {activity.brief_description}
        </p>
        
        <div className={`space-y-2 mb-4 ${isPast ? 'text-gray-500' : 'text-gray-700'} ${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm md:text-sm'}`}>
          <div className="flex items-center">
            <Calendar className={`w-4 h-4 mr-2 ${isPast ? 'text-gray-500' : 'text-primary'}`} />
            <span>
              {new Date(activity.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
              {activity.category === 'Les Régionales' && activity.end_date && (
                <span> - {new Date(activity.end_date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</span>
              )}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className={`w-4 h-4 mr-2 ${isPast ? 'text-gray-500' : 'text-primary'}`} />
            <span>
              {activity.start_time}
              {activity.end_time && ` - ${activity.end_time}`}
            </span>
          </div>
          
          <div className="flex items-center">
            <MapPin className={`w-4 h-4 mr-2 ${isPast ? 'text-gray-500' : 'text-primary'}`} />
            <span>{activity.location}</span>
          </div>
          
          {activity.category === 'Les Régionales' && activity.participation_fees && activity.participation_fees.length > 0 && (
            <div className="mt-3">
              <h5 className={`text-sm font-semibold mb-2 ${isPast ? 'text-gray-600' : 'text-primary'}`}>
                Tarifs de participation:
              </h5>
              <div className="space-y-1">
                {activity.participation_fees.map((fee, index) => (
                  <div key={index} className={`text-xs ${isPast ? 'text-gray-500' : 'text-gray-700'} flex justify-between`}>
                    <span>{fee.name}</span>
                    <span className="font-medium">{parseInt(fee.amount).toLocaleString('fr-FR')} FCFA</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activity.category === 'Assemblées Générales' && (
            <div className="mt-3 space-y-3">
              {activity.session_president && (
                <div>
                  <h5 className={`text-sm font-semibold mb-1 ${isPast ? 'text-gray-600' : 'text-primary'}`}>
                    Président de séance:
                  </h5>
                  <p className={`text-xs ${isPast ? 'text-gray-500' : 'text-gray-700'}`}>
                    {activity.session_president}
                  </p>
                </div>
              )}
              {activity.agenda_points && activity.agenda_points.length > 0 && (
                <div>
                  <h5 className={`text-sm font-semibold mb-2 ${isPast ? 'text-gray-600' : 'text-primary'}`}>
                    Ordre du jour:
                  </h5>
                  <div className="space-y-1">
                    {activity.agenda_points.map((point, index) => (
                      <div key={index} className={`text-xs ${isPast ? 'text-gray-500' : 'text-gray-700'}`}>
                        • {point}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activity.category === 'Réunions de constitution' && (
            <div className="mt-3 space-y-3">
              {activity.session_president && (
                <div>
                  <h5 className={`text-sm font-semibold mb-1 ${isPast ? 'text-gray-600' : 'text-primary'}`}>
                    Président de séance:
                  </h5>
                  <p className={`text-xs ${isPast ? 'text-gray-500' : 'text-gray-700'}`}>
                    {activity.session_president}
                  </p>
                </div>
              )}
              {activity.target_audience && (
                <div>
                  <h5 className={`text-sm font-semibold mb-1 ${isPast ? 'text-gray-600' : 'text-primary'}`}>
                    Public cible:
                  </h5>
                  <p className={`text-xs ${isPast ? 'text-gray-500' : 'text-gray-700'}`}>
                    {activity.target_audience}
                  </p>
                </div>
              )}
              {activity.objectives && activity.objectives.length > 0 && (
                <div>
                  <h5 className={`text-sm font-semibold mb-2 ${isPast ? 'text-gray-600' : 'text-primary'}`}>
                    Objectifs:
                  </h5>
                  <div className="space-y-1">
                    {activity.objectives.map((objective, index) => (
                      <div key={index} className={`text-xs ${isPast ? 'text-gray-500' : 'text-gray-700'}`}>
                        • {objective}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activity.category !== 'Assemblées Générales' && (
            <div className="flex items-center mt-2">
              <span className={`text-sm ${isPast ? 'text-gray-500' : 'text-gray-700'}`}>{activity.description}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className={`flex-1 ${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm md:text-sm'}`} 
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(activity);
            }}
          >
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className={`text-red-600 hover:text-red-700 hover:border-red-600 ${isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm md:text-sm'}`} 
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(activity);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>;
};
export default ActivityCard;