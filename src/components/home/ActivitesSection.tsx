import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
const ActivitesSection = () => {
  const isMobile = useIsMobile();
  const [upcomingSlideIndex, setUpcomingSlideIndex] = useState(0);
  const [recentSlideIndex, setRecentSlideIndex] = useState(0);
  const upcomingActivities = [{
    type: 'Assemblée Générale',
    title: 'AG Extraordinaire 2024',
    date: '15 Avril 2024',
    time: '09:00',
    location: 'Hôtel Ivoire, Abidjan',
    participants: '120+ attendus',
    status: 'À venir'
  }, {
    type: 'Régionale',
    title: 'Rencontre Régionale Centre',
    date: '28 Avril 2024',
    time: '14:00',
    location: 'Yamoussoukro',
    participants: '45+ attendus',
    status: 'Inscriptions ouvertes'
  }, {
    type: 'Formation',
    title: 'Atelier Leadership Digital',
    date: '5 Mai 2024',
    time: '08:30',
    location: 'ENA Abidjan',
    participants: '25 places',
    status: 'Places limitées'
  }];
  const recentActivities = [{
    title: 'Régionale de l\'Ouest - Man',
    date: '25 Mars 2024',
    participants: '52 membres',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=150&fit=crop'
  }, {
    title: 'AG Ordinaire 2024',
    date: '20 Mars 2024',
    participants: '135 membres',
    image: 'https://images.unsplash.com/photo-1559223607-a43c990c692f?w=300&h=150&fit=crop'
  }];
  const nextUpcomingSlide = () => {
    setUpcomingSlideIndex(prevIndex => (prevIndex + 1) % upcomingActivities.length);
  };
  const prevUpcomingSlide = () => {
    setUpcomingSlideIndex(prevIndex => prevIndex === 0 ? upcomingActivities.length - 1 : prevIndex - 1);
  };
  const nextRecentSlide = () => {
    setRecentSlideIndex(prevIndex => (prevIndex + 1) % recentActivities.length);
  };
  const prevRecentSlide = () => {
    setRecentSlideIndex(prevIndex => prevIndex === 0 ? recentActivities.length - 1 : prevIndex - 1);
  };
  return <section className={`bg-white py-12 md:py-16 lg:py-[100px] ${isMobile ? 'px-[25px]' : 'px-4 md:px-8 lg:px-[100px]'}`}>
      <div className="container mx-auto px-0">
        <div className="text-center mb-12">
          <h2 className="font-bold text-primary mb-4 text-lg">Activités</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Restez informés de nos prochains événements et revivez nos dernières activités
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Prochaines activités */}
          <div>
            <h3 className="font-semibold text-primary mb-6 flex items-center text-xl">
              <Calendar className="w-5 h-5 mr-2" />
              Agenda à venir
            </h3>
            
            {isMobile ? <div className="relative">
                <div className="overflow-hidden">
                  <div className="flex transition-transform duration-300 ease-in-out" style={{
                transform: `translateX(-${upcomingSlideIndex * 100}%)`
              }}>
                    {upcomingActivities.map((activity, index) => <div key={index} className="w-full flex-shrink-0 px-0">
                        <Card className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center mb-2">
                                  <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                                    {activity.type}
                                  </span>
                                  <span className="bg-secondary/80 text-primary text-xs px-2 py-1 rounded ml-2 font-normal">
                                    {activity.status}
                                  </span>
                                </div>
                                <h4 className="font-semibold text-primary mb-2">{activity.title}</h4>
                                <div className="space-y-1 text-sm text-gray-600">
                                  <div className="flex items-center text-sm font-normal text-gray-700">
                                    <Clock className="w-4 h-4 mr-2" />
                                    {activity.date} à {activity.time}
                                  </div>
                                  <div className="flex items-center text-sm font-normal text-gray-700">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    {activity.location}
                                  </div>
                                  <div className="flex items-center text-sm font-normal text-gray-700">
                                    <Users className="w-4 h-4 mr-2" />
                                    {activity.participants}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>)}
                  </div>
                </div>
                
                <div className="flex justify-center gap-4 mt-4">
                  <Button onClick={prevUpcomingSlide} variant="outline" size="icon" className="rounded-full">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button onClick={nextUpcomingSlide} variant="outline" size="icon" className="rounded-full">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div> : <div className="space-y-4">
                {upcomingActivities.map((activity, index) => <Card key={index} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                              {activity.type}
                            </span>
                            <span className="bg-secondary/80 text-primary text-xs px-2 py-1 rounded ml-2 font-normal">
                              {activity.status}
                            </span>
                          </div>
                          <h4 className="font-semibold text-primary mb-2">{activity.title}</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center text-sm font-normal text-gray-700">
                              <Clock className="w-4 h-4 mr-2" />
                              {activity.date} à {activity.time}
                            </div>
                            <div className="flex items-center text-sm font-normal text-gray-700">
                              <MapPin className="w-4 h-4 mr-2" />
                              {activity.location}
                            </div>
                            <div className="flex items-center text-sm font-normal text-gray-700">
                              <Users className="w-4 h-4 mr-2" />
                              {activity.participants}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>}
          </div>

          {/* Activités récentes */}
          <div>
            <h3 className="text-xl font-semibold text-primary mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Dernières activités
            </h3>
            
            {isMobile ? <div className="relative">
                <div className="overflow-hidden">
                  <div className="flex transition-transform duration-300 ease-in-out" style={{
                transform: `translateX(-${recentSlideIndex * 100}%)`
              }}>
                    {recentActivities.map((activity, index) => <div key={index} className="w-full flex-shrink-0 px-0">
                        <Card className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="flex px-0">
                              <img src={activity.image} alt={activity.title} className="w-24 h-auto object-cover" />
                              <div className="p-4 flex-1">
                                <h4 className="font-semibold text-primary mb-1">{activity.title}</h4>
                                <p className="flex items-center text-sm font-normal text-gray-700 mb-1">{activity.date}</p>
                                <p className="flex items-center text-sm font-normal text-gray-700">{activity.participants}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>)}
                  </div>
                </div>
                
                <div className="flex justify-center gap-4 mt-4">
                  <Button onClick={prevRecentSlide} variant="outline" size="icon" className="rounded-full">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button onClick={nextRecentSlide} variant="outline" size="icon" className="rounded-full">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div> : <div className="space-y-4">
                {recentActivities.map((activity, index) => <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex px-0">
                        <img src={activity.image} alt={activity.title} className="w-24 h-auto object-cover" />
                        <div className="p-4 flex-1">
                          <h4 className="font-semibold text-primary mb-1">{activity.title}</h4>
                          <p className="flex items-center text-sm font-normal text-gray-700 mb-1">{activity.date}</p>
                          <p className="flex items-center text-sm font-normal text-gray-700">{activity.participants}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>}
          </div>
        </div>
        
        <div className="text-center">
          <Button asChild className="bg-primary hover:bg-primary text-base md:text-base text-white py-[5px] px-[15px] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold">
            <Link to="/agenda" className="bg-primary hover:bg-primary text-base md:text-base text-white py-[5px] px-[15px] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold">Voir toutes nos activités</Link>
          </Button>
        </div>
      </div>
    </section>;
};
export default ActivitesSection;