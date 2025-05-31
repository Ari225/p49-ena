
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, FileText, Download, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const AssembleesGenerales = () => {
  const isMobile = useIsMobile();
  const [selectedTab, setSelectedTab] = useState('prochaines');

  const assembleesPassees = [
    {
      id: 1,
      type: "Assemblée Générale Ordinaire",
      date: "20 Mars 2024",
      lieu: "Hôtel Ivoire, Abidjan",
      participants: 135,
      duree: "6 heures",
      president: "M. KOUADIO Jean-Baptiste",
      decisions: [
        "Adoption du rapport moral 2023",
        "Validation du rapport financier",
        "Élection du nouveau bureau",
        "Modification des statuts",
        "Programme d'activités 2024"
      ],
      documents: [
        { nom: "Rapport moral 2023", type: "PDF" },
        { nom: "Rapport financier 2023", type: "PDF" },
        { nom: "Procès-verbal AG", type: "PDF" }
      ],
      status: "Terminée",
      resume: "Assemblée générale ordinaire marquée par la présentation des bilans 2023 et l'adoption du programme d'activités pour 2024. Forte participation des membres."
    },
    {
      id: 2,
      type: "Assemblée Générale Extraordinaire",
      date: "15 Novembre 2023",
      lieu: "Palais de la Culture, Abidjan",
      participants: 98,
      duree: "4 heures",
      president: "M. KOUADIO Jean-Baptiste",
      decisions: [
        "Révision des cotisations",
        "Création nouvelles commissions",
        "Partenariats stratégiques"
      ],
      documents: [
        { nom: "Projet révision statuts", type: "PDF" },
        { nom: "Procès-verbal AGE", type: "PDF" }
      ],
      status: "Terminée",
      resume: "Assemblée extraordinaire consacrée aux réformes structurelles et à l'adaptation aux nouveaux défis de l'administration publique."
    }
  ];

  const assembleesFutures = [
    {
      id: 3,
      type: "Assemblée Générale Extraordinaire",
      date: "15 Juin 2024",
      lieu: "Hôtel Ivoire, Abidjan",
      participants: 120,
      duree: "5 heures",
      president: "M. KOUADIO Jean-Baptiste",
      ordreJour: [
        "Amendements statutaires",
        "Politique de formation",
        "Nouvelles adhésions",
        "Projet de digitalisation",
        "Partenariats internationaux"
      ],
      inscriptions: "Ouvertes jusqu'au 10 juin",
      status: "À venir",
      resume: "Assemblée extraordinaire pour adopter les nouvelles orientations stratégiques de la P49 et valider les projets de modernisation."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terminée': return 'bg-gray-100 text-gray-800';
      case 'À venir': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const AssembleeCard = ({ assemblee }: { assemblee: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-primary">{assemblee.type}</CardTitle>
          <Badge className={getStatusColor(assemblee.status)}>
            {assemblee.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{assemblee.resume}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            {assemblee.date}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {assemblee.lieu}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            {assemblee.participants} participants
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            Durée : {assemblee.duree}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            Président : {assemblee.president}
          </div>
        </div>

        {assemblee.inscriptions && (
          <div className="mb-4">
            <Badge className="bg-blue-100 text-blue-800">
              {assemblee.inscriptions}
            </Badge>
          </div>
        )}

        {assemblee.ordreJour && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Ordre du jour :</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {assemblee.ordreJour.map((point: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {assemblee.decisions && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Principales décisions :</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {assemblee.decisions.map((decision: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {decision}
                </li>
              ))}
            </ul>
          </div>
        )}

        {assemblee.documents && (
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Documents disponibles :</h4>
            <div className="space-y-2">
              {assemblee.documents.map((doc: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">{doc.nom}</span>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    {doc.type}
                  </Button>
                </div>
              ))}
            </div>
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
            <h1 className="text-4xl font-bold mb-4">Assemblées Générales</h1>
            <p className="text-xl opacity-90">
              Les moments forts de la démocratie participative de la P49
            </p>
          </div>
        </section>

        {/* Informations générales */}
        <section className={`py-8 bg-white ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">AG Ordinaire</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    Organisée chaque année pour valider les bilans et 
                    définir les orientations de l'association.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">AG Extraordinaire</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    Convoquée pour des décisions importantes : 
                    modifications statutaires, projets spéciaux.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Participation</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-primary">85%</div>
                  <p className="text-gray-600">Taux de participation moyen</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contenu principal */}
        <section className={`py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            {/* Onglets */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 max-w-md">
              <Button
                variant={selectedTab === 'prochaines' ? 'default' : 'ghost'}
                onClick={() => setSelectedTab('prochaines')}
                className="flex-1"
              >
                Prochaines
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
            {selectedTab === 'prochaines' && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">Prochaines Assemblées</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {assembleesFutures.map((assemblee) => (
                    <AssembleeCard key={assemblee.id} assemblee={assemblee} />
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'passees' && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">Assemblées Passées</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {assembleesPassees.map((assemblee) => (
                    <AssembleeCard key={assemblee.id} assemblee={assemblee} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Processus démocratique */}
        <section className={`py-16 bg-accent/10 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-primary text-center mb-8">
              Le Processus Démocratique P49
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-lg">1. Convocation</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    Envoi officiel 15 jours avant avec ordre du jour détaillé
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-lg">2. Quorum</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    Minimum 50% des membres présents ou représentés
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-lg">3. Débats</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    Discussion ouverte et démocratique sur tous les points
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-lg">4. Décisions</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    Vote à la majorité simple ou qualifiée selon les statuts
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

export default AssembleesGenerales;
