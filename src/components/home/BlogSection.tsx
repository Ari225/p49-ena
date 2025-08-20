
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PenTool, Calendar, User, ChevronRight, ChevronLeft, Tag } from 'lucide-react';
import { useIsMobile, useIsTablet, useIsDesktop } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';

interface BlogArticle {
  id: string;
  title: string;
  summary: string;
  image_url: string;
  published_date: string;
  author_name: string;
  category: string;
}

const BlogSection = () => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  // ===== RESPONSIVE HOOKS =====
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    fetchBlogArticles();
  }, []);

  const fetchBlogArticles = async () => {
    try {
      const { data: articles, error } = await supabase
        .from('blog_articles')
        .select('id, title, summary, image_url, published_date, author_name, category')
        .eq('status', 'valide')
        .order('published_date', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Erreur lors de la récupération des articles:', error);
        return;
      }

      if (articles) {
        setArticles(articles.map(article => ({
          ...article,
          published_date: article.published_date || new Date().toISOString().split('T')[0]
        })));
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
    }
  };

  const nextSlide = () => {
    setCurrentSlideIndex(prevIndex => (prevIndex + 1) % articles.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex(prevIndex => prevIndex === 0 ? articles.length - 1 : prevIndex - 1);
  };

  // ===== RESPONSIVE FUNCTIONS =====
  const getSectionPadding = () => {
    if (isMobile) return 'px-[25px]';
    if (isTablet) return 'px-[50px]';
    return 'px-4 md:px-8 lg:px-[100px]';
  };

  const getTitleSize = () => {
    if (isMobile) return 'text-xl';
    if (isTablet) return 'text-2xl';
    return 'text-2xl md:text-3xl';
  };

  const getDescriptionSize = () => {
    if (isMobile) return 'text-xs';
    if (isTablet) return 'text-sm';
    return 'text-base md:text-base';
  };

  const getGridCols = () => {
    if (isMobile) return 'grid-cols-1';
    if (isTablet) return 'grid-cols-2';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  };

  const getCardImageHeight = () => {
    if (isMobile) return 'h-32 md:h-32';
    if (isTablet) return 'h-25';
    return 'h-32 md:h-48';
  };

  const getCardTitleSize = () => {
    if (isMobile) return 'text-lg md:text-lg';
    if (isTablet) return 'text-xl';
    return 'text-xl md:text-xl';
  };

  const getCardSummarySize = () => {
    if (isMobile) return 'text-xs md:text-xs';
    if (isTablet) return 'text-sm';
    return 'text-sm md:text-sm';
  };

  const getButtonSize = () => {
    if (isMobile) return 'w-full text-xs md:text-xs';
    if (isTablet) return 'text-sm';
    return 'text-sm md:text-sm';
  };

  return (
    <section className={`bg-accent/30 py-12 md:py-16 lg:py-[100px] ${getSectionPadding()}`}>
      <div className="container mx-auto px-0">
        {/* ===== HEADER SECTION ===== */}
        <div className="text-center mb-[50px] md:mb-[50px]">
          <h2 className={`${getTitleSize()} font-bold text-primary mb-[10px] md:mb-[10px]`}>Blog</h2>
          <p className={`text-gray-700 px-4 ${getDescriptionSize()}`}>
            Réflexions et analyses de nos membres sur divers domaines
          </p>
        </div>
        
        {/* ===== MOBILE VERSION ===== */}
        {isMobile && (
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-300 ease-in-out" style={{
                transform: `translateX(-${currentSlideIndex * 100}%)`
              }}>
                {articles.map(article => (
                  <div key={article.id} className="w-full flex-shrink-0 px-0">
                    <Link to={`/blog/${article.id}`} className="block">
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                        {article.image_url && (
                          <div className={getCardImageHeight()}>
                            <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                         <CardContent className="p-4 md:p-6">
                           <div className="flex justify-between items-center mb-3">
                             <span className="px-2 py-1 rounded text-xs font-medium bg-primary text-white">
                               {article.category || 'Non catégorisé'}
                             </span>
                             <div className="flex items-center text-xs text-gray-500">
                               <Calendar className="w-3 h-3 mr-1" />
                               {new Date(article.published_date).toLocaleDateString('fr-FR')}
                             </div>
                           </div>
                           <h3 className={`font-semibold text-primary mb-2 md:mb-3 line-clamp-2 ${getCardTitleSize()}`}>
                             {article.title}
                           </h3>
                           <p className={`text-gray-700 mb-3 md:mb-4 line-clamp-3 ${getCardSummarySize()}`}>
                             {article.summary}
                           </p>
                           <div className="flex items-center justify-between text-sm text-gray-700">
                             <div className="flex items-center">
                               <User className="w-3 h-3 mr-1" />
                               <span className="truncate">
                                 {article.author_name || 'Auteur anonyme'}
                               </span>
                             </div>
                           </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center gap-4 mt-4 mb-4">
              <Button onClick={prevSlide} variant="outline" size="icon" className="rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button onClick={nextSlide} variant="outline" size="icon" className="rounded-full">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ===== TABLET VERSION ===== */}
        {isTablet && (
          <div className={`grid ${getGridCols()} gap-6 mb-8`}>
            {articles.map(article => (
              <Link key={article.id} to={`/blog/${article.id}`} className="block">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  {article.image_url && (
                    <div className={getCardImageHeight()}>
                      <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                   <CardContent className="p-5">
                     <div className="flex justify-between items-center mb-3">
                       <span className="px-2 py-1 rounded text-xs font-medium bg-primary text-white">
                         {article.category || 'Non catégorisé'}
                       </span>
                       <div className="flex items-center text-xs text-gray-500">
                         <Calendar className="w-3 h-3 mr-1" />
                         {new Date(article.published_date).toLocaleDateString('fr-FR')}
                       </div>
                     </div>
                     <h3 className={`font-semibold text-primary mb-3 line-clamp-2 ${getCardTitleSize()}`}>
                       {article.title}
                     </h3>
                     <p className={`text-gray-600 mb-4 line-clamp-3 ${getCardSummarySize()}`}>
                       {article.summary}
                     </p>
                     <div className="flex items-center justify-between text-sm text-gray-700">
                       <div className="flex items-center">
                         <User className="w-3 h-3 mr-1" />
                         <span className="truncate">
                           {article.author_name || 'Auteur anonyme'}
                         </span>
                       </div>
                     </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* ===== DESKTOP VERSION ===== */}
        {isDesktop && (
          <div className={`grid ${getGridCols()} gap-6 md:gap-8 mb-8 md:mb-12`}>
            {articles.map(article => (
              <Link key={article.id} to={`/blog/${article.id}`} className="block">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  {article.image_url && (
                    <div className={getCardImageHeight()}>
                      <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                   <CardContent className="p-4 md:p-6">
                     <div className="flex justify-between items-center mb-3">
                       <span className="px-2 py-1 rounded text-xs font-medium bg-primary text-white">
                         {article.category || 'Non catégorisé'}
                       </span>
                       <div className="flex items-center text-xs text-gray-500">
                         <Calendar className="w-3 h-3 mr-1" />
                         {new Date(article.published_date).toLocaleDateString('fr-FR')}
                       </div>
                     </div>
                     <h3 className={`font-semibold text-primary mb-2 md:mb-3 line-clamp-2 ${getCardTitleSize()}`}>
                       {article.title}
                     </h3>
                     <p className={`text-gray-600 mb-3 md:mb-4 line-clamp-3 ${getCardSummarySize()}`}>
                       {article.summary}
                     </p>
                     <div className="flex items-center justify-between text-sm text-gray-700">
                       <div className="flex items-center">
                         <User className="w-3 h-3 mr-1" />
                         <span className="truncate">
                           {article.author_name || 'Auteur anonyme'}
                         </span>
                       </div>
                     </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
        
        {/* ===== CALL TO ACTION BUTTON ===== */}
        <div className="text-center">
          <Button asChild className={`bg-primary hover:bg-primary text-white py-[5px] px-[15px] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold ${getButtonSize()}`}>
            <Link to="/blog" className="flex items-center justify-center">
              Voir tous les articles
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
