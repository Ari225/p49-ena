
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, Share2, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ActualiteDetail = () => {
  const { id } = useParams();
  const isMobile = useIsMobile();

  // Mock data - in a real app, this would be fetched based on the ID
  const actualiteData = {
    '1': {
      title: "Nouvelle réforme de la fonction publique annoncée",
      content: `
        <p>Le gouvernement ivoirien a annoncé aujourd'hui une série de réformes majeures visant à moderniser l'administration publique. Ces changements, qui entreront en vigueur dès le début de l'année prochaine, concernent plusieurs aspects cruciaux du service public.</p>
        
        <h3>Les principales mesures</h3>
        <p>Parmi les mesures phares de cette réforme, on retrouve :</p>
        <ul>
          <li>La digitalisation des procédures administratives</li>
          <li>L'amélioration des conditions de travail des fonctionnaires</li>
          <li>La mise en place d'un système d'évaluation des performances</li>
          <li>Le renforcement de la formation continue</li>
        </ul>
        
        <h3>Impact sur les membres de la P49</h3>
        <p>Ces réformes auront un impact direct sur les membres de la Promotion 49 de l'École Nationale d'Administration. En tant que cadres de l'administration publique, ils seront en première ligne pour mettre en œuvre ces changements.</p>
        
        <p>La P49 s'engage à accompagner ses membres dans cette transition, notamment à travers des sessions de formation et d'information qui seront organisées dans les prochaines semaines.</p>
      `,
      category: "Réforme",
      date: "2024-01-15",
      author: "Direction P49",
      image: "/lovable-uploads/564fd51c-6433-44ea-8ab6-64d196e0a996.jpg",
      readTime: "5 min"
    },
    '2': {
      title: "Assemblée générale 2024 : Un succès remarquable",
      content: `
        <p>L'assemblée générale annuelle de la Promotion 49 de l'ENA s'est tenue avec un succès remarquable, rassemblant plus de 300 membres de notre promotion.</p>
        
        <h3>Les temps forts de l'événement</h3>
        <p>Cette assemblée a été marquée par plusieurs moments importants :</p>
        <ul>
          <li>Présentation du bilan annuel des activités</li>
          <li>Élection du nouveau bureau exécutif</li>
          <li>Adoption du budget pour l'année en cours</li>
          <li>Présentation des projets futurs</li>
        </ul>
        
        <h3>Perspectives d'avenir</h3>
        <p>Les membres présents ont exprimé leur satisfaction quant aux réalisations de l'année écoulée et ont approuvé à l'unanimité les orientations stratégiques pour les mois à venir.</p>
      `,
      category: "Événement",
      date: "2024-01-10",
      author: "Bureau Exécutif",
      image: "/lovable-uploads/59b7fe65-b4e7-41e4-b1fd-0f9cb602d47d.jpg",
      readTime: "3 min"
    }
  };

  const actualite = actualiteData[id as keyof typeof actualiteData] || actualiteData['1'];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className={`bg-white shadow-sm ${isMobile ? 'px-[25px] py-4' : 'px-[100px] py-6'}`}>
          <div className="container mx-auto">
            <Link to="/actualites">
              <Button variant="ghost" className="mb-4 text-primary hover:text-primary/80">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux actualités
              </Button>
            </Link>
          </div>
        </div>

        {/* Article Content */}
        <article className={`bg-white ${isMobile ? 'px-[25px] py-8' : 'px-[100px] py-12'}`}>
          <div className="container mx-auto max-w-4xl">
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-primary/10 px-3 py-1 rounded-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(actualite.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {actualite.readTime} de lecture
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {actualite.author}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </Button>
              </div>
              
              <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full font-medium text-sm mb-4 inline-block">
                {actualite.category}
              </span>
              
              <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold text-primary mb-6 leading-tight`}>
                {actualite.title}
              </h1>
            </header>

            {/* Featured Image */}
            <div className="aspect-video overflow-hidden rounded-lg mb-8">
              <img 
                src={actualite.image} 
                alt={actualite.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Body */}
            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: actualite.content }}
            />

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Publié par <span className="font-medium text-primary">{actualite.author}</span>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager cet article
                </Button>
              </div>
            </footer>
          </div>
        </article>

        {/* Related Articles Section */}
        <section className={`bg-gray-50 ${isMobile ? 'px-[25px] py-8' : 'px-[100px] py-12'}`}>
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-primary mb-6">Articles similaires</h2>
            <div className="text-center">
              <Link to="/actualites">
                <Button className="bg-primary text-white hover:bg-primary/90">
                  Voir toutes les actualités
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ActualiteDetail;
