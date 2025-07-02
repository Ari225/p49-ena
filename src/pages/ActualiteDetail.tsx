
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, Share2, User, BookOpen, Tag, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const ActualiteDetail = () => {
  const { id } = useParams();
  const isMobile = useIsMobile();

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section with Featured Image */}
        <section className="relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={actualite.image} 
              alt={actualite.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>
          
          <div className={`relative z-10 h-full flex flex-col justify-between ${isMobile ? 'px-[25px] py-6' : 'px-[100px] py-8'}`}>
            {/* Back Button */}
            <div>
              <Link to="/actualites">
                <Button variant="secondary" className="bg-white/90 backdrop-blur-sm text-primary hover:bg-white transition-all duration-300 shadow-lg">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour aux actualités
                </Button>
              </Link>
            </div>

            {/* Article Info Overlay */}
            <div className="text-white">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Tag className="h-4 w-4 mr-2" />
                  <span className="font-medium">{actualite.category}</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(actualite.date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              
              <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'} font-bold mb-4 leading-tight drop-shadow-lg`}>
                {actualite.title}
              </h1>

              <div className="flex items-center space-x-6 text-white/90">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{actualite.author}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{actualite.readTime} de lecture</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span>Article</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className={`bg-white ${isMobile ? 'px-[25px] py-12' : 'px-[100px] py-16'}`}>
          <div className="max-w-4xl mx-auto">
            {/* Share Button */}
            <div className="flex justify-end mb-8">
              <Button variant="outline" className="hover:bg-primary hover:text-white transition-colors duration-300">
                <Share2 className="h-4 w-4 mr-2" />
                Partager cet article
              </Button>
            </div>

            {/* Article Body */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: actualite.content }}
            />

            {/* Article Footer */}
            <footer className="mt-16 pt-8 border-t border-gray-200">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Publié par {actualite.author}</p>
                      <p className="text-sm text-gray-600">
                        Le {new Date(actualite.date).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="hover:bg-primary hover:text-white transition-colors duration-300">
                    <Share2 className="h-4 w-4 mr-2" />
                    Partager
                  </Button>
                </div>
              </div>
            </footer>
          </div>
        </article>

        {/* Related Articles Section */}
        <section className={`bg-gradient-to-r from-primary/5 to-secondary/5 ${isMobile ? 'px-[25px] py-12' : 'px-[100px] py-16'}`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">Découvrez plus d'actualités</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Restez informé des dernières nouvelles de la P49 et de l'administration publique
            </p>
            <Link to="/actualites">
              <Button className="bg-primary text-white hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg px-8 py-3 text-lg">
                Voir toutes les actualités
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ActualiteDetail;
