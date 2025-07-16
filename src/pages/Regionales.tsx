import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock, Camera, Euro } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
const Regionales = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [selectedTab, setSelectedTab] = useState('futures');
  const regionalesPassees = [{
    id: 1,
    titre: "Régionale Sud 2024",
    date: "15 Mars 2024",
    lieu: "San-Pédro",
    participants: 52,
    duree: "2 jours",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop",
    resume: "Rencontre exceptionnelle avec focus sur le développement économique de la région Sud. Présentation des projets d'infrastructures et échanges sur les opportunités d'investissement.",
    themes: ["Développement économique", "Infrastructures", "Investissements"],
    status: "Terminée"
  }, {
    id: 2,
    titre: "Régionale Est 2024",
    date: "22 Février 2024",
    lieu: "Abengourou",
    participants: 38,
    duree: "1 jour",
    image: "https://images.unsplash.com/photo-1559223607-a43c990c692f?w=400&h=250&fit=crop",
    resume: "Session dédiée aux questions agricoles et à la valorisation des produits locaux. Ateliers pratiques sur les techniques modernes d'agriculture.",
    themes: ["Agriculture", "Produits locaux", "Formation"],
    status: "Terminée"
  }, {
    id: 3,
    titre: "Régionale Ouest 2023",
    date: "18 Décembre 2023",
    lieu: "Man",
    participants: 45,
    duree: "2 jours",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop",
    resume: "Grande assemblée de fin d'année avec bilan des activités et perspectives pour 2024. Cérémonie de reconnaissance des membres méritants.",
    themes: ["Bilan annuel", "Perspectives", "Reconnaissance"],
    status: "Terminée"
  }];
  const regionalesFutures = [{
    id: 4,
    titre: "Régionale Centre 2025",
    dateDebut: "28 juin 2025",
    dateFin: "30 juin 2025",
    lieu: "Yamoussoukro",
    image: "/lovable-uploads/3f8b5859-db9c-410f-857e-bad0765e7411.png",
    resume: "Rencontre axée sur l'innovation et la transformation digitale de l'administration publique. Ateliers sur les nouvelles technologies.",
    status: "À venir",
    inscriptions: "Ouvertes",
    tarifs: {
      membre: "50 000 FCFA",
      nonMembre: "75 000 FCFA",
      etudiant: "25 000 FCFA"
    }
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terminée':
        return 'bg-gray-100 text-gray-800';
      case 'À venir':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  // ======================
  // MOBILE VERSION - RegionaleCard
  // ======================
  const RegionaleCardMobile = ({
    regionale
  }: {
    regionale: any;
  }) => <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img src={regionale.image} alt={regionale.titre} className="w-full h-32 object-cover" />
        <Badge className={`absolute top-2 right-2 text-xs ${getStatusColor(regionale.status)}`}>
          {regionale.status}
        </Badge>
      </div>
      <CardContent className="p-3">
        <h3 className="text-lg font-semibold text-primary mb-2">{regionale.titre}</h3>
        <p className="text-gray-600 text-xs mb-3">{regionale.resume}</p>
        
        <div className="space-y-1 mb-3">
          <div className="flex items-center text-xs text-gray-600">
            <Calendar className="h-3 w-3 mr-1" />
            {regionale.date}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <MapPin className="h-3 w-3 mr-1" />
            {regionale.lieu}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <Users className="h-3 w-3 mr-1" />
            {regionale.participants} participants
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <Clock className="h-3 w-3 mr-1" />
            {regionale.duree}
          </div>
        </div>

        <div className="mb-3">
          <p className="text-xs font-medium text-gray-700 mb-1">Thèmes abordés :</p>
          <div className="flex flex-wrap gap-1">
            {regionale.themes.map((theme: string, index: number) => <Badge key={index} variant="outline" className="text-xs px-2 py-0">
                {theme}
              </Badge>)}
          </div>
        </div>

        {regionale.inscriptions && <div className="mt-3">
            <Badge className="bg-blue-100 text-blue-800 text-xs">
              Inscriptions : {regionale.inscriptions}
            </Badge>
          </div>}
      </CardContent>
    </Card>;

  // ======================
  // TABLET VERSION - RegionaleCard
  // ======================
  const RegionaleCardTablet = ({
    regionale
  }: {
    regionale: any;
  }) => <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img src={regionale.image} alt={regionale.titre} className="w-full h-40 object-cover" />
        <Badge className={`absolute top-2 right-2 ${getStatusColor(regionale.status)}`}>
          {regionale.status}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-primary mb-2">{regionale.titre}</h3>
        <p className="text-gray-600 text-sm mb-3">{regionale.resume}</p>
        
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            {regionale.date}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-3.5 w-3.5 mr-1.5" />
            {regionale.lieu}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-3.5 w-3.5 mr-1.5" />
            {regionale.participants} participants
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            {regionale.duree}
          </div>
        </div>

        <div className="mb-3">
          <p className="text-sm font-medium text-gray-700 mb-1.5">Thèmes abordés :</p>
          <div className="flex flex-wrap gap-1">
            {regionale.themes.map((theme: string, index: number) => <Badge key={index} variant="outline" className="text-xs">
                {theme}
              </Badge>)}
          </div>
        </div>

        {regionale.inscriptions && <div className="mt-3">
            <Badge className="bg-blue-100 text-blue-800">
              Inscriptions : {regionale.inscriptions}
            </Badge>
          </div>}
      </CardContent>
    </Card>;

  // ======================
  // DESKTOP VERSION - RegionaleCard
  // ======================
  const RegionaleCardDesktop = ({
    regionale
  }: {
    regionale: any;
  }) => <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img src={regionale.image} alt={regionale.titre} className="w-full h-48 object-cover" />
        <Badge className={`absolute top-2 right-2 ${getStatusColor(regionale.status)}`}>
          {regionale.status}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-primary mb-2">{regionale.titre}</h3>
        <p className="text-gray-600 text-sm mb-4">{regionale.resume}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            {regionale.date}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {regionale.lieu}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            {regionale.participants} participants
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            {regionale.duree}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Thèmes abordés :</p>
          <div className="flex flex-wrap gap-1">
            {regionale.themes.map((theme: string, index: number) => <Badge key={index} variant="outline" className="text-xs">
                {theme}
              </Badge>)}
          </div>
        </div>

        {regionale.inscriptions && <div className="mt-4">
            <Badge className="bg-blue-100 text-blue-800">
              Inscriptions : {regionale.inscriptions}
            </Badge>
          </div>}
      </CardContent>
    </Card>;

  // ======================
  // MOBILE VERSION - RegionaleFutureCard
  // ======================
  const RegionaleFutureCardMobile = ({
    regionale
  }: {
    regionale: any;
  }) => <Card className="overflow-hidden hover:shadow-lg transition-shadow max-w-xs mx-auto">
      <div className="relative">
        <img src={regionale.image} alt={regionale.titre} className="w-full h-32 object-cover" />
        <Badge className={`absolute top-2 right-2 text-xs ${getStatusColor(regionale.status)}`}>
          {regionale.status}
        </Badge>
      </div>
      <CardContent className="p-3">
        <h3 className="text-lg font-semibold text-primary mb-2">{regionale.titre}</h3>
        <p className="text-gray-600 text-xs mb-3">{regionale.resume}</p>
        
        <div className="space-y-1 mb-3">
          <div className="flex items-center text-xs text-gray-600">
            <Calendar className="h-3 w-3 mr-1" />
            Du {regionale.dateDebut} au {regionale.dateFin}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <MapPin className="h-3 w-3 mr-1" />
            {regionale.lieu}
          </div>
        </div>

        <div className="mb-3">
          <p className="text-xs font-medium text-gray-700 mb-1 flex items-center">
            <Euro className="h-3 w-3 mr-1" />
            Tarifs de participation :
          </p>
          <div className="space-y-0.5 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Membres P49 :</span>
              <span className="font-medium">{regionale.tarifs.membre}</span>
            </div>
            <div className="flex justify-between">
              <span>Non-membres :</span>
              <span className="font-medium">{regionale.tarifs.nonMembre}</span>
            </div>
            <div className="flex justify-between">
              <span>Étudiants :</span>
              <span className="font-medium">{regionale.tarifs.etudiant}</span>
            </div>
          </div>
        </div>

        {regionale.inscriptions && <div className="mt-3">
            <Badge className="bg-blue-100 text-blue-800 text-xs">
              Inscriptions : {regionale.inscriptions}
            </Badge>
          </div>}
      </CardContent>
    </Card>;

  // ======================
  // TABLET VERSION - RegionaleFutureCard
  // ======================
  const RegionaleFutureCardTablet = ({
    regionale
  }: {
    regionale: any;
  }) => <Card className="overflow-hidden hover:shadow-lg transition-shadow max-w-sm mx-auto">
      <div className="relative">
        <img src={regionale.image} alt={regionale.titre} className="w-full h-40 object-cover" />
        <Badge className={`absolute top-2 right-2 ${getStatusColor(regionale.status)}`}>
          {regionale.status}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-primary mb-2">{regionale.titre}</h3>
        <p className="text-gray-600 text-sm mb-3">{regionale.resume}</p>
        
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            Du {regionale.dateDebut} au {regionale.dateFin}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-3.5 w-3.5 mr-1.5" />
            {regionale.lieu}
          </div>
        </div>

        <div className="mb-3">
          <p className="text-sm font-medium text-gray-700 mb-1.5 flex items-center">
            <Euro className="h-3.5 w-3.5 mr-1.5" />
            Tarifs de participation :
          </p>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Membres P49 :</span>
              <span className="font-medium">{regionale.tarifs.membre}</span>
            </div>
            <div className="flex justify-between">
              <span>Non-membres :</span>
              <span className="font-medium">{regionale.tarifs.nonMembre}</span>
            </div>
            <div className="flex justify-between">
              <span>Étudiants :</span>
              <span className="font-medium">{regionale.tarifs.etudiant}</span>
            </div>
          </div>
        </div>

        {regionale.inscriptions && <div className="mt-3">
            <Badge className="bg-blue-100 text-blue-800">
              Inscriptions : {regionale.inscriptions}
            </Badge>
          </div>}
      </CardContent>
    </Card>;

  // ======================
  // DESKTOP VERSION - RegionaleFutureCard
  // ======================
  const RegionaleFutureCardDesktop = ({
    regionale
  }: {
    regionale: any;
  }) => <Card className="overflow-hidden hover:shadow-lg transition-shadow max-w-md">
      <div className="relative">
        <img src={regionale.image} alt={regionale.titre} className="w-full h-48 object-cover" />
        <Badge className={`absolute top-2 right-2 ${getStatusColor(regionale.status)}`}>
          {regionale.status}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-primary mb-2">{regionale.titre}</h3>
        <p className="text-gray-600 text-sm mb-4">{regionale.resume}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            Du {regionale.dateDebut} au {regionale.dateFin}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {regionale.lieu}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Euro className="h-4 w-4 mr-2" />
            Tarifs de participation :
          </p>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Membres P49 :</span>
              <span className="font-medium">{regionale.tarifs.membre}</span>
            </div>
            <div className="flex justify-between">
              <span>Non-membres :</span>
              <span className="font-medium">{regionale.tarifs.nonMembre}</span>
            </div>
            <div className="flex justify-between">
              <span>Étudiants :</span>
              <span className="font-medium">{regionale.tarifs.etudiant}</span>
            </div>
          </div>
        </div>

        {regionale.inscriptions && <div className="mt-4">
            <Badge className="bg-blue-100 text-blue-800">
              Inscriptions : {regionale.inscriptions}
            </Badge>
          </div>}
      </CardContent>
    </Card>;

  // Sélection du composant selon l'appareil
  const RegionaleCard = isMobile ? RegionaleCardMobile : isTablet ? RegionaleCardTablet : RegionaleCardDesktop;
  const RegionaleFutureCard = isMobile ? RegionaleFutureCardMobile : isTablet ? RegionaleFutureCardTablet : RegionaleFutureCardDesktop;
  return <Layout>
      <div className="min-h-screen bg-white">
        {/* ======================
            MOBILE VERSION - Header
            ====================== */}
        {isMobile && <section className="relative h-[30vh] flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0">
              <img src="/lovable-uploads/3f8b5859-db9c-410f-857e-bad0765e7411.png" alt="Background régionales" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-primary/80"></div>
            </div>
            
            <div className="relative z-10 text-center px-[25px]">
              <h1 className="text-2xl font-bold mb-[10px] md:mb-[10px] animate-fade-in">
                Les Régionales de la P49
              </h1>
              <p className="text-sm italic mb-6 animate-fade-in text-white font-normal max-w-3xl mx-auto">
                L'activité principale qui permet d'étendre le réseau au plan national
              </p>
            </div>
          </section>}

        {/* ======================
            TABLET VERSION - Header
            ====================== */}
        {isTablet && <section className="relative h-[45vh] flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0">
              <img src="/lovable-uploads/3f8b5859-db9c-410f-857e-bad0765e7411.png" alt="Background régionales" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-primary/80"></div>
            </div>
            
            <div className="relative z-10 text-center px-[50px]">
              <h1 className="text-4xl md:text-4xl font-bold mb-[10px] md:mb-[10px] animate-fade-in">
                Les Régionales de la P49
              </h1>
              <p className="text-base italic mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto">
                L'activité principale qui permet d'étendre le réseau au plan national
              </p>
            </div>
          </section>}

        {/* ======================
            DESKTOP VERSION - Header
            ====================== */}
        {!isMobile && !isTablet && <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0">
              <img src="/lovable-uploads/3f8b5859-db9c-410f-857e-bad0765e7411.png" alt="Background régionales" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-primary/80"></div>
            </div>
            
            <div className="relative z-10 text-center px-8 lg:px-[100px]">
              <h1 className="text-6xl md:text-6xl lg:text-6xl font-bold mb-[10px] md:mb-[10px] animate-fade-in">
                Les Régionales de la P49
              </h1>
              <p className="text-lg md:text-lg italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto">
                L'activité principale qui permet d'étendre le réseau au plan national
              </p>
            </div>
          </section>}

        {/* ======================
            MOBILE VERSION - Contenu principal
            ====================== */}
        {isMobile && <section className="py-[50px] px-[25px]">
            <div className="container mx-auto px-0">
              {/* Onglets centrés */}
              <div className="flex justify-center mb-[50px] md:mb-[50px]">
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md">
                  <Button variant={selectedTab === 'futures' ? 'default' : 'ghost'} onClick={() => setSelectedTab('futures')} className="flex-1 text-xs">
                    À venir
                  </Button>
                  <Button variant={selectedTab === 'passees' ? 'default' : 'ghost'} onClick={() => setSelectedTab('passees')} className="flex-1 text-xs">
                    Passées
                  </Button>
                </div>
              </div>

              {/* Contenu des onglets */}
              {selectedTab === 'futures' && <div>
                  <h2 className="text-xl font-bold text-primary mb-[10px] text-center">Prochaines Régionales</h2>
                  <div className="flex justify-center">
                    {regionalesFutures.map(regionale => <RegionaleFutureCard key={regionale.id} regionale={regionale} />)}
                  </div>
                </div>}

              {selectedTab === 'passees' && <div>
                  <h2 className="text-xl font-bold text-primary mb-[10px] text-center">Régionales Passées</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {regionalesPassees.map(regionale => <RegionaleCard key={regionale.id} regionale={regionale} />)}
                  </div>
                </div>}
            </div>
          </section>}

        {/* ======================
            TABLET VERSION - Contenu principal
            ====================== */}
        {isTablet && <section className="py-[50px] px-[50px]">
            <div className="container mx-auto px-4">
              {/* Onglets centrés */}
              <div className="flex justify-center mb-[50px] md:mb-[50px]">
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md">
                  <Button variant={selectedTab === 'futures' ? 'default' : 'ghost'} onClick={() => setSelectedTab('futures')} className="flex-1 text-sm">
                    À venir
                  </Button>
                  <Button variant={selectedTab === 'passees' ? 'default' : 'ghost'} onClick={() => setSelectedTab('passees')} className="flex-1 text-sm">
                    Passées
                  </Button>
                </div>
              </div>

              {/* Contenu des onglets */}
              {selectedTab === 'futures' && <div>
                  <h2 className="text-2xl font-bold text-primary mb-[10px] text-center">Prochaines Régionales</h2>
                  <div className="flex justify-center">
                    {regionalesFutures.map(regionale => <RegionaleFutureCard key={regionale.id} regionale={regionale} />)}
                  </div>
                </div>}

              {selectedTab === 'passees' && <div>
                  <h2 className="text-2xl font-bold text-primary mb-[10px] text-center">Régionales Passées</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {regionalesPassees.map(regionale => <RegionaleCard key={regionale.id} regionale={regionale} />)}
                  </div>
                </div>}
            </div>
          </section>}

        {/* ======================
            DESKTOP VERSION - Contenu principal
            ====================== */}
        {!isMobile && !isTablet && <section className="py-[50px] px-[100px]">
            <div className="container mx-auto px-4">
              {/* Onglets centrés */}
              <div className="flex justify-center mb-[50px] md:mb-[50px]">
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md">
                  <Button variant={selectedTab === 'futures' ? 'default' : 'ghost'} onClick={() => setSelectedTab('futures')} className="flex-1 text-sm">
                    À venir
                  </Button>
                  <Button variant={selectedTab === 'passees' ? 'default' : 'ghost'} onClick={() => setSelectedTab('passees')} className="flex-1 text-sm">
                    Passées
                  </Button>
                </div>
              </div>

              {/* Contenu des onglets */}
              {selectedTab === 'futures' && <div>
                  <h2 className="text-3xl font-bold text-primary mb-[10px] text-center">Prochaines Régionales</h2>
                  <div className="flex justify-center">
                    {regionalesFutures.map(regionale => <RegionaleFutureCard key={regionale.id} regionale={regionale} />)}
                  </div>
                </div>}

              {selectedTab === 'passees' && <div>
                  <h2 className="text-3xl font-bold text-primary mb-[10px] text-center">Régionales Passées</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regionalesPassees.map(regionale => <RegionaleCard key={regionale.id} regionale={regionale} />)}
                  </div>
                </div>}
            </div>
          </section>}

        {/* ======================
            MOBILE VERSION - Information supplémentaire
            ====================== */}
        {isMobile && <section className="py-12 bg-accent/10 px-[25px]">
            <div className="container mx-auto px-0">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-primary mb-[10px] md:mb-[10px]">Qu'est-ce que Les Régionales de la P49 ?</h2>
                <p className="text-gray-700 text-xs">
                  Les Régionales de la P49 constituent un cadre périodique de rencontre et d’échanges des Énarques de la 49e promotion de l’ENA. Cette caravane déjà organisée dans plusieurs villes du pays (Abengourou, Yamoussoukro, Korhogo, San-Pédro, etc.) vise à rassembler les membres de la P49 et à créer les conditions de la familiarisation et de l’union. 
                </p>
              </div>
              
            </div>
          </section>}

        {/* ======================
            TABLET VERSION - Information supplémentaire
            ====================== */}
        {isTablet && <section className="py-14 bg-accent/10 px-[50px]">
            <div className="container mx-auto px-4">
              <div className="text-center mb-7">
                <h2 className="text-2xl font-bold text-primary mb-[10px] md:mb-[10px]">Qu'est-ce que Les Régionales de la P49 ?</h2>
                <p className="text-gray-700 max-w-3xl mx-auto text-sm">
                 Les Régionales de la P49 constituent un cadre périodique de rencontre et d’échanges des Énarques de la 49e promotion de l’ENA. Cette caravane déjà organisée dans plusieurs villes du pays (Abengourou, Yamoussoukro, Korhogo, San-Pédro, etc.) vise à rassembler les membres de la P49 et à créer les conditions de la familiarisation et de l’union. 
                </p>
              </div>
              
            </div>
          </section>}

        {/* ======================
            DESKTOP VERSION - Information supplémentaire
            ====================== */}
        {!isMobile && !isTablet && <section className="py-16 bg-accent/10 px-[100px]">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-primary mb-[10px] md:mb-[10px]">Qu'est-ce que Les Régionales de la P49 ?</h2>
                <p className="text-gray-700 max-w-3xl mx-auto text-base">
                 Les Régionales de la P49 constituent un cadre périodique de rencontre et d’échanges des Énarques de la 49e promotion de l’ENA. Cette caravane déjà organisée dans plusieurs villes du pays (Abengourou, Yamoussoukro, Korhogo, San-Pédro, etc.) vise à rassembler les membres de la P49 et à créer les conditions de la familiarisation et de l’union. 
                </p>
              </div>
              
            </div>
          </section>}
      </div>
    </Layout>;
};
export default Regionales;