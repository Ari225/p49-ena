
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section with Image */}
        <div className="relative h-96 overflow-hidden">
          <img 
            src={blog.image} 
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Navigation Overlay */}
          <div className="absolute top-6 left-6">
            <Link to="/blog">
              <Button variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au blog
              </Button>
            </Link>
          </div>

          {/* Share Button */}
          <div className="absolute top-6 right-6">
            <Button size="sm" className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/30">
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/90 text-white backdrop-blur-sm">
                  <Tag className="h-3 w-3 mr-2" />
                  {blog.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span className="font-medium">{blog.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    {new Date(blog.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{blog.readTime} de lecture</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            {/* Tags */}
            {blog.tags && (
              <div className="flex flex-wrap gap-2 mb-8">
                {blog.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium border border-primary/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed [&>h3]:text-gray-900 [&>h3]:font-bold [&>h3]:text-2xl [&>h3]:mb-4 [&>h3]:mt-8 [&>ul]:text-gray-700 [&>p]:text-gray-700 [&>p]:mb-6 [&>p]:leading-relaxed [&>ul>li]:mb-2 [&>blockquote]:my-8 [&>blockquote]:p-6 [&>blockquote]:bg-gray-50 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:italic [&>blockquote]:text-gray-700 [&>blockquote]:rounded-r-lg"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {/* Author Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {blog.author}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Membre éminent de la Promotion 49, expert en administration publique et réformes institutionnelles.
                  </p>
                  <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:bg-gray-50">
                    <Share2 className="h-4 w-4 mr-2" />
                    Partager cet article
                  </Button>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Related Articles */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Articles connexes
              </h2>
              <p className="text-lg text-gray-600">
                Découvrez d'autres réflexions de nos membres
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-full h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4"></div>
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
        <div className="bg-gradient-to-r from-primary to-primary/90 text-white py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Explorez plus d'articles du blog
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Rejoignez la conversation et découvrez les réflexions de la communauté P49
            </p>
            <Link to="/blog">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg shadow-lg"
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
