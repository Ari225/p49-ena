import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Target, Clock, CheckCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ReunionsConstitution = () => {
  const isMobile = useIsMobile();
  const [selectedTab, setSelectedTab] = useState('programmees');

  const reunionsProgrammees = [
    {
      id: 1,
      titre: "Réunion Constitution Ouest",
      date: "12 Juillet 2024",
      lieu: "Man",
      animateur: "M. DIABATE Moussa",
      participants: 30,
      duree: "3 heures",
      objectifs: [
        "Présenter la P49 aux nouveaux membres",
        "Expliquer les statuts et règlements",
        "Faciliter l'intégration",
        "Créer du lien social"
      ],
      public: "Nouveaux adhérents région Ouest",
      prerequis: "Aucun prérequis",
      status: "Programmée",
      inscriptions: "Ouvertes"
    },
    {
      id: 2,
      titre: "Réunion Constitution Centre",
      date: "25 Août 2024",
      lieu: "Yamoussoukro",
      animateur: "Mme KONE Fatoumata",
      participants: 25,
      duree: "3 heures",
      objectifs: [
        "Accueillir les nouvelles recrues",
        "Former aux valeurs P49",
        "Expliquer l'organisation",
        "Créer des liens"
      ],
      public: "Nouveaux membres centre",
      prerequis: "Avoir adhéré à la P49",
      status: "Programmée",
      inscriptions: "Bientôt"
    }
  ];

  const reunionsPassees = [
    {
      id: 3,
      titre: "Réunion Constitution Sud",
      date: "20 Mai 2024",
      lieu: "San-Pédro",
      animateur: "M. ASSI François",
      participants: 28,
      duree: "3 heures",
      objectifs: [
        "Intégration nouveaux membres",
        "Formation aux valeurs",
        "Présentation structure",
        "Networking"
      ],
      public: "Nouveaux adhérents région Sud",
      resultats: [
        "28 nouveaux membres intégrés",
        "100% de satisfaction",
        "Constitution d'un groupe WhatsApp",
        "Planification d'activités régionales"
      ],
      status: "Terminée"
    },
    {
      id: 4,
      titre: "Réunion Constitution Est",
      date: "15 Avril 2024",
      lieu: "Abengourou",
      animateur: "M. KOUAME Yves",
      participants: 22,
      duree: "3 heures",
      objectifs: [
        "Accueil nouveaux membres",
        "Formation institutionnelle",
        "Échanges d'expériences",
        "Planification activités"
      ],
      public: "Nouveaux membres région Est",
      resultats: [
        "22 nouveaux membres formés",
        "Création d'un comité régional",
        "Programme d'activités validé",
        "Parrainage mis en place"
      ],
      status: "Terminée"
    },
    {
      id: 5,
      titre: "Réunion Constitution Lagunes",
      date: "18 Mars 2024",
      lieu: "Grand-Bassam",
      animateur: "Mme TRAORE Aminata",
      participants: 35,
      duree: "4 heures",
      objectifs: [
        "Grande session d'intégration",
        "Formation complète",
        "Visite historique",
        "Cohésion d'équipe"
      ],
      public: "Nouveaux membres Lagunes",
      resultats: [
        "35 nouveaux membres intégrés",
        "Visite du patrimoine historique",
        "Formation aux outils numériques",
        "Mise en place de mentorat"
      ],
      status: "Terminée"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terminée': return 'bg-gray-100 text-gray-800';
      case 'Programmée': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const ReunionCard = ({ reunion }: { reunion: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-primary">{reunion.titre}</CardTitle>
          <Badge className={getStatusColor(reunion.status)}>
            {reunion.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            {reunion.date}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {reunion.lieu}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            Animateur : {reunion.animateur}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            {reunion.participants} participants
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            Durée : {reunion.duree}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Public cible :</p>
          <p className="text-sm text-gray-600">{reunion.public}</p>
        </div>

        {reunion.prerequis && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Prérequis :</p>
            <p className="text-sm text-gray-600">{reunion.prerequis}</p>
          </div>
        )}

        {reunion.inscriptions && (
          <div className="mb-4">
            <Badge className="bg-blue-100 text-blue-800">
              Inscriptions : {reunion.inscriptions}
            </Badge>
          </div>
        )}

        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2 flex items-center">
            <Target className="h-4 w-4 mr-2" />
            Objectifs :
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {reunion.objectifs.map((objectif: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                {objectif}
              </li>
            ))}
          </ul>
        </div>

        {reunion.resultats && (
          <div>
            <h4 className="font-medium text-gray-700 mb-2 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Résultats obtenus :
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {reunion.resultats.map((resultat: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {resultat}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header with Background Image */}
        <section className={`relative ${isMobile ? 'h-[30vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/92f8a2dc-a96b-43e9-93dd-b8dec8af0527.png" 
              alt="Background réunions constitution" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-primary/80"></div>
          </div>
          
          <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold mb-4 md:mb-6 animate-fade-in`}>
              Réunions de Constitution
            </h1>
            <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
              Accueil et intégration des nouveaux membres de la P49
            </p>
          </div>
        </section>

        {/* Présentation */}
        <section className={`py-8 bg-white ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Qu'est-ce qu'une Réunion de Constitution ?</h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                Les Réunions de Constitution sont des sessions spéciales organisées pour accueillir, 
                former et intégrer les nouveaux membres de la P49. C'est un moment privilégié 
                d'échange et de partage des valeurs de notre association.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">8</div>
                <div className="text-gray-600">Réunions organisées</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">180+</div>
                <div className="text-gray-600">Nouveaux membres intégrés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-gray-600">Taux de satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">6</div>
                <div className="text-gray-600">Régions couvertes</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contenu principal */}
        <section className={`py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            {/* Onglets */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 max-w-md">
              <Button
                variant={selectedTab === 'programmees' ? 'default' : 'ghost'}
                onClick={() => setSelectedTab('programmees')}
                className="flex-1"
              >
                Programmées
              </Button>
              <Button
                variant={selectedTab === 'passees' ? 'default' : 'ghost'}
                onClick={() => setSelectedTab('passees')}
                className="flex-1"
              >
                Passées
              </Button>
            </div>

            {/* Contenu des onglets */}
            {selectedTab === 'programmees' && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">Prochaines Réunions</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {reunionsProgrammees.map((reunion) => (
                    <ReunionCard key={reunion.id} reunion={reunion} />
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'passees' && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">Réunions Passées</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {reunionsPassees.map((reunion) => (
                    <ReunionCard key={reunion.id} reunion={reunion} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Programme type */}
        <section className={`py-16 bg-accent/10 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-primary text-center mb-8">
              Programme Type d'une Réunion de Constitution
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Première Partie (1h30)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                        <div>
                          <strong>Accueil et présentation</strong>
                          <p className="text-gray-600">Tour de table et présentation des participants</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                        <div>
                          <strong>Histoire de la P49</strong>
                          <p className="text-gray-600">Présentation des origines et évolution</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                        <div>
                          <strong>Valeurs et mission</strong>
                          <p className="text-gray-600">Exposé des principes fondamentaux</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Deuxième Partie (1h30)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                        <div>
                          <strong>Organisation et statuts</strong>
                          <p className="text-gray-600">Structure et fonctionnement de l'association</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                        <div>
                          <strong>Activités et services</strong>
                          <p className="text-gray-600">Présentation du programme d'activités</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                        <div>
                          <strong>Échanges et networking</strong>
                          <p className="text-gray-600">Moment convivial et partage d'expériences</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ReunionsConstitution;
