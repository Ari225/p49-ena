
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, Share2, User, Tag, ChevronRight } from 'lucide-react';
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
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Header */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className={`${isMobile ? 'px-4 py-4' : isTablet ? 'px-8 py-6' : 'px-16 py-6'} max-w-7xl mx-auto`}>
            <Link to="/actualites">
              <Button variant="ghost" className="text-gray-600 hover:text-primary hover:bg-primary/5 p-0 h-auto font-normal group">
                <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Retour aux actualités
              </Button>
            </Link>
          </div>
        </div>

        <div className={`${isMobile ? 'px-4 py-6' : isTablet ? 'px-8 py-8' : 'px-16 py-12'} max-w-4xl mx-auto`}>
          {/* Article Container */}
          <article className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Hero Image */}
            <div className="relative">
              <div className={`${isMobile ? 'h-48' : isTablet ? 'h-64' : 'h-80'} overflow-hidden`}>
                <img 
                  src={actualite.image} 
                  alt={actualite.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-white/90 backdrop-blur text-primary shadow-sm">
                  <Tag className="h-3 w-3 mr-1.5" />
                  {actualite.category}
                </span>
              </div>
              {/* Share Button */}
              <div className="absolute top-4 right-4">
                <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur text-gray-700 hover:bg-white shadow-sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className={`${isMobile ? 'p-6' : isTablet ? 'p-8' : 'p-10'}`}>
              {/* Title */}
              <h1 className={`${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'} font-bold text-gray-900 mb-6 leading-tight`}>
                {actualite.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg">
                  <User className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium text-sm">{actualite.author}</span>
                </div>
                <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">
                    {new Date(actualite.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">{actualite.readTime} de lecture</span>
                </div>
              </div>

              {/* Article Body */}
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed [&>h3]:text-gray-900 [&>h3]:font-semibold [&>h3]:text-xl [&>ul]:text-gray-700 [&>p]:text-gray-700 [&>p]:mb-4 [&>ul>li]:mb-2"
                  dangerouslySetInnerHTML={{ __html: actualite.content }}
                />
              </div>

              {/* Author Section */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {actualite.author}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Publié le {new Date(actualite.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <Button variant="outline" size="sm" className="text-gray-600 border-gray-200 hover:bg-gray-50">
                      <Share2 className="h-4 w-4 mr-2" />
                      Partager cet article
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-primary/90 text-white">
          <div className={`${isMobile ? 'px-4 py-16' : isTablet ? 'px-8 py-20' : 'px-16 py-24'} max-w-4xl mx-auto text-center`}>
            <h2 className={`${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'} font-bold mb-4`}>
              Découvrez plus d'actualités
            </h2>
            <p className={`${isMobile ? 'text-base' : 'text-lg'} mb-8 opacity-90 max-w-2xl mx-auto`}>
              Restez informé des dernières nouvelles de la P49 et de l'administration publique ivoirienne
            </p>
            <Link to="/actualites">
              <Button 
                size="lg" 
                className="bg-secondary text-primary hover:bg-secondary/90 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
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
