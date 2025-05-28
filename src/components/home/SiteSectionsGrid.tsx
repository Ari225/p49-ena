import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Heart, Briefcase, BookOpen } from 'lucide-react';
const SiteSectionsGrid = () => {
  const {
    t
  } = useLanguage();
  return <section className="bg-white py-[100px] px-[100px]">
      <div className="container mx-auto px-0">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">Nos rubriques</h2>
        <div className="grid grid-cols-5 gap-6">
          <Card className="hover:shadow-xl transition-shadow duration-300 group">
            <CardHeader>
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center mb-4 transition-colors bg-secondary/80">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-primary text-lg">{t('header.presentation')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700">
                Découvrez l'histoire, la structure et les membres de notre réseau.
              </p>
              <Link to="/historique" className="text-primary hover:text-secondary/80 font-medium">
                Explorer →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300 group">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors bg-secondary/80">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-primary text-lg">{t('header.activities')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700">
                Agenda, événements régionaux et assemblées générales.
              </p>
              <Link to="/agenda" className="text-primary hover:text-secondary/80 font-medium">
                Explorer →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300 group">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors bg-secondary/80">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg text-primary">{t('header.social_events')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700">
                Événements heureux, départs à la retraite et nécrologie.
              </p>
              <Link to="/evenements-heureux" className="text-primary hover:text-secondary/80 font-medium">
                Explorer →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300 group">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors bg-secondary/80">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-primary text-lg">{t('header.careers')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700 font-normal">
                Formations, coaching et actualités des concours.
              </p>
              <Link to="/formations" className="text-primary hover:text-secondary/80 font-medium">
                Explorer →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300 group">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors bg-secondary/80">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-primary text-lg">{t('header.perspectives')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700">
                Notre journal, actualités et archives.
              </p>
              <Link to="/derniere-edition" className="text-primary hover:text-secondary/80 font-medium">
                Explorer →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default SiteSectionsGrid;