import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Heart, Briefcase, BookOpen } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const SiteSectionsGrid = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [activeTab, setActiveTab] = useState(0);

  const sections = [
    {
      id: "presentation",
      icon: Users,
      title: t('header.presentation'),
      content: "Historique, Textes officiels, Instances dirigeantes, Répertoire des membres.",
      link: "/historique",
      linkText: "Explorer →"
    },
    {
      id: "activities", 
      icon: Calendar,
      title: t('header.activities'),
      content: "Agenda, Régionales, Assemblées Générales, Réunions de constitution.",
      link: "/agenda",
      linkText: "Explorer →"
    },
    {
      id: "social-events",
      icon: Heart,
      title: t('header.social_events'),
      content: "Événements heureux, Départs à la retraite et Nécrologie relatifs aux membres de la P49.",
      link: "/evenements-heureux",
      linkText: "Explorer →"
    },
    {
      id: "careers",
      icon: Briefcase,
      title: t('header.careers'),
      content: "Formations, Renforcement de capacités Coaching & Mentorat, Actualités des concours.",
      link: "/formations",
      linkText: "Explorer →"
    },
    {
      id: "perspectives",
      icon: BookOpen,
      title: t('header.perspectives'),
      content: "Dernière édition du journal, Écho des régions, Actualités, Archives.",
      link: "/derniere-edition",
      linkText: "Explorer →"
    }
  ];

  // MOBILE VERSION
  if (isMobile) {
    return (
      <section className="bg-white py-[50px] px-[25px]">
        <div className="container mx-auto px-0">
          <h2 className="text-xl font-bold text-center text-primary mb-[50px] md:mb-[50px]">Nos rubriques</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <AccordionItem key={section.id} value={section.id} className="border rounded-lg shadow-sm">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-secondary/80">
                        <IconComponent className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="text-base font-semibold text-primary text-left">{section.title}</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <p className="mb-4 text-xs text-gray-700">{section.content}</p>
                    <Link to={section.link} className="text-primary hover:text-secondary/80 font-medium text-xs inline-flex items-center">
                      {section.linkText}
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>
    );
  }

  // TABLET VERSION
  if (isTablet) {
    return (
      <section className="bg-white py-[75px] px-[50px]">
        <div className="container mx-auto px-0">
          <h2 className="text-2xl font-bold text-center text-primary mb-[50px] md:mb-[50px]">Nos rubriques</h2>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8 border-b overflow-x-auto">
            {sections.map((section, index) => (
              <Button
                key={section.id}
                variant="ghost"
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-t-lg border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === index
                    ? 'border-primary text-primary bg-secondary/20'
                    : 'border-transparent text-gray-600 hover:text-primary hover:bg-secondary/10'
                }`}
              >
                <span className="text-sm font-medium">{section.title}</span>
              </Button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[200px]">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div
                  key={section.id}
                  className={`${activeTab === index ? 'block' : 'hidden'} animate-fade-in`}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto bg-secondary/80">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-primary text-lg mb-4">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="mb-6 text-gray-700 leading-relaxed text-sm">{section.content}</p>
                      <Link 
                        to={section.link} 
                        className="inline-flex items-center text-primary hover:text-secondary/80 font-medium text-sm bg-secondary/20 hover:bg-secondary/30 px-6 py-2 rounded-lg transition-colors"
                      >
                        {section.linkText}
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // DESKTOP VERSION
  return (
    <section className="bg-white py-[100px] px-[50px]">
      <div className="container mx-auto px-0">
        <h2 className="text-3xl font-bold text-center text-primary mb-[50px] md:mb-[50px]">Nos rubriques</h2>
        <div className="grid grid-cols-5 gap-6">
          <Card className="hover:shadow-xl transition-shadow duration-300 group">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors bg-secondary/80">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-primary text-xl">{t('header.presentation')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700 text-base">Historique,
Textes officiels,
Instances dirigeantes,
Répertoire des membres.</p>
              <Link to="/historique" className="text-primary hover:text-secondary/80 font-medium text-sm">
                Explorer →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300 group">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors bg-secondary/80">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-primary text-xl">{t('header.activities')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700 text-base">Agenda, Régionales, Assemblées Générales, Réunions de constitution.</p>
              <Link to="/agenda" className="text-primary hover:text-secondary/80 font-medium text-sm">
                Explorer →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300 group">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors bg-secondary/80">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl text-primary">{t('header.social_events')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700 text-base">Évènements heureux, Départs à la retraite et Nécrologie relatifs aux membres de la P49.</p>
              <Link to="/evenements-heureux" className="text-primary hover:text-secondary/80 font-medium text-sm">
                Explorer →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300 group">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors bg-secondary/80">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-primary text-xl">{t('header.careers')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700 font-normal text-base">Formations, Renforcement de capacités Coaching & Mentorat, Actualités des concours.</p>
              <Link to="/formations" className="text-primary hover:text-secondary/80 font-medium text-sm">
                Explorer →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300 group">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors bg-secondary/80">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-primary text-xl">{t('header.perspectives')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700 text-base">Dernière édition du journal, Écho des régions, Actualités, Archives.</p>
              <Link to="/derniere-edition" className="text-primary hover:text-secondary/80 font-medium text-sm">
                Explorer →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SiteSectionsGrid;
