import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PenTool, Calendar, User, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
interface BlogArticle {
  id: string;
  title: string;
  summary: string;
  image_url: string;
  published_date: string;
  author: {
    first_name: string;
    last_name: string;
  };
}
const BlogSection = () => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  useEffect(() => {
    fetchBlogArticles();
  }, []);
  const fetchBlogArticles = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('blog_articles').select(`
          id,
          title,
          summary,
          image_url,
          published_date,
          author:app_users!author_id (
            first_name,
            last_name
          )
        `).eq('status', 'valide').order('published_date', {
        ascending: false
      }).limit(3);
      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching blog articles:', error);
    }
  };
  return <section className="bg-gray-50 py-12 md:py-16 lg:py-[100px] px-4 md:px-8 lg:px-[100px]">
      <div className="container mx-auto px-0">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Articles de Blog</h2>
          <p className="text-gray-700 text-base md:text-base px-4">
            Découvrez les réflexions et analyses de nos membres sur les enjeux de l'administration publique
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {articles.map(article => <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {article.image_url && <div className="h-32 md:h-48">
                  <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
                </div>}
              <CardContent className="p-4 md:p-6">
                <h3 className="font-semibold text-primary mb-2 md:mb-3 line-clamp-2 text-sm md:text-base">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-3">
                  {article.summary}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    <span className="truncate">
                      {article.author?.first_name} {article.author?.last_name}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(article.published_date).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>
        
        <div className="text-center">
          <Button asChild className="bg-primary hover:bg-primary text-base md:text-base text-white py-[5px] px-[15px] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold">
            <Link to="/blog" className="flex items-center">
              Voir tous les articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>;
};
export default BlogSection;