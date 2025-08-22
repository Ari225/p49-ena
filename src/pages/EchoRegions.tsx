import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Users, Calendar, Award } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
const EchoRegions = () => {
  const isMobile = useIsMobile();
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
      {/* Header Section with Background Image */}
      <section className={`relative ${isMobile ? 'h-[30vh]' : 'h-[60vh]'} flex items-center justify-center text-white overflow-hidden`}>
        <div className="absolute inset-0">
          <img src="/lovable-uploads/archives.webp" alt="Background écho régions" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>
        
        <div className={`relative z-10 text-center ${isMobile ? 'px-[25px]' : 'px-8 lg:px-[100px]'}`}>
          <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold mb-4 md:mb-6 animate-fade-in`}>
            Écho des régions
          </h1>
          <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} italic mb-6 md:mb-8 animate-fade-in text-white font-normal max-w-3xl mx-auto`}>
            Plongez dans le train des délégations régionales de la P49
          </p>
        </div>
      </section>

      {/* Statistiques Section */}
      <section className={`bg-white py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
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
      <section className={`bg-accent/30 py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Nos Régions</h2>
          
        </div>
      </section>

      {/* Coordination Section */}
      <section className={`bg-white py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
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