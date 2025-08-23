import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Target, Clock, CheckCircle } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
interface Reunion {
  id: number;
  titre: string;
  date: string;
  lieu: string;
  animateur: string;
  participants: number;
  duree: string;
  objectifs: string[];
  public: string;
  prerequis?: string;
  status: string;
  inscriptions?: string;
  resultats?: string[];
}
const ReunionsConstitutionContent = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [selectedTab, setSelectedTab] = useState('programmees');
  const reunionsProgrammees: Reunion[] = [{
    id: 1,
    titre: "Réunion Constitution Ouest",
    date: "12 Juillet 2024",
    lieu: "Man",
    animateur: "M. DIABATE Moussa",
    participants: 30,
    duree: "3 heures",
    objectifs: ["Présenter la P49 aux nouveaux membres", "Expliquer les statuts et règlements", "Faciliter l'intégration", "Créer du lien social"],
    public: "Nouveaux adhérents région Ouest",
    prerequis: "Aucun prérequis",
    status: "Programmée",
    inscriptions: "Ouvertes"
  }, {
    id: 2,
    titre: "Réunion Constitution Centre",
    date: "25 Août 2024",
    lieu: "Yamoussoukro",
    animateur: "Mme KONE Fatoumata",
    participants: 25,
    duree: "3 heures",
    objectifs: ["Accueillir les nouvelles recrues", "Former aux valeurs P49", "Expliquer l'organisation", "Créer des liens"],
    public: "Nouveaux membres centre",
    prerequis: "Avoir adhéré à la P49",
    status: "Programmée",
    inscriptions: "Bientôt"
  }];
  const reunionsPassees: Reunion[] = [{
    id: 3,
    titre: "Réunion Constitution Sud",
    date: "20 Mai 2024",
    lieu: "San-Pédro",
    animateur: "M. ASSI François",
    participants: 28,
    duree: "3 heures",
    objectifs: ["Intégration nouveaux membres", "Formation aux valeurs", "Présentation structure", "Networking"],
    public: "Nouveaux adhérents région Sud",
    resultats: ["28 nouveaux membres intégrés", "100% de satisfaction", "Constitution d'un groupe WhatsApp", "Planification d'activités régionales"],
    status: "Terminée"
  }, {
    id: 4,
    titre: "Réunion Constitution Est",
    date: "15 Avril 2024",
    lieu: "Abengourou",
    animateur: "M. KOUAME Yves",
    participants: 22,
    duree: "3 heures",
    objectifs: ["Accueil nouveaux membres", "Formation institutionnelle", "Échanges d'expériences", "Planification activités"],
    public: "Nouveaux membres région Est",
    resultats: ["22 nouveaux membres formés", "Création d'un comité régional", "Programme d'activités validé", "Parrainage mis en place"],
    status: "Terminée"
  }, {
    id: 5,
    titre: "Réunion Constitution Lagunes",
    date: "18 Mars 2024",
    lieu: "Grand-Bassam",
    animateur: "Mme TRAORE Aminata",
    participants: 35,
    duree: "4 heures",
    objectifs: ["Grande session d'intégration", "Formation complète", "Visite historique", "Cohésion d'équipe"],
    public: "Nouveaux membres Lagunes",
    resultats: ["35 nouveaux membres intégrés", "Visite du patrimoine historique", "Formation aux outils numériques", "Mise en place de mentorat"],
    status: "Terminée"
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terminée':
        return 'bg-gray-100 text-gray-800';
      case 'Programmée':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  // Composant de carte de réunion - Version Mobile
  const ReunionCardMobile = ({
    reunion
  }: {
    reunion: Reunion;
  }) => <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-primary text-sm">{reunion.titre}</CardTitle>
          <Badge className={getStatusColor(reunion.status)}>
            {reunion.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 mb-3">
          <div className="flex items-center text-xs text-gray-600">
            <Calendar className="h-3 w-3 mr-1" />
            {reunion.date}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <MapPin className="h-3 w-3 mr-1" />
            {reunion.lieu}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <Users className="h-3 w-3 mr-1" />
            {reunion.animateur}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <Clock className="h-3 w-3 mr-1" />
            {reunion.duree}
          </div>
        </div>

        <div className="mb-3">
          <p className="text-xs font-medium text-gray-700 mb-1">Public cible :</p>
          <p className="text-xs text-gray-600">{reunion.public}</p>
        </div>

        {reunion.objectifs && <div className="mb-3">
            <h4 className="font-medium text-gray-700 mb-1 flex items-center text-xs">
              <Target className="h-3 w-3 mr-1" />
              Objectifs :
            </h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {reunion.objectifs.slice(0, 2).map((objectif: string, index: number) => <li key={index} className="flex items-start">
                  <span className="text-primary mr-1">•</span>
                  {objectif}
                </li>)}
              {reunion.objectifs.length > 2 && <li className="text-gray-500">... et {reunion.objectifs.length - 2} autres</li>}
            </ul>
          </div>}

        {reunion.resultats && <div>
            <h4 className="font-medium text-gray-700 mb-1 flex items-center text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              Résultats :
            </h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {reunion.resultats.slice(0, 2).map((resultat: string, index: number) => <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-1">✓</span>
                  {resultat}
                </li>)}
            </ul>
          </div>}
      </CardContent>
    </Card>;

  // Composant de carte de réunion - Version Tablette
  const ReunionCardTablet = ({
    reunion
  }: {
    reunion: Reunion;
  }) => <Card className="hover:shadow-lg transition-shadow">
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
            <Clock className="h-4 w-4 mr-2" />
            Durée : {reunion.duree}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Public cible :</p>
          <p className="text-sm text-gray-600">{reunion.public}</p>
        </div>

        {reunion.objectifs && <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2 flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Objectifs :
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {reunion.objectifs.map((objectif: string, index: number) => <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  {objectif}
                </li>)}
            </ul>
          </div>}

        {reunion.resultats && <div>
            <h4 className="font-medium text-gray-700 mb-2 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Résultats obtenus :
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {reunion.resultats.map((resultat: string, index: number) => <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {resultat}
                </li>)}
            </ul>
          </div>}
      </CardContent>
    </Card>;

  // Composant de carte de réunion - Version Desktop
  const ReunionCardDesktop = ({
    reunion
  }: {
    reunion: Reunion;
  }) => <Card className="hover:shadow-lg transition-shadow">
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

        {reunion.prerequis && <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Prérequis :</p>
            <p className="text-sm text-gray-600">{reunion.prerequis}</p>
          </div>}

        {reunion.inscriptions && <div className="mb-4">
            <Badge className="bg-blue-100 text-blue-800">
              Inscriptions : {reunion.inscriptions}
            </Badge>
          </div>}

        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2 flex items-center">
            <Target className="h-4 w-4 mr-2" />
            Objectifs :
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {reunion.objectifs.map((objectif: string, index: number) => <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                {objectif}
              </li>)}
          </ul>
        </div>

        {reunion.resultats && <div>
            <h4 className="font-medium text-gray-700 mb-2 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Résultats obtenus :
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {reunion.resultats.map((resultat: string, index: number) => <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {resultat}
                </li>)}
            </ul>
          </div>}
      </CardContent>
    </Card>;

  // Version Mobile
  if (isMobile) {
    return <section className="py-8 px-[25px]">
        <div className="container mx-auto px-0">
          {/* Onglets */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
            <Button variant={selectedTab === 'programmees' ? 'default' : 'ghost'} onClick={() => setSelectedTab('programmees')} className="flex-1 text-xs">
              Programmées
            </Button>
            <Button variant={selectedTab === 'passees' ? 'default' : 'ghost'} onClick={() => setSelectedTab('passees')} className="flex-1 text-xs">
              Passées
            </Button>
          </div>

          {/* Contenu des onglets */}
          {selectedTab === 'programmees' && <div>
              <h2 className="text-lg font-bold text-primary mb-4">Prochaines Réunions</h2>
              <div className="space-y-4">
                {reunionsProgrammees.map(reunion => <ReunionCardMobile key={reunion.id} reunion={reunion} />)}
              </div>
            </div>}

          {selectedTab === 'passees' && <div>
              <h2 className="text-lg font-bold text-primary mb-4">Réunions Passées</h2>
              <div className="space-y-4">
                {reunionsPassees.map(reunion => <ReunionCardMobile key={reunion.id} reunion={reunion} />)}
              </div>
            </div>}
        </div>
      </section>;
  }

  // Version Tablette
  if (isTablet) {
    return <section className="py-12 px-[50px]">
        <div className="container mx-auto px-4">
          {/* Onglets */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 max-w-md">
            <Button variant={selectedTab === 'programmees' ? 'default' : 'ghost'} onClick={() => setSelectedTab('programmees')} className="flex-1">
              Programmées
            </Button>
            <Button variant={selectedTab === 'passees' ? 'default' : 'ghost'} onClick={() => setSelectedTab('passees')} className="flex-1">
              Passées
            </Button>
          </div>

          {/* Contenu des onglets */}
          {selectedTab === 'programmees' && <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Prochaines Réunions</h2>
              <div className="grid grid-cols-1 gap-6">
                {reunionsProgrammees.map(reunion => <ReunionCardTablet key={reunion.id} reunion={reunion} />)}
              </div>
            </div>}

          {selectedTab === 'passees' && <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Réunions Passées</h2>
              <div className="grid grid-cols-1 gap-6">
                {reunionsPassees.map(reunion => <ReunionCardTablet key={reunion.id} reunion={reunion} />)}
              </div>
            </div>}
        </div>
      </section>;
  }

  // Version Desktop
  return <section className="py-16 px-[100px]">
      <div className="container mx-auto px-4">
        {/* Onglets */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 max-w-md">
          <Button variant={selectedTab === 'programmees' ? 'default' : 'ghost'} onClick={() => setSelectedTab('programmees')} className="flex-1">
            Programmées
          </Button>
          <Button variant={selectedTab === 'passees' ? 'default' : 'ghost'} onClick={() => setSelectedTab('passees')} className="flex-1">
            Passées
          </Button>
        </div>

        {/* Contenu des onglets */}
        {selectedTab === 'programmees' && <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Prochaines Réunions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {reunionsProgrammees.map(reunion => <ReunionCardDesktop key={reunion.id} reunion={reunion} />)}
            </div>
          </div>}

        {selectedTab === 'passees' && <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Réunions passées</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {reunionsPassees.map(reunion => <ReunionCardDesktop key={reunion.id} reunion={reunion} />)}
            </div>
          </div>}
      </div>
    </section>;
};
export default ReunionsConstitutionContent;