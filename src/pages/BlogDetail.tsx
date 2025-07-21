
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, Share2, User, Tag, ChevronRight } from 'lucide-react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const BlogDetail = () => {
  const { id } = useParams();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Mock data - in a real app, this would be fetched based on the ID
  const blogData = {
    '1': {
      title: "L'évolution de l'administration publique ivoirienne",
      content: `
        <p class="text-lg leading-relaxed mb-6 text-gray-700">L'administration publique ivoirienne connaît une transformation majeure depuis ces dernières années. Cette évolution s'inscrit dans une démarche de modernisation et d'efficacité accrue des services publics.</p>
        
        <h3 class="text-2xl font-bold text-primary mb-4 mt-8">Les défis actuels</h3>
        <p class="mb-4 text-gray-700 leading-relaxed">Parmi les principaux défis auxquels fait face l'administration publique, nous pouvons citer :</p>
        <ul class="list-disc list-inside mb-6 space-y-2 text-gray-700 ml-4">
          <li>La digitalisation des processus administratifs</li>
          <li>L'amélioration de la qualité des services aux citoyens</li>
          <li>La formation continue des agents</li>
          <li>La lutte contre la bureaucratie excessive</li>
        </ul>
        
        <h3 class="text-2xl font-bold text-primary mb-4 mt-8">Le rôle de la P49</h3>
        <p class="mb-4 text-gray-700 leading-relaxed">En tant que diplômés de l'École Nationale d'Administration, les membres de la Promotion 49 jouent un rôle crucial dans cette transformation. Nous sommes appelés à être les acteurs du changement.</p>
        
        <blockquote class="border-l-4 border-primary bg-gray-50 p-6 my-8 italic text-gray-700">
          "L'administration publique moderne doit être au service du citoyen, efficace et transparente. C'est notre mission en tant que cadres de l'État."
        </blockquote>
        
        <p class="mb-6 text-gray-700 leading-relaxed">Cette mission nous engage tous et chacun dans nos postes respectifs. Elle nécessite une vision commune et une approche coordonnée des réformes à entreprendre.</p>
      `,
      category: "Administration",
      date: "2024-01-20",
      author: "Dr. Kouamé N'Guessan",
      image: "/lovable-uploads/8cbb0164-0529-47c1-9caa-8244c17623b3.jpg",
      readTime: "8 min",
      tags: ["Administration", "Réforme", "P49", "Modernisation"]
    }
  };

  const blog = blogData[id as keyof typeof blogData] || blogData['1'];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Header */}
        <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10 shadow-sm">
          <div className={`${isMobile ? 'px-4 py-3' : isTablet ? 'px-6 py-4' : 'px-8 py-5'} max-w-6xl mx-auto`}>
            <Link to="/blog">
              <Button variant="ghost" className="text-gray-600 hover:text-primary hover:bg-primary/5 p-0 h-auto font-normal group transition-all duration-200">
                <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Retour au blog
              </Button>
            </Link>
          </div>
        </div>

        {/* Article Container */}
        <div className={`${isMobile ? 'px-4 py-8' : isTablet ? 'px-6 py-10' : 'px-8 py-12'} max-w-4xl mx-auto`}>
          <article className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            {/* Hero Image */}
            <div className="relative">
              <div className={`${isMobile ? 'h-64' : isTablet ? 'h-80' : 'h-96'} overflow-hidden bg-gray-100`}>
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              
              {/* Floating Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-white/95 backdrop-blur text-primary shadow-lg border border-white/20">
                  <Tag className="h-3.5 w-3.5 mr-1.5" />
                  {blog.category}
                </span>
              </div>
              
              {/* Share Button */}
              <div className="absolute top-4 right-4">
                <Button size="sm" className="bg-white/95 backdrop-blur text-gray-700 hover:bg-white shadow-lg border border-white/20 hover:scale-105 transition-all duration-200">
                  <Share2 className="h-4 w-4 mr-1.5" />
                  Partager
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className={`${isMobile ? 'p-6' : isTablet ? 'p-8' : 'p-10'}`}>
              {/* Title */}
              <h1 className={`${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'} font-bold text-gray-900 mb-6 leading-tight`}>
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-3 text-gray-600 mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                  <User className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium text-sm">{blog.author}</span>
                </div>
                <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">
                    {new Date(blog.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">{blog.readTime} de lecture</span>
                </div>
              </div>

              {/* Tags */}
              {blog.tags && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {blog.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-primary/5 text-primary text-sm rounded-lg font-medium border border-primary/10"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Article Body */}
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed [&>h3]:text-gray-900 [&>h3]:font-bold [&>h3]:text-2xl [&>h3]:mb-4 [&>h3]:mt-8 [&>ul]:text-gray-700 [&>p]:text-gray-700 [&>p]:mb-6 [&>p]:leading-relaxed [&>ul>li]:mb-2 [&>blockquote]:my-8 [&>blockquote]:p-6 [&>blockquote]:bg-gray-50 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:italic [&>blockquote]:text-gray-700"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>

              {/* Author Section */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <User className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {blog.author}
                    </h3>
                    <p className="text-gray-600 mb-3 leading-relaxed text-sm">
                      Membre éminent de la Promotion 49, expert en administration publique et réformes institutionnelles.
                    </p>
                    <p className="text-gray-500 text-xs mb-4">
                      Publié le {new Date(blog.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <Button variant="outline" size="sm" className="text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-primary hover:text-primary transition-all duration-200">
                      <Share2 className="h-4 w-4 mr-2" />
                      Partager cet article
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Related Articles Section */}
        <div className="bg-white border-t border-gray-100">
          <div className={`${isMobile ? 'px-4 py-10' : isTablet ? 'px-6 py-12' : 'px-8 py-16'} max-w-6xl mx-auto`}>
            <div className="text-center mb-10">
              <h2 className={`${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'} font-bold text-gray-900 mb-4`}>
                Articles connexes
              </h2>
              <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600 max-w-2xl mx-auto`}>
                Découvrez d'autres réflexions et analyses de nos membres
              </p>
            </div>

            {/* Related Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-200">
                  <div className="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>
                  <h3 className="font-semibold text-gray-900 mb-2">Article similaire {item}</h3>
                  <p className="text-gray-600 text-sm mb-4">Résumé de l'article...</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>15 Jan 2024</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-3 w-3 mr-1" />
                    <span>5 min</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-primary via-primary to-primary/90 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
          <div className={`${isMobile ? 'px-4 py-12' : isTablet ? 'px-6 py-16' : 'px-8 py-20'} max-w-4xl mx-auto text-center relative z-10`}>
            <h2 className={`${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'} font-bold mb-6`}>
              Explorez plus d'articles du blog
            </h2>
            <p className={`${isMobile ? 'text-base' : 'text-lg'} mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed`}>
              Rejoignez la conversation et découvrez les réflexions de la communauté P49 sur l'avenir de l'administration publique
            </p>
            <Link to="/blog">
              <Button 
                size="lg" 
                className="bg-secondary text-primary hover:bg-secondary/90 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Voir tous les articles
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetail;
