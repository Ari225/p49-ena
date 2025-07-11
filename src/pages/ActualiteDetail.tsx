
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

  const getHorizontalPadding = () => {
    if (isMobile) return 'px-4';
    if (isTablet) return 'px-8';
    return 'px-16';
  };

  const getMaxWidth = () => {
    if (isMobile) return 'max-w-none';
    if (isTablet) return 'max-w-4xl';
    return 'max-w-5xl';
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Navigation Header */}
        <div className={`${getHorizontalPadding()} py-6 bg-white border-b border-gray-100`}>
          <div className={`${getMaxWidth()} mx-auto`}>
            <Link to="/actualites">
              <Button variant="ghost" className="text-gray-600 hover:text-primary hover:bg-gray-50 p-0 h-auto font-normal">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux actualités
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative mb-8">
          <div className={`${isMobile ? 'h-64' : isTablet ? 'h-80' : 'h-96'} overflow-hidden bg-gray-50`}>
            <img 
              src={actualite.image} 
              alt={actualite.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article Content */}
        <div className={`${getHorizontalPadding()} pb-16`}>
          <div className={`${getMaxWidth()} mx-auto`}>
            {/* Article Header */}
            <div className="mb-12">
              {/* Category Badge */}
              <div className="flex items-center mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  <Tag className="h-3 w-3 mr-1.5" />
                  {actualite.category}
                </span>
              </div>

              {/* Title */}
              <h1 className={`${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'} font-bold text-gray-900 mb-6 leading-tight`}>
                {actualite.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span className="font-medium">{actualite.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    {new Date(actualite.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{actualite.readTime} de lecture</span>
                </div>
              </div>

              {/* Share Button */}
              <div className="flex justify-end">
                <Button variant="outline" className="text-gray-600 border-gray-200 hover:bg-gray-50">
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </Button>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-200 mb-12"></div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none mb-12">
              <div 
                className="text-gray-700 leading-relaxed [&>h3]:text-gray-900 [&>h3]:font-semibold [&>ul]:text-gray-700 [&>p]:text-gray-700"
                dangerouslySetInnerHTML={{ __html: actualite.content }}
              />
            </div>

            {/* Author Section */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-12">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {actualite.author}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Article publié le {new Date(actualite.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:bg-white">
                    <Share2 className="h-4 w-4 mr-2" />
                    Partager cet article
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-900 text-white">
          <div className={`${getHorizontalPadding()} py-16`}>
            <div className={`${getMaxWidth()} mx-auto text-center`}>
              <h2 className={`${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'} font-bold mb-4`}>
                Découvrez plus d'actualités
              </h2>
              <p className={`${isMobile ? 'text-base' : 'text-lg'} mb-8 opacity-90 max-w-2xl mx-auto`}>
                Restez informé des dernières nouvelles de la P49 et de l'administration publique ivoirienne
              </p>
              <Link to="/actualites">
                <Button 
                  size="lg" 
                  className="bg-secondary text-primary hover:bg-secondary/90 font-semibold"
                >
                  Voir toutes les actualités
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ActualiteDetail;
