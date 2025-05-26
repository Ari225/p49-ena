import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Users, Calendar, Award } from 'lucide-react';
const EchoRegions = () => {
  const regions = [{
    name: "Région du Centre",
    chef_lieu: "Yamoussoukro",
    representant: "Dr. Kouakou Marie",
    membres: 120,
    derniere_activite: "Formation sur la gouvernance locale - Mars 2024",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
    actualites: ["Inauguration du nouveau siège régional", "Séminaire sur la digitalisation administrative", "Rencontre avec les autorités préfectorales"]
  }, {
    name: "Région de l'Ouest",
    chef_lieu: "Man",
    representant: "M. Traoré Seydou",
    membres: 85,
    derniere_activite: "Assemblée régionale - Février 2024",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
    actualites: ["Projet de développement rural en cours", "Formation en management public", "Partenariat avec les collectivités locales"]
  }, {
    name: "Région du Sud",
    chef_lieu: "Abidjan",
    representant: "Mme. Assi Brigitte",
    membres: 200,
    derniere_activite: "Conférence sur l'innovation - Avril 2024",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
    actualites: ["Lancement du hub d'innovation administrative", "Rencontre avec le secteur privé", "Programme de mentorat jeunes cadres"]
  }, {
    name: "Région du Nord",
    chef_lieu: "Korhogo",
    representant: "Dr. Ouattara Ibrahim",
    membres: 65,
    derniere_activite: "Mission d'évaluation des projets - Mars 2024",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
    actualites: ["Évaluation des programmes de développement", "Renforcement des capacités locales", "Coordination avec les ONG"]
  }, {
    name: "Région de l'Est",
    chef_lieu: "Abengourou",
    representant: "M. Koffi Jean-Claude",
    membres: 45,
    derniere_activite: "Audit des services publics - Janvier 2024",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
    actualites: ["Modernisation des services déconcentrés", "Formation en gestion budgétaire", "Amélioration de l'accueil citoyen"]
  }, {
    name: "Région du Centre-Ouest",
    chef_lieu: "Daloa",
    representant: "Mme. Bamba Fatou",
    membres: 55,
    derniere_activite: "Réunion de coordination - Février 2024",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
    actualites: ["Coordination inter-services renforcée", "Programme de formation continue", "Amélioration des infrastructures"]
  }];
  const statistiques = [{
    nombre: "12",
    titre: "Régions Représentées",
    description: "sur tout le territoire"
  }, {
    nombre: "570",
    titre: "Membres Régionaux",
    description: "répartis par zone"
  }, {
    nombre: "24",
    titre: "Activités Mensuelles",
    description: "en moyenne par région"
  }, {
    nombre: "95%",
    titre: "Taux de Participation",
    description: "aux activités régionales"
  }];
  return <Layout>
      {/* Header Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Écho des Régions</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Découvrez les activités et initiatives de nos membres dans toutes les régions de Côte d'Ivoire
          </p>
        </div>
      </section>

      {/* Statistiques Section */}
      <section className="bg-white py-[100px] px-[100px]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Présence Territoriale</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {statistiques.map((stat, index) => <div key={index} className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">{stat.nombre}</div>
                <h3 className="text-xl font-semibold text-primary mb-2">{stat.titre}</h3>
                <p className="text-gray-600">{stat.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Régions Section */}
      <section className="bg-accent/30 py-[100px] px-[100px]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Nos Régions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regions.map((region, index) => <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img src={region.image} alt={region.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <CardHeader>
                  <CardTitle className="text-primary text-xl">{region.name}</CardTitle>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {region.chef_lieu}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Représentant:</span>
                      <span className="font-medium text-primary">{region.representant}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        Membres:
                      </span>
                      <span className="font-bold text-secondary">{region.membres}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Calendar className="w-4 h-4 mr-1" />
                        Dernière activité:
                      </div>
                      <p className="text-sm font-medium text-primary">{region.derniere_activite}</p>
                    </div>
                    <div className="pt-2 border-t">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Actualités récentes:</h4>
                      <ul className="space-y-1">
                        {region.actualites.map((actualite, idx) => <li key={idx} className="text-xs text-gray-600 flex items-start">
                            <span className="w-1 h-1 bg-secondary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {actualite}
                          </li>)}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Coordination Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Coordination Nationale</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary">Représentation Territoriale</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Chaque région dispose d'un représentant qui assure la liaison entre le bureau national et les membres locaux.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-primary">Animation Locale</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Organisation d'activités régionales adaptées aux spécificités et besoins de chaque territoire.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary">Excellence Partagée</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Partage des bonnes pratiques et coordination des initiatives d'excellence entre toutes les régions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>;
};
export default EchoRegions;