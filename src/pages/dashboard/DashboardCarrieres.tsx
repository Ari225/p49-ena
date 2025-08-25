
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Trash2, MapPin, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { isAdmin } from '@/utils/roleUtils';

const DashboardCarrieres = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const mockOffers = [
    {
      id: '1',
      title: 'Directeur des Ressources Humaines',
      company: 'Ministère de la Fonction Publique',
      location: 'Abidjan',
      type: 'CDI',
      description: 'Poste de direction pour la gestion des ressources humaines.',
      salary: 'À négocier',
      posted_date: '2024-03-20'
    },
    {
      id: '2',
      title: 'Conseiller en Politiques Publiques',
      company: 'Cabinet du Premier Ministre',
      location: 'Yamoussoukro',
      type: 'CDD',
      description: 'Analyse et élaboration de politiques publiques.',
      salary: '1 500 000 FCFA',
      posted_date: '2024-03-18'
    }
  ];

  if (!user || !isAdmin(user)) {
    return <div>Non autorisé</div>;
  }


  if (isMobile) {
    return (
      <Layout>
        <div className="px-[25px] py-[50px] pb-20">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary whitespace-nowrap">Gestion carrières+</h1>
            <p className="text-gray-600 mt-1 text-sm">Gérer les offres d'emploi</p>
          </div>



          <div className="space-y-4">
            {mockOffers.map((offer) => (
              <Card key={offer.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    {offer.title}
                  </CardTitle>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-primary">{offer.company}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {offer.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(offer.posted_date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{offer.description}</p>
                  <p className="text-sm"><strong>Type:</strong> {offer.type}</p>
                  <p className="text-sm mb-4"><strong>Salaire:</strong> {offer.salary}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Supprimer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <AdminSidebar />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Gestion carrières+</h1>
            <p className="text-gray-600 mt-2">Gérer les offres d'emploi et opportunités de carrière</p>
          </div>



          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockOffers.map((offer) => (
              <Card key={offer.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    {offer.title}
                  </CardTitle>
                  <div className="space-y-1">
                    <p className="font-medium text-primary">{offer.company}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {offer.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(offer.posted_date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{offer.description}</p>
                  <p className="text-sm"><strong>Type:</strong> {offer.type}</p>
                  <p className="text-sm mb-4"><strong>Salaire:</strong> {offer.salary}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Supprimer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardCarrieres;
