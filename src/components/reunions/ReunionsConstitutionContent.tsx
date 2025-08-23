import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Target, Clock } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { useActivities } from '@/hooks/useActivities';
import { Activity } from '@/types/activity';

const ReunionsConstitutionContent = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { activities, loading } = useActivities();

  // Filtrer les activités de type "Réunions de constitution" à venir
  const nextReunionConstitution = React.useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const reunionsConstitution = activities.filter(activity => 
      activity.category === 'Réunions de constitution' && 
      activity.status === 'À venir' &&
      new Date(activity.date) >= today
    );

    // Trier par date et prendre la plus proche
    return reunionsConstitution.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    )[0];
  }, [activities]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTimeRange = (startTime?: string, endTime?: string) => {
    if (!startTime && !endTime) return 'Heure à définir';
    if (!startTime) return endTime || '';
    if (!endTime) return startTime;
    return `${startTime} - ${endTime}`;
  };

  // Composant de carte de réunion - Version Mobile
  const ActivityCardMobile = ({ activity }: { activity: Activity }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-primary text-sm">{activity.title}</CardTitle>
          <Badge className="bg-green-100 text-green-800">
            {activity.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 mb-3">
          <div className="flex items-center text-xs text-gray-600">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(activity.date)}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <MapPin className="h-3 w-3 mr-1" />
            {activity.location}
          </div>
          {activity.session_president && (
            <div className="flex items-center text-xs text-gray-600">
              <Users className="h-3 w-3 mr-1" />
              {activity.session_president}
            </div>
          )}
          <div className="flex items-center text-xs text-gray-600">
            <Clock className="h-3 w-3 mr-1" />
            {formatTimeRange(activity.start_time, activity.end_time)}
          </div>
        </div>

        {activity.target_audience && (
          <div className="mb-3">
            <p className="text-xs font-medium text-gray-700 mb-1">Public cible :</p>
            <p className="text-xs text-gray-600">{activity.target_audience}</p>
          </div>
        )}

        {activity.brief_description && (
          <div className="mb-3">
            <p className="text-xs font-medium text-gray-700 mb-1">Description :</p>
            <p className="text-xs text-gray-600">{activity.brief_description}</p>
          </div>
        )}

        {activity.objectives && activity.objectives.length > 0 && (
          <div className="mb-3">
            <h4 className="font-medium text-gray-700 mb-1 flex items-center text-xs">
              <Target className="h-3 w-3 mr-1" />
              Objectifs :
            </h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {activity.objectives.map((objectif: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-1">•</span>
                  {objectif}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );

  // Composant de carte de réunion - Version Tablette
  const ActivityCardTablet = ({ activity }: { activity: Activity }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-primary">{activity.title}</CardTitle>
          <Badge className="bg-green-100 text-green-800">
            {activity.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(activity.date)}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {activity.location}
          </div>
          {activity.session_president && (
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              Président de séance : {activity.session_president}
            </div>
          )}
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            {formatTimeRange(activity.start_time, activity.end_time)}
          </div>
        </div>

        {activity.target_audience && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Public cible :</p>
            <p className="text-sm text-gray-600">{activity.target_audience}</p>
          </div>
        )}

        {activity.brief_description && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Description :</p>
            <p className="text-sm text-gray-600">{activity.brief_description}</p>
          </div>
        )}

        {activity.objectives && activity.objectives.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2 flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Objectifs :
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {activity.objectives.map((objectif: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  {objectif}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );

  // Composant de carte de réunion - Version Desktop
  const ActivityCardDesktop = ({ activity }: { activity: Activity }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-primary">{activity.title}</CardTitle>
          <Badge className="bg-green-100 text-green-800">
            {activity.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(activity.date)}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {activity.location}
          </div>
          {activity.session_president && (
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              Président de séance : {activity.session_president}
            </div>
          )}
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            Heure : {formatTimeRange(activity.start_time, activity.end_time)}
          </div>
        </div>

        {activity.target_audience && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Public cible :</p>
            <p className="text-sm text-gray-600">{activity.target_audience}</p>
          </div>
        )}

        {activity.brief_description && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Description :</p>
            <p className="text-sm text-gray-600">{activity.brief_description}</p>
          </div>
        )}

        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2 flex items-center">
            <Target className="h-4 w-4 mr-2" />
            Objectifs :
          </h4>
          {activity.objectives && activity.objectives.length > 0 ? (
            <ul className="text-sm text-gray-600 space-y-1">
              {activity.objectives.map((objectif: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  {objectif}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600">Objectifs à définir</p>
          )}
        </div>

        {activity.description && (
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Description complète :</h4>
            <p className="text-sm text-gray-600">{activity.description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <section className="py-8 px-[25px]">
        <div className="container mx-auto px-0">
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-600">Chargement...</div>
          </div>
        </div>
      </section>
    );
  }

  if (!nextReunionConstitution) {
    return (
      <section className="py-8 px-[25px]">
        <div className="container mx-auto px-0">
          <h2 className="text-lg font-bold text-primary mb-4 text-center">
            Prochaine Réunion de Constitution
          </h2>
          <div className="text-center py-12">
            <p className="text-gray-600">Aucune réunion de constitution prévue pour le moment.</p>
          </div>
        </div>
      </section>
    );
  }

  // Version Mobile
  if (isMobile) {
    return (
      <section className="py-8 px-[25px]">
        <div className="container mx-auto px-0">
          <h2 className="text-lg font-bold text-primary mb-4 text-center">
            Prochaine Réunion de Constitution
          </h2>
          <ActivityCardMobile activity={nextReunionConstitution} />
        </div>
      </section>
    );
  }

  // Version Tablette
  if (isTablet) {
    return (
      <section className="py-12 px-[50px]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Prochaine Réunion de Constitution
          </h2>
          <div className="max-w-2xl mx-auto">
            <ActivityCardTablet activity={nextReunionConstitution} />
          </div>
        </div>
      </section>
    );
  }

  // Version Desktop
  return (
    <section className="py-16 px-[100px]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Prochaine Réunion de Constitution
        </h2>
        <div className="max-w-3xl mx-auto">
          <ActivityCardDesktop activity={nextReunionConstitution} />
        </div>
      </div>
    </section>
  );
};

export default ReunionsConstitutionContent;