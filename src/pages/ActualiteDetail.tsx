
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, Share2, User, Tag, ChevronRight, Eye } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const ActualiteDetail = () => {
  const { id } = useParams();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Mock data - in a real app, this would be fetched based on the ID
  const actualiteData = {
    '1': {
      title: "Nouvelle réforme de la fonction publique annoncée",
      content: `
        <p class="text-lg leading-relaxed mb-6 text-gray-700">Le gouvernement ivoirien a annoncé aujourd'hui une série de réformes majeures visant à moderniser l'administration publique. Ces changements, qui entreront en vigueur dès le début de l'année prochaine, concernent plusieurs aspects cruciaux du service public.</p>
        
        <h3 class="text-2xl font-bold text-primary mb-4 mt-8">Les principales mesures</h3>
        <p class="mb-4 text-gray-700 leading-relaxed">Parmi les mesures phares de cette réforme, on retrouve :</p>
        <ul class="list-disc list-inside mb-6 space-y-2 text-gray-700 ml-4">
          <li>La digitalisation des procédures administratives</li>
          <li>L'amélioration des conditions de travail des fonctionnaires</li>
          <li>La mise en place d'un système d'évaluation des performances</li>
          <li>Le renforcement de la formation continue</li>
        </ul>
        
        <h3 class="text-2xl font-bold text-primary mb-4 mt-8">Impact sur les membres de la P49</h3>
        <p class="mb-4 text-gray-700 leading-relaxed">Ces réformes auront un impact direct sur les membres de la Promotion 49 de l'École Nationale d'Administration. En tant que cadres de l'administration publique, ils seront en première ligne pour mettre en œuvre ces changements.</p>
        
        <p class="mb-6 text-gray-700 leading-relaxed">La P49 s'engage à accompagner ses membres dans cette transition, notamment à travers des sessions de formation et d'information qui seront organisées dans les prochaines semaines.</p>
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
        <p class="text-lg leading-relaxed mb-6 text-gray-700">L'assemblée générale annuelle de la Promotion 49 de l'ENA s'est tenue avec un succès remarquable, rassemblant plus de 300 membres de notre promotion.</p>
        
        <h3 class="text-2xl font-bold text-primary mb-4 mt-8">Les temps forts de l'événement</h3>
        <p class="mb-4 text-gray-700 leading-relaxed">Cette assemblée a été marquée par plusieurs moments importants :</p>
        <ul class="list-disc list-inside mb-6 space-y-2 text-gray-700 ml-4">
          <li>Présentation du bilan annuel des activités</li>
          <li>Élection du nouveau bureau exécutif</li>
          <li>Adoption du budget pour l'année en cours</li>
          <li>Présentation des projets futurs</li>
        </ul>
        
        <h3 class="text-2xl font-bold text-primary mb-4 mt-8">Perspectives d'avenir</h3>
        <p class="mb-6 text-gray-700 leading-relaxed">Les membres présents ont exprimé leur satisfaction quant aux réalisations de l'année écoulée et ont approuvé à l'unanimité les orientations stratégiques pour les mois à venir.</p>
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Back Navigation */}
        <div className={`${isMobile ? 'px-4 py-4' : isTablet ? 'px-8 py-6' : 'px-16 py-8'} bg-white border-b`}>
          <Link to="/actualites">
            <Button variant="ghost" className="text-primary hover:bg-primary/5 p-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux actualités
            </Button>
          </Link>
        </div>

        {/* Hero Image Section */}
        <div className="relative">
          <div className={`${isMobile ? 'h-64' : isTablet ? 'h-80' : 'h-96'} overflow-hidden`}>
            <img 
              src={actualite.image} 
              alt={actualite.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent ${isMobile ? '-mx-4' : isTablet ? '-mx-8' : '-mx-16'}`}></div>
          </div>
          
          {/* Article Meta Overlay */}
          <div className={`absolute bottom-0 left-0 right-0 ${isMobile ? 'p-4' : isTablet ? 'p-6' : 'p-8'}`}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center bg-secondary/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Tag className="h-3 w-3 mr-1.5" />
                <span className="text-sm font-medium text-primary">{actualite.category}</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white">
                <Calendar className="h-3 w-3 mr-1.5" />
                <span className="text-sm">
                  {new Date(actualite.date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className={`${isMobile ? 'px-4 py-8' : isTablet ? 'px-8 py-12' : 'px-16 py-16'}`}>
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="mb-8">
              <h1 className={`${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'} font-bold text-primary mb-6 leading-tight`}>
                {actualite.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200">
                <div className="flex items-center space-x-6 text-gray-600">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span className="font-medium">{actualite.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{actualite.readTime} de lecture</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    <span>Article</span>
                  </div>
                </div>
                
                <Button variant="outline" className="hover:bg-primary hover:text-white transition-colors duration-300">
                  <Share2 className="h-4 w-4 mr-2" />
                  {isMobile ? 'Partager' : 'Partager cet article'}
                </Button>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: actualite.content }}
              />
            </div>

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary text-lg">Publié par {actualite.author}</p>
                      <p className="text-gray-600">
                        Le {new Date(actualite.date).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  {!isMobile && (
                    <Button variant="outline" className="hover:bg-primary hover:text-white transition-colors duration-300">
                      <Share2 className="h-4 w-4 mr-2" />
                      Partager
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles CTA */}
        <div className={`bg-gradient-to-r from-primary to-primary/90 text-white ${isMobile ? 'px-4 py-12' : isTablet ? 'px-8 py-16' : 'px-16 py-20'}`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'} font-bold mb-4`}>
              Découvrez plus d'actualités
            </h2>
            <p className={`${isMobile ? 'text-base' : 'text-lg'} mb-8 opacity-90 max-w-2xl mx-auto`}>
              Restez informé des dernières nouvelles de la P49 et de l'administration publique ivoirienne
            </p>
            <Link to="/actualites">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-secondary text-primary hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Voir toutes les actualités
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ActualiteDetail;
