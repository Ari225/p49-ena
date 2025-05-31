
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock, Camera } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Regionales = () => {
  const isMobile = useIsMobile();
  const [selectedTab, setSelectedTab] = useState('futures');

  const regionalesPassees = [
    {
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
    },
    {
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
    },
    {
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
    }
  ];

  const regionalesFutures = [
    {
      id: 4,
      titre: "Régionale Centre 2024",
      date: "28 Juin 2024",
      lieu: "Yamoussoukro",
      participants: 45,
      duree: "1 jour",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop",
      resume: "Rencontre axée sur l'innovation et la transformation digitale de l'administration publique. Ateliers sur les nouvelles technologies.",
      themes: ["Innovation", "Digital", "Administration"],
      status: "À venir",
      inscriptions: "Ouvertes"
    },
    {
      id: 5,
      titre: "Régionale Nord 2024",
      date: "20 Juillet 2024",
      lieu: "Korhogo",
      participants: 38,
      duree: "2 jours",
      image: "https://images.unsplash.com/photo-1559223607-a43c990c692f?w=400&h=250&fit=crop",
      resume: "Focus sur le développement rural et les défis sécuritaires dans la région Nord. Rencontres avec les autorités locales.",
      themes: ["Développement rural", "Sécurité", "Autorités locales"],
      status: "À venir",
      inscriptions: "Bientôt"
    },
    {
      id: 6,
      titre: "Régionale Lagunes 2024",
      date: "15 Septembre 2024",
      lieu: "Grand-Bassam",
      participants: 60,
      duree: "2 jours",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop",
      resume: "Régionale spéciale sur le tourisme et la préservation du patrimoine. Visite des sites historiques et culturels.",
      themes: ["Tourisme", "Patrimoine", "Culture"],
      status: "À venir",
      inscriptions: "Bientôt"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terminée': return 'bg-gray-100 text-gray-800';
      case 'À venir': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const RegionaleCard = ({ regionale }: { regionale: any }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={regionale.image} 
          alt={regionale.titre}
          className="w-full h-48 object-cover"
        />
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
            {regionale.themes.map((theme: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {theme}
              </Badge>
            ))}
          </div>
        </div>

        {regionale.inscriptions && (
          <div className="mt-4">
            <Badge className="bg-blue-100 text-blue-800">
              Inscriptions : {regionale.inscriptions}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className={`bg-primary text-white py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Régionales P49</h1>
            <p className="text-xl opacity-90">
              L'activité principale de la P49 : rencontres régionales pour échanger et partager
            </p>
          </div>
        </section>

        {/* Statistiques */}
        <section className={`py-8 bg-white ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">12</div>
                <div className="text-gray-600">Régionales organisées</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">8</div>
                <div className="text-gray-600">Régions couvertes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">450+</div>
                <div className="text-gray-600">Participants totaux</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">3</div>
                <div className="text-gray-600">À venir en 2024</div>
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
                variant={selectedTab === 'futures' ? 'default' : 'ghost'}
                onClick={() => setSelectedTab('futures')}
                className="flex-1"
              >
                À venir
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
            {selectedTab === 'futures' && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">Prochaines Régionales</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regionalesFutures.map((regionale) => (
                    <RegionaleCard key={regionale.id} regionale={regionale} />
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'passees' && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">Régionales Passées</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regionalesPassees.map((regionale) => (
                    <RegionaleCard key={regionale.id} regionale={regionale} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Information supplémentaire */}
        <section className={`py-16 bg-accent/10 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Qu'est-ce qu'une Régionale ?</h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                Les Régionales sont des rencontres organisées dans différentes régions de Côte d'Ivoire 
                pour permettre aux membres de la P49 de se retrouver, échanger sur les problématiques 
                locales et nationales, et renforcer les liens de fraternité.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Networking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Opportunité unique de rencontrer des collègues de votre région 
                    et d'échanger sur vos expériences professionnelles.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Camera className="h-5 w-5 mr-2" />
                    Formation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Sessions de formation et ateliers pratiques sur des thèmes 
                    d'actualité et de développement professionnel.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Découverte
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Découverte des richesses culturelles et économiques 
                    de chaque région de notre beau pays.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Regionales;
