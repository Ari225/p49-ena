import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calendar, Users, Heart, Briefcase, BookOpen } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const SiteSectionsGrid = () => {
  const {
    t
  } = useLanguage();
  const isMobile = useIsMobile();

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

  if (isMobile) {
    return (
      <section className="bg-white py-[50px] px-[25px]">
        <div className="container mx-auto px-0">
          <h2 className="text-2xl font-bold text-center text-primary mb-8">Nos rubriques</h2>
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
                    <p className="mb-4 text-sm text-gray-700">{section.content}</p>
                    <Link to={section.link} className="text-primary hover:text-secondary/80 font-medium text-sm inline-flex items-center">
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

  // Desktop version (unchanged)
  return (
    <section className="bg-white py-[100px] px-[100px]">
      <div className="container mx-auto px-0">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">Nos rubriques</h2>
        <div className="grid grid-cols-5 gap-6">
          <Card className="hover:shadow-xl transition-shadow duration-300 group">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors bg-secondary/80">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-primary text-lg">{t('header.presentation')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700">Historique,
Textes officiels,
Instances dirigeantes,
Répertoire des membres.</p>
              <Link to="/historique" className="text-primary hover:text-secondary/80 font-medium text-base">
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
              <p className="mb-4 text-gray-700">Agenda, Régionales, Assemblées Générales, Réunions de constitution.</p>
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
              <p className="mb-4 text-gray-700">Événements heureux, Départs à la retraite et Nécrologie relatifs aux membres de la P49.</p>
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
              <p className="mb-4 text-gray-700 font-normal">Formations, Renforcement de capacités Coaching & Mentorat, Actualités des concours.</p>
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
              <p className="mb-4 text-gray-700">Dernière édition du journal, Écho des régions, Actualités, Archives.</p>
              <Link to="/derniere-edition" className="text-primary hover:text-secondary/80 font-medium">
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
